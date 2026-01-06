
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import (
    auth,
    projects,
    specs,
    secrets,
    test_blueprints,
    test_runs,
    webhooks,
)

# ---------------------------------------------------------
# DATABASE INIT
# ---------------------------------------------------------
# NOTE: In production, use Alembic migrations instead
Base.metadata.create_all(bind=engine)

# ---------------------------------------------------------
# FASTAPI APP INIT
# ---------------------------------------------------------
app = FastAPI(
    title="ApiScan",
    description="AI-powered API Testing & Failure Reasoning Platform",
    version="1.0.0",
)

# ---------------------------------------------------------
# CORS CONFIG
# ---------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# ROUTERS
# ---------------------------------------------------------
app.include_router(auth.router, prefix="/api")
app.include_router(projects.router, prefix="/api")
app.include_router(specs.router, prefix="/api")
app.include_router(secrets.router, prefix="/api")
app.include_router(test_blueprints.router, prefix="/api")
app.include_router(test_runs.router, prefix="/api")
app.include_router(webhooks.router, prefix="/api")

# ---------------------------------------------------------
# HEALTH CHECK
# ---------------------------------------------------------
@app.get("/")
def health_check():
    return {
        "status": "OK",
        "service": "ApiScan Backend",
        "message": "ApiScan backend is running successfully"
    }


# -------------------------------------------------------------------

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.core.config import settings
# from app.db.session import engine
# from app.db.base import Base
# from app.routers import projects  # Import the new router we made

# # 1. Create Database Tables (Auto-generate if missing)
# # In production, we usually use Alembic migrations, but this is great for Dev.
# Base.metadata.create_all(bind=engine)

# # 2. Initialize the App
# app = FastAPI(
#     title="ApiScan Backend",
#     description="The Brain of the ApiScan Platform",
#     version="1.0.0"
# )

# # 3. Configure CORS (Critical for Next.js)
# # This allows requests from your Frontend (localhost:3000)
# origins = [
#     "http://localhost:3000",  # Your Frontend
#     "http://localhost:8000",  # Swagger UI
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],  # Allow GET, POST, PUT, DELETE, etc.
#     allow_headers=["*"],
# )

# # 4. Register Routers (The "Features")
# # Prefix means all project APIs will look like: /api/v1/projects
# app.include_router(projects.router, prefix="/api/v1/projects", tags=["Projects"])

# # 5. Health Check (To verify server is running)
# @app.get("/")
# def health_check():
#     return {
#         "system": "ApiScan Backend",
#         "status": "online",
#         "version": "v1.0"
#     }