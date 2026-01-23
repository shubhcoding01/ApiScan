# worker/celery_app.py
"""
Celery Application Configuration for ApiScan Worker

This file configures the Celery task queue system that handles
asynchronous test execution.
"""

import os
from celery import Celery
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Redis connection URL
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# Database URL (same as backend)
DATABASE_URL = os.getenv("DATABASE_URL")

# Create Celery app
celery_app = Celery(
    "apiscan_worker",
    broker=REDIS_URL,           # Message broker (queue)
    backend=REDIS_URL,          # Result backend (store results)
    include=["tasks"]           # Import tasks module
)

# Celery Configuration
celery_app.conf.update(
    # Task settings
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    
    # Task execution settings
    task_track_started=True,
    task_time_limit=300,        # 5 minutes max per task
    task_soft_time_limit=240,   # 4 minutes soft limit
    
    # Result settings
    result_expires=3600,        # Results expire after 1 hour
    result_persistent=True,
    
    # Worker settings
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=50,
    
    # Retry settings
    task_acks_late=True,
    task_reject_on_worker_lost=True,
)

# Task routes (optional - for multiple queues)
celery_app.conf.task_routes = {
    "tasks.execute_test_run": {"queue": "test_execution"},
    "tasks.generate_blueprint": {"queue": "ai_generation"},
}

if __name__ == "__main__":
    celery_app.start()