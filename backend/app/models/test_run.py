# backend/app/models/test_run.py

import uuid
from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Enum,
    ForeignKey,
    Integer,
    Text,
    String
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship

from app.database import Base


class TestRun(Base):
    __tablename__ = "test_runs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    blueprint_id = Column(
        UUID(as_uuid=True),
        ForeignKey("test_blueprints.id", ondelete="CASCADE"),
        nullable=False
    )

    status = Column(
        Enum(
            "PENDING",
            "RUNNING",
            "PASSED",
            "FAILED",
            name="test_run_status_enum"
        ),
        default="PENDING",
        nullable=False
    )

    reliability_score = Column(Integer, nullable=True)
    logs = Column(Text, nullable=True)
    results_json = Column(JSONB, nullable=True)
    context_blob = Column(JSONB, nullable=True)

    started_at = Column(DateTime, nullable=True)
    finished_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # ✅ FIXED RELATIONSHIPS
    blueprint = relationship("TestBlueprint", back_populates="test_runs")

    results = relationship(
        "TestResult",
        back_populates="test_run",
        cascade="all, delete-orphan"
    )


class TestResult(Base):
    __tablename__ = "test_results"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    test_run_id = Column(
        UUID(as_uuid=True),
        ForeignKey("test_runs.id", ondelete="CASCADE"),
        nullable=False
    )

    test_case_id = Column(String)
    name = Column(String)

    endpoint = Column(String)
    method = Column(String)

    status_code = Column(Integer)
    result = Column(String)
    error_message = Column(Text, nullable=True)
    response_body = Column(Text, nullable=True)

    # ✅ FIXED RELATIONSHIP
    test_run = relationship("TestRun", back_populates="results")
