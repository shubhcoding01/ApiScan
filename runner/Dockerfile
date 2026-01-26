# runner/Dockerfile
# --------------------------------------------------
# ApiScan Test Runner Image
# Purpose: Safely execute API tests in isolation
# --------------------------------------------------

# 1️⃣ Base image (lightweight + stable)
FROM python:3.11-slim

# 2️⃣ Environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3️⃣ Set working directory inside container
WORKDIR /app

# 4️⃣ Install system dependencies (minimal)
RUN apt-get update && apt-get install -y \
    curl \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# 5️⃣ Copy requirements first (better caching)
COPY requirements.txt /app/requirements.txt

# 6️⃣ Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 7️⃣ Copy runner source code
COPY entrypoint.py /app/entrypoint.py
COPY templates /app/templates

# 8️⃣ Default command
ENTRYPOINT ["python", "entrypoint.py"]
