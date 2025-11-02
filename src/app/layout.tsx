// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inabanga.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || "https://inabanga.com/"),
  icons : {
    icon: "/favicon.ico",
  }
  title: {
    default: "Inabanga – Amazon Product Scraper & Research Tool",
    template: "%s | Inabanga",
  },
  description:
    "Inabanga helps Amazon sellers automate product research, track trends, and stay ahead of competitors using AI-powered scraping and analytics.",
  keywords: [
    "amazon best sellers",
    "trending products on amazon",
    "amazon product research tool",
    "amazon top selling products",
    "amazon scraper",
    "amazon product scraper",
    "amazon product research",
    "amazon seller tools",
    "amazon fba tools",
    "ecommerce tools",
    "amazon analytics",
    "market research",
    "amazon data scraper",
    "competitor analysis",
    "sales tracking",
    "product trends",
    "product research",
    "AI tools for Amazon",
    "FBA research",
    "Amazon seller tools",
    "Inabanga",

  ],
  authors: [{ name: "Inabanga Team", url: siteUrl }],
  creator: "Inabanga",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Inabanga",
    title: "Inabanga – AI Amazon Scraping & Product Research",
    description:
      "AI-powered Amazon product scraper for sellers. Track competitors, discover trends, and make data-driven decisions.",
    images: [
      {
        url: "/favicon.ico", // Make sure this exists in /public
        width: 1200,
        height: 630,
        alt: "Inabanga – Amazon Seller Toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inabanga – AI Amazon Scraping & Product Research",
    description:
      "Smarter Amazon scraping & analytics. Built for sellers to stay ahead.",
    images: ["/logo.png"], // Make sure this exists in /public
    creator: "@allanic_dev", // change if available
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta
            name="google-adsense-account"
            content="ca-pub-9298488339499682"
          />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9298488339499682"
            crossOrigin="anonymous"
          ></script>
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
        >
          <Navbar />
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
