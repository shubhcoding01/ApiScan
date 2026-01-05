# backend/app/config.py
#from pydantic import BaseModel
#from dotenv import load_dotenv
#import os

#load_dotenv()


#class Settings(BaseModel):
#    APP_NAME: str = "ApiScan"
#    DATABASE_URL: str = os.getenv(
#        "DATABASE_URL",
        #"postgresql://apiscan:apiscan@localhost:5432#/apiscan"
#    )
#    SECRET_KEY: str = os.getenv("SECRET_KEY", #"change-me")
#    ALGORITHM: str = "HS256"
#    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60


#settings = Settings()

from functools import lru_cache
from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    """
    Central configuration for ApiScan backend.
    Loads values from environment variables or .env file.
    """

    # --------------------------------------------------
    # APP
    # --------------------------------------------------
    APP_NAME: str = "ApiScan"
    ENVIRONMENT: str = Field(default="development")  # development | staging | production
    DEBUG: bool = True

    # --------------------------------------------------
    # DATABASE
    # --------------------------------------------------
    DATABASE_URL: str = Field(
        default="postgresql+psycopg2://postgres:postgres@localhost:5432/apiscan"
    )

    # --------------------------------------------------
    # SECURITY
    # --------------------------------------------------
    SECRET_KEY: str = Field(
        default="CHANGE_ME_SUPER_SECRET_KEY"
    )
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    # --------------------------------------------------
    # AI (Gemini / LLM)
    # --------------------------------------------------
    GEMINI_API_KEY: str | None = None
    LLM_MODEL_NAME: str = "gemini-1.5-pro"

    # --------------------------------------------------
    # CELERY / REDIS
    # --------------------------------------------------
    REDIS_URL: str = Field(default="redis://localhost:6379/0")
    CELERY_BROKER_URL: str = REDIS_URL
    CELERY_RESULT_BACKEND: str = REDIS_URL

    # --------------------------------------------------
    # DOCKER RUNNER
    # --------------------------------------------------
    RUNNER_IMAGE: str = "apiscan-runner:latest"
    RUNNER_TIMEOUT_SECONDS: int = 300

    # --------------------------------------------------
    # WEBHOOKS
    # --------------------------------------------------
    GITHUB_WEBHOOK_HEADER: str = "X-Hub-Signature-256"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


# --------------------------------------------------
# SETTINGS SINGLETON
# --------------------------------------------------
@lru_cache()
def get_settings() -> Settings:
    """
    Cached settings object (fast & safe).
    """
    return Settings()
