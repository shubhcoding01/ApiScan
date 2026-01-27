# """
# Celery Task: Detect Breaking Changes Between API Specs

# This task compares two OpenAPI specs and detects
# breaking vs non-breaking changes using DeepDiff.
# """

# from datetime import datetime
# from celery_app import celery_app
# from deepdiff import DeepDiff
# from sqlalchemy.orm import Session

# from app.database import SessionLocal
# from app.models.api_spec import ApiSpec


# @celery_app.task(
#     name="tasks.detect_breaking_changes",
#     bind=True,
#     autoretry_for=(Exception,),
#     retry_backoff=5,
#     retry_kwargs={"max_retries": 3},
# )
# def detect_breaking_changes(self, old_spec_id: str, new_spec_id: str):
#     """
#     Compare two API specs and detect breaking changes.

#     Args:
#         old_spec_id (str): Previous API version ID
#         new_spec_id (str): New API version ID
#     """

#     db: Session = SessionLocal()

#     try:
#         # --------------------------------------------------
#         # 1. Load API Specs
#         # --------------------------------------------------
#         old_spec = db.query(ApiSpec).filter(ApiSpec.id == old_spec_id).first()
#         new_spec = db.query(ApiSpec).filter(ApiSpec.id == new_spec_id).first()

#         if not old_spec or not new_spec:
#             raise Exception("One or both API specs not found")

#         old_paths = old_spec.spec_json.get("paths", {})
#         new_paths = new_spec.spec_json.get("paths", {})

#         # --------------------------------------------------
#         # 2. DeepDiff Comparison
#         # --------------------------------------------------
#         diff = DeepDiff(
#             old_paths,
#             new_paths,
#             ignore_order=True,
#             report_repetition=True
#         )

#         # --------------------------------------------------
#         # 3. Classify Changes
#         # --------------------------------------------------
#         breaking_changes = []
#         non_breaking_changes = []

#         for change_type, changes in diff.items():
#             for change, detail in changes.items():
#                 entry = {
#                     "type": change_type,
#                     "path": change,
#                     "detail": str(detail),
#                 }

#                 # Heuristic classification
#                 if change_type in [
#                     "dictionary_item_removed",
#                     "type_changes"
#                 ]:
#                     breaking_changes.append(entry)
#                 else:
#                     non_breaking_changes.append(entry)

#         # --------------------------------------------------
#         # 4. Build Final Report
#         # --------------------------------------------------
#         report = {
#             "old_spec_id": str(old_spec.id),
#             "new_spec_id": str(new_spec.id),
#             "detected_at": datetime.utcnow().isoformat(),
#             "summary": {
#                 "breaking": len(breaking_changes),
#                 "non_breaking": len(non_breaking_changes),
#             },
#             "breaking_changes": breaking_changes,
#             "non_breaking_changes": non_breaking_changes,
#         }

#         return report

#     finally:
#         db.close()


"""
Celery Task: Detect Breaking Changes (Worker)

Responsibilities:
- Compare two OpenAPI specs (JSON only)
- Identify breaking vs non-breaking changes
- RETURN report to backend (NO DB access)
"""

from datetime import datetime
from deepdiff import DeepDiff

from worker.app.celery_app import celery_app


@celery_app.task(
    name="tasks.detect_breaking_changes",
    bind=True,
    autoretry_for=(Exception,),
    retry_backoff=5,
    retry_kwargs={"max_retries": 3},
)
def detect_breaking_changes(self, payload: dict):
    """
    payload = {
        "old_spec_json": {...},
        "new_spec_json": {...}
    }
    """

    old_spec = payload["old_spec_json"]
    new_spec = payload["new_spec_json"]

    old_paths = old_spec.get("paths", {})
    new_paths = new_spec.get("paths", {})

    # ------------------------------------
    # 1. Run DeepDiff
    # ------------------------------------
    diff = DeepDiff(
        old_paths,
        new_paths,
        ignore_order=True,
        report_repetition=True
    )

    breaking_changes = []
    non_breaking_changes = []

    # ------------------------------------
    # 2. Classify Changes
    # ------------------------------------
    for change_type, changes in diff.items():
        for path, detail in changes.items():
            entry = {
                "change_type": change_type,
                "path": path,
                "detail": str(detail),
            }

            # Heuristic classification
            if change_type in (
                "dictionary_item_removed",
                "type_changes",
                "iterable_item_removed",
            ):
                breaking_changes.append(entry)
            else:
                non_breaking_changes.append(entry)

    # ------------------------------------
    # 3. Build Report
    # ------------------------------------
    return {
        "detected_at": datetime.utcnow().isoformat(),
        "summary": {
            "breaking": len(breaking_changes),
            "non_breaking": len(non_breaking_changes),
        },
        "breaking_changes": breaking_changes,
        "non_breaking_changes": non_breaking_changes,
    }
