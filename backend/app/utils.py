# backend/app/utils.py
from fpdf import FPDF
import csv

def generate_csv_file(scraped_data: list, filepath: str):
    """
    Generate a CSV file from the scraped Amazon data.
    """
    with open(filepath, mode="w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([
            "Category",
            "Product Name",
            "Product URL",
            "Price",
            "Ratings",
            "Bought Past Month",
            "Recently Surged in Sales",
            "Release",
            "Description",
            "Top Customer Feedback",
            "Competition Level"
        ])
        for p in scraped_data:
            writer.writerow([
                p.get("category", ""),
                p.get("product_name", ""),
                p.get("url", ""),
                p.get("price", ""),
                p.get("ratings", ""),
                p.get("bought_past_month", ""),
                p.get("recently_surged_in_sales", ""),
                p.get("release", ""),
                p.get("description", ""),
                p.get("top_customer_feedback", ""),
                p.get("competition_level", "")
            ])


def generate_pdf_file(scraped_data: list, filepath: str):
    """
    Generate a PDF report from the scraped Amazon data.
    """
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    
    # Title
    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 10, "Amazon Scraped Data Report", ln=True, align="C")
    pdf.ln(8)
    
    for p in scraped_data:
        pdf.set_font("Arial", "B", 12)
        pdf.cell(0, 8, f"Category: {p.get('category', 'N/A')}", ln=True)
        
        pdf.set_font("Arial", "", 10)
        pdf.multi_cell(0, 6, f"Product Name: {p.get('product_name', 'N/A')}")
        pdf.multi_cell(0, 6, f"URL: {p.get('url', 'N/A')}")
        pdf.multi_cell(0, 6, f"Price: {p.get('price', 'N/A')}")
        pdf.multi_cell(0, 6, f"Ratings: {p.get('ratings', 'N/A')}")
        pdf.multi_cell(0, 6, f"Bought Past Month: {p.get('bought_past_month', 'N/A')}")
        pdf.multi_cell(0, 6, f"Recently Surged in Sales: {p.get('recently_surged_in_sales', 'N/A')}")
        pdf.multi_cell(0, 6, f"Release: {p.get('release', 'N/A')}")
        pdf.multi_cell(0, 6, f"Description: {p.get('description', 'N/A')}")
        pdf.multi_cell(0, 6, f"Top Customer Feedback: {p.get('top_customer_feedback', 'N/A')}")
        pdf.multi_cell(0, 6, f"Competition Level: {p.get('competition_level', 'N/A')}")
        
        pdf.ln(5)
        pdf.cell(0, 0, "-" * 80, ln=True)  # separator line
        pdf.ln(6)
    
    pdf.output(filepath)
