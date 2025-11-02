# Use official Playwright image (comes with Chromium installed!)
FROM mcr.microsoft.com/playwright/python:v1.47.0-jammy


# Install required system libraries for Chromium/Playwright
RUN apt-get update && apt-get install -y \
    wget gnupg ca-certificates curl unzip \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libxkbcommon0 \
    libxcomposite1 libxdamage1 libxrandr2 libgbm1 libasound2 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy dependencies and install them
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Install Chromium + all required dependencies
RUN apt-get update && \
    apt-get install -y \
        wget \
        curl \
        libnss3 \
        libx11-xcb1 \
        libxcomposite1 \
        libxcursor1 \
        libxdamage1 \
        libxi6 \
        libxtst6 \
        libatk1.0-0 \
        libatk-bridge2.0-0 \
        libcups2 \
        libdrm2 \
        libgbm1 \
        libasound2 \
        libpangocairo-1.0-0 \
        libxrandr2 \
        libgtk-3-0 \
        libxshmfence1 \
        fontconfig \
        && rm -rf /var/lib/apt/lists/*


# Install Playwright + Chromium
RUN pip install playwright
RUN playwright install --with-deps chromium

# Copy the rest of the project
COPY . .

# Make startup.sh executable
COPY start.sh .
RUN chmod +x /app/startup.sh

# Expose FastAPI port
EXPOSE 8000

# Run the app
CMD ["./startup.sh"]
