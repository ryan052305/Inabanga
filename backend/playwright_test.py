from playwright.sync_api import sync_playwright

print("🚀 Starting Playwright Test...")

try:
    with sync_playwright() as p:
        print("✅ Playwright initialized")
        browser = p.chromium.launch(headless=True)
        print("✅ Chromium launched")
        page = browser.new_page()
        page.goto("https://example.com")
        print("✅ Page Title:", page.title())
        browser.close()
except Exception as e:
    print("❌ Playwright error:", e)
