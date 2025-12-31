# backend/app/routers/specs.py

import hashlib
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.database import get_db
from app.models.project import Project
from app.models.api_version import ApiVersion
from app.models.breaking_change import BreakingChangeLog
from app.security import get_current_user
from app.services.diff_service import detect_breaking_changes
from app.schemas.specs import (
    SpecUploadRequest,
    SpecUploadResponse
)

router = APIRouter(
    prefix="/specs",
    tags=["Specs"]
)


# ---------------------------------------------------------
# UPLOAD OPENAPI SPEC
# ---------------------------------------------------------

@router.post("/upload", response_model=SpecUploadResponse)
def upload_spec(
    payload: SpecUploadRequest,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    """
    Upload an OpenAPI / Swagger spec for a project.
    This endpoint is used by:
    - GitHub Actions
    - GitLab CI
    - Manual UI uploads
    """

    project = db.query(Project).filter(
        Project.id == payload.project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    # -------------------------------------------------
    # HASH THE SPEC (DE-DUPLICATION)
    # -------------------------------------------------

    spec_bytes = str(payload.spec_json).encode("utf-8")
    spec_hash = hashlib.sha256(spec_bytes).hexdigest()

    existing = db.query(ApiVersion).filter(
        ApiVersion.spec_hash == spec_hash
    ).first()

    if existing:
        return SpecUploadResponse(
            api_version_id=existing.id,
            status="UNCHANGED",
            breaking_changes=[]
        )

    # -------------------------------------------------
    # FETCH PREVIOUS VERSION (IF ANY)
    # -------------------------------------------------

    previous_version = (
        db.query(ApiVersion)
        .filter(ApiVersion.project_id == payload.project_id)
        .order_by(ApiVersion.created_at.desc())
        .first()
    )

    # -------------------------------------------------
    # CREATE NEW API VERSION
    # -------------------------------------------------

    api_version = ApiVersion(
        project_id=payload.project_id,
        version=payload.version,
        spec_hash=spec_hash,
        spec_json=payload.spec_json
    )

    db.add(api_version)
    db.flush()  # get api_version.id without commit

    breaking_changes = []

    # -------------------------------------------------
    # DETECT BREAKING CHANGES
    # -------------------------------------------------

    if previous_version:
        changes = detect_breaking_changes(
            old_spec=previous_version.spec_json,
            new_spec=payload.spec_json
        )

        for change in changes:
            log = BreakingChangeLog(
                api_version_id=api_version.id,
                change_type=change["change_type"],
                field_path=change["field_path"],
                description=change["description"],
                category=change.get("category")
            )
            db.add(log)
            breaking_changes.append(change)

    db.commit()

    # -------------------------------------------------
    # CI GATE: BLOCK ON CRITICAL CHANGES
    # -------------------------------------------------

    has_critical = any(
        c["change_type"] == "CRITICAL"
        for c in breaking_changes
    )

    if has_critical and project.ci_enabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "Breaking changes detected",
                "breaking_changes": breaking_changes
            }
        )

    return SpecUploadResponse(
        api_version_id=api_version.id,
        status="ACCEPTED",
        breaking_changes=breaking_changes
    )
