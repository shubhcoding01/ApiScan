# backend/app/routers/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

from app.database import get_db
from app.security import (
    verify_password,
    hash_password,
    PasswordHasher,
    create_access_token,
    decode_access_token
)

from app.config import settings

# NOTE:
# In v1, we use an in-memory user.
# Later, replace this with a User model + DB table.

router = APIRouter(prefix="/auth", tags=["Authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# ---------------------------------------------------------
# TEMP USER STORE (REPLACE WITH DB LATER)
# ---------------------------------------------------------

# FAKE_USER_DB = {
#     "admin@apiscan.io": {
#         "id": "00000000-0000-0000-0000-000000000001",
#         "email": "admin@apiscan.io",
#         "hashed_password": hash_password("admin123"),
#     }
# }

# FAKE_USER_DB = {
#     "admin": {
#         "username": "admin",
#         "hashed_password": "$2b$12$KIXQ1kK9QxPZPp9ZJxZ9OeHc8l8XGQkY5Z9cP5Z9cP5Z9cP5Z9cP",
#     }
# }

# FAKE_USER_DB = {
#     "admin": {
#         "id": "00000000-0000-0000-0000-000000000001",
#         "username": "admin@apiscan.com",
#         "hashed_password": "$argon2id$v=19$m=65536,t=3,p=4$ekwciWCZitwx4Peg3TFCUw$IvoL2QB35r24yhYx/DWYcLg7ZE6h6HBqBT+dXnVrw5E",
#         # "hashed_password": hash_password("admin123"),

#     }
# }

FAKE_USER_DB = {
    "admin@apiscan.com": {
        "id": "00000000-0000-0000-0000-000000000001",
        "hashed_password": "$argon2id$v=19$m=65536,t=3,p=4$ekwciWCZitwx4Peg3TFCUw$IvoL2QB35r24yhYx/DWYcLg7ZE6h6HBqBT+dXnVrw5E",
    }
}





# ---------------------------------------------------------
# LOGIN
# ---------------------------------------------------------

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = FAKE_USER_DB.get(form_data.username)

    if not user or not verify_password(
        form_data.password,
        user["hashed_password"]
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        data={"sub": user["id"]},
        expires_delta=timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# ---------------------------------------------------------
# CURRENT USER
# ---------------------------------------------------------

@router.get("/me")
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = decode_access_token(token)
        return {
            "user_id": payload.get("sub"),
            "message": "Authenticated"
        }
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
