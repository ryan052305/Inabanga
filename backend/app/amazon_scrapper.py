# backend/app/amazon_scraper.py
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import re
import time

BASE = "https://www.amazon.com"

CATEGORY_MAP = {
    "electronics": "https://www.amazon.com/Best-Sellers/zgbs/electronics",
    "men fashion": "https://www.amazon.com/Best-Sellers/zgbs/fashion/7147441011",
    "women fashion": "https://www.amazon.com/Best-Sellers/zgbs/fashion/7147440011",
    "beauty": "https://www.amazon.com/Best-Sellers/zgbs/beauty",
    "home kitchen": "https://www.amazon.com/Best-Sellers/zgbs/home-garden",
    "pet supplies": "https://www.amazon.com/Best-Sellers/zgbs/pet-supplies",
    "kids baby": "https://www.amazon.com/Best-Sellers/zgbs/baby-products",
    "tech gadgets": "https://www.amazon.com/Best-Sellers/zgbs/pc",
    "home accessories": "https://www.amazon.com/gp/bestsellers/home-garden/",
}


def safe_float(value):
    try:
        return float(value)
    except Exception:
        return 0.0


def clean_price_text(s):
    if not s or s == "N/A":
        return "N/A"
    # Keep digits, commas, dots and common currency symbols and minus/dash
    cleaned = re.sub(r"[^\d\.,₱$€£¥\-–]", "", s)
    return cleaned.strip()


def extract_description(soup):
    selectors = [
        "#feature-bullets ul li span",
        "#productDescription p",
        "div#productDescription span",
        "div.a-expander-content p",
        "div#bookDescription_feature_div p",
        "div.a-section.a-spacing-medium span",
    ]
    for sel in selectors:
        el = soup.select_one(sel)
        if el:
            text = el.get_text(" ", strip=True)
            if len(text) > 30 and not re.search(r"keyboard|shortcut|click|menu", text, re.I):
                return text[:300] + "..." if len(text) > 300 else text
    return "N/A"


def extract_brand(soup):
    candidates = [
        soup.select_one("#bylineInfo"),
        soup.select_one("a#bylineInfo"),
        soup.find("tr", string=lambda s: s and "Brand" in s),
        soup.find("th", string=lambda s: s and "Brand" in s),
    ]
    for tag in candidates:
        if tag:
            text = tag.get_text(strip=True)
            text = text.replace("Visit the ", "").replace("Brand:", "").strip()
            return text
    return "N/A"


def clean_price_text(text: str) -> str:
    """Normalize and clean any price string."""
    if not text:
        return "N/A"
    text = text.strip()
    # Remove unwanted characters except digits, punctuation, and common currency symbols
    text = re.sub(r"[^0-9.,$€£¥₱]", "", text)
    # Normalize spacing and punctuation
    text = text.replace(",,", ",").replace("..", ".")
    return text


def extract_price_from_product_page(soup):
    """Extract price from a product detail page (robust)."""
    selectors = [
        "span.a-price > span.a-offscreen",
        "span#price_inside_buybox",
        "span#priceblock_ourprice",
        "span#priceblock_dealprice",
        "div#corePrice_feature_div span.a-offscreen",
        "span.offer-price",
        "span.a-color-price",
        "span.a-price-whole",
    ]

    for sel in selectors:
        tag = soup.select_one(sel)
        if tag and tag.get_text(strip=True):
            return clean_price_text(tag.get_text(strip=True))

    # Assemble whole + fraction
    whole = soup.select_one("span.a-price-whole")
    frac = soup.select_one("span.a-price-fraction")
    if whole:
        symbol = ""
        symbol_tag = soup.select_one("span.a-price-symbol, span.a-offscreen")
        if symbol_tag:
            symbol = symbol_tag.get_text(strip=True)
        whole_text = whole.get_text(strip=True)
        frac_text = frac.get_text(strip=True) if frac else ""
        composed = f"{symbol}{whole_text}{'.' + frac_text if frac_text else ''}"
        return clean_price_text(composed)

    # Regex fallback
    text_blob = soup.get_text(" ", strip=True)
    match = re.search(r"[\$£€¥₱]\s?[\d\.,]+", text_blob)
    if match:
        return clean_price_text(match.group(0))

    return "N/A"


def extract_price_from_list_item(item):
    """Extract price robustly from an Amazon list/grid item."""
    selectors = [
        "span.a-price > span.a-offscreen",
        "span.p13n-sc-price",
        "._cDEzb_p13n-sc-price_3mJ9Z",
        "span.a-color-price",
        "span.a-text-price > span.a-offscreen",
        "span.a-price-whole",
    ]

    # Try direct selectors
    for sel in selectors:
        tag = item.select_one(sel)
        if tag and tag.get_text(strip=True):
            return clean_price_text(tag.get_text(strip=True))

    # Try nested <span class="a-price"> structure (Amazon’s current layout)
    price_container = item.select_one("span.a-price")
    if price_container:
        inner = price_container.select_one("span.a-offscreen")
        if inner and inner.get_text(strip=True):
            return clean_price_text(inner.get_text(strip=True))

    # Assemble whole + fraction
    whole = item.select_one("span.a-price-whole")
    frac = item.select_one("span.a-price-fraction")
    if whole:
        symbol_tag = item.select_one("span.a-price-symbol, span.a-offscreen")
        symbol = symbol_tag.get_text(strip=True) if symbol_tag else ""
        composed = f"{symbol}{whole.get_text(strip=True)}{'.' + frac.get_text(strip=True) if frac else ''}"
        return clean_price_text(composed)

    # Regex fallback
    text_blob = item.get_text(" ", strip=True)
    match = re.search(r"[\$£€¥₱]\s?[\d\.,]+", text_blob)
    if match:
        return clean_price_text(match.group(0))

    # Rare: in attributes
    for attr in ["data-price", "data-asin-price", "data-a-dynamic-image"]:
        if item.has_attr(attr):
            m = re.search(r"[\$£€¥₱]\s?[\d\.,]+", item[attr])
            if m:
                return clean_price_text(m.group(0))

    return "N/A"


def scrape_category_detailed(category_name, max_results=100):
    """
    Enhanced Amazon Best Seller scraper
    Returns products in unified format.
    Ensures at least 100 items attempted (unless max_results < 100).
    """
    
    print("🛠 Checking Playwright installation...")

    from playwright.sync_api import sync_playwright
    
    try:
        with sync_playwright() as p:
            print("✅ Playwright OK")

            browser = p.chromium.launch(
                headless=True,
                args=[
                    "--disable-blink-features=AutomationControlled",
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-dev-shm-usage",
                    "--disable-gpu",
                    "--disable-infobars",
                    "--window-size=1920,1080",
                ]
            )
            print("✅ Chromium launched successfully")

            context = browser.new_context(
                user_agent=(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/120.0.0.0 Safari/537.36"
                ),
                viewport={"width": 1920, "height": 1080},
                locale="en-US"
            )

            context.set_extra_http_headers({
                "accept-language": "en-US,en;q=0.9",
                "accept-encoding": "gzip, deflate, br",
            })

            page = context.new_page()
            print(f"➡ Loading page 1: {category_url}")

            # Try multiple times to avoid 404/CAPTCHA
            for attempt in range(3):
                try:
                    page.goto(category_url, wait_until="domcontentloaded", timeout=30000)
                    time.sleep(3)
                    content = page.content()
                    if "captcha" not in content.lower() and "robot" not in content.lower():
                        print("✅ Page loaded successfully")
                        break
                    else:
                        print("⚠️ CAPTCHA detected, retrying...")
                except Exception as e:
                    print(f"⚠️ Attempt {attempt+1} failed: {e}")
                    time.sleep(2)
            else:
                print("❌ Failed to bypass CAPTCHA or load valid page after retries.")
                page.screenshot(path="amazon_error.png", full_page=True)
                browser.close()
                return []

            # Example scraping logic placeholder
            products = page.locator("div.p13n-sc-uncoverable-faceout")
            count = products.count()
            print(f"✅ Found {count} product elements on the page.")

            browser.close()
            return [f"Product {i+1}" for i in range(min(count, max_results))]

    except Exception as e:
        print("❌ Playwright or Chromium failed:", e)
        return []
    
    
    # ensure we attempt at least 100 when user didn't supply more
    max_results = max(max_results or 0, 350)

    normalized = category_name.strip().lower()
    category_url = CATEGORY_MAP.get(normalized)
    if not category_url:
        print(f"❌ Unknown category: {category_name}")
        return []

    print(f"📦 Scraping category: {category_name.title()} (target {max_results})")
    print(f"➡ {category_url}")

    results = []
    seen_urls = set()

    list_item_selectors = [
        "div.p13n-sc-uncoverable-faceout",
        "div.zg-grid-general-faceout",
        "li.zg-item-immersion",
        "div.zg-item-immersion",
        "div.sg-col-20-of-24",
        "div.a-section.a-spacing-none",  # add a generic wrapper
    ]

    deep_price_limit = min(200, max_results)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/122.0.0.0 Safari/537.36"
            )
        )
        page = context.new_page()
        page_num = 1
        tries = 0
        max_pages = 15  # try more pages to reach at least 100 items

        try:
            while len(results) < max_results and tries < max_pages:
                page_url = category_url if page_num == 1 else f"{category_url}?pg={page_num}"
                tries += 1
                print(f"➡ Loading page {page_num}: {page_url}")
                try:
                    page.goto(page_url, wait_until="domcontentloaded", timeout=30000)
                except PlaywrightTimeoutError:
                    print("⏳ Timeout loading page, retrying...")
                    page.wait_for_timeout(2000)
                    try:
                        page.reload()
                    except Exception:
                        pass

                page.mouse.wheel(0, 5000)
                page.wait_for_timeout(1200)

                soup = BeautifulSoup(page.content(), "html.parser")

                # collect candidate items
                items = []
                for sel in list_item_selectors:
                    found = soup.select(sel)
                    if found:
                        items.extend(found)

                # fallback to product anchors and wrappers
                if not items:
                    anchors = soup.select("a.a-link-normal[href*='/dp/']")
                    for a in anchors:
                        # pick the closest wrapper
                        wrapper = a.find_parent()
                        if wrapper:
                            items.append(wrapper)

                if not items:
                    print("⚠️ No products found on this page.")
                    break

                for raw_item in items:
                    if len(results) >= max_results:
                        break

                    item = raw_item if raw_item.name != "a" else raw_item.parent

                    # Title
                    title_tag = item.select_one("._cDEzb_p13n-sc-css-line-clamp-3_g3dy1, span.zg-text-center-align, div.p13n-sc-truncated, img[alt]")
                    if title_tag:
                        if title_tag.name == "img" and title_tag.has_attr("alt"):
                            title = title_tag["alt"].strip()
                        else:
                            title = title_tag.get_text(strip=True)
                    else:
                        a = item.select_one("a.a-link-normal[href*='/dp/']")
                        title = a.get_text(strip=True) if a else "N/A"

                    # URL
                    link_tag = item.select_one("a.a-link-normal[href*='/dp/']")
                    product_url = urljoin(BASE, link_tag["href"]) if link_tag and link_tag.has_attr("href") else "N/A"
                    if product_url in seen_urls or product_url == "N/A":
                        continue
                    seen_urls.add(product_url)

                    # Thumbnail
                    img_tag = item.select_one("img")
                    thumbnail = img_tag.get("src") if img_tag and img_tag.has_attr("src") else "N/A"

                    # Price: try list-item extraction first
                    price = extract_price_from_list_item(item)
                    price_found_by = "list"

                    # If still missing, try regex in HTML
                    if price == "N/A":
                        html_blob = str(item)
                        m = re.search(r"[\$\£\€\¥₱]\s?[\d\.,]+", html_blob)
                        if m:
                            price = clean_price_text(m.group(0))
                            price_found_by = "regex-html"

                    # If still missing and we are allowed to deep fetch, open product page
                    if price == "N/A" and len(results) < deep_price_limit:
                        try:
                            sub_page = context.new_page()
                            sub_page.goto(product_url, wait_until="domcontentloaded", timeout=15000)
                            sub_page.wait_for_timeout(900)
                            sub_soup = BeautifulSoup(sub_page.content(), "html.parser")
                            price_from_page = extract_price_from_product_page(sub_soup)
                            if price_from_page and price_from_page != "N/A":
                                price = price_from_page
                                price_found_by = "product-page"
                            sub_page.close()
                        except Exception:
                            try:
                                sub_page.close()
                            except Exception:
                                pass

                    # Rating stars
                    rating_tag = item.select_one("span.a-icon-alt")
                    stars = safe_float(rating_tag.get_text(strip=True).split()[0]) if rating_tag and rating_tag.get_text(strip=True) else 0.0

                    # Review count
                    reviews = 0
                    review_candidates = item.select("a.a-size-small, span.a-size-small, span.zg-badge-text")
                    for r in review_candidates:
                        txt = r.get_text(strip=True).replace(",", "")
                        if txt.isdigit():
                            reviews = int(txt)
                            break
                        m = re.search(r"(\d{1,6})", txt.replace(",", ""))
                        if m:
                            reviews = int(m.group(1))
                            break

                    # deep scrape for description/brand for first 60 items
                    brand, description = "N/A", "N/A"
                    if product_url != "N/A" and len(results) < 60:
                        try:
                            sub_page = context.new_page()
                            sub_page.goto(product_url, wait_until="domcontentloaded", timeout=12000)
                            sub_page.wait_for_timeout(700)
                            sub_soup = BeautifulSoup(sub_page.content(), "html.parser")
                            description = extract_description(sub_soup)
                            brand = extract_brand(sub_soup)
                            sub_page.close()
                        except Exception:
                            try:
                                sub_page.close()
                            except Exception:
                                pass

                    # debug print for missing price (helps troubleshooting)
                    if price == "N/A":
                        print(f"⚠️ price NOT found for: {title} — {product_url}")
                    else:
                        print(f"ℹ️ price found ({price_found_by}) for {title}: {price}")

                    results.append({
                        "Category": category_name.title(),
                        "thumbnailImage": thumbnail,
                        "title": title,
                        "Product description": description,
                        "brand": brand,
                        "stars": stars,
                        "reviewsCount": reviews,
                        "price.value": price,
                        "url": product_url,
                    })

                page_num += 1
                time.sleep(0.6)

        except Exception as e:
            print("❌ Error during scraping:", e)
        finally:
            browser.close()

    # ensure numeric typing for sorting
    for r in results:
        try:
            r["reviewsCount"] = int(r.get("reviewsCount") or 0)
        except Exception:
            r["reviewsCount"] = 0
        try:
            r["stars"] = float(r.get("stars") or 0.0)
        except Exception:
            r["stars"] = 0.0

    # dedupe and sort
    deduped = []
    seen = set()
    for r in results:
        if r["url"] not in seen:
            seen.add(r["url"])
            deduped.append(r)

    deduped.sort(key=lambda x: (x["reviewsCount"], x["stars"]), reverse=True)

    print(f"\n✅ {len(deduped)} products scraped successfully for {category_name.title()}\n")
    return deduped[:max_results]
