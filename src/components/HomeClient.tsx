"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Loader2, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Blog from "../components/Blog";
import { useAuth, useUser } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";


export default function HomeClient({ hasPro }: { hasPro: boolean }) {
  const router = useRouter();
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [fileType, setFileType] = useState<"csv" | "pdf">("csv");
  const [isScraping, setIsScraping] = useState(false);
  const [message, setMessage] = useState<string | null>(null);


  const categories = [
    "Women Fashion",
    "Men Fashion",
    "Electronics",
    "Beauty",
    "Home Kitchen",
    "Pet Supplies",
    "Kids Baby",
    "Tech Gadgets",
    "Home Accessories",
  ];

  useEffect(() => {
    if (isLoaded && user) {
      console.log("User metadata:", user.publicMetadata);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    const assignAdminRole = async () => {
      if (!user) return;

      const adminUserId = "user_34sTLJLDqC5ZBrrbprUNGBG4WLg"; // Replace with actual admin user ID

      // only run if you're the admin and not already marked as admin
      if (user.id === adminUserId && user.publicMetadata.role !== "admin") {
        try {
          const token = await getToken();

          const res = await fetch("/api/set-admin-role", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: user.id,
              role: "admin",
              plan: "pro",
            }),
          });

          if (!res.ok) throw new Error(await res.text());
          console.log("✅ Admin role successfully set!");
        } catch (error) {
          console.error("❌ Failed to set admin role:", error);
        }
      }
    };

    assignAdminRole();
  }, [user, getToken]);


  useEffect(() => {
    const last = localStorage.getItem("lastScrape");
    if (last) {
      const data = JSON.parse(last);
      if (data.selectedCategories) setSelectedCategories(data.selectedCategories);
      if (data.fileType) setFileType(data.fileType);
    }
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleScrape = async () => {

    const isAdmin = user?.publicMetadata?.role === "admin";
    const isPro = hasPro || user?.publicMetadata?.plan === "pro";

    if (!isPro && !isAdmin) {
      router.push("/pricing");
      return;
    }

    if (!selectedCategories.length) {
      alert("Please select at least one category.");
      return;
    }

    setIsScraping(true);
    setMessage("⏳ Starting Amazon scrape... Please wait...");

    try {
      // 🧠 Get Clerk session token
      const token = await getToken({ template: "convex" });
      const scrapeResponse = await fetch("https://inabanga-1.onrender.com/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ Add this line
        },
        body: JSON.stringify({
          categories: selectedCategories,
          file_type: fileType,
        }),
      });
      console.log(token); 

      if (!scrapeResponse.ok) throw new Error(await scrapeResponse.text());
      setMessage("✅ Scrape complete! Preparing download...");

      let blob;
      if (fileType === "csv") {
        blob = await scrapeResponse.blob();
      } else {
        const pdfResponse = await fetch("https://inabanga-1.onrender.com/download/pdf", {
          headers: { "Authorization": `Bearer ${token}` }, // ✅ Include token here too
        });
        if (!pdfResponse.ok) throw new Error("Failed to fetch PDF file.");
        blob = await pdfResponse.blob();
      }

      const downloadUrl = URL.createObjectURL(blob);
      const formattedCats = selectedCategories.join("_").toLowerCase().replace(/\s+/g, "_");
      const date = new Date().toISOString().split("T")[0];
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `amazon_scrape_${date}_${formattedCats}.${fileType}`;
      a.click();
      URL.revokeObjectURL(downloadUrl);

      setMessage("✅ File downloaded successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(`❌ Error: ${err.message}`);
      } else {
        setMessage("❌ An unknown error occurred.");
      }
    } finally {
      setIsScraping(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center bg-linear-to-b from-blue-50 via-white to-gray-50 text-gray-900 min-h-screen overflow-hidden">
      <section className="w-full flex justify-center px-6 py-16 bg-linear-to-b from-blue-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl opacity-30" />

        <Card className="relative w-full max-w-7xl border border-white/30 shadow-2xl rounded-3xl 
          bg-linear-to-br from-white/90 via-blue-50/60 to-blue-100/30 backdrop-blur-xl ring-1 ring-white/20">
          <CardContent className="p-10">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
              {/* Left Column */}
              <motion.div
                className="w-full lg:w-1/2 text-center lg:text-left"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-700">
                  Discover Top-Selling Amazon Products Instantly
                </h1>
                <p className="text-gray-700 text-lg mb-8 max-w-md mx-auto lg:mx-0">
                  Save hours of manual research with{" "}
                  <span className="font-semibold text-gray-900">Inabanga</span> — your
                  AI-powered Amazon product discovery and scraping tool.
                </p>
                {/* ✅ Convex Auth Integration */}
                <Authenticated>
                  <p className="text-sm text-green-600 mb-4">You are signed in!</p>
                  <Content />
                </Authenticated>

                <Unauthenticated>
                  <p className="text-sm text-red-600 mb-4">Please sign in to access features.</p>
                </Unauthenticated>
                <Button
                  size="lg"
                  className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-6 rounded-full shadow-lg transition-all"
                >
                  {hasPro ? (
                    <Link href="/">🚀 Start Scraping Now</Link>
                  ) : (
                    <Link href="/pricing">🚀 Start Free Trial</Link>
                  )}
                </Button>
              </motion.div>

              {/* Right Column */}
              <motion.div
                className="w-full lg:w-1/2 flex justify-center"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="w-full max-w-md border border-white/30 shadow-xl rounded-3xl 
                  bg-linear-to-br from-white/90 via-blue-50/60 to-blue-100/40 backdrop-blur-lg ring-1 ring-white/20">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                      🛒 Amazon Scraper
                    </h2>

                    {/* Category Selection */}
                    <div className="mb-8">
                      <h3 className="font-semibold mb-2 text-gray-800">Select Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`px-4 py-2 text-sm rounded-full border transition-all ${selectedCategories.includes(cat)
                              ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md"
                              : "bg-white/80 text-gray-700 border-gray-300 hover:bg-gray-100"
                              }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* File Type */}
                    <div className="mb-8">
                      <h3 className="font-semibold mb-2 text-gray-800">File Type</h3>
                      <select
                        value={fileType}
                        onChange={(e) => setFileType(e.target.value as "csv" | "pdf")}
                        className="w-full border rounded-xl p-3 bg-white/90 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="csv">CSV</option>
                        <option value="pdf">PDF</option>
                      </select>
                    </div>

                    {/* ✅ Scrape Button with Role/Plan Gating */}
                    <Button
                      onClick={() => {
                        const role = user?.publicMetadata?.role;
                        const plan = user?.publicMetadata?.plan;
                        const isAdmin = role === "admin";
                        const isPro = hasPro || plan === "pro";

                        // ✅ Allow scraping for admins or Pro users
                        if (isAdmin || isPro) {
                          handleScrape();
                        } else {
                          router.push("/pricing");
                        }
                      }}
                      disabled={isScraping}
                      className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
                    >
                      {isScraping ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Scraping...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          {user?.publicMetadata?.role === "admin"
                            ? "Start Scraping (Admin)"
                            : hasPro || user?.publicMetadata?.plan === "pro"
                              ? "Start Scraping"
                              : "Upgrade to Pro"}
                        </>
                      )}
                    </Button>

                    {message && (
                      <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="relative min-w-full min-h-screen bg-linear-to-b from-white via-blue-50/50 to-blue-100/40 overflow-hidden">
        <Blog />
      </section>
    </main>
  );
}


function Content() {
  const messages = useQuery(api.messages.getForCurrentUser);
  return (
    <div className="mt-2 text-sm text-gray-800">
      Authenticated content: {messages ? messages.length : "Loading..."}
    </div>
  );
}
