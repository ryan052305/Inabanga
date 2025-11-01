"use client";

import { motion } from "framer-motion";
import { Users, Heart, Rocket, Target, Briefcase } from "lucide-react";

export default function About() {
  return (
    <section className="relative min-w-full min-h-screen py-24 overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute -top-40 -left-40 w-lg h-128 bg-blue-300/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-md h-112 bg-indigo-300/40 rounded-full blur-3xl opacity-40" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 xl:px-10 relative z-10 space-y-24">
        {/* Header */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center leading-[1.4] bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Inabanga
        </motion.h1>

        {/* Story Section */}
        <motion.div
          className="bg-linear-to-br from-white/90 via-blue-50/60 to-blue-100/40 border border-white/40 shadow-lg backdrop-blur-md rounded-2xl p-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Inabanga was born from a simple idea —{" "}
            <strong>make product research effortless for everyone. </strong>  
            As sellers and developers, we experienced the frustration of slow manual research, expensive tools, and missing data.  
            So, we built a faster, smarter, and more affordable way to uncover product insights from Amazon in just minutes.
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8">
          <InfoCard
            icon={<Target className="w-10 h-10 text-blue-600" />}
            title="Our Mission"
            desc="To empower entrepreneurs, dropshippers, and business owners with reliable product data — without the high cost or complexity."
          />
          <InfoCard
            icon={<Rocket className="w-10 h-10 text-purple-600" />}
            title="Our Vision"
            desc="To become the most trusted and user-friendly Amazon data platform globally, helping people build, innovate, and grow."
          />
        </div>

        {/* Team Section */}
        <div className="text-center space-y-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Meet The Team
          </motion.h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We're a small but passionate group of developers, designers, and e-commerce enthusiasts
            working to make product research easier for everyone.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            <TeamCard name="Ryan Allanic" role="Founder & Developer" />
            <TeamCard name="Ryan Allanic" role="UI/UX Designer" />
            <TeamCard name="Ryan Allanic" role="Backend Engineer" />
          </div>
        </div>

        {/* Careers Section */}
        <motion.div
          className="bg-linear-to-br from-white/90 via-blue-50/60 to-blue-100/40 border border-white/40 shadow-lg backdrop-blur-md rounded-2xl p-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Careers</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Want to help build the future of e-commerce tools? We're looking for passionate
            developers, designers, and innovators to join our journey.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition"
          >
            🚀 Join Our Team
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* Reusable Info Card */
function InfoCard({ icon, title, desc }: any) {
  return (
    <motion.div
      className="flex flex-col items-center text-center p-8 bg-linear-to-br from-white/90 via-blue-50/70 to-blue-100/40 rounded-2xl border border-white/40 shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {icon}
      <h3 className="text-xl font-semibold text-gray-900 mt-4">{title}</h3>
      <p className="text-gray-700 mt-2">{desc}</p>
    </motion.div>
  );
}

/* Reusable Team Member Card */
function TeamCard({ name, role }: any) {
  return (
    <motion.div
      className="p-6 bg-linear-to-br from-white/90 via-blue-50/70 to-blue-100/50 rounded-2xl border border-white/40 shadow-md backdrop-blur-md hover:shadow-lg transition"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="w-16 h-16 rounded-full bg-linear-to-r from-blue-300 to-indigo-400 mx-auto mb-4" />
      <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
      <p className="text-gray-600 text-sm">{role}</p>
    </motion.div>
  );
}
