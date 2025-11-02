from fastapi import FastAPI, HTTPException, Request
import requests
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
import asyncio
import os
import json
import pandas as pd
from datetime import datetime
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, landscape
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
import jwt

# ✅ Import your scraper
from app.amazon_scrapper import scrape_category_detailed


# --- FastAPI setup ---
app = FastAPI(title="Amazon Scraper API", version="3.3")

CLERK_JWKS_URL = "https://clerk.inabanga.com/.well-known/jwks.json"


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Request model ---
class ScrapeRequest(BaseModel):
    categories: List[str]
    max_results: int = 350
    
CLERK_API_KEY = os.getenv("CLERK_SECRET_KEY")  # Make sure this is in Render env

def verify_clerk_token(token: str):
    jwks = requests.get(CLERK_JWKS_URL).json()
    try:
        header = jwt.get_unverified_header(token)
        key = next(k for k in jwks["keys"] if k["kid"] == header["kid"])
        public_key = jwt.algorithms.RSAAlgorithm.from_jwk(key)
        decoded = jwt.decode(token, public_key, algorithms=["RS256"], audience="https://inabanga-1.onrender.com")
        return decoded
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


def verify_clerk_user(req: Request):
    auth_header = req.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")

    token = auth_header.split(" ")[1]

    # Verify the token via Clerk
    resp = requests.get(
        "https://api.clerk.dev/v1/me",
        headers={"Authorization": f"Bearer {token}", "Authorization": f"Bearer {CLERK_API_KEY}"}
    )

    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return resp.json()



# --- Helper: Clean & flatten product dict ---
def normalize_product(p):
    """Flatten nested fields and clean text for readability."""
    return {
        "Category": p.get("Category", "N/A"),
        "Thumbnail": p.get("thumbnailImage", "N/A"),
        "Title": (p.get("title", "") or "").strip(),
        "Description": (p.get("Product description", "") or "").replace("\n", " ")[:300],
        "Brand": p.get("brand", "N/A"),
        "Stars": str(p.get("stars", "N/A")),
        "Reviews": str(p.get("reviewsCount", "N/A")),
        "Price": p.get("price.value")
        or (
            p.get("price", {}).get("value")
            if isinstance(p.get("price"), dict)
            else p.get("price", "N/A")
        ),
        "URL": p.get("url", "N/A"),
    }


# --- Helper: Generate PDF report ---
def generate_pdf_report(data, pdf_path, categories):
    """Generate a clean, readable PDF report that fits perfectly on the page."""
    from reportlab.lib.units import inch

    page_width, page_height = landscape(letter)
    margin = 30
    usable_width = page_width - (margin * 2)

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=landscape(letter),
        leftMargin=margin,
        rightMargin=margin,
        topMargin=margin,
        bottomMargin=margin,
    )

    styles = getSampleStyleSheet()
    normal_style = ParagraphStyle(
        "NormalWrap",
        parent=styles["Normal"],
        fontSize=8,
        leading=10,
        wordWrap="CJK",
    )

    story = []
    title = f"Amazon Scrape Report — {', '.join([c.title() for c in categories])}"
    story.append(Paragraph(title, styles["Title"]))
    story.append(Spacer(1, 12))

    headers = [
        "Category",
        "Image",
        "Title",
        "Description",
        "Brand",
        "Stars",
        "Reviews",
        "Price",
        "URL",
    ]
    table_data = [headers]

    for p in data:
        img_url = p.get("Thumbnail", "") or p.get("thumbnailImage", "")
        img_link_paragraph = (
            Paragraph(f"<link href='{img_url}' color='blue'>{img_url}</link>", normal_style)
            if img_url
            else Paragraph("", normal_style)
        )

        row = [
            Paragraph(str(p.get("Category", "")), normal_style),
            img_link_paragraph,
            Paragraph(str(p.get("Title", "")), normal_style),
            Paragraph(str(p.get("Description", "")), normal_style),
            Paragraph(str(p.get("Brand", "")), normal_style),
            Paragraph(str(p.get("Stars", "")), normal_style),
            Paragraph(str(p.get("Reviews", "")), normal_style),
            Paragraph(str(p.get("Price", "")), normal_style),
            Paragraph(f"<link href='{p.get('URL', '')}' color='blue'>{p.get('URL', '')}</link>", normal_style),
        ]
        table_data.append(row)

    base_col_widths = [0.7, 1.0, 1.8, 2.4, 1.0, 0.6, 0.7, 0.6, 2.0]
    total_units = sum(base_col_widths)
    col_widths = [(usable_width / total_units) * w for w in base_col_widths]

    table = Table(table_data, repeatRows=1, colWidths=col_widths)

    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#232F3E")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("ALIGN", (0, 0), (-1, 0), "CENTER"),
                ("FONTSIZE", (0, 0), (-1, 0), 9),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (4, 1), (6, -1), "CENTER"),
                ("FONTSIZE", (0, 1), (-1, -1), 8),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.whitesmoke, colors.HexColor("#F9F9F9")]),
                ("GRID", (0, 0), (-1, -1), 0.25, colors.gray),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )

    story.append(table)
    doc.build(story)


# --- Main scrape endpoint ---
@app.post("/scrape")
async def scrape_endpoint(request: Request, req: ScrapeRequest):
    user = verify_clerk_user(request)  # ✅ use Request to get headers

    if not req.categories:
        raise HTTPException(status_code=400, detail="No categories provided.")

    total_limit = min(req.max_results, 350)
    per_category = total_limit // len(req.categories)
    all_results = []

    print(f"⚡ Starting scrape for: {req.categories}")
    print(f"➡ Limit: {total_limit} results ({per_category} per category)")

    try:
        for category in req.categories:
            print(f"🔍 Scraping category: {category}")
            results = scrape_category_detailed(category_name=category, max_results=per_category)
            all_results.extend(results)

        if not all_results:
            raise HTTPException(status_code=404, detail="No results found.")

        # Deduplicate by URL
        unique = []
        seen = set()
        for p in all_results:
            if p.get("url") not in seen:
                seen.add(p.get("url"))
                unique.append(normalize_product(p))

        # --- Save output files ---
        os.makedirs("output", exist_ok=True)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        category_str = "_".join([c.replace(" ", "_") for c in req.categories])
        base = f"output/{timestamp}_{category_str}"

        json_path = f"{base}.json"
        csv_path = f"{base}.csv"
        pdf_path = f"{base}.pdf"

        # JSON
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(unique, f, indent=2, ensure_ascii=False)

        # CSV
        df = pd.DataFrame(unique)
        df.to_csv(csv_path, index=False, encoding="utf-8-sig")

        # PDF
        generate_pdf_report(unique, pdf_path, req.categories)

        print(f"💾 Saved: {csv_path}, {json_path}, {pdf_path}")

        # ✅ Return the CSV file directly for Excel download
        return FileResponse(
            csv_path,
            media_type="text/csv",
            filename=os.path.basename(csv_path),
        )

    except Exception as e:
        print("❌ Error:", e)
        raise HTTPException(status_code=500, detail=str(e))



# --- Separate PDF download endpoint ---
@app.get("/download/pdf")
def download_pdf():
    """Download the most recently generated PDF report."""
    output_dir = os.path.abspath("output")
    if not os.path.exists(output_dir):
        raise HTTPException(status_code=404, detail="Output folder not found.")

    # Find the most recent PDF file
    pdf_files = [f for f in os.listdir(output_dir) if f.endswith(".pdf")]
    if not pdf_files:
        raise HTTPException(status_code=404, detail="No PDF report found. Please run /scrape first.")

    latest_pdf = max(
        [os.path.join(output_dir, f) for f in pdf_files],
        key=os.path.getctime
    )

    # ✅ Use absolute path to prevent browser download corruption
    return FileResponse(
        path=latest_pdf,
        media_type="application/pdf",
        filename=os.path.basename(latest_pdf),
    )


@app.get("/")
def root():
    return {"message": "Inabanga FastAPI backend is running smoothly ✅"}

@app.head("/")
def health_check():
    return {"message": "ok"}