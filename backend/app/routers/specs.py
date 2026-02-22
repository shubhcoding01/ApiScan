# # backend/app/routers/specs.py

# import hashlib
# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session
# from uuid import UUID

# from app.database import get_db
# from app.models.project import Project
# from app.models.api_version import ApiVersion
# from app.models.breaking_change import BreakingChangeLog
# from app.security import get_current_user
# from app.services.diff_service import detect_breaking_changes
# from app.schemas.specs import (
#     SpecUploadRequest,
#     SpecUploadResponse
# )

# router = APIRouter(
#     prefix="/specs",
#     tags=["Specs"]
# )


# # ---------------------------------------------------------
# # UPLOAD OPENAPI SPEC
# # ---------------------------------------------------------

# @router.post("/upload", response_model=SpecUploadResponse)
# def upload_spec(
#     payload: SpecUploadRequest,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     """
#     Upload an OpenAPI / Swagger spec for a project.
#     This endpoint is used by:
#     - GitHub Actions
#     - GitLab CI
#     - Manual UI uploads
#     """

#     project = db.query(Project).filter(
#         Project.id == payload.project_id
#     ).first()

#     if not project:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Project not found"
#         )

#     # -------------------------------------------------
#     # HASH THE SPEC (DE-DUPLICATION)
#     # -------------------------------------------------

#     spec_bytes = str(payload.spec_json).encode("utf-8")
#     spec_hash = hashlib.sha256(spec_bytes).hexdigest()

#     existing = db.query(ApiVersion).filter(
#         ApiVersion.spec_hash == spec_hash
#     ).first()

#     if existing:
#         # return SpecUploadResponse(
#         #     api_version_id=existing.id,
#         #     status="UNCHANGED",
#         #     breaking_changes=[]
#         # )
#         return SpecUploadResponse(
#     api_version=existing,
#     breaking_changes=[]
# )


#     # -------------------------------------------------
#     # FETCH PREVIOUS VERSION (IF ANY)
#     # -------------------------------------------------

#     previous_version = (
#         db.query(ApiVersion)
#         .filter(ApiVersion.project_id == payload.project_id)
#         .order_by(ApiVersion.created_at.desc())
#         .first()
#     )

#     # -------------------------------------------------
#     # CREATE NEW API VERSION
#     # -------------------------------------------------

#     api_version = ApiVersion(
#         project_id=payload.project_id,
#         version=payload.version,
#         spec_hash=spec_hash,
#         spec_json=payload.spec_json
#     )

#     db.add(api_version)
#     db.flush()  # get api_version.id without commit

#     breaking_changes = []

#     # -------------------------------------------------
#     # DETECT BREAKING CHANGES
#     # -------------------------------------------------

#     if previous_version:
#         changes = detect_breaking_changes(
#             old_spec=previous_version.spec_json,
#             new_spec=payload.spec_json
#         )

#         for change in changes:
#             log = BreakingChangeLog(
#                 api_version_id=api_version.id,
#                 change_type=change["change_type"],
#                 field_path=change["field_path"],
#                 description=change["description"],
#                 category=change.get("category")
#             )
#             db.add(log)
#             breaking_changes.append(change)

#     db.commit()

#     # -------------------------------------------------
#     # CI GATE: BLOCK ON CRITICAL CHANGES
#     # -------------------------------------------------

#     has_critical = any(
#         c["change_type"] == "CRITICAL"
#         for c in breaking_changes
#     )

#     if has_critical and project.ci_enabled:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail={
#                 "message": "Breaking changes detected",
#                 "breaking_changes": breaking_changes
#             }
#         )

#     # return SpecUploadResponse(
#     #     api_version_id=api_version.id,
#     #     status="ACCEPTED",
#     #     breaking_changes=breaking_changes
#     # )
#     return SpecUploadResponse(
#     api_version=api_version,
#     breaking_changes=breaking_changes
# )


# import hashlib
# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session
# from uuid import UUID


# from app.database import get_db
# from app.models.project import Project
# from app.models.api_version import ApiVersion
# from app.models.breaking_change import BreakingChangeLog
# from app.security import get_current_user
# from app.services.diff_service import detect_breaking_changes
# from app.schemas.specs import (
#     SpecUploadRequest,
#     SpecUploadResponse
# )

# router = APIRouter(
#     prefix="/specs",
#     tags=["Specs"]
# )


# # ---------------------------------------------------------
# # 1. UPLOAD OPENAPI SPEC (Your Advanced Logic)
# # ---------------------------------------------------------

# @router.post("/upload", response_model=SpecUploadResponse)
# def upload_spec(
#     payload: SpecUploadRequest,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     """
#     Upload an OpenAPI / Swagger spec for a project.
#     Handles de-duplication, versioning, and breaking change detection.
#     """

#     project = db.query(Project).filter(
#         Project.id == payload.project_id
#     ).first()

#     if not project:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Project not found"
#         )

#     # --- HASHING & DE-DUPLICATION ---
#     # Convert JSON to string to create a hash
#     # Note: In production, ensure consistent ordering of keys for reliable hashing
#     import json
#     spec_str = json.dumps(payload.spec_json, sort_keys=True)
#     spec_bytes = spec_str.encode("utf-8")
#     spec_hash = hashlib.sha256(spec_bytes).hexdigest()

#     existing = db.query(ApiVersion).filter(
#         ApiVersion.spec_hash == spec_hash,
#         ApiVersion.project_id == payload.project_id 
#     ).first()

#     if existing:
#         return SpecUploadResponse(
#             api_version=existing,
#             breaking_changes=[]
#         )

#     # --- FETCH PREVIOUS VERSION ---
#     previous_version = (
#         db.query(ApiVersion)
#         .filter(ApiVersion.project_id == payload.project_id)
#         .order_by(ApiVersion.created_at.desc())
#         .first()
#     )

#     # --- CREATE NEW VERSION ---
#     api_version = ApiVersion(
#         project_id=payload.project_id,
#         version=payload.version,
#         spec_hash=spec_hash,
#         spec_json=payload.spec_json
#     )

#     db.add(api_version)
#     db.flush()  # Generate ID

#     breaking_changes = []

#     # --- DETECT BREAKING CHANGES ---
#     if previous_version:
#         changes = detect_breaking_changes(
#             old_spec=previous_version.spec_json,
#             new_spec=payload.spec_json
#         )

#         for change in changes:
#             log = BreakingChangeLog(
#                 api_version_id=api_version.id,
#                 change_type=change["change_type"],
#                 field_path=change["field_path"],
#                 description=change["description"],
#                 category=change.get("category")
#             )
#             db.add(log)
#             breaking_changes.append(change)

#     db.commit()

#     # --- CI GATE ---
#     has_critical = any(
#         c["change_type"] == "CRITICAL"
#         for c in breaking_changes
#     )

#     if has_critical and project.ci_enabled:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail={
#                 "message": "Breaking changes detected",
#                 "breaking_changes": breaking_changes
#             }
#         )

#     return SpecUploadResponse(
#         api_version=api_version,
#         breaking_changes=breaking_changes
#     )


# # ---------------------------------------------------------
# # 2. GET LATEST SPEC (The Missing Piece)
# # ---------------------------------------------------------

# @router.get("/{project_id}")
# def list_project_specs(
#     project_id: UUID,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     """
#     Get ALL API Versions for a project (Version History).
#     Returns a list ordered by creation date (newest first).
#     """
#     specs = (
#         db.query(ApiVersion)
#         .filter(ApiVersion.project_id == project_id)
#         .order_by(ApiVersion.created_at.desc())
#         .all()  # <--- .all() returns a List [], which fixes .map() error
#     )

#     return specs

# # import hashlib
# # import json  # ✅ Moved to top level
# # from fastapi import APIRouter, Depends, HTTPException, status
# # from sqlalchemy.orm import Session
# # from uuid import UUID
# # from pydantic import BaseModel # ✅ Added missing import

# # from app.database import get_db
# # from app.models.project import Project
# # from app.models.api_version import ApiVersion
# # from app.models.breaking_change import BreakingChangeLog
# # from app.security import get_current_user
# # from app.services.diff_service import detect_breaking_changes
# # from app.services.spec_generator import generate_swagger_from_text
# # from app.schemas.specs import (
# #     SpecUploadRequest,
# #     SpecUploadResponse
# # )

# # router = APIRouter(
# #     prefix="/specs",
# #     tags=["Specs"]
# # )

# # # ---------------------------------------------------------
# # # 1. UPLOAD OPENAPI SPEC
# # # ---------------------------------------------------------

# # @router.post("/upload", response_model=SpecUploadResponse)
# # def upload_spec(
# #     payload: SpecUploadRequest,
# #     db: Session = Depends(get_db),
# #     user=Depends(get_current_user)
# # ):
# #     """
# #     Upload an OpenAPI / Swagger spec for a project.
# #     Handles de-duplication, versioning, and breaking change detection.
# #     """

# #     project = db.query(Project).filter(
# #         Project.id == payload.project_id
# #     ).first()

# #     if not project:
# #         raise HTTPException(
# #             status_code=status.HTTP_404_NOT_FOUND,
# #             detail="Project not found"
# #         )

# #     # --- HASHING & DE-DUPLICATION ---
# #     # Convert JSON to string to create a hash
# #     spec_str = json.dumps(payload.spec_json, sort_keys=True)
# #     spec_bytes = spec_str.encode("utf-8")
# #     spec_hash = hashlib.sha256(spec_bytes).hexdigest()

# #     existing = db.query(ApiVersion).filter(
# #         ApiVersion.spec_hash == spec_hash,
# #         ApiVersion.project_id == payload.project_id 
# #     ).first()

# #     if existing:
# #         return SpecUploadResponse(
# #             api_version=existing,
# #             breaking_changes=[]
# #         )

# #     # --- FETCH PREVIOUS VERSION ---
# #     previous_version = (
# #         db.query(ApiVersion)
# #         .filter(ApiVersion.project_id == payload.project_id)
# #         .order_by(ApiVersion.created_at.desc())
# #         .first()
# #     )

# #     # --- CREATE NEW VERSION ---
# #     api_version = ApiVersion(
# #         project_id=payload.project_id,
# #         version=payload.version,
# #         spec_hash=spec_hash,
# #         spec_json=payload.spec_json
# #     )

# #     db.add(api_version)
# #     db.flush()  # Generate ID

# #     breaking_changes = []

# #     # --- DETECT BREAKING CHANGES ---
# #     if previous_version:
# #         changes = detect_breaking_changes(
# #             old_spec=previous_version.spec_json,
# #             new_spec=payload.spec_json
# #         )

# #         for change in changes:
# #             log = BreakingChangeLog(
# #                 api_version_id=api_version.id,
# #                 change_type=change["change_type"],
# #                 field_path=change["field_path"],
# #                 description=change["description"],
# #                 category=change.get("category")
# #             )
# #             db.add(log)
# #             breaking_changes.append(change)

# #     db.commit()

# #     # --- CI GATE ---
# #     has_critical = any(
# #         c["change_type"] == "CRITICAL"
# #         for c in breaking_changes
# #     )

# #     if has_critical and project.ci_enabled:
# #         raise HTTPException(
# #             status_code=status.HTTP_400_BAD_REQUEST,
# #             detail={
# #                 "message": "Breaking changes detected",
# #                 "breaking_changes": breaking_changes
# #             }
# #         )

# #     return SpecUploadResponse(
# #         api_version=api_version,
# #         breaking_changes=breaking_changes
# #     )


# # # ---------------------------------------------------------
# # # 2. GET LATEST SPEC
# # # ---------------------------------------------------------

# # @router.get("/{project_id}")
# # def list_project_specs(
# #     project_id: UUID,
# #     db: Session = Depends(get_db),
# #     user=Depends(get_current_user)
# # ):
# #     """
# #     Get ALL API Versions for a project (Version History).
# #     Returns a list ordered by creation date (newest first).
# #     """
# #     specs = (
# #         db.query(ApiVersion)
# #         .filter(ApiVersion.project_id == project_id)
# #         .order_by(ApiVersion.created_at.desc())
# #         .all()
# #     )

# #     return specs


# # # ---------------------------------------------------------
# # # 3. GENERATE SPEC WITH AI
# # # ---------------------------------------------------------

# # class GenerateSpecRequest(BaseModel):
# #     description: str

# # @router.post("/{project_id}/generate")
# # def generate_spec_endpoint(
# #     project_id: str, 
# #     payload: GenerateSpecRequest,
# #     db: Session = Depends(get_db),
# #     user=Depends(get_current_user)
# # ):
# #     """
# #     Generates a new API Version using Google Gemini based on a text prompt.
# #     """
# #     try:
# #         # Calls the service function which:
# #         # 1. Calls Gemini
# #         # 2. Creates ApiSpec/ApiVersion records in DB
# #         # 3. Returns the new object
        
# #         spec = generate_swagger_from_text(db, project_id, payload.description)
        
# #         return {
# #             "id": spec.id, 
# #             "name": getattr(spec, "name", "AI Generated Spec"), 
# #             "status": "CREATED"
# #         }
# #     except Exception as e:
# #         raise HTTPException(status_code=500, detail=str(e))


import hashlib
import json
import yaml
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from uuid import UUID
from pydantic import BaseModel

from app.database import get_db
from app.models.project import Project
from app.models.api_version import ApiVersion
from app.models.breaking_change import BreakingChangeLog
from app.security import get_current_user
from app.services.diff_service import detect_breaking_changes
from app.services.spec_generator import generate_swagger_from_text
from app.schemas.specs import SpecUploadResponse

router = APIRouter(
    prefix="/specs",
    tags=["Specs"]
)

# def get_user_id(user):
#     return user.id if not isinstance(user, dict) else user["id"]

def get_user_id(user):
    # If it's a SQLAlchemy Database object
    if not isinstance(user, dict):
        return user.id
    
    # If it's a dictionary (like a JWT payload or fake DB user), 
    # check for both 'id' and the standard JWT 'sub' key.
    return user.get("id") or user.get("sub")

# ---------------------------------------------------------
# 1. UPLOAD OPENAPI SPEC (File Upload + Advanced Logic)
# ---------------------------------------------------------
@router.post("/", response_model=SpecUploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_spec(
    # Use Form and File to accept multipart/form-data from the React Dropzone
    project_id: UUID = Form(...),
    version: str = Form("1.0.0"),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    user_id = get_user_id(user)

    # 1. Security check: Ensure the user actually owns this project
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == user_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found or access denied")

    # 2. Read and Parse the File (JSON or YAML)
    content = await file.read()
    try:
        filename = file.filename.lower()
        if filename.endswith(".json"):
            spec_json = json.loads(content)
        elif filename.endswith((".yaml", ".yml")):
            spec_json = yaml.safe_load(content)
        else:
            raise ValueError("Unsupported file extension. Please upload .json or .yaml")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse file: {str(e)}")

    # 3. Hashing & De-duplication
    spec_str = json.dumps(spec_json, sort_keys=True)
    spec_bytes = spec_str.encode("utf-8")
    spec_hash = hashlib.sha256(spec_bytes).hexdigest()

    existing = db.query(ApiVersion).filter(
        ApiVersion.spec_hash == spec_hash,
        ApiVersion.project_id == project_id 
    ).first()

    if existing:
        return SpecUploadResponse(api_version=existing, breaking_changes=[])

    # 4. Fetch Previous Version
    previous_version = (
        db.query(ApiVersion)
        .filter(ApiVersion.project_id == project_id)
        .order_by(ApiVersion.created_at.desc())
        .first()
    )

    # 5. Create New Version
    api_version = ApiVersion(
        project_id=project_id,
        version=version,
        spec_hash=spec_hash,
        spec_json=spec_json,
        status="READY"  # Setting to READY since it was successfully parsed
    )

    db.add(api_version)
    db.flush()  # Generate ID

    breaking_changes = []

    # 6. Detect Breaking Changes
    if previous_version:
        changes = detect_breaking_changes(
            old_spec=previous_version.spec_json,
            new_spec=spec_json
        )

        for change in changes:
            log = BreakingChangeLog(
                api_version_id=api_version.id,
                change_type=change["change_type"],
                field_path=change["field_path"],
                description=change["description"],
                category=change.get("category")
            )
            db.add(log)
            breaking_changes.append(change)

    db.commit()

    # 7. CI Gate Check
    has_critical = any(c["change_type"] == "CRITICAL" for c in breaking_changes)
    if has_critical and getattr(project, "ci_enabled", False):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "Breaking changes detected",
                "breaking_changes": breaking_changes
            }
        )

    return SpecUploadResponse(
        api_version=api_version,
        breaking_changes=breaking_changes
    )


# ---------------------------------------------------------
# 2. GET LATEST SPECS (Version History)
# ---------------------------------------------------------
@router.get("/{project_id}")
def list_project_specs(
    project_id: UUID,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    user_id = get_user_id(user)
    
    # Verify ownership
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == user_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found or access denied")

    specs = (
        db.query(ApiVersion)
        .filter(ApiVersion.project_id == project_id)
        .order_by(ApiVersion.created_at.desc())
        .all()
    )

    return specs


# ---------------------------------------------------------
# 3. GENERATE SPEC WITH AI
# ---------------------------------------------------------
class GenerateSpecRequest(BaseModel):
    description: str

@router.post("/{project_id}/generate")
def generate_spec_endpoint(
    project_id: UUID, 
    payload: GenerateSpecRequest,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    user_id = get_user_id(user)
    
    # Verify ownership
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == user_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found or access denied")

    try:
        spec = generate_swagger_from_text(db, str(project_id), payload.description)
        
        return {
            "id": spec.id, 
            "name": getattr(spec, "name", "AI Generated Spec"), 
            "status": "CREATED"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))