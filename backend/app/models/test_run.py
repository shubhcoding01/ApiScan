# backend/app/models/test_run.py

import uuid
from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Enum,
    ForeignKey,
    Integer,
    Text
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship

from app.database import Base


class TestRun(Base):
    """
    Represents a single execution of an approved TestBlueprint.

    A TestRun:
    - Is immutable
    - Has a lifecycle (RUNNING -> PASSED / FAILED)
    - Produces a reliability score
    """

    __tablename__ = "test_runs"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True
    )

    blueprint_id = Column(
        UUID(as_uuid=True),
        ForeignKey("test_blueprints.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    # Execution status
    status = Column(
        Enum(
            "PENDING",
            "RUNNING",
            "PASSED",
            "FAILED",
            name="test_run_status_enum"
        ),
        default="PENDING",
        nullable=False,
        index=True
    )

    # Reliability score (0–100)
    reliability_score = Column(
        Integer,
        nullable=True
    )

    # Raw execution logs (stdout, errors, summaries)
    logs = Column(
        Text,
        nullable=True
    )

    # Structured test results (parsed XML / JSON)
    results_json = Column(
        JSONB,
        nullable=True
    )

    # Context chaining state (variables between tests)
    context_blob = Column(
        JSONB,
        nullable=True
    )

    started_at = Column(
        DateTime,
        nullable=True
    )

    finished_at = Column(
        DateTime,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    # -----------------------------
    # Relationships
    # -----------------------------

    blueprint = relationship(
        "TestBlueprint",
        back_populates="test_runs"
    )

    def __repr__(self) -> str:
        return (
            f"<TestRun "
            f"id={self.id} "
            f"status={self.status} "
            f"score={self.reliability_score}>"
        )
