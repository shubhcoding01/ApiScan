# # backend/app/routers/test_blueprints.py

# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session
# from uuid import UUID
# from datetime import datetime

# from app.database import get_db
# from app.security import get_current_user
# from app.models.test_blueprint import TestBlueprint
# from app.models.api_version import ApiVersion
# from app.schemas.test_blueprint import (
#     TestBlueprintResponse,
#     TestBlueprintApproval
# )

# router = APIRouter(
#     prefix="/test-blueprints",
#     tags=["Test Blueprints"]
# )


# # ---------------------------------------------------------
# # LIST BLUEPRINTS FOR AN API VERSION
# # ---------------------------------------------------------

# @router.get(
#     "/api-version/{api_version_id}",
#     response_model=list[TestBlueprintResponse]
# )
# def list_blueprints_for_api_version(
#     api_version_id: UUID,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     return (
#         db.query(TestBlueprint)
#         .filter(TestBlueprint.api_version_id == api_version_id)
#         .order_by(TestBlueprint.created_at.desc())
#         .all()
#     )


# # ---------------------------------------------------------
# # GET SINGLE BLUEPRINT
# # ---------------------------------------------------------

# @router.get(
#     "/{blueprint_id}",
#     response_model=TestBlueprintResponse
# )
# def get_blueprint(
#     blueprint_id: UUID,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     blueprint = db.query(TestBlueprint).filter(
#         TestBlueprint.id == blueprint_id
#     ).first()

#     if not blueprint:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Test blueprint not found"
#         )

#     return blueprint


# # ---------------------------------------------------------
# # APPROVE / REJECT BLUEPRINT
# # ---------------------------------------------------------

# @router.post(
#     "/{blueprint_id}/approve",
#     response_model=TestBlueprintResponse
# )
# def approve_or_reject_blueprint(
#     blueprint_id: UUID,
#     payload: TestBlueprintApproval,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     blueprint = db.query(TestBlueprint).filter(
#         TestBlueprint.id == blueprint_id
#     ).first()

#     if not blueprint:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Test blueprint not found"
#         )

#     if blueprint.status != "PENDING_APPROVAL":
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Blueprint already processed"
#         )

#     blueprint.status = payload.status
#     blueprint.approved_at = datetime.utcnow()
#     blueprint.approved_by = UUID(user["sub"])

#     db.commit()
#     db.refresh(blueprint)

#     return blueprint


# backend/app/routers/test_blueprints.py

# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session
# from uuid import UUID
# from datetime import datetime

# from app.services.blueprint_service import generate_and_save_blueprint
# from app.database import get_db
# from app.security import get_current_user
# from app.models.test_blueprint import TestBlueprint
# from app.schemas.test_blueprint import (
#     TestBlueprintCreate,
#     TestBlueprintResponse,
#     TestBlueprintApproval
# )

# router = APIRouter(
#     prefix="/test-blueprints",
#     tags=["Test Blueprints"]
# )

# # ---------------------------------------------------------
# # CREATE TEST BLUEPRINT
# # ---------------------------------------------------------

# @router.post(
#     "/",
#     response_model=TestBlueprintResponse,
#     status_code=status.HTTP_201_CREATED
# )
# def create_test_blueprint(
#     payload: TestBlueprintCreate,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     blueprint = TestBlueprint(
#         api_version_id=payload.api_version_id,
#         ai_strategy_json=payload.ai_strategy,
#         status="PENDING_APPROVAL"
#     )

#     db.add(blueprint)
#     db.commit()
#     db.refresh(blueprint)

#     return blueprint


# # ---------------------------------------------------------
# # LIST BLUEPRINTS FOR AN API VERSION
# # ---------------------------------------------------------

# @router.get(
#     "/api-version/{api_version_id}",
#     response_model=list[TestBlueprintResponse]
# )
# def list_blueprints_for_api_version(
#     api_version_id: UUID,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     return (
#         db.query(TestBlueprint)
#         .filter(TestBlueprint.api_version_id == api_version_id)
#         .order_by(TestBlueprint.created_at.desc())
#         .all()
#     )


# # ---------------------------------------------------------
# # GET SINGLE BLUEPRINT
# # ---------------------------------------------------------

# @router.get(
#     "/{blueprint_id}",
#     response_model=TestBlueprintResponse
# )
# def get_blueprint(
#     blueprint_id: UUID,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     blueprint = db.query(TestBlueprint).filter(
#         TestBlueprint.id == blueprint_id
#     ).first()

#     if not blueprint:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Test blueprint not found"
#         )

#     return blueprint


# # ---------------------------------------------------------
# # APPROVE / REJECT BLUEPRINT
# # ---------------------------------------------------------

# @router.post(
#     "/{blueprint_id}/approve",
#     response_model=TestBlueprintResponse
# )
# def approve_or_reject_blueprint(
#     blueprint_id: UUID,
#     payload: TestBlueprintApproval,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     blueprint = db.query(TestBlueprint).filter(
#         TestBlueprint.id == blueprint_id
#     ).first()

#     if not blueprint:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Test blueprint not found"
#         )

#     if blueprint.status != "PENDING_APPROVAL":
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Blueprint already processed"
#         )

#     blueprint.status = "APPROVED" if payload.approved else "REJECTED"
#     blueprint.approved_at = datetime.utcnow()
#     blueprint.approved_by = UUID(user["sub"])

#     db.commit()
#     db.refresh(blueprint)

#     return blueprint

# @router.post("/generate/{api_version_id}", response_model=TestBlueprintResponse)
# def generate_blueprint_endpoint(
#     api_version_id: UUID,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     try:
#         # One clean line of logic!
#         return generate_and_save_blueprint(db, api_version_id)
#     except ValueError as e:
#         raise HTTPException(status_code=404, detail=str(e))
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

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