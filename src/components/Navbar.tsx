"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  UserButton,
  useUser,
} from "@clerk/nextjs";


import { useClerk } from "@clerk/nextjs";


export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const clerk = useClerk();



  return (
    <nav className="w-full border-b border-gray-200 bg-white/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Image
            src="/logo.png"
            alt="Inabanga Logo"
            width={190}
            height={120}
            className="rounded-md group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`text-md font-medium transition-all ${pathname === "/"
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 border-transparent"
              }`}
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className={`text-md font-medium transition-all ${pathname === "/pricing"
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 border-transparent"
              }`}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className={`text-md font-medium transition-all ${pathname === "/pricing"
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 border-transparent"
              }`}
          >
            About Us
          </Link>
        </div>

        {/* Auth Section (shadcn + Clerk) */}
        <UserButton />
      </div>

      {/* Mobile Nav */}
      <div className="flex md:hidden justify-center border-t border-gray-100 bg-gray-50 py-2 space-x-6">
        <Link
          href="/"
          className={`text-sm font-medium ${pathname === "/"
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-600"
            }`}
        >
          Home
        </Link>
        <Link
          href="/pricing"
          className={`text-sm font-medium ${pathname === "/pricing"
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-600"
            }`}
        >
          Pricing
        </Link>
      </div>
    </nav>
  );
}
