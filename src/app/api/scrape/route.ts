import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { has } = await auth();
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }


    // ✅ Get metadata
    const role = user.publicMetadata?.role;
    const hasPro = has({ plan: "pro" });

    // ✅ Allow if user has Pro plan OR is an admin
    const isAllowed = role === "admin" || hasPro;
    if (!isAllowed) {
      return new Response(JSON.stringify({ error: "Upgrade to Pro" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Continue with your scraping logic
    try {
      const body = await req.json();
      const { categories, file_type } = body;

      // Call your FastAPI or scraping backend here
      const response = await fetch("https://inabanga-1.onrender.com/scrape", {
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
    } catch (err: unknown) {
      console.error("❌ Backend scrape error:", err);

      const message =
        err instanceof Error ? err.message : "Scrape failed";

      return new Response(
        JSON.stringify({ error: message }),
        { status: 500 }
      );
    }
  } catch (err: unknown) {
    console.error("❌ Backend scrape error:", err);

    const message = err instanceof Error ? err.message : "Scrape failed";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}