"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is Inabanga?",
    answer:
      "Inabanga is a scraping and research tool for Amazon products, helping sellers find profitable items faster with automation."
  },
  {
    question: "Is scraping Amazon allowed?",
    answer:
      "We collect publicly available data responsibly. However, you should still comply with Amazon's policies and regional regulations."
  },
  {
    question: "Do I need coding knowledge?",
    answer:
      "No — Inabanga is built for beginners and professionals. Just pick a category, click scrape, and export your data."
  },
  {
    question: "What file formats can I export?",
    answer:
      "You can export to Excel, CSV, JSON, or PDF depending on your preference."
  }
];

export default function FAQ() {
  return (
    <section className="relative min-w-full min-h-screen py-24 bg-white overflow-hidden">
      {/* Decorative linear blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-200/40 rounded-full blur-3xl opacity-50" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 space-y-20">
        {/* Page Header */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h1>

        {/* FAQ Cards */}
        <div className="grid gap-6 md:gap-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="p-6 sm:p-8 bg-linear-to-br from-white/90 via-blue-50/60 to-blue-100/40 
              rounded-2xl border border-white/50 shadow-lg backdrop-blur-lg hover:shadow-xl 
              transition-all"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-start gap-4">
                <HelpCircle className="w-6 h-6 text-blue-600 shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-gray-700">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
