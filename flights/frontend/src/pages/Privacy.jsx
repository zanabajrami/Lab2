import React, { useEffect } from "react";

export default function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 ">
            {/* Header */}
            <header className="mb-14 text-center">

                <h1 className="text-3xl font-bold text-slate-800 mb-2 -mt-5">
                    Privacy Policy
                </h1>

                <p className="text-sm text-slate-500">
                    Last updated: <strong>December 9, 2025</strong>
                </p>
            </header>

            {/* Intro */}
            <section className="mb-10 max-w-2xl mx-auto text-center">
                <p className="text-gray-700 leading-relaxed bg-white p-6 rounded-2xl shadow-sm border">
                    This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
                </p>
            </section>

            {/* Table of contents */}
            <nav className="mb-14 max-w-4xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-blue-900 mb-4 ">
                    Contents
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
                    <li><a href="#information" className="hover:text-blue-600 transition">1. Information We Collect</a></li>
                    <li><a href="#use" className="hover:text-blue-600 transition">2. How We Use Information</a></li>
                    <li><a href="#sharing" className="hover:text-blue-600 transition">3. Sharing of Information</a></li>
                    <li><a href="#cookies" className="hover:text-blue-600 transition">4. Cookies & Tracking</a></li>
                    <li><a href="#security" className="hover:text-blue-600 transition">5. Data Security</a></li>
                    <li><a href="#rights" className="hover:text-blue-600 transition">6. Your Privacy Rights</a></li>
                    <li><a href="#changes" className="hover:text-blue-600 transition">7. Changes to This Policy</a></li>
                    <li><a href="#contact" className="hover:text-blue-600 transition"> Contact Us</a></li>
                </ul>
            </nav>

            {/* Content Sections */}
            <article className="space-y-10 max-w-5xl mx-auto">

                <section id="information" className="bg-white rounded-2xl shadow-md p-8 scroll-mt-24">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">
                        1. Information We Collect
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        We may collect personal information such as your name, email address, phone number, travel preferences, and payment details when you use our services. We also collect non-personal data like browser type, IP address, and usage patterns.
                    </p>
                </section>

                <section id="use" className="bg-white rounded-2xl shadow-md p-8 scroll-mt-24 border-l-4 border-blue-600">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">
                        2. How We Use Information
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        Your information is used to provide and improve our services, process bookings, communicate with you, and personalize your experience. We may also use your data for marketing purposes with your consent.
                    </p>
                </section>

                <section id="sharing" className="bg-white rounded-2xl shadow-md p-8 scroll-mt-24">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">
                        3. Sharing of Information
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        We do not sell your personal information. We may share it with trusted partners, such as airlines, hotels, and payment providers, solely to facilitate your bookings. Legal requirements may also obligate us to disclose information in certain cases.
                    </p>
                </section>

                <section id="cookies" className="bg-white rounded-2xl shadow-md p-8 scroll-mt-24 border-l-4 border-blue-900">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">
                        4. Cookies & Tracking
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        We use cookies, web beacons, and other tracking technologies to enhance your experience, understand user behavior, and improve our website performance. You can manage your cookie preferences in your browser settings.
                    </p>
                </section>

                <section id="security" className="bg-white rounded-2xl shadow-md p-8 scroll-mt-24">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">
                        5. Data Security
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        FlyHigh implements appropriate technical and organizational measures to protect your personal data. While we strive to protect your information, no method of transmission or storage is completely secure.
                    </p>
                </section>

                <section id="rights" className="bg-white rounded-2xl shadow-md p-8 scroll-mt-24 border-l-4 border-blue-600">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">
                        6. Your Privacy Rights
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        You may request access, correction, or deletion of your personal information. You can also opt out of marketing communications at any time by following the instructions in our emails or contacting us directly.
                    </p>
                </section>

                <section id="changes" className="bg-white rounded-2xl shadow-md p-8 scroll-mt-24">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">
                        7. Changes to This Policy
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        We may update this Privacy Policy periodically. Major changes will be communicated via our website. Continued use of FlyHigh constitutes acceptance of the updated policy.
                    </p>
                </section>

                <section id="contact" className="mt-16 bg-slate-100 border rounded-2xl p-10 scroll-mt-24">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">
                        Contact Us
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        For any questions about this Privacy Policy, please contact us through our official <strong>Contact Us</strong> form.
                    </p>
                    <p className="text-sm text-gray-500 mt-4 italic">
                        This page provides general information and is not professional legal advice.
                    </p>
                </section>

            </article>
        </div>
    );
}
