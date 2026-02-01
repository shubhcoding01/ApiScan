# # backend/app/schemas/test_run.py

# from datetime import datetime
# from uuid import UUID
# from typing import Any, Dict, List

# from pydantic import BaseModel, Field


# # -----------------------------
# # REQUEST SCHEMAS
# # -----------------------------

# class TestRunCreate(BaseModel):
#     """
#     Schema used to trigger a new test run.
#     """
#     test_blueprint_id: UUID = Field(..., description="Approved blueprint ID")
#     environment: str = Field(..., example="STAGING")


# # -----------------------------
# # RESPONSE SCHEMAS
# # -----------------------------

# class TestRunResponse(BaseModel):
#     id: UUID
#     blueprint_id: UUID
#     status: str = Field(..., example="RUNNING")
#     reliability_score: int | None = None
#     created_at: datetime
#     started_at: datetime | None = None
#     finished_at: datetime | None = None

#     class Config:
#         from_attributes = True


# class TestRunListResponse(BaseModel):
#     items: List[TestRunResponse]

from datetime import datetime
from uuid import UUID
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


# -----------------------------
# REQUEST SCHEMAS
# -----------------------------

class TestRunCreate(BaseModel):
    test_blueprint_id: UUID = Field(..., description="Approved blueprint ID")
    environment: str = Field(..., example="STAGING")


# -----------------------------
# ✅ FIXED SCHEMA
# -----------------------------

class TestResultSchema(BaseModel):
    """
    Represents a single test case log.
    """
    id: UUID                    # 👈 FIX: Changed from 'int' to 'UUID'
    test_case_id: Optional[str] = None
    name: str
    method: str
    endpoint: str
    status_code: int
    result: str
    response_body: Optional[str] = None
    error_message: Optional[str] = None

    class Config:
        from_attributes = True


# -----------------------------
# RESPONSE SCHEMAS
# -----------------------------

class TestRunResponse(BaseModel):
    id: UUID
    blueprint_id: UUID
    status: str = Field(..., example="RUNNING")
    
    reliability_score: int | None = None
    passed_tests: int | None = 0
    failed_tests: int | None = 0
    total_tests: int | None = 0

    created_at: datetime
    started_at: datetime | None = None
    finished_at: datetime | None = None 

    results: List[TestResultSchema] = []

    class Config:
        from_attributes = True


class TestRunListResponse(BaseModel):
    items: List[TestRunResponse]