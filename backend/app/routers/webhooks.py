# backend/app/routers/webhooks.py

import hmac
import hashlib
import json
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.database import get_db
from app.models.project import Project
from app.schemas.specs import SpecUploadRequest
from app.services.diff_service import detect_breaking_changes
from app.routers.specs import upload_spec

router = APIRouter(
    prefix="/webhooks",
    tags=["Webhooks"]
)


# ---------------------------------------------------------
# HMAC SIGNATURE VERIFICATION
# ---------------------------------------------------------

def verify_github_signature(
    payload_body: bytes,
    signature_header: str,
    secret: str
):
    """
    Verifies GitHub webhook signature using HMAC SHA-256.
    """
    if not signature_header:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing X-Hub-Signature-256 header"
        )

    sha_name, signature = signature_header.split("=")

    if sha_name != "sha256":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid signature format"
        )

    mac = hmac.new(
        secret.encode(),
        msg=payload_body,
        digestmod=hashlib.sha256
    )

    expected_signature = mac.hexdigest()

    if not hmac.compare_digest(expected_signature, signature):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid webhook signature"
        )


# ---------------------------------------------------------
# GITHUB WEBHOOK ENDPOINT
# ---------------------------------------------------------

@router.post("/github/{project_id}")
async def github_webhook(
    project_id: UUID,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    GitHub webhook endpoint.

    Expected behavior:
    - GitHub Action extracts openapi.json
    - POSTs it here with signature
    - ApiScan verifies authenticity
    - Spec ingestion pipeline begins
    """

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    body = await request.body()

    signature = request.headers.get("X-Hub-Signature-256")

    verify_github_signature(
        payload_body=body,
        signature_header=signature,
        secret=project.webhook_secret
    )

    try:
        payload_json = json.loads(body.decode())
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid JSON payload"
        )

    # Expected payload format from CI:
    # {
    #   "version": "1.0.6",
    #   "spec_json": { ... }
    # }

    spec_payload = SpecUploadRequest(
        project_id=project.id,
        version=payload_json.get("version"),
        spec_json=payload_json.get("spec_json")
    )

    # Reuse existing ingestion logic
    return upload_spec(
        payload=spec_payload,
        db=db,
        user={"sub": "ci-system"}
    )
