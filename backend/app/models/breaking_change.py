# backend/app/models/breaking_change.py

import uuid
from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Enum,
    ForeignKey,
    String,
    Text
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database import Base


class BreakingChangeLog(Base):
    """
    Records detected changes between API versions.
    Used to block CI on critical changes and to display diffs in the dashboard.
    """

    __tablename__ = "breaking_change_logs"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True
    )

    api_version_id = Column(
        UUID(as_uuid=True),
        ForeignKey("api_versions.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    # Severity of the change
    change_type = Column(
        Enum("CRITICAL", "MAJOR", "MINOR", "INFO", name="change_type_enum"),
        nullable=False,
        index=True
    )

    # DeepDiff-style path (e.g. "paths./login.post.responses.200")
    field_path = Column(
        String(255),
        nullable=False
    )

    # Short human-readable description
    description = Column(
        Text,
        nullable=False
    )

    # Optional: classification of the change
    category = Column(
        String(50),
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
        index=True
    )

    # -----------------------------
    # Relationships
    # -----------------------------

    api_version = relationship(
        "ApiVersion",
        back_populates="breaking_changes"
    )

    def __repr__(self) -> str:
        return (
            f"<BreakingChangeLog "
            f"type={self.change_type} "
            f"path={self.field_path}>"
        )
