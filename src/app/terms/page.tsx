"use client";

import { useRouter } from "next/navigation";

export default function TermsPage() {
    const router = useRouter();

    return (
        <section className="w-full bg-white text-gray-800 py-16 px-6">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <header className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-2 text-gray-900">
                        Terms of Service
                    </h1>
                    <p className="text-gray-500">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </header>

                {/* Body */}
                <div className="space-y-10 leading-relaxed text-gray-700">
                    <section>
                        <p>
                            Welcome to <span className="font-semibold">Inabanga</span>. These
                            Terms of Service (“Terms”) govern your access and use of the
                            Inabanga application, tools, and services. By using Inabanga, you
                            agree to these Terms in full.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            1. Use of Our Service
                        </h2>
                        <p>
                            Inabanga provides tools for Amazon product research, price
                            tracking, and analytics. You agree to use the service only for
                            lawful purposes and in compliance with all applicable laws and
                            regulations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            2. Account Responsibilities
                        </h2>
                        <p>
                            If you create an account, you are responsible for maintaining the
                            confidentiality of your login information. You agree to notify us
                            immediately of any unauthorized access to your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            3. Acceptable Use
                        </h2>
                        <p>
                            You agree not to misuse Inabanga or attempt to disrupt its
                            functionality. This includes:
                        </p>
                        <ul className="list-disc list-inside mt-3 space-y-1">
                            <li>Interfering with or overloading our servers</li>
                            <li>Attempting to access data without authorization</li>
                            <li>Using automated systems for non-approved scraping</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            4. Data and Accuracy
                        </h2>
                        <p>
                            Inabanga retrieves publicly available product data from Amazon. We
                            do not guarantee that all data is accurate, up to date, or
                            complete. Use the information at your own discretion.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            5. Payment and Access
                        </h2>
                        <p>
                            Certain features of Inabanga may require payment. All fees are
                            non-refundable unless required by law. Access may be suspended if
                            payments are overdue or fraudulent activity is detected.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            6. Intellectual Property
                        </h2>
                        <p>
                            All branding, UI design, and proprietary logic within Inabanga are
                            protected intellectual property. You may not reproduce, modify, or
                            redistribute any part of the app without permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            7. Limitation of Liability
                        </h2>
                        <p>
                            Inabanga is provided “as is” without warranties of any kind. We
                            are not liable for any damages or losses arising from your use of
                            the service, including data inaccuracies or downtime.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            8. Termination
                        </h2>
                        <p>
                            We reserve the right to suspend or terminate your account if you
                            violate these Terms or misuse the service. Upon termination, all
                            rights granted to you under these Terms will end immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            9. Changes to Terms
                        </h2>
                        <p>
                            We may update these Terms periodically. Any changes will be posted
                            on this page with an updated “Last Updated” date. Continued use of
                            Inabanga means you accept the new Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                            10. Contact Us
                        </h2>
                        <p>
                            For questions about these Terms, contact us at{" "}
                            <a
                                href="mailto:inabangasupport@gmail.com"
                                className="text-blue-600 hover:underline"
                            >
                                inabangasupport@gmail.com
                            </a>
                            .
                        </p>
                    </section>

                    <section>
                        <p>
                            By using Inabanga, you acknowledge that you have read and agreed
                            to these Terms of Service.
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
