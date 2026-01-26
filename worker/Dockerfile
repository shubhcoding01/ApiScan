# -------------------------------
# ApiScan Worker Dockerfile
# -------------------------------
# Purpose:
# Runs Celery workers for AI reasoning,
# blueprint generation, and test execution orchestration
# -------------------------------

FROM python:3.11-slim

# Prevent Python from writing pyc files
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /worker

# -------------------------------
# System Dependencies
# -------------------------------
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    docker.io \
    && rm -rf /var/lib/apt/lists/*

# -------------------------------
# Python Dependencies
# -------------------------------
COPY worker/requirements.txt .

RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# -------------------------------
# Copy Worker Source Code
# -------------------------------
COPY worker/app ./app
COPY worker/celery_app.py .

# -------------------------------
# Environment Variables
# -------------------------------
ENV PYTHONPATH="/worker"

# -------------------------------
# Default Command
# -------------------------------
# Queue separation allows scaling later
CMD ["celery", "-A", "celery_app", "worker", "--loglevel=info", "-Q", "ai_generation,test_execution"]
