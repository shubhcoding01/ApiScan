# backend/app/routers/test_runs.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime

from app.database import get_db
from app.security import get_current_user
from app.models.test_run import TestRun
from app.models.test_blueprint import TestBlueprint
from app.schemas.test_run import (
    TestRunResponse,
    TestRunCreate
)

# In future this will enqueue Celery task
# from app.worker.tasks.execute_test_run import execute_test_run_async

router = APIRouter(
    prefix="/test-runs",
    tags=["Test Runs"]
)

# ---------------------------------------------------------
# CREATE / TRIGGER TEST RUN
# ---------------------------------------------------------

@router.post("/", response_model=TestRunResponse)
def create_test_run(
    payload: TestRunCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    blueprint = db.query(TestBlueprint).filter(
        TestBlueprint.id == payload.blueprint_id
    ).first()

    if not blueprint:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test blueprint not found"
        )

    if blueprint.status != "APPROVED":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Test blueprint is not approved"
        )

    test_run = TestRun(
        blueprint_id=payload.blueprint_id,
        status="RUNNING",
        started_at=datetime.utcnow()
    )

    db.add(test_run)
    db.commit()
    db.refresh(test_run)

    # -------------------------------------------------
    # ASYNC EXECUTION (WORKER WILL PICK THIS UP)
    # -------------------------------------------------
    # execute_test_run_async.delay(test_run.id)

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
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test run not found"
        )

    return test_run
