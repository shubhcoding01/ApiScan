from datetime import datetime
from uuid import UUID
from typing import Any, Dict, List

from pydantic import BaseModel, Field


# -----------------------------
# Request Schemas
# -----------------------------

class TestBlueprintCreate(BaseModel):
    """
    Schema used when AI (or user) creates a new test blueprint.
    """
    api_version_id: UUID
    ai_strategy: Dict[str, Any] = Field(
        ...,
        example={
            "plan": [
                {
                    "step": "POST /login",
                    "payload": {"email": "test@example.com", "password": "Pass@123"},
                    "expected_status": 200
                }
            ]
        }
    )


class TestBlueprintApproval(BaseModel):
    """
    Schema used when a user approves or rejects an AI-generated blueprint.
    """
    approved: bool = Field(..., example=True)


# -----------------------------
# Response Schemas
# -----------------------------

class TestBlueprintResponse(BaseModel):
    """
    Schema returned in API responses.
    """
    id: UUID
    api_version_id: UUID
    status: str
    ai_strategy: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True


class TestBlueprintListResponse(BaseModel):
    """
    Schema for listing blueprints.
    """
    items: List[TestBlueprintResponse]
