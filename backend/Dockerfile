# ---- Base Image ----
FROM mcr.microsoft.com/playwright/python:v1.55.0

# Set work directory
WORKDIR /app

# Copy dependency file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Ensure Playwright browsers are installed
RUN playwright install --with-deps chromium

# Copy the entire project
COPY . .

# Expose the port (Render uses $PORT)
EXPOSE 1000

# Start FastAPI using Uvicorn
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-1000}"]
