# # backend/app/routers/auth.py

# from fastapi import APIRouter, Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from sqlalchemy.orm import Session
# from datetime import timedelta

# from app.database import get_db
# from app.security import (
#     verify_password,
#     hash_password,
#     PasswordHasher,
#     create_access_token,
#     decode_access_token
# )

# from app.config import settings

# # NOTE:
# # In v1, we use an in-memory user.
# # Later, replace this with a User model + DB table.

# router = APIRouter(prefix="/auth", tags=["Authentication"])

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# # ---------------------------------------------------------
# # TEMP USER STORE (REPLACE WITH DB LATER)
# # ---------------------------------------------------------

# # FAKE_USER_DB = {
# #     "admin@apiscan.io": {
# #         "id": "00000000-0000-0000-0000-000000000001",
# #         "email": "admin@apiscan.io",
# #         "hashed_password": hash_password("admin123"),
# #     }
# # }

# # FAKE_USER_DB = {
# #     "admin": {
# #         "username": "admin",
# #         "hashed_password": "$2b$12$KIXQ1kK9QxPZPp9ZJxZ9OeHc8l8XGQkY5Z9cP5Z9cP5Z9cP5Z9cP",
# #     }
# # }

# # FAKE_USER_DB = {
# #     "admin": {
# #         "id": "00000000-0000-0000-0000-000000000001",
# #         "username": "admin@apiscan.com",
# #         "hashed_password": "$argon2id$v=19$m=65536,t=3,p=4$ekwciWCZitwx4Peg3TFCUw$IvoL2QB35r24yhYx/DWYcLg7ZE6h6HBqBT+dXnVrw5E",
# #         # "hashed_password": hash_password("admin123"),

# #     }
# # }

# FAKE_USER_DB = {
#     "admin@apiscan.com": {
#         "id": "00000000-0000-0000-0000-000000000001",
#         "hashed_password": "$argon2id$v=19$m=65536,t=3,p=4$ekwciWCZitwx4Peg3TFCUw$IvoL2QB35r24yhYx/DWYcLg7ZE6h6HBqBT+dXnVrw5E",
#     }
# }





# # ---------------------------------------------------------
# # LOGIN
# # ---------------------------------------------------------

# @router.post("/login")
# def login(
#     form_data: OAuth2PasswordRequestForm = Depends(),
#     db: Session = Depends(get_db)
# ):
#     user = FAKE_USER_DB.get(form_data.username)

#     if not user or not verify_password(
#         form_data.password,
#         user["hashed_password"]
#     ):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid email or password",
#         )

#     access_token = create_access_token(
#         data={"sub": user["id"]},
#         expires_delta=timedelta(
#             minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
#         )
#     )

#     return {
#         "access_token": access_token,
#         "token_type": "bearer"
#     }


# # ---------------------------------------------------------
# # CURRENT USER
# # ---------------------------------------------------------

# @router.get("/me")
# def get_current_user(token: str = Depends(oauth2_scheme)):
#     try:
#         payload = decode_access_token(token)
#         return {
#             # "user_id": payload.get("sub"),
#             # "message": "Authenticated"
#               "id": payload.get("sub"),
#               "email": "admin@apiscan.com"
#         }
#     except Exception:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid or expired token"
#         )



from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

from app.database import get_db
from app.models.user import User  # Make sure you have this model
from app.schemas.user import UserCreate, UserResponse # Make sure you have these schemas
from app.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    decode_access_token
)
from app.config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# ---------------------------------------------------------
# 1. SIGNUP (REGISTER) 🚀 NEW!
# ---------------------------------------------------------
@router.post("/signup", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    """
    Creates a new user in the database.
    """
    # 1. Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # 2. Hash the password
    hashed_pwd = get_password_hash(user.password)

    # 3. Create new User instance
    new_user = User(
        email=user.email,
        hashed_password=hashed_pwd,
        full_name=user.full_name,
        is_active=True
    )

    # 4. Save to DB
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# ---------------------------------------------------------
# 2. LOGIN (Now uses Real DB)
# ---------------------------------------------------------
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Authenticates a user and returns a JWT token.
    """
    # 1. Find user by Email (username field in form is usually email)
    user = db.query(User).filter(User.email == form_data.username).first()

    # 2. Verify User and Password
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 3. Create JWT Token
    access_token = create_access_token(
        data={"sub": str(user.id)}, # Store User ID in token
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# ---------------------------------------------------------
# 3. GET CURRENT USER (Protected)
# ---------------------------------------------------------
@router.get("/me", response_model=UserResponse)
def get_current_user(
    token: str = Depends(oauth2_scheme), 
    db: Session = Depends(get_db)
):
    """
    Returns the currently logged-in user based on the JWT token.
    """
    try:
        # 1. Decode token
        payload = decode_access_token(token)
        user_id = payload.get("sub")
        
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")
            
        # 2. Fetch user from DB
        user = db.query(User).filter(User.id == user_id).first()
        
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
            
        return user

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )