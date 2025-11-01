import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { has } = await auth();

  // 🔒 Check if user has the Pro plan
  const hasPro = has({ plan: "pro" });

  if (!hasPro) {
    return new Response(JSON.stringify({ error: "Upgrade to Pro to scrape." }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ✅ Continue with your scraping logic
  try {
    const body = await req.json();
    const { categories, file_type } = body;

    // Call your FastAPI or scraping backend here
    const response = await fetch("http://localhost:8000/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categories, file_type }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const blob = await response.blob();
    return new Response(blob, {
      status: 200,
      headers: {
        "Content-Type":
          file_type === "csv" ? "text/csv" : "application/pdf",
        "Content-Disposition": `attachment; filename="scrape.${file_type}"`,
      },
    });
  } catch (err: any) {
    console.error("❌ Backend scrape error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Scrape failed" }),
      { status: 500 }
    );
  }
}
