import React, { useEffect } from "react";

export default function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const lastUpdated = new Date().toLocaleDateString();

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <header className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-3 -mt-5">Privacy Policy</h1>
                <p className="text-sm text-gray-500">
                    Last updated: <strong>December 9, 2025</strong>
                </p>
            </header>

            {/* Intro */}
            <section className="mb-8">
                <p className="text-gray-700 leading-relaxed">
                    Welcome to <span className="font-semibold">FlyHigh Agency</span>. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
                </p>
            </section>

            {/* Table of contents */}
            <nav className="mb-10 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-900 mb-3">Contents</h2>
                <ul className="space-y-2 text-gray-700">
                    <li><a href="#information" className="hover:text-blue-600">1. Information We Collect</a></li>
                    <li><a href="#use" className="hover:text-blue-600">2. How We Use Information</a></li>
                    <li><a href="#sharing" className="hover:text-blue-600">3. Sharing of Information</a></li>
                    <li><a href="#cookies" className="hover:text-blue-600">4. Cookies & Tracking</a></li>
                    <li><a href="#security" className="hover:text-blue-600">5. Data Security</a></li>
                    <li><a href="#rights" className="hover:text-blue-600">6. Your Privacy Rights</a></li>
                    <li><a href="#changes" className="hover:text-blue-600">7. Changes to This Policy</a></li>
                    <li><a href="#contact" className="hover:text-blue-600">8. Contact Us</a></li>
                </ul>
            </nav>

            {/* Sections */}
            <article className="prose prose-lg max-w-none prose-blue">

                {/* 1. Information We Collect */}
                <section id="information" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">1. Information We Collect</h3>
                    <p className="text-gray-700 leading-relaxed">
                        We may collect personal information such as your name, email address, phone number, travel preferences, and payment details when you use our services. We also collect non-personal data like browser type, IP address, and usage patterns.
                    </p>
                </section>

                {/* 2. How We Use Information */}
                <section id="use" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">2. How We Use Information</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Your information is used to provide and improve our services, process bookings, communicate with you, and personalize your experience. We may also use your data for marketing purposes with your consent.
                    </p>
                </section>

                {/* 3. Sharing of Information */}
                <section id="sharing" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">3. Sharing of Information</h3>
                    <p className="text-gray-700 leading-relaxed">
                        We do not sell your personal information. We may share it with trusted partners, such as airlines, hotels, and payment providers, solely to facilitate your bookings. Legal requirements may also obligate us to disclose information in certain cases.
                    </p>
                </section>

                {/* 4. Cookies & Tracking */}
                <section id="cookies" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">4. Cookies & Tracking</h3>
                    <p className="text-gray-700 leading-relaxed">
                        We use cookies, web beacons, and other tracking technologies to enhance your experience, understand user behavior, and improve our website performance. You can manage your cookie preferences in your browser settings.
                    </p>
                </section>

                {/* 5. Data Security */}
                <section id="security" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">5. Data Security</h3>
                    <p className="text-gray-700 leading-relaxed">
                        FlyHigh implements appropriate technical and organizational measures to protect your personal data. While we strive to protect your information, no method of transmission or storage is completely secure.
                    </p>
                </section>

                {/* 6. Your Privacy Rights */}
                <section id="rights" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">6. Your Privacy Rights</h3>
                    <p className="text-gray-700 leading-relaxed">
                        You may request access, correction, or deletion of your personal information. You can also opt out of marketing communications at any time by following the instructions in our emails or contacting us directly.
                    </p>
                </section>

                {/* 7. Changes to This Policy */}
                <section id="changes" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">7. Changes to This Policy</h3>
                    <p className="text-gray-700 leading-relaxed">
                        We may update this Privacy Policy periodically. Major changes will be communicated via our website. Continued use of FlyHigh constitutes acceptance of the updated policy.
                    </p>
                </section>

                {/* 8. Contact Us */}
                <section id="contact" className="mt-16 border-t pt-10">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Contact Us</h3>
                    <p className="text-gray-700 leading-relaxed">
                        For any questions about this Privacy Policy, please contact us through our official <strong>Contact Us</strong> form.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        <em>This page provides general information and is not professional legal advice.</em>
                    </p>
                </section>
            </article>
        </div>
    );
}
