from datetime import datetime
from uuid import UUID
from typing import Any, Dict, List

from pydantic import BaseModel, Field


# -----------------------------
# Request Schemas
# -----------------------------

class SpecUploadRequest(BaseModel):
    """
    Schema used when uploading a new OpenAPI/Swagger spec.
    """
    project_id: UUID
    version: str | None = Field(
        default=None,
        example="v1.0.1"
    )
    spec_json: Dict[str, Any]


# -----------------------------
# Response Schemas
# -----------------------------

class BreakingChangeResponse(BaseModel):
    """
    Represents a single breaking or non-breaking change.
    """
    change_type: str
    field_path: str
    description: str


class ApiVersionResponse(BaseModel):
    """
    Returned after uploading a spec.
    """
    id: UUID
    project_id: UUID
    version: str | None
    created_at: datetime

    class Config:
        from_attributes = True


class SpecUploadResponse(BaseModel):
    """
    Final response after spec upload.
    """
    api_version: ApiVersionResponse
    breaking_changes: List[BreakingChangeResponse]
