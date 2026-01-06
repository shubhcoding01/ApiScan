from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


# -----------------------------
# Request Schemas
# -----------------------------

class SecretVaultCreate(BaseModel):
    """
    Schema used when adding a new secret to the vault.
    Plain value is accepted ONLY at request time.
    """
    project_id: UUID
    key_name: str = Field(..., example="STRIPE_API_KEY")
    value: str = Field(..., example="sk_test_123456")
    environment: str = Field(..., example="STAGING")


class SecretVaultUpdate(BaseModel):
    """
    Schema used when rotating/updating an existing secret.
    """
    value: str = Field(..., example="sk_test_new_7890")


# -----------------------------
# Response Schemas
# -----------------------------

class SecretVaultResponse(BaseModel):
    """
    Schema returned in API responses.
    NOTE: Secret value is NEVER returned.
    """
    id: UUID
    project_id: UUID
    key_name: str
    environment: str
    created_at: datetime

    class Config:
        from_attributes = True
