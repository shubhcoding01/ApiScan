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

import logging
from sqlalchemy.orm import Session
from datetime import datetime
from uuid import UUID
from typing import Dict, Any

from app.models.test_blueprint import TestBlueprint
from app.models.api_version import ApiVersion
from app.ai.gemini_client import gemini_client  # <--- Import your AI Client

logger = logging.getLogger(__name__)

# ---------------------------------------------------------
# CORE LOGIC
# ---------------------------------------------------------

def generate_and_save_blueprint(
    db: Session,
    api_version_id: UUID
) -> TestBlueprint:
    """
    Orchestrates the entire AI generation process:
    1. Fetches the OpenAPI Spec from DB
    2. Calls Google Gemini to generate the strategy
    3. Saves the strategy as a new PENDING_APPROVAL blueprint
    """
    
    # 1. Fetch Spec
    api_version = db.query(ApiVersion).filter(ApiVersion.id == api_version_id).first()
    if not api_version:
        raise ValueError(f"ApiVersion {api_version_id} not found")

    logger.info(f"🤖 Generating Blueprint for Version: {api_version.version}")

    # 2. Call AI Engine
    try:
        ai_strategy = gemini_client.generate_blueprint(api_version.spec_json)
        
        # Extract summary if the AI provided it (based on our new prompt structure)
        summary = ai_strategy.get("summary", "AI-Generated Test Strategy")
        
    except Exception as e:
        logger.error(f"❌ AI Generation failed: {e}")
        raise e  # Propagate error so the router handles the 500 response

    # 3. Save to Database
    blueprint = TestBlueprint(
        api_version_id=api_version_id,
        ai_strategy_json=ai_strategy,  # Save the full JSON
        summary=summary,
        status="PENDING_APPROVAL"
    )

    db.add(blueprint)
    db.commit()
    db.refresh(blueprint)

    logger.info(f"✅ Blueprint {blueprint.id} created successfully.")
    return blueprint

# ---------------------------------------------------------
# APPROVAL LOGIC
# ---------------------------------------------------------

def approve_blueprint(
    db: Session,
    blueprint_id: UUID,
    user_id: UUID
) -> TestBlueprint:
    """
    Marks a blueprint as APPROVED, allowing it to be executed.
    """
    blueprint = db.query(TestBlueprint).filter(TestBlueprint.id == blueprint_id).first()
    
    if not blueprint:
        raise ValueError("Blueprint not found")

    blueprint.status = "APPROVED"
    blueprint.approved_at = datetime.utcnow()
    blueprint.approved_by = user_id

    db.commit()
    db.refresh(blueprint)
    
    return blueprint