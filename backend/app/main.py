
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

