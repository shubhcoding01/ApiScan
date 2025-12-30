# backend/app/models/project.py

import uuid
from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    String,
    Text,
    Boolean
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database import Base


class Project(Base):
    """
    Root entity for ApiScan.

    A Project represents a single backend/API system that is:
    - Governed via CI
    - Versioned via OpenAPI specs
    - Tested via AI-generated test blueprints
    """

    __tablename__ = "projects"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True
    )

    # Human-friendly project name
    name = Column(
        String(100),
        nullable=False,
        unique=True,
        index=True
    )

    # Base URL of the API (e.g. https://staging.api.myapp.com)
    base_url = Column(
        String(255),
        nullable=False
    )

    # GitHub repository URL (optional but recommended)
    github_repo_url = Column(
        String(255),
        nullable=True
    )

    # Secret used to verify GitHub webhook signatures (HMAC)
    webhook_secret = Column(
        String(255),
        nullable=False
    )

    # Whether CI enforcement is enabled for this project
    ci_enabled = Column(
        Boolean,
        default=True,
        nullable=False
    )

    # Optional description for humans
    description = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
        index=True
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    # -------------------------------------------------
    # Relationships
    # -------------------------------------------------

    api_versions = relationship(
        "ApiVersion",
        back_populates="project",
        cascade="all, delete-orphan"
    )

    secrets = relationship(
        "SecretVault",
        back_populates="project",
        cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Project id={self.id} name={self.name}>"
