# backend/app/models/api_version.py

import uuid
from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    String,
    Text
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship

from app.database import Base


class ApiVersion(Base):
    """
    Represents a single, immutable version of an API specification.
    A new row is created every time a new OpenAPI/Swagger spec is uploaded.
    """

    __tablename__ = "api_versions"

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

    # Human-readable version (optional, e.g. "1.0.5")
    version = Column(
        String(50),
        nullable=True
    )

    # SHA-256 hash of the spec JSON (used to detect duplicates)
    spec_hash = Column(
        String(64),
        nullable=False,
        unique=True,
        index=True
    )

    # Full OpenAPI / Swagger JSON
    spec_json = Column(
        JSONB,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    # -----------------------------
    # Relationships
    # -----------------------------

    project = relationship(
        "Project",
        back_populates="api_versions"
    )

    breaking_changes = relationship(
        "BreakingChangeLog",
        back_populates="api_version",
        cascade="all, delete-orphan"
    )

    test_blueprints = relationship(
        "TestBlueprint",
        back_populates="api_version",
        cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return (
            f"<ApiVersion id={self.id} "
            f"project_id={self.project_id} "
            f"version={self.version}>"
        )
