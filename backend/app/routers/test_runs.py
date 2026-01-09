# # backend/app/routers/test_runs.py

# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session
# from uuid import UUID
# from datetime import datetime
# import logging

# from app.database import get_db
# from app.security import get_current_user
# from app.models.test_run import TestRun
# from app.models.test_blueprint import TestBlueprint
# from app.schemas.test_run import (
#     TestRunResponse,
#     TestRunCreate
# )

# logger = logging.getLogger(__name__)

# router = APIRouter(
#     prefix="/test-runs",
#     tags=["Test Runs"]
# )

# # ---------------------------------------------------------
# # CREATE / TRIGGER TEST RUN
# # ---------------------------------------------------------

# @router.post("/", response_model=TestRunResponse)
# def create_test_run(
#     payload: TestRunCreate,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     """
#     Create and trigger a new test run.
#     """
#     try:
#         # ✅ Fix: Use correct field name
#         blueprint = db.query(TestBlueprint).filter(
#             TestBlueprint.id == payload.test_blueprint_id  # ✅ Changed
#         ).first()

#         if not blueprint:
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND,
#                 detail="Test blueprint not found"
#             )

#         if blueprint.status != "APPROVED":
#             raise HTTPException(
#                 status_code=status.HTTP_400_BAD_REQUEST,
#                 detail="Test blueprint is not approved"
#             )

#         # ✅ Fix: Use correct field name
#         test_run = TestRun(
#             test_blueprint_id=payload.test_blueprint_id,  # ✅ Changed
#             environment=payload.environment,  # ✅ Added
#             status="RUNNING",
#             started_at=datetime.utcnow()
#         )

#         db.add(test_run)
#         db.commit()
#         db.refresh(test_run)

#         # -------------------------------------------------
#         # ASYNC EXECUTION (WORKER WILL PICK THIS UP)
#         # -------------------------------------------------
#         # execute_test_run_async.delay(test_run.id)

#         logger.info(f"Test run {test_run.id} created for blueprint {blueprint.id}")

#         return test_run

#     except HTTPException:
#         raise
#     except Exception as e:
#         logger.error(f"Error creating test run: {e}", exc_info=True)
#         db.rollback()
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Failed to create test run: {str(e)}"
#         )


# # ---------------------------------------------------------
# # LIST TEST RUNS FOR A BLUEPRINT
# # ---------------------------------------------------------

# @router.get(
#     "/blueprint/{blueprint_id}",
#     response_model=list[TestRunResponse]
# )
# def list_test_runs_for_blueprint(
#     blueprint_id: UUID,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     """
#     List all test runs for a specific blueprint.
#     """
#     try:
#         # ✅ Fix: Use correct field name
#         runs = (
#             db.query(TestRun)
#             .filter(TestRun.test_blueprint_id == blueprint_id)  # ✅ Changed
#             .order_by(TestRun.created_at.desc())
#             .all()
#         )
#         return runs
#     except Exception as e:
#         logger.error(f"Error listing test runs: {e}", exc_info=True)
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail="Failed to retrieve test runs"
#         )


# # ---------------------------------------------------------
# # GET SINGLE TEST RUN
# # ---------------------------------------------------------

# @router.get(
#     "/{test_run_id}",
#     response_model=TestRunResponse
# )
# def get_test_run(
#     test_run_id: UUID,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     """
#     Get details of a specific test run.
#     """
#     try:
#         test_run = db.query(TestRun).filter(
#             TestRun.id == test_run_id
#         ).first()

#         if not test_run:
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND,
#                 detail="Test run not found"
#             )

#         return test_run
#     except HTTPException:
#         raise
#     except Exception as e:
#         logger.error(f"Error retrieving test run: {e}", exc_info=True)
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail="Failed to retrieve test run"
#         )

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
