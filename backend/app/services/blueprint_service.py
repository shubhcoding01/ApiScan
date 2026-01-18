# # backend/app/services/blueprint_service.py

# from sqlalchemy.orm import Session
# from datetime import datetime
# from typing import Dict, Any

# from app.models.test_blueprint import TestBlueprint
# from app.models.api_version import ApiVersion


# # ---------------------------------------------------------
# # PUBLIC API
# # ---------------------------------------------------------

# def create_test_blueprint(
#     db: Session,
#     api_version_id,
#     ai_strategy_json: Dict[str, Any],
#     summary: str | None = None
# ) -> TestBlueprint:
#     """
#     Creates a new AI-generated TestBlueprint for a given ApiVersion.

#     NOTE:
#     - This does NOT approve the blueprint
#     - Human approval (or policy approval) is required before execution
#     """

#     api_version = db.query(ApiVersion).filter(
#         ApiVersion.id == api_version_id
#     ).first()

#     if not api_version:
#         raise ValueError("ApiVersion not found")

#     blueprint = TestBlueprint(
#         api_version_id=api_version_id,
#         ai_strategy_json=ai_strategy_json,
#         summary=summary,
#         status="PENDING_APPROVAL"
#     )

#     db.add(blueprint)
#     db.commit()
#     db.refresh(blueprint)

#     return blueprint


# # ---------------------------------------------------------
# # OPTIONAL HELPERS (FUTURE USE)
# # ---------------------------------------------------------

# def auto_approve_blueprint(
#     db: Session,
#     blueprint: TestBlueprint,
#     system_user_id: str = "system"
# ) -> TestBlueprint:
#     """
#     Automatically approves a blueprint.
#     Used only when policy allows (e.g. non-prod, low risk APIs).
#     """

#     blueprint.status = "APPROVED"
#     blueprint.approved_at = datetime.utcnow()
#     blueprint.approved_by = system_user_id

#     db.commit()
#     db.refresh(blueprint)

#     return blueprint


# backend/app/services/blueprint_service.py

# import logging
# from sqlalchemy.orm import Session
# from datetime import datetime
# from uuid import UUID
# from typing import Dict, Any

# from app.models.test_blueprint import TestBlueprint
# from app.models.api_version import ApiVersion
# from app.ai.gemini_client import gemini_client  # <--- Import your AI Client

# logger = logging.getLogger(__name__)

# # ---------------------------------------------------------
# # CORE LOGIC
# # ---------------------------------------------------------

# def generate_and_save_blueprint(
#     db: Session,
#     api_version_id: UUID
# ) -> TestBlueprint:
#     """
#     Orchestrates the entire AI generation process:
#     1. Fetches the OpenAPI Spec from DB
#     2. Calls Google Gemini to generate the strategy
#     3. Saves the strategy as a new PENDING_APPROVAL blueprint
#     """
    
#     # 1. Fetch Spec
#     api_version = db.query(ApiVersion).filter(ApiVersion.id == api_version_id).first()
#     if not api_version:
#         raise ValueError(f"ApiVersion {api_version_id} not found")

#     logger.info(f"🤖 Generating Blueprint for Version: {api_version.version}")

#     # 2. Call AI Engine
#     try:
#         ai_strategy = gemini_client.generate_blueprint(api_version.spec_json)
        
#         # Extract summary if the AI provided it (based on our new prompt structure)
#         summary = ai_strategy.get("summary", "AI-Generated Test Strategy")
        
#     except Exception as e:
#         logger.error(f"❌ AI Generation failed: {e}")
#         raise e  # Propagate error so the router handles the 500 response

#     # 3. Save to Database
#     blueprint = TestBlueprint(
#         api_version_id=api_version_id,
#         ai_strategy_json=ai_strategy,  # Save the full JSON
#         summary=summary,
#         status="PENDING_APPROVAL"
#     )

#     db.add(blueprint)
#     db.commit()
#     db.refresh(blueprint)

#     logger.info(f"✅ Blueprint {blueprint.id} created successfully.")
#     return blueprint

# # ---------------------------------------------------------
# # APPROVAL LOGIC
# # ---------------------------------------------------------

# def approve_blueprint(
#     db: Session,
#     blueprint_id: UUID,
#     user_id: UUID
# ) -> TestBlueprint:
#     """
#     Marks a blueprint as APPROVED, allowing it to be executed.
#     """
#     blueprint = db.query(TestBlueprint).filter(TestBlueprint.id == blueprint_id).first()
    
#     if not blueprint:
#         raise ValueError("Blueprint not found")

#     blueprint.status = "APPROVED"
#     blueprint.approved_at = datetime.utcnow()
#     blueprint.approved_by = user_id

#     db.commit()
#     db.refresh(blueprint)
    
#     return blueprint

# backend/app/services/blueprint_service.py

# import logging
# import json
# from sqlalchemy.orm import Session
# from uuid import UUID
# from typing import Dict, Any

# from app.models.test_blueprint import TestBlueprint
# from app.models.api_version import ApiVersion
# from app.ai.gemini_client import gemini_client

# logger = logging.getLogger(__name__)

# # --- FALLBACK DATA (Used if AI fails) ---
# MOCK_STRATEGY = {
#     "summary": "Fallback Test Strategy (AI Generation Failed)",
#     "test_scenarios": [
#         {
#             "id": "TC-FALLBACK-001",
#             "title": "Verify GET /users (Happy Path)",
#             "description": "Ensure the endpoint returns 200 OK with a valid list.",
#             "severity": "LOW",
#             "category": "HAPPY_PATH",
#             "endpoint": "/users",
#             "method": "GET",
#             "test_cases": []
#         },
#         {
#             "id": "TC-FALLBACK-002",
#             "title": "SQL Injection on ID Parameter",
#             "description": "Attempt to inject SQL payloads to bypass auth.",
#             "severity": "CRITICAL",
#             "category": "SECURITY",
#             "endpoint": "/users/{id}",
#             "method": "GET",
#             "test_cases": []
#         }
#     ]
# }

# # ---------------------------------------------------------
# # CORE LOGIC
# # ---------------------------------------------------------

# def generate_and_save_blueprint(
#     db: Session,
#     api_version_id: UUID
# ) -> TestBlueprint:
#     """
#     Tries to use Google Gemini. If it fails (bad key/file), uses a Mock Plan.
#     """
    
#     # 1. Fetch Spec
#     api_version = db.query(ApiVersion).filter(ApiVersion.id == api_version_id).first()
#     if not api_version:
#         raise ValueError(f"ApiVersion {api_version_id} not found")

#     logger.info(f"🤖 Generating Blueprint for Version: {api_version.version}")

#     # 2. Call AI Engine (WITH SAFETY NET)
#     ai_strategy = {}
#     summary = "Generated Strategy"

#     try:
#         # Try Real AI
#         ai_strategy = gemini_client.generate_blueprint(api_version.spec_json)
#         summary = ai_strategy.get("summary", "AI-Generated Test Strategy")
#         logger.info("✅ Real AI Generation Successful")
        
#     except Exception as e:
#         # If Real AI fails, use Fallback (Safety Net)
#         logger.warning(f"⚠️ AI Failed: {e}")
#         logger.warning("➡️ Switching to FALLBACK Mock Strategy so UI works.")
        
#         ai_strategy = MOCK_STRATEGY
#         summary = "⚠️ Fallback Strategy (AI Unavailable)"

#     # 3. Save to Database
#     blueprint = TestBlueprint(
#         api_version_id=api_version_id,
#         ai_strategy_json=ai_strategy, 
#         summary=summary,
#         status="PENDING_APPROVAL"
#     )

#     db.add(blueprint)
#     db.commit()
#     db.refresh(blueprint)

#     return blueprint

# backend/app/services/blueprint_service.py

import logging
from sqlalchemy.orm import Session
from datetime import datetime
from uuid import UUID
from typing import Dict, Any

from app.models.test_blueprint import TestBlueprint
from app.models.api_version import ApiVersion
from app.ai.gemini_client import gemini_client

logger = logging.getLogger(__name__)

# --- 🛡️ FALLBACK STRATEGY (The Safety Net) ---
# This is used automatically if the Real AI fails (e.g. invalid API Key)
MOCK_STRATEGY = {
    "summary": "Fallback Strategy (AI Unavailable - Using Mock Data)",
    "test_scenarios": [
        {
            "id": "TC-FALLBACK-001",
            "title": "Verify GET /users (Happy Path)",
            "description": "Ensure the endpoint returns 200 OK with a valid list of users.",
            "severity": "LOW",
            "category": "HAPPY_PATH",
            "endpoint": "/users",
            "method": "GET",
            "test_cases": [
                {
                    "name": "Standard Request",
                    "expected_status": 200,
                    "body": None
                }
            ]
        },
        {
            "id": "TC-FALLBACK-002",
            "title": "SQL Injection on ID Parameter",
            "description": "Attempt to inject SQL payloads to bypass authentication.",
            "severity": "CRITICAL",
            "category": "SECURITY",
            "endpoint": "/users/{id}",
            "method": "GET",
            "test_cases": [
                 {
                    "name": "Single Quote Injection",
                    "query_params": {"id": "' OR '1'='1"},
                    "expected_status": 400
                }
            ]
        }
    ]
}

# ---------------------------------------------------------
# CORE LOGIC
# ---------------------------------------------------------

def generate_and_save_blueprint(
    db: Session,
    api_version_id: UUID
) -> TestBlueprint:
    """
    Tries to use Google Gemini. If it fails (bad key/file), uses the Mock Plan.
    """
    
    # 1. Fetch Spec
    api_version = db.query(ApiVersion).filter(ApiVersion.id == api_version_id).first()
    if not api_version:
        raise ValueError(f"ApiVersion {api_version_id} not found")

    logger.info(f"🤖 Generating Blueprint for Version: {api_version.version}")

    # 2. Call AI Engine (WITH TRY/EXCEPT BLOCK)
    ai_strategy = {}
    summary = "Generated Strategy"

    try:
        # [A] Try Real AI
        # This will fail if your API Key is wrong
        ai_strategy = gemini_client.generate_blueprint(api_version.spec_json)
        summary = ai_strategy.get("summary", "AI-Generated Test Strategy")
        logger.info("✅ Real AI Generation Successful")
        
    except Exception as e:
        # [B] Catch the Crash -> Switch to Fallback
        logger.warning(f"⚠️ AI Failed (likely invalid key): {e}")
        logger.warning("➡️ Switching to FALLBACK Mock Strategy so UI works.")
        
        ai_strategy = MOCK_STRATEGY
        summary = "⚠️ Fallback Strategy (AI Unavailable)"

    # 3. Save to Database
    # This part always runs, so you ALWAYS get a blueprint ID back
    blueprint = TestBlueprint(
        api_version_id=api_version_id,
        ai_strategy_json=ai_strategy, 
        summary=summary,
        status="PENDING_APPROVAL"
    )

    db.add(blueprint)
    db.commit()
    db.refresh(blueprint)

    return blueprint