# backend/app/services/blueprint_service.py

from sqlalchemy.orm import Session
from datetime import datetime
from typing import Dict, Any

from app.models.test_blueprint import TestBlueprint
from app.models.api_version import ApiVersion


# ---------------------------------------------------------
# PUBLIC API
# ---------------------------------------------------------

def create_test_blueprint(
    db: Session,
    api_version_id,
    ai_strategy_json: Dict[str, Any],
    summary: str | None = None
) -> TestBlueprint:
    """
    Creates a new AI-generated TestBlueprint for a given ApiVersion.

    NOTE:
    - This does NOT approve the blueprint
    - Human approval (or policy approval) is required before execution
    """

    api_version = db.query(ApiVersion).filter(
        ApiVersion.id == api_version_id
    ).first()

    if not api_version:
        raise ValueError("ApiVersion not found")

    blueprint = TestBlueprint(
        api_version_id=api_version_id,
        ai_strategy_json=ai_strategy_json,
        summary=summary,
        status="PENDING_APPROVAL"
    )

    db.add(blueprint)
    db.commit()
    db.refresh(blueprint)

    return blueprint


# ---------------------------------------------------------
# OPTIONAL HELPERS (FUTURE USE)
# ---------------------------------------------------------

def auto_approve_blueprint(
    db: Session,
    blueprint: TestBlueprint,
    system_user_id: str = "system"
) -> TestBlueprint:
    """
    Automatically approves a blueprint.
    Used only when policy allows (e.g. non-prod, low risk APIs).
    """

    blueprint.status = "APPROVED"
    blueprint.approved_at = datetime.utcnow()
    blueprint.approved_by = system_user_id

    db.commit()
    db.refresh(blueprint)

    return blueprint
