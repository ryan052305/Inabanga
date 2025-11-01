"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Zap,
  BarChart3,
  Download,
  Globe2,
  Clock,
  Compass,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const sampleData = {
  Category: "Tech Gadgets",
  thumbnailImage:
    "https://images-na.ssl-images-amazon.com/images/I/51NPaIorJiL._AC_UL600_SR600,400_.jpg",
  title:
    "TP-Link AX1800 WiFi 6 Router V4 (Archer AX21) – Dual Band Wireless Internet, Gigabit, Easy Mesh, Works with Alexa",
  Product_description:
    "VPN SERVER: Archer AX21 V4 Supports both Open VPN Server and PPTP VPN Server",
  brand: "TP-Link Store",
  stars: 4.4,
  reviewsCount: 22857,
  price_value: "$59.99",
  url: "https://www.amazon.com/WiFi-6-Router-Gigabit-Wireless/dp/B08H8ZLKKK/",
};

export default function Blog() {
  return (
    <section className="relative min-w-full min-h-screen py-24  overflow-hidden">
      {/* Decorative linears */}
      <div className="absolute -top-48 -left-40 w-lg h-128 bg-blue-300/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-md h-112 bg-indigo-300/40 rounded-full blur-3xl opacity-40" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 xl:px-10 relative z-10 space-y-28">
        {/* Main Header */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center leading-[1.4] bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How Inabanga Works
        </motion.h2>

        {/* Steps Section */}
        <div className="grid gap-10 md:gap-5">
          <Step
            icon={<CheckCircle className="w-8 h-8 text-blue-600" />}
            title="Select Categories"
            desc="Pick one or multiple categories and choose your preferred file format for download."
          />
          <Step
            icon={<Zap className="w-8 h-8 text-yellow-500" />}
            title="Start Scraping"
            desc="Click “Start Scraping” — Inabanga instantly collects live Amazon product data for you."
          />
          <Step
            icon={<BarChart3 className="w-8 h-8 text-green-500" />}
            title="View Results Instantly"
            desc="See detailed product tables with images, price, rating, brand, and review stats."
          />

          {/* JSON Example */}
          <Card className="bg-linear-to-br from-gray-900 via-gray-950 to-blue-950 border border-white/10 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-md">
            <CardContent className="p-6 sm:p-8 overflow-x-auto">
              <SyntaxHighlighter
                language="json"
                style={oneDark}
                wrapLines={true}
                customStyle={{
                  background: "transparent",
                  fontSize: "0.9rem",
                  fontFamily: "Menlo, Monaco, 'Courier New', monospace",
                }}
              >
                {JSON.stringify(sampleData, null, 2)}
              </SyntaxHighlighter>
            </CardContent>
          </Card>
          {/* Screenshot Example */}
          <div className="bg-linear-to-br from-gray-900 via-gray-950 to-blue-950 border border-white/10 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-md p-4">
            <Image
              width={3840}
              height={2160}
              src="/pdf-screenshot.png"
              alt="Sample scraped table output"
              className="w-full rounded-2xl object-contain shadow-lg border border-white/10"
            />
            <p className="text-center text-gray-400 text-sm mt-3">
              Preview of the PDF table users receive after scraping.
            </p>
          </div>


          <Step
            icon={<Download className="w-8 h-8 text-purple-500" />}
            title="Download Your Data"
            desc="Export all sorted results Excel, or PDF — just one click away."
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-blue-300/40 to-transparent mt-24" />

        {/* Why It Matters */}
        <motion.h3
          className="text-4xl md:text-5xl font-bold text-center leading-[1.3] bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Inabanga Matters
        </motion.h3>

        <div className="grid sm:grid-cols-2 gap-5 text-gray-800 text-lg mt-5">
          <Feature text="🚀 Find winning products instantly in any niche." />
          <Feature text="🕵️ Validate your product ideas before you invest." />
          <Feature text="💸 Monitor top-sellers and price changes to stay ahead." />
          <Feature text="📊 Compare listings and discover hidden opportunities." />
        </div>

        <p className="mt-2 text-gray-700 leading-relaxed text-center max-w-3xl mx-auto text-lg">
          Whether you're a dropshipper, Amazon FBA seller, or small business —{" "}
          <strong>Inabanga</strong> helps you make smarter decisions, faster.
        </p>

        {/* Save Time Section */}
        <motion.h3
          className="text-4xl md:text-5xl font-bold text-center mt-24 leading-[1.3] bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Save Time, Save Money
        </motion.h3>

        <Card className="bg-linear-to-br from-white/90 via-blue-50/70 to-blue-100/50 border border-white/40 shadow-xl rounded-3xl p-8 sm:p-10 backdrop-blur-md text-gray-800 max-w-4xl mx-auto">
          <p className="mb-4 text-base sm:text-lg">
            Manual product research takes hours and often leads to incomplete
            data. With <strong>Inabanga</strong>, it’s as easy as:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg">
            <li>Choose your category</li>
            <li>Click <strong>Scrape</strong></li>
            <li>Wait about 5 minutes</li>
          </ul>
          <p className="mt-4 text-base sm:text-lg">
            That’s it — get your product data ready for analysis. Plans start at
            just <strong>$5/month</strong> for unlimited scraping.
          </p>
        </Card>

        {/* Features */}
        <motion.h3
          className="text-4xl md:text-5xl font-bold text-center mt-24 leading-[1.3] bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Built to Empower You
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-5 mt-10">
          <Feature
            icon={<Compass className="w-6 h-6 text-blue-600" />}
            text="Intuitive dashboard — clean tables, beautiful visuals."
          />
          <Feature
            icon={<Clock className="w-6 h-6 text-yellow-500" />}
            text="Real-time progress indicators for active scrapes."
          />
          <Feature
            icon={<Download className="w-6 h-6 text-purple-500" />}
            text="Export in JSON, Excel, or PDF."
          />
          <Feature
            icon={<Globe2 className="w-6 h-6 text-green-500" />}
            text="Powered by Playwright + FastAPI for high accuracy."
          />
        </div>

        {/* Final CTA */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-4 leading-[1.3] bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
            🏁 Take the Lead — Don’t Play Catch-Up
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6 text-lg">
            Timing is everything in e-commerce. Spot trends before competitors,
            analyze listings, and dominate your category with{" "}
            <strong>Inabanga</strong>.
          </p>

          <Button
            size="lg"
            className="rounded-2xl px-10 py-6 text-lg bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
          >
            <Link href="/">🚀 Start Scraping Smarter</Link>

          </Button>

          <p className="mt-6 text-gray-600 text-base">
            Stop guessing. <strong>Start winning with Inabanga.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- STEP COMPONENT -------------------- */
function Step({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-start gap-4 bg-linear-to-br from-white/90 via-blue-50/60 to-blue-100/40 
      p-6 sm:p-8 rounded-2xl border border-white/40 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.35)] transition-all"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="shrink-0">{icon}</div>
      <div>
        <h4 className="font-semibold text-lg text-gray-900">{title}</h4>
        <p className="text-gray-700">{desc}</p>
      </div>
    </motion.div>
  );
}

/* -------------------- FEATURE COMPONENT -------------------- */
function Feature({
  icon,
  text,
}: {
  icon?: React.ReactNode;
  text: string;
}) {
  return (
    <motion.div
      className="flex items-center gap-3 bg-linear-to-br from-white/90 via-blue-50/70 to-blue-100/50 
      p-5 sm:p-6 rounded-xl border border-white/40 shadow-md backdrop-blur-md hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.25)] transition-all"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {icon && <div>{icon}</div>}
      <p className="text-gray-800 text-base sm:text-lg">{text}</p>
    </motion.div>
  );
}
