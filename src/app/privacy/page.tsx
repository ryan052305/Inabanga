"use client";

import { useRouter } from "next/navigation";


export default function PrivacyPage() {
    const router = useRouter();

    return (
        <section className="w-full bg-white text-gray-800 py-16 px-6">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <header className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-2 text-gray-900">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-500">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </header>

                {/* Body */}
                <div className="space-y-10 leading-relaxed text-gray-700">
                    {/* Intro */}
                    <section>
                        <p>
                            Welcome to <span className="font-semibold">Inabanga</span>. Your
                            privacy is important to us. This Privacy Policy explains how we
                            collect, use, and protect your information when you use our
                            application.
                        </p>
                    </section>

                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            1. Information We Collect
                        </h2>
                        <p>
                            Inabanga may collect limited personal information to provide you
                            with our scraping and analytics services. This may include:
                        </p>
                        <ul className="list-disc list-inside mt-3 space-y-1">
                            <li>Email address or login credentials (if applicable)</li>
                            <li>Usage data such as selected categories and scrape frequency</li>
                            <li>Browser information and general usage statistics</li>
                        </ul>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            2. How We Use Your Information
                        </h2>
                        <p>The information we collect is used solely to:</p>
                        <ul className="list-disc list-inside mt-3 space-y-1">
                            <li>Enable and maintain your access to Inabanga</li>
                            <li>Improve scraping accuracy and performance</li>
                            <li>Communicate service updates and support messages</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            3. Data Protection
                        </h2>
                        <p>
                            We take your privacy seriously. All stored data is protected with
                            industry-standard security measures. We never sell or share your
                            personal data with third parties, except as required by law.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            4. Cookies and Tracking
                        </h2>
                        <p>
                            Inabanga may use cookies to enhance your experience and analyze app
                            performance. You can disable cookies in your browser settings if
                            you prefer.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            5. Third-Party Services
                        </h2>
                        <p>
                            We may integrate third-party APIs or analytics tools (such as
                            Amazon or Stripe payment gateway). These services have their own privacy
                            policies, which we encourage you to review.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            6. Your Rights
                        </h2>
                        <p>
                            You have the right to access, modify, or delete your data. If
                            you’d like to request data deletion or have privacy concerns,
                            contact us directly at{" "}
                            <a
                                href="mailto:inabangasupport@gmail.com"
                                className="text-blue-600 hover:underline"
                            >
                                inabangasupport@gmail.com
                            </a>
                            .
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            7. Policy Updates
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time. Any updates
                            will be posted on this page with an updated “Last Updated” date.
                        </p>
                    </section>

                    {/* Closing */}
                    <section>
                        <p>
                            By using Inabanga, you agree to this Privacy Policy. If you do not
                            agree, please discontinue use of our service.
                        </p>
                    </section>

                </div>
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 inline-flex mt-5 items-center text-sm text-blue-600 border-2 px-5 py-3 rounded-2xl hover:text-blue-700 transition-colors"
                >
                    ← Back
                </button>
            </div>
        </section>
    );
}
