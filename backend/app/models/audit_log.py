# backend/app/models/audit_log.py

import uuid
from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    String,
    Text
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database import Base


class AuditLog(Base):
    """
    Records every security-sensitive or governance-related action
    performed in the system.

    Examples:
    - User approved a Test Blueprint
    - API spec uploaded via CI
    - Secret added / rotated
    - Breaking change detected
    """

    __tablename__ = "audit_logs"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True
    )

    # Optional: user who performed the action
    user_id = Column(
        UUID(as_uuid=True),
        nullable=True,
        index=True
    )

    # What happened (short action identifier)
    action = Column(
        String(100),
        nullable=False,
        index=True
    )

    # Optional: entity affected (project, api_version, secret, etc.)
    entity_type = Column(
        String(50),
        nullable=True
    )

    # Optional: ID of the affected entity
    entity_id = Column(
        UUID(as_uuid=True),
        nullable=True
    )

    # Human-readable details (never secrets)
    message = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
        index=True
    )

    def __repr__(self) -> str:
        return (
            f"<AuditLog action={self.action} "
            f"user_id={self.user_id} "
            f"created_at={self.created_at}>"
        )
