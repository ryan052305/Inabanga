"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder: connect this to FastAPI or an email service later
        alert("Your message has been sent successfully!");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <section className="w-full bg-white text-gray-800 py-16 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 inline-flex mt-5 items-center text-sm text-blue-600 border-2 px-5 py-3 rounded-2xl hover:text-blue-700 transition-colors"
                >
                    ← Back
                </button>

                {/* Header */}
                <header className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-2 text-gray-900">
                        Contact Us
                    </h1>
                    <p className="text-gray-500">
                        Have questions, feedback, or partnership ideas? We’d love to hear from you.
                    </p>
                </header>

                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-sm space-y-6"
                >
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Write your message here..."
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Send Message
                        </button>
                    </div>
                </form>

                {/* Extra Info */}
                <div className="mt-12 text-center md:text-left space-y-3 text-gray-700">
                    <p>
                        📧 Email us directly at{" "}
                        <a
                            href="mailto:inabangasupport@gmail.com"
                            className="text-blue-600 hover:underline"
                        >
                             inabangasupport@gmail.com
                        </a>
                    </p>
                    <p>
                        💬 We typically respond within 12-24 hours.
                    </p>
                </div>
            </div>
        </section>
    );
}
