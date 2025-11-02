#!/bin/bash

echo "🚀 Starting deployment setup..."

# Install Playwright browsers only if not installed
if [ ! -d "/root/.cache/ms-playwright" ]; then
  echo "📥 Installing Playwright browsers and dependencies..."
  playwright install --with-deps chromium
else
  echo "✅ Playwright is already installed. Skipping..."
fi

# Start FastAPI server
echo "✅ Launching FastAPI server..."
uvicorn app.main:app --host 0.0.0.0 --port $PORT
