"""
Celery Application Configuration for ApiScan Worker

Responsibilities:
- Background execution of test runs
- AI blueprint generation
- Async, scalable processing

IMPORTANT:
- Worker does NOT access database
- Worker communicates with backend via HTTP only
"""

import os
from celery import Celery
from dotenv import load_dotenv

# ----------------------------------------------------
# ENV
# ----------------------------------------------------
load_dotenv()

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# ----------------------------------------------------
# CELERY APP
# ----------------------------------------------------
celery_app = Celery(
    "apiscan_worker",
    broker=REDIS_URL,
    backend=REDIS_URL,
    include=[
        "worker.app.tasks.execute_test_run",
        "worker.app.tasks.generate_test_blueprint",
        "worker.app.tasks.ingest_spec",
        "worker.app.tasks.detect_breaking_changes",
    ],
)

# ----------------------------------------------------
# CELERY CONFIG
# ----------------------------------------------------
celery_app.conf.update(
    # Serialization
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",

    # Timezone
    timezone="UTC",
    enable_utc=True,

    # Execution control
    task_track_started=True,
    task_time_limit=300,       # hard limit (5 min)
    task_soft_time_limit=240,  # soft limit (4 min)

    # Reliability
    task_acks_late=True,
    task_reject_on_worker_lost=True,

    # Worker tuning
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=50,

    # Results
    result_expires=3600,       # 1 hour
)

# ----------------------------------------------------
# QUEUE ROUTING
# ----------------------------------------------------
celery_app.conf.task_routes = {
    "tasks.execute_test_run": {"queue": "test_execution"},
    "tasks.generate_test_blueprint": {"queue": "ai_generation"},
    "tasks.ingest_spec": {"queue": "spec_ingestion"},
    "tasks.detect_breaking_changes": {"queue": "diff_analysis"},
}
