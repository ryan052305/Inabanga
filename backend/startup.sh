#!/bin/bash
echo "✅ Starting FastAPI server with Playwright support..."
playwright install --with-deps chromium
uvicorn app.main:app --host 0.0.0.0 --port 8000
