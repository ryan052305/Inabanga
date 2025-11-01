"use client";

import { motion } from "framer-motion";
import { Briefcase, Rocket, Users, Send } from "lucide-react";
import Link from "next/link";

export default function Careers() {
  return (
    <section className="relative min-w-full min-h-screen py-24 overflow-hidden">
      {/* Decorative Glowing Elements */}
      <div className="absolute -top-48 -left-40 w-lg h-128 bg-blue-300/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-md h-112 bg-indigo-300/40 rounded-full blur-3xl opacity-40" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 xl:px-10 relative z-10 space-y-24">
        
        {/* Page Header */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center leading-[1.4] bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Build the Future With Us
        </motion.h1>

        {/* Intro Section */}
        <motion.p
          className="text-center text-gray-700 text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          We're a small team with a big mission — to make product research easier, faster, 
          and more accessible for entrepreneurs worldwide. If you’re passionate about tech, e-commerce, 
          and building innovative solutions, you’re in the right place.
        </motion.p>

        {/* Why Join Us */}
        <div className="grid md:grid-cols-3 gap-6">
          <BenefitCard
            icon={<Rocket className="w-8 h-8 text-purple-600" />}
            title="Fast-Growing Startup"
            desc="Be part of something from the start — your work makes a real impact."
          />
          <BenefitCard
            icon={<Users className="w-8 h-8 text-blue-600" />}
            title="Collaborative Team"
            desc="No hierarchy, no nonsense — just builders solving real problems together."
          />
          <BenefitCard
            icon={<Briefcase className="w-8 h-8 text-green-600" />}
            title="Remote & Flexible"
            desc="Work from anywhere. We value results, not time clocks."
          />
        </div>

        {/* Open Roles Section */}
        <div>
          <motion.h2
            className="text-3xl font-bold text-center bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Open Positions
          </motion.h2>
          <p className="text-center text-gray-700 mt-3">We're currently hiring for:</p>

          <div className="mt-10 space-y-6">
            <JobCard
              role="Frontend Developer (Next.js / React)"
              type="Full-time · Remote"
              desc="Help us build beautiful, fast, and user-friendly interfaces with Next.js, Tailwind, and Framer Motion."
            />
            <JobCard
              role="Backend Engineer (FastAPI / Python)"
              type="Full-time · Remote"
              desc="Build scalable APIs, manage scraping pipelines, and ensure high data accuracy and performance."
            />
            <JobCard
              role="UI/UX Designer"
              type="Contract · Remote"
              desc="Design intuitive, aesthetic and conversion-focused layouts for dashboard, landing pages, and components."
            />
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
            Don't See Your Role?
          </h3>
          <p className="text-gray-700 mb-6">
            We're always open to talented individuals. Send us your portfolio or CV!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition"
          >
            <Send className="w-5 h-5" />
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* Benefit Card Component */
function BenefitCard({ icon, title, desc }: any) {
  return (
    <motion.div
      className="p-6 bg-linear-to-br from-white/90 via-blue-50/70 to-blue-100/50 rounded-xl border border-white/40 shadow-md backdrop-blur-md"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {icon}
      <h4 className="font-semibold text-lg text-gray-900 mt-4">{title}</h4>
      <p className="text-gray-700 text-sm mt-1">{desc}</p>
    </motion.div>
  );
}

/* Job Card Component */
function JobCard({ role, type, desc }: any) {
  return (
    <motion.div
      className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-linear-to-br from-white/90 via-blue-50/70 to-blue-100/50 border border-white/40 rounded-xl shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h4 className="text-lg font-semibold text-gray-900">{role}</h4>
        <p className="text-sm text-gray-600">{type}</p>
        <p className="text-gray-700 mt-2">{desc}</p>
      </div>
      <Link
        href="/contact"
        className="px-5 py-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow-md hover:shadow-xl transition"
      >
        Apply Now
      </Link>
    </motion.div>
  );
}
