
# backend/app/routers/test_runs.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime
import logging

from app.database import get_db
from app.security import get_current_user
from app.models.test_run import TestRun
from app.models.test_blueprint import TestBlueprint
from app.schemas.test_run import (
    TestRunCreate,
    TestRunResponse
)

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/test-runs",
    tags=["Test Runs"]
)

# ---------------------------------------------------------
# CREATE / TRIGGER TEST RUN
# ---------------------------------------------------------

@router.post("/", response_model=TestRunResponse, status_code=status.HTTP_201_CREATED)
def create_test_run(
    payload: TestRunCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    blueprint = db.query(TestBlueprint).filter(
        TestBlueprint.id == payload.test_blueprint_id
    ).first()

    if not blueprint:
        raise HTTPException(404, "Test blueprint not found")

    if blueprint.status != "APPROVED":
        raise HTTPException(400, "Test blueprint is not approved")

    test_run = TestRun(
        blueprint_id=payload.test_blueprint_id,
        status="RUNNING",
        started_at=datetime.utcnow()
    )

    db.add(test_run)
    db.commit()
    db.refresh(test_run)

    logger.info(f"Test run {test_run.id} started")

    return test_run


# ---------------------------------------------------------
# LIST TEST RUNS FOR A BLUEPRINT
# ---------------------------------------------------------

@router.get(
    "/blueprint/{blueprint_id}",
    response_model=list[TestRunResponse]
)
def list_test_runs_for_blueprint(
    blueprint_id: UUID,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return (
        db.query(TestRun)
        .filter(TestRun.blueprint_id == blueprint_id)
        .order_by(TestRun.created_at.desc())
        .all()
    )


# ---------------------------------------------------------
# GET SINGLE TEST RUN
# ---------------------------------------------------------

@router.get(
    "/{test_run_id}",
    response_model=TestRunResponse
)
def get_test_run(
    test_run_id: UUID,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    test_run = db.query(TestRun).filter(
        TestRun.id == test_run_id
    ).first()

    if not test_run:
        raise HTTPException(404, "Test run not found")

    return test_run
