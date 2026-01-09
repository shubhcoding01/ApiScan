# from datetime import datetime
# from uuid import UUID
# from typing import Any, Dict, List

# from pydantic import BaseModel, Field


# # -----------------------------
# # Request Schemas
# # -----------------------------

# class TestBlueprintCreate(BaseModel):
#     """
#     Schema used when AI (or user) creates a new test blueprint.
#     """
#     api_version_id: UUID
#     ai_strategy: Dict[str, Any] = Field(
#         ...,
#         example={
#             "plan": [
#                 {
#                     "step": "POST /login",
#                     "payload": {"email": "test@example.com", "password": "Pass@123"},
#                     "expected_status": 200
#                 }
#             ]
#         }
#     )


# class TestBlueprintApproval(BaseModel):
#     """
#     Schema used when a user approves or rejects an AI-generated blueprint.
#     """
#     approved: bool = Field(..., example=True)


# # -----------------------------
# # Response Schemas
# # -----------------------------

# class TestBlueprintResponse(BaseModel):
#     """
#     Schema returned in API responses.
#     """
#     id: UUID
#     api_version_id: UUID
#     status: str
#     ai_strategy: Dict[str, Any]
#     created_at: datetime

#     class Config:
#         from_attributes = True


# class TestBlueprintListResponse(BaseModel):
#     """
#     Schema for listing blueprints.
#     """
#     items: List[TestBlueprintResponse]


# backend/app/schemas/test_blueprint.py

from datetime import datetime
from uuid import UUID
from typing import Any, Dict, List

from pydantic import BaseModel, Field


# -----------------------------
# REQUEST SCHEMAS
# -----------------------------

class TestBlueprintCreate(BaseModel):
    """
    Schema used when AI or user creates a new test blueprint.
    """
    api_version_id: UUID = Field(
        ...,
        description="API version this blueprint belongs to"
    )
    ai_strategy: Dict[str, Any] = Field(
        ...,
        description="AI-generated testing strategy in JSON format",
        example={
            "plan": [
                {
                    "step": "POST /login",
                    "payload": {
                        "email": "test@example.com",
                        "password": "Pass@123"
                    },
                    "expected_status": 200
                }
            ]
        }
    )


class TestBlueprintApproval(BaseModel):
    """
    Schema used to approve or reject a test blueprint.
    """
    approved: bool = Field(
        ...,
        description="Approve or reject the blueprint",
        example=True
    )


# -----------------------------
# RESPONSE SCHEMAS
# -----------------------------

class TestBlueprintResponse(BaseModel):
    """
    Schema returned in API responses.
    """
    id: UUID
    api_version_id: UUID
    status: str = Field(
        ...,
        example="PENDING_APPROVAL"
    )
    ai_strategy_json: Dict[str, Any] = Field(
        ...,
        description="Stored AI strategy JSON"
    )
    created_at: datetime
    approved_at: datetime | None = None
    approved_by: UUID | None = None

    class Config:
        from_attributes = True


class TestBlueprintListResponse(BaseModel):
    """
    Schema for listing multiple blueprints.
    """
    items: List[TestBlueprintResponse]
