# backend/app/routers/test_blueprints.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List

from app.database import get_db
from app.security import get_current_user
from app.models.api_version import ApiVersion
from app.models.test_blueprint import TestBlueprint
from app.schemas.test_blueprint import TestBlueprintResponse
from app.services.blueprint_service import generate_and_save_blueprint
# 👇 ADD THIS IMPORT HERE 👇
from app.services.test_runner import execute_test_run
router = APIRouter(
    prefix="/test-blueprints",
    tags=["Test Blueprints"]
)

# ---------------------------------------------------------
# 1. LIST BLUEPRINTS (For the main list)
# ---------------------------------------------------------
@router.get("/api-version/{api_version_id}", response_model=List[TestBlueprintResponse])
def get_blueprints_for_version(
    api_version_id: UUID,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(TestBlueprint).filter(
        TestBlueprint.api_version_id == api_version_id
    ).order_by(TestBlueprint.created_at.desc()).all()

# ---------------------------------------------------------
# 2. GET SINGLE BLUEPRINT (This was likely missing!)
# ---------------------------------------------------------
@router.get("/{blueprint_id}", response_model=TestBlueprintResponse)
def get_blueprint_details(
    blueprint_id: UUID,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    blueprint = db.query(TestBlueprint).filter(TestBlueprint.id == blueprint_id).first()
    if not blueprint:
        raise HTTPException(status_code=404, detail="Blueprint not found")
    return blueprint

# ---------------------------------------------------------
# 3. GENERATE NEW BLUEPRINT (AI)
# ---------------------------------------------------------
@router.post("/generate/{api_version_id}", response_model=TestBlueprintResponse)
def generate_blueprint_endpoint(
    api_version_id: UUID,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    try:
        return generate_and_save_blueprint(db, api_version_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------------------------------------------------------
# 4. EXECUTE RUN (The Missing Endpoint!) 🚀
# ---------------------------------------------------------
@router.post("/{blueprint_id}/run")
def run_tests_endpoint(
    blueprint_id: UUID,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    """
    Triggers the Test Runner to execute the blueprint against the target API.
    """
    try:
        # Execute the logic we wrote in test_runner.py
        run_record = execute_test_run(db, str(blueprint_id))
        
        return {
            "run_id": run_record.id,
            "status": "COMPLETED",
            "passed": run_record.passed_tests,
            "failed": run_record.failed_tests
        }
        
    except Exception as e:
        print(f"❌ Run Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))