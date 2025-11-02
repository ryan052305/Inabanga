#!/bin/bash

echo "🚀 Starting setup..."

# Ensure Playwright dependencies & Chromium are installed
if [ ! -d "/opt/render/.cache/ms-playwright" ]; then
  echo "📥 Installing Playwright Chromium with dependencies..."
  npx playwright install --with-deps chromium
else
  echo "✅ Playwright Chromium already installed."
fi

# Export Playwright cache path to avoid errors
export PLAYWRIGHT_BROWSERS_PATH=/opt/render/.cache/ms-playwright

echo "✅ Launching FastAPI server..."
uvicorn app.main:app --host 0.0.0.0 --port $PORT
