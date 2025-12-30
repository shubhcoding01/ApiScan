# backend/app/models/secret_vault.py

import uuid
from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Enum,
    ForeignKey,
    String,
    Boolean
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database import Base


class SecretVault(Base):
    """
    Stores encrypted secrets required to authenticate API test requests.

    Secrets are:
    - Encrypted at rest
    - Decrypted only in memory
    - Injected into Docker containers as environment variables
    """

    __tablename__ = "secret_vault"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True
    )

    project_id = Column(
        UUID(as_uuid=True),
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    # Name used inside the test runtime (e.g. API_KEY, AUTH_TOKEN)
    key_name = Column(
        String(100),
        nullable=False
    )

    # Encrypted value (AES / Fernet)
    encrypted_value = Column(
        String,
        nullable=False
    )

    # Environment where this secret applies
    environment = Column(
        Enum("DEV", "STAGING", "PROD", name="secret_environment_enum"),
        nullable=False,
        index=True
    )

    # How the secret should be injected
    # Example: HEADER, QUERY, ENV
    scope = Column(
        Enum("HEADER", "QUERY", "ENV", name="secret_scope_enum"),
        default="ENV",
        nullable=False
    )

    # Whether the secret is currently active
    is_active = Column(
        Boolean,
        default=True,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    last_rotated_at = Column(
        DateTime,
        nullable=True
    )

    # -----------------------------
    # Relationships
    # -----------------------------

    project = relationship(
        "Project",
        back_populates="secrets"
    )

    def __repr__(self) -> str:
        return (
            f"<SecretVault "
            f"key={self.key_name} "
            f"env={self.environment} "
            f"active={self.is_active}>"
        )
