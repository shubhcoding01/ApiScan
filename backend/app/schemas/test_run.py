# from datetime import datetime
# from uuid import UUID
# from typing import Any, Dict, List

# from pydantic import BaseModel, Field


# # -----------------------------
# # Request Schemas
# # -----------------------------

# class TestRunCreate(BaseModel):
#     """
#     Schema used to trigger a new test run.
#     Usually called from CI/CD or dashboard.
#     """
#     test_blueprint_id: UUID
#     environment: str = Field(..., example="STAGING")


# # -----------------------------
# # Response Schemas
# # -----------------------------

# class TestRunResponse(BaseModel):
#     """
#     Schema returned when fetching test run details.
#     """
#     id: UUID
#     test_blueprint_id: UUID
#     status: str = Field(..., example="PASSED")
#     reliability_score: int | None = Field(
#         default=None,
#         ge=0,
#         le=100,
#         example=92
#     )
#     context: Dict[str, Any] | None = Field(
#         default=None,
#         example={"user_id": 55}
#     )
#     created_at: datetime

#     class Config:
#         from_attributes = True


# class TestRunListResponse(BaseModel):
#     """
#     Schema for listing multiple test runs.
#     """
#     items: List[TestRunResponse]


# backend/app/schemas/test_run.py

from datetime import datetime
from uuid import UUID
from typing import Any, Dict, List

from pydantic import BaseModel, Field


# -----------------------------
# REQUEST SCHEMAS
# -----------------------------

class TestRunCreate(BaseModel):
    """
    Schema used to trigger a new test run.
    """
    test_blueprint_id: UUID = Field(..., description="Approved blueprint ID")
    environment: str = Field(..., example="STAGING")


# -----------------------------
# RESPONSE SCHEMAS
# -----------------------------

class TestRunResponse(BaseModel):
    id: UUID
    blueprint_id: UUID
    status: str = Field(..., example="RUNNING")
    reliability_score: int | None = None
    created_at: datetime
    started_at: datetime | None = None
    finished_at: datetime | None = None

    class Config:
        from_attributes = True


class TestRunListResponse(BaseModel):
    items: List[TestRunResponse]
