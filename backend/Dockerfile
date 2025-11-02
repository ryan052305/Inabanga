# ✅ Base image: Comes with Python + Playwright + Chromium preinstalled
FROM mcr.microsoft.com/playwright/python:v1.47.0-jammy

# Set working directory
WORKDIR /app

# Copy only requirements first (helps with build caching)
COPY requirements.txt ./

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# ✅ (Optional) Install extra system libraries only if your app requires them
# Most Chromium dependencies are already installed in this base image
RUN apt-get update && apt-get install -y \
    wget gnupg ca-certificates curl unzip \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
    libxkbcommon0 libxcomposite1 libxdamage1 libxrandr2 \
    libgbm1 libasound2 \
    && rm -rf /var/lib/apt/lists/*

# ✅ Ensure browsers are installed (safe to re-run)
RUN playwright install --with-deps chromium

# Copy the rest of your backend code
COPY . .

# Expose FastAPI port (Render uses $PORT but we default to 8000 locally)
EXPOSE 8000

# ✅ Start FastAPI – $PORT is automatically provided by Render
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port $PORT"]
