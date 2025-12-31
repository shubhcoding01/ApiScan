# backend/app/routers/secrets.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.database import get_db
from app.models.secret_vault import SecretVault
from app.models.project import Project
from app.security import encrypt_secret
from app.security import get_current_user
from app.schemas.secret_vault import (
    SecretCreate,
    SecretResponse
)

router = APIRouter(
    prefix="/secrets",
    tags=["Secrets"]
)

# ---------------------------------------------------------
# ADD SECRET
# ---------------------------------------------------------

@router.post("/", response_model=SecretResponse)
def add_secret(
    payload: SecretCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    project = db.query(Project).filter(
        Project.id == payload.project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    encrypted_value = encrypt_secret(payload.value)

    secret = SecretVault(
        project_id=payload.project_id,
        key_name=payload.key_name,
        encrypted_value=encrypted_value,
        environment=payload.environment,
        scope=payload.scope
    )

    db.add(secret)
    db.commit()
    db.refresh(secret)

    return secret


# ---------------------------------------------------------
# LIST SECRETS (SAFE)
# ---------------------------------------------------------

@router.get("/{project_id}", response_model=list[SecretResponse])
def list_secrets(
    project_id: UUID,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(SecretVault).filter(
        SecretVault.project_id == project_id,
        SecretVault.is_active == True
    ).all()


# ---------------------------------------------------------
# DISABLE SECRET (SOFT DELETE)
# ---------------------------------------------------------

@router.delete("/{secret_id}", status_code=status.HTTP_204_NO_CONTENT)
def disable_secret(
    secret_id: UUID,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    secret = db.query(SecretVault).filter(
        SecretVault.id == secret_id
    ).first()

    if not secret:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Secret not found"
        )

    secret.is_active = False
    db.commit()

    return None
