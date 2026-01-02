# backend/app/services/vault_service.py

from typing import Dict
from sqlalchemy.orm import Session

from app.models.secret_vault import SecretVault
from app.security import encrypt_secret, decrypt_secret


# ---------------------------------------------------------
# STORE SECRET
# ---------------------------------------------------------

def store_secret(
    db: Session,
    project_id,
    key_name: str,
    value: str,
    environment: str,
    scope: str = "GLOBAL"
) -> SecretVault:
    """
    Encrypts and stores a secret in the vault.
    """

    encrypted_value = encrypt_secret(value)

    secret = SecretVault(
        project_id=project_id,
        key_name=key_name,
        encrypted_value=encrypted_value,
        environment=environment,
        scope=scope
    )

    db.add(secret)
    db.commit()
    db.refresh(secret)

    return secret


# ---------------------------------------------------------
# FETCH SECRETS FOR EXECUTION (DECRYPT IN MEMORY)
# ---------------------------------------------------------

def get_runtime_secrets(
    db: Session,
    project_id,
    environment: str
) -> Dict[str, str]:
    """
    Returns decrypted secrets for runtime injection.
    NEVER persists decrypted values.
    """

    secrets = (
        db.query(SecretVault)
        .filter(
            SecretVault.project_id == project_id,
            SecretVault.environment == environment,
            SecretVault.is_active == True
        )
        .all()
    )

    runtime_env: Dict[str, str] = {}

    for secret in secrets:
        runtime_env[secret.key_name] = decrypt_secret(
            secret.encrypted_value
        )

    return runtime_env


# ---------------------------------------------------------
# DISABLE SECRET (SOFT DELETE)
# ---------------------------------------------------------

def disable_secret(
    db: Session,
    secret_id
) -> None:
    """
    Soft deletes a secret.
    """

    secret = db.query(SecretVault).filter(
        SecretVault.id == secret_id
    ).first()

    if not secret:
        raise ValueError("Secret not found")

    secret.is_active = False
    db.commit()
