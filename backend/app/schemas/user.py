from pydantic import BaseModel, EmailStr
from uuid import UUID
from typing import Optional
from datetime import datetime

# ---------------------------------------------------------
# 1. SHARED PROPERTIES
# ---------------------------------------------------------
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: Optional[bool] = True

# ---------------------------------------------------------
# 2. CREATION (SIGNUP)
# ---------------------------------------------------------
class UserCreate(UserBase):
    password: str

# ---------------------------------------------------------
# 3. RESPONSE (PUBLIC DATA)
# ---------------------------------------------------------
class UserResponse(UserBase):
    id: UUID
    created_at: datetime
    
    # ⚠️ CRITICAL: Never include 'password' here!

    class Config:
        from_attributes = True