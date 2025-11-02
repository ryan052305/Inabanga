# ✅ Use official Playwright base image (Chromium already included)
FROM mcr.microsoft.com/playwright/python:v1.47.0-jammy

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Set working directory
WORKDIR /app

# Install system dependencies for Playwright
RUN apt-get update && apt-get install -y \
    wget unzip libssl-dev libx11-6 libxcomposite1 libxcursor1 libxdamage1 \
    libxrandr2 libasound2 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
    libdbus-1-3 libdrm2 libgbm1 libgtk-3-0 libnspr4 libnss3 libxfixes3 \
    libxkbcommon0 libxshmfence1 libglu1-mesa && \
    rm -rf /var/lib/apt/lists/*

    

# Copy dependencies first for caching
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# or:
# RUN python -m playwright install --with-deps chromium

# ✅ Ensure Playwright and Chromium are installed
RUN playwright install --with-deps chromium

# Copy the rest of the application
COPY . .

# Expose FastAPI default port
EXPOSE 8000

# ✅ Start FastAPI – $PORT is automatically provided by Render
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port $PORT"]
