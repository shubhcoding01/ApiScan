from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, HttpUrl, Field


# -----------------------------
# Request Schemas
# -----------------------------

class ProjectCreate(BaseModel):
    """
    Schema used when creating a new Project.
    """
    name: str = Field(..., example="My Backend Service")
    base_url: HttpUrl = Field(..., example="https://api.example.com")


class ProjectUpdate(BaseModel):
    """
    Schema used when updating an existing Project.
    """
    name: str | None = Field(None, example="Updated Project Name")
    base_url: HttpUrl | None = Field(None, example="https://staging.api.example.com")


# -----------------------------
# Response Schemas
# -----------------------------

class ProjectResponse(BaseModel):
    """
    Schema returned in API responses.
    """
    id: UUID
    name: str
    base_url: HttpUrl
    created_at: datetime

    class Config:
        from_attributes = True
