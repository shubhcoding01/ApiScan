from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime
from typing import Dict, Any, List
import logging

from app.database import get_db
from app.security import get_current_user
from app.models.test_run import TestRun, TestResult
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


# ---------------------------------------------------------
# ✅ NEW: WORKER COMPLETION CALLBACK (The Missing Piece)
# ---------------------------------------------------------
# @router.post("/{test_run_id}/complete")
# def complete_test_run(
#     test_run_id: UUID,
#     payload: Dict[str, Any],  # The results sent by the worker
#     db: Session = Depends(get_db)
# ):
#     """
#     Called by the Celery Worker when testing is finished.
#     1. Updates the Run status to 'COMPLETED' or 'FAILED'
#     2. Saves the detailed Test Results (logs)
#     """
    
#     # 1. Find the Run
#     test_run = db.query(TestRun).filter(TestRun.id == test_run_id).first()
#     if not test_run:
#         raise HTTPException(404, "Test run not found")

#     logger.info(f"📝 Receiving results for Run {test_run_id}")

#     # 2. Update Run Stats
#     test_run.status = "COMPLETED"
#     test_run.completed_at = datetime.utcnow()
#     test_run.passed_tests = payload.get("passed", 0)
#     test_run.failed_tests = payload.get("failed", 0)
#     test_run.total_tests = payload.get("total", 0)

#     # 3. Save Detailed Logs (The 'results' array from the worker)
#     results_data = payload.get("results", [])
    
#     for r in results_data:
#         # Create a TestResult record for each test case
#         result_record = TestResult(
#             test_run_id=test_run.id,
#             test_case_id=r.get("test_case_id", "unknown"),
#             name=r.get("name", "Unknown"),
#             method=r.get("method", "GET"),
#             endpoint=r.get("endpoint", "/"),
#             status_code=r.get("status_code", 0),
#             result=r.get("result", "ERROR"),
#             response_body=r.get("response_body", ""),
#             error_message=r.get("error_message"),
#             # duration_ms=r.get("duration_ms", 0) # Add this to model later if needed
#         )
#         db.add(result_record)

#     db.commit()
#     db.refresh(test_run)
    
#     logger.info(f"✅ Run {test_run_id} finalized. Score: {test_run.passed_tests}/{test_run.total_tests}")
#     return {"status": "OK"}

# ---------------------------------------------------------
# ✅ FIXED: WORKER COMPLETION CALLBACK
# ---------------------------------------------------------
@router.post("/{test_run_id}/complete")
def complete_test_run(
    test_run_id: UUID,
    payload: Dict[str, Any],  # The results sent by the worker
    db: Session = Depends(get_db)
):
    """
    Called by the Celery Worker when testing is finished.
    Updates the Run status to 'PASSED' or 'FAILED' (Avoids 'COMPLETED' error)
    """
    
    # 1. Find the Run
    test_run = db.query(TestRun).filter(TestRun.id == test_run_id).first()
    if not test_run:
        raise HTTPException(404, "Test run not found")

    logger.info(f"📝 Receiving results for Run {test_run_id}")

    # 2. Update Run Stats
    passed_count = payload.get("passed", 0)
    failed_count = payload.get("failed", 0)
    total_count = payload.get("total", 0)

    test_run.passed_tests = passed_count
    test_run.failed_tests = failed_count
    test_run.total_tests = total_count
    test_run.completed_at = datetime.utcnow()

    # 👇 FIX: Set status to PASSED or FAILED (Must match DB Enum)
    if failed_count > 0:
        test_run.status = "FAILED"
    else:
        test_run.status = "PASSED"

    # 3. Save Detailed Logs
    results_data = payload.get("results", [])
    
    for r in results_data:
        result_record = TestResult(
            test_run_id=test_run.id,
            test_case_id=r.get("test_case_id", "unknown"),
            name=r.get("name", "Unknown"),
            method=r.get("method", "GET"),
            endpoint=r.get("endpoint", "/"),
            status_code=r.get("status_code", 0),
            result=r.get("result", "ERROR"),
            response_body=r.get("response_body", ""),
            error_message=r.get("error_message"),
        )
        db.add(result_record)

    db.commit()
    db.refresh(test_run)
    
    logger.info(f"✅ Run {test_run_id} finalized as {test_run.status}")
    return {"status": "OK"}