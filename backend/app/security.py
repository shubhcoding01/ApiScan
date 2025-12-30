# backend/app/security.py

from datetime import datetime, timedelta
from typing import Optional

from jose import jwt, JWTError
from passlib.context import CryptContext
from cryptography.fernet import Fernet
import base64
import os

from app.config import settings

# -------------------------------------------------------------------
# PASSWORD HASHING
# -------------------------------------------------------------------

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# -------------------------------------------------------------------
# JWT TOKEN HANDLING
# -------------------------------------------------------------------

def create_access_token(
    data: dict,
    expires_delta: Optional[timedelta] = None
) -> str:
    to_encode = data.copy()

    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )

    return encoded_jwt


def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        return payload
    except JWTError:
        raise ValueError("Invalid or expired token")


# -------------------------------------------------------------------
# SECRET VAULT (ENCRYPTION / DECRYPTION)
# -------------------------------------------------------------------

def _get_fernet() -> Fernet:
    """
    Generates a Fernet instance from SECRET_KEY.
    Ensures deterministic encryption across services.
    """

    # SECRET_KEY must be 32 url-safe base64-encoded bytes
    key = settings.SECRET_KEY.encode()

    # Ensure correct length for Fernet
    padded_key = base64.urlsafe_b64encode(key.ljust(32, b"0")[:32])

    return Fernet(padded_key)


def encrypt_secret(value: str) -> str:
    """
    Encrypts secrets before storing in DB.
    """
    fernet = _get_fernet()
    encrypted = fernet.encrypt(value.encode())
    return encrypted.decode()


def decrypt_secret(encrypted_value: str) -> str:
    """
    Decrypts secrets only at runtime (never stored in plaintext).
    """
    fernet = _get_fernet()
    decrypted = fernet.decrypt(encrypted_value.encode())
    return decrypted.decode()


# -------------------------------------------------------------------
# AUTH DEPENDENCY (FOR ROUTERS)
# -------------------------------------------------------------------

def get_current_user(token: str) -> dict:
    """
    Extracts and validates user from JWT token.
    Used by protected routes.
    """
    payload = decode_access_token(token)

    user_id: Optional[str] = payload.get("sub")
    if user_id is None:
        raise ValueError("Invalid token payload")

    return payload
