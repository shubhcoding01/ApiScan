# backend/app/config.py
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()


class Settings(BaseModel):
    APP_NAME: str = "ApiScan"
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://apiscan:apiscan@localhost:5432/apiscan"
    )
    SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60


settings = Settings()
