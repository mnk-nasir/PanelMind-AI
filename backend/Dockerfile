FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
COPY requirements-phase2.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir -r requirements-phase2.txt

# Copy source code
COPY . .

# Environment Variables
ENV PORT 8000
ENV HOST 0.0.0.0

EXPOSE 8000

# Use Gunicorn with Uvicorn workers for production scaling
CMD ["gunicorn", "main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
