# --------------------------------------------------
# Base image
# --------------------------------------------------
FROM python:3.11-slim

# --------------------------------------------------
# Environment variables
# --------------------------------------------------
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# --------------------------------------------------
# Set work directory
# --------------------------------------------------
WORKDIR /app

# --------------------------------------------------
# System dependencies (minimal)
# --------------------------------------------------
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# --------------------------------------------------
# Install Python dependencies
# --------------------------------------------------
COPY backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# --------------------------------------------------
# Copy application code
# --------------------------------------------------
COPY backend/app /app/app

# --------------------------------------------------
# Expose port
# --------------------------------------------------
EXPOSE 8000

# --------------------------------------------------
# Run FastAPI app
# --------------------------------------------------
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
