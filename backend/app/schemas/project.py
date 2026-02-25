# from datetime import datetime
# from typing import Optional
# from uuid import UUID

# from pydantic import BaseModel, HttpUrl, Field


# # class ProjectCreate(BaseModel):
# #     """
# #     Schema used when creating a new Project.
# #     """
# #     name: str = Field(..., example="My Backend Service")
# #     base_url: HttpUrl = Field(..., example="https://api.example.com")

# class ProjectCreate(BaseModel):
#     """
#     Schema used when creating a new Project.
#     """
#     name: str = Field(..., example="My Backend Service")
#     base_url: HttpUrl = Field(..., example="https://api.example.com")
#     github_repo_url: Optional[HttpUrl] = Field(
#         None,
#         example="https://github.com/user/repo"
#     )
#     description: Optional[str] = Field(
#         None,
#         example="API service for payments"
#     )


# class ProjectUpdate(BaseModel):
#     """
#     Schema used when updating an existing Project.
#     """
#     name: str | None = Field(None, example="Updated Project Name")
#     base_url: HttpUrl | None = Field(None, example="https://staging.api.example.com")


# # class ProjectResponse(BaseModel):
# #     """
# #     Schema returned in API responses.
# #     """
# #     id: UUID
# #     name: str
# #     base_url: HttpUrl
# #     created_at: datetime

# #     class Config:
# #         from_attributes = True

# class ProjectResponse(BaseModel):
#     """
#     Schema returned in API responses.
#     """
#     id: UUID
#     name: str
#     base_url: HttpUrl
#     github_repo_url: Optional[HttpUrl]
#     description: Optional[str]
#     created_at: datetime

#     class Config:
#         from_attributes = True


from datetime import datetime
from uuid import UUID
from typing import Optional

from pydantic import BaseModel, Field

# -----------------------------
# SHARED PROPERTIES
# -----------------------------
class ProjectBase(BaseModel):
    """
    Shared properties. 
    Using 'str' instead of 'HttpUrl' prevents strict 422 validation crashes.
    """
    name: str = Field(..., example="My Backend Service")
    base_url: str = Field(..., example="https://api.example.com")
    github_repo_url: Optional[str] = Field(None, example="https://github.com/user/repo")
    description: Optional[str] = Field(None, example="API service for payments")

# -----------------------------
# REQUEST SCHEMAS
# -----------------------------
class ProjectCreate(ProjectBase):
    """
    Schema used when creating a new Project.
    """
    pass

class ProjectUpdate(BaseModel):
    """
    Schema used when updating an existing Project.
    """
    name: Optional[str] = Field(None, example="Updated Project Name")
    base_url: Optional[str] = Field(None, example="https://staging.api.example.com")
    github_repo_url: Optional[str] = None
    description: Optional[str] = None
    ci_enabled: Optional[bool] = None

# -----------------------------
# RESPONSE SCHEMAS
# -----------------------------
class ProjectResponse(ProjectBase):
    """
    Schema returned in API responses.
    """
    id: UUID
    user_id: UUID
    ci_enabled: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True