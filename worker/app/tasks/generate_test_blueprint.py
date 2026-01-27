# """
# Celery Task: Generate Test Blueprint (MVP Version)

# This task generates a test blueprint from a parsed OpenAPI spec.
# NO AI / NO API KEY required.

# Later this file can be replaced with Gemini / LLM logic.
# """

# from datetime import datetime
# from celery_app import celery_app
# from sqlalchemy.orm import Session

# from app.database import SessionLocal
# from app.models.test_blueprint import TestBlueprint
# from app.models.api_spec import ApiSpec


# @celery_app.task(
#     name="tasks.generate_test_blueprint",
#     bind=True,
#     autoretry_for=(Exception,),
#     retry_backoff=5,
#     retry_kwargs={"max_retries": 3},
# )
# def generate_test_blueprint(self, api_version_id: str):
#     """
#     Generates a basic but effective test blueprint from OpenAPI spec.

#     Args:
#         api_version_id (str): ID of ApiSpec / ApiVersion
#     """

#     db: Session = SessionLocal()

#     try:
#         # --------------------------------------------------
#         # 1. Load API Spec
#         # --------------------------------------------------
#         spec = (
#             db.query(ApiSpec)
#             .filter(ApiSpec.id == api_version_id)
#             .first()
#         )

#         if not spec:
#             raise Exception("API spec not found")

#         openapi = spec.spec_json
#         paths = openapi.get("paths", {})

#         test_cases = []
#         index = 1

#         # --------------------------------------------------
#         # 2. Convert Endpoints → Test Cases
#         # --------------------------------------------------
#         for path, methods in paths.items():
#             for method, meta in methods.items():
#                 test_cases.append({
#                     "id": f"TC-{index:03}",
#                     "name": meta.get("summary") or f"{method.upper()} {path}",
#                     "method": method.upper(),
#                     "url": f"{spec.base_url}{path}",
#                     "headers": {
#                         "Content-Type": "application/json"
#                     },
#                     "body": _example_body(meta),
#                     "expected_status": [200, 201, 204],
#                 })
#                 index += 1

#         # --------------------------------------------------
#         # 3. Create Blueprint
#         # --------------------------------------------------
#         blueprint = TestBlueprint(
#             api_version_id=api_version_id,
#             status="PENDING_APPROVAL",
#             summary=f"Auto-generated test plan with {len(test_cases)} cases.",
#             ai_strategy_json={
#                 "source": "rule-based",
#                 "generated_at": datetime.utcnow().isoformat(),
#                 "test_cases": test_cases,
#             },
#             created_at=datetime.utcnow(),
#         )

#         db.add(blueprint)
#         db.commit()
#         db.refresh(blueprint)

#         return {
#             "blueprint_id": str(blueprint.id),
#             "test_cases": len(test_cases),
#             "status": blueprint.status,
#         }

#     finally:
#         db.close()


# # --------------------------------------------------
# # Helper: Generate example request body
# # --------------------------------------------------

# def _example_body(meta: dict):
#     """
#     Creates dummy request body from schema (if available)
#     """
#     try:
#         request_body = meta.get("requestBody", {})
#         content = request_body.get("content", {})
#         app_json = content.get("application/json", {})
#         schema = app_json.get("schema", {})

#         if schema.get("type") == "object":
#             return {
#                 key: "example"
#                 for key in schema.get("properties", {}).keys()
#             }
#     except Exception:
#         pass

#     return None


"""
Celery Task: Generate Test Blueprint (MVP Version)

Rule-based blueprint generation.
NO AI / NO API KEY required.
Worker does NOT touch database.
"""

from datetime import datetime
from worker.app.celery_app import celery_app


@celery_app.task(
    name="tasks.generate_test_blueprint",
    bind=True,
    autoretry_for=(Exception,),
    retry_backoff=5,
    retry_kwargs={"max_retries": 3},
)
def generate_test_blueprint(self, payload: dict):
    """
    payload = {
        "api_version_id": "uuid",
        "base_url": "https://api.example.com",
        "spec_json": {...OpenAPI...}
    }
    """

    openapi = payload["spec_json"]
    base_url = payload["base_url"]

    paths = openapi.get("paths", {})
    test_cases = []
    index = 1

    # ------------------------------------
    # Convert OpenAPI → Test Cases
    # ------------------------------------
    for path, methods in paths.items():
        for method, meta in methods.items():
            test_cases.append({
                "id": f"TC-{index:03}",
                "name": meta.get("summary") or f"{method.upper()} {path}",
                "method": method.upper(),
                "endpoint": path,
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": _example_body(meta),
                "expected_status": [200, 201, 204],
            })
            index += 1

    blueprint = {
        "source": "rule-based",
        "generated_at": datetime.utcnow().isoformat(),
        "test_cases": test_cases,
        "summary": f"Auto-generated test plan with {len(test_cases)} cases.",
    }

    return blueprint


# ------------------------------------
# Helper: Dummy request body generator
# ------------------------------------

def _example_body(meta: dict):
    try:
        request_body = meta.get("requestBody", {})
        content = request_body.get("content", {})
        app_json = content.get("application/json", {})
        schema = app_json.get("schema", {})

        if schema.get("type") == "object":
            return {
                key: "example"
                for key in schema.get("properties", {}).keys()
            }
    except Exception:
        pass

    return None
