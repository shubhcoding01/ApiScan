# """
# Celery Task: Ingest OpenAPI Specification

# Responsibilities:
# - Validate OpenAPI spec
# - Normalize content
# - Store parsed spec
# - Trigger breaking change detection if previous version exists
# """

# from datetime import datetime
# from celery_app import celery_app
# from sqlalchemy.orm import Session
# from deepdiff import DeepDiff

# from app.database import SessionLocal
# from app.models.api_spec import ApiSpec
# from app.tasks.detect_breaking_changes import detect_breaking_changes


# @celery_app.task(
#     name="tasks.ingest_spec",
#     bind=True,
#     autoretry_for=(Exception,),
#     retry_backoff=5,
#     retry_kwargs={"max_retries": 3},
# )
# def ingest_spec(
#     self,
#     project_id: str,
#     spec_json: dict,
#     version_label: str = None,
# ):
#     """
#     Ingest an OpenAPI spec and store it.

#     Args:
#         project_id (str): Project ID
#         spec_json (dict): Parsed OpenAPI JSON/YAML
#         version_label (str): Optional version name
#     """

#     db: Session = SessionLocal()

#     try:
#         # --------------------------------------------------
#         # 1. Basic OpenAPI Validation
#         # --------------------------------------------------
#         if "openapi" not in spec_json and "swagger" not in spec_json:
#             raise Exception("Invalid OpenAPI spec")

#         # --------------------------------------------------
#         # 2. Normalize Core Sections
#         # --------------------------------------------------
#         normalized_spec = {
#             "openapi": spec_json.get("openapi") or spec_json.get("swagger"),
#             "info": spec_json.get("info", {}),
#             "paths": spec_json.get("paths", {}),
#             "components": spec_json.get("components", {}),
#             "tags": spec_json.get("tags", []),
#         }

#         # --------------------------------------------------
#         # 3. Find Previous Spec (for diff)
#         # --------------------------------------------------
#         previous_spec = (
#             db.query(ApiSpec)
#             .filter(ApiSpec.project_id == project_id)
#             .order_by(ApiSpec.created_at.desc())
#             .first()
#         )

#         # --------------------------------------------------
#         # 4. Save New Spec
#         # --------------------------------------------------
#         new_spec = ApiSpec(
#             project_id=project_id,
#             version=version_label or f"v{datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
#             spec_json=normalized_spec,
#             created_at=datetime.utcnow(),
#         )

#         db.add(new_spec)
#         db.commit()
#         db.refresh(new_spec)

#         # --------------------------------------------------
#         # 5. Trigger Breaking Change Detection (Async)
#         # --------------------------------------------------
#         if previous_spec:
#             detect_breaking_changes.delay(
#                 old_spec_id=str(previous_spec.id),
#                 new_spec_id=str(new_spec.id),
#             )

#         # --------------------------------------------------
#         # 6. Return Minimal Response
#         # --------------------------------------------------
#         return {
#             "status": "SUCCESS",
#             "spec_id": str(new_spec.id),
#             "project_id": project_id,
#             "version": new_spec.version,
#             "breaking_check_triggered": bool(previous_spec),
#         }

#     finally:
#         db.close()


"""
Celery Task: Ingest OpenAPI Specification (Worker)

Responsibilities:
- Validate OpenAPI spec
- Normalize spec
- Detect breaking changes (diff)
- RETURN result to backend (NO DB access)
"""

from celery import shared_task
from deepdiff import DeepDiff
from datetime import datetime

from worker.app.celery_app import celery_app


@celery_app.task(
    name="tasks.ingest_spec",
    bind=True,
    autoretry_for=(Exception,),
    retry_backoff=5,
    retry_kwargs={"max_retries": 3},
)
def ingest_spec(self, payload: dict):
    """
    payload = {
        "project_id": "...",
        "spec_json": {...},
        "previous_spec_json": {...} | None
    }
    """

    spec_json = payload["spec_json"]
    previous_spec = payload.get("previous_spec_json")

    # ------------------------------------
    # 1. Basic OpenAPI Validation
    # ------------------------------------
    if "openapi" not in spec_json and "swagger" not in spec_json:
        raise Exception("Invalid OpenAPI spec")

    # ------------------------------------
    # 2. Normalize Spec
    # ------------------------------------
    normalized_spec = {
        "openapi": spec_json.get("openapi") or spec_json.get("swagger"),
        "info": spec_json.get("info", {}),
        "paths": spec_json.get("paths", {}),
        "components": spec_json.get("components", {}),
        "tags": spec_json.get("tags", []),
    }

    # ------------------------------------
    # 3. Breaking Change Detection
    # ------------------------------------
    breaking_changes = None

    if previous_spec:
        breaking_changes = DeepDiff(
            previous_spec.get("paths", {}),
            normalized_spec.get("paths", {}),
            ignore_order=True
        ).to_dict()

    # ------------------------------------
    # 4. Return Result (Backend will save)
    # ------------------------------------
    return {
        "status": "SUCCESS",
        "normalized_spec": normalized_spec,
        "breaking_changes": breaking_changes,
        "analyzed_at": datetime.utcnow().isoformat(),
    }
