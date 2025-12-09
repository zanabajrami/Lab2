import React, { useEffect } from "react";

export default function Terms() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const lastUpdated = new Date().toLocaleDateString();

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <header className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-3 -mt-5">Terms & Conditions</h1>
                <p className="text-sm text-gray-500">
                    Last updated: <strong>December 9, 2025</strong>
                </p>
            </header>

            {/* Intro */}
            <section className="mb-8">
                <p className="text-gray-700 leading-relaxed">
                    Welcome to <span className="font-semibold">FlyHigh Agency</span>. These Terms & Conditions explain how to use our website and services.
                    The text below is written in plain language to help you understand what to expect when you search, compare, or book flights through our platform.
                </p>
            </section>

            {/* Table of contents */}
            <nav className="mb-10 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-900 mb-3">Contents</h2>
                <ul className="space-y-2 text-gray-700">
                    <li><a href="#acceptance" className="hover:text-blue-600">Acceptance</a></li>
                    <li><a href="#booking" className="hover:text-blue-600">Booking Process</a></li>
                    <li><a href="#payments" className="hover:text-blue-600">Payments & Billing</a></li>
                    <li><a href="#cancellations" className="hover:text-blue-600">Cancellations & Refunds</a></li>
                    <li><a href="#membership" className="hover:text-blue-600">Memberships & Deals</a></li>
                    <li><a href="#responsibilities" className="hover:text-blue-600">User Responsibilities</a></li>
                    <li><a href="#availability" className="hover:text-blue-600">Platform Availability</a></li>
                    <li><a href="#accuracy" className="hover:text-blue-600">Accuracy of Information</a></li>
                    <li><a href="#liability" className="hover:text-blue-600">Liability</a></li>
                    <li><a href="#changes" className="hover:text-blue-600">Changes to Terms</a></li>
                </ul>
            </nav>

            {/* Sections */}
            <article className="prose prose-lg max-w-none prose-blue">
                <section id="acceptance" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">1. Acceptance</h3>
                    <p className="text-gray-700 leading-relaxed">
                        By accessing or using FlyHigh, you acknowledge that you have read and agreed to these Terms & Conditions. If you do not accept any part of these terms, please discontinue the use of our services. Our platform is intended exclusively for lawful and legitimate travel planning and booking activities.
                    </p>
                </section>

                {/* 2. Booking Process */}
                <section id="booking" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">2. Booking Process</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        FlyHigh enables you to search, compare, and book flights directly through our integrated booking system. We aim to offer a seamless and efficient reservation experience without redirection to external sites.
                    </p>

                    <ul className="list-disc ml-6 text-gray-700 space-y-2">
                        <li>Search flights using our real-time global search engine.</li>
                        <li>Compare airlines, fares, schedules, and travel options.</li>
                        <li>Enter accurate traveler details and proceed with secure payment.</li>
                        <li>Receive instant booking confirmation once payment is verified.</li>
                    </ul>
                </section>

                {/* 3. Payments */}
                <section id="payments" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">3. Payments & Billing</h3>

                    <p className="text-gray-700 leading-relaxed">
                        FlyHigh provides a secure and fully integrated payment experience directly on our
                        platform. All transactions are completed through our built-in payment form, which
                        uses advanced encryption and industry-standard security protocols to protect your
                        information.
                    </p>

                    <p className="text-gray-700 leading-relaxed mt-3">
                        We do not store sensitive payment card details. All card information is processed
                        safely by our certified payment partners. The final amount shown during checkout
                        includes all applicable taxes, service fees, and any optional add-ons you choose
                        during the booking process.
                    </p>

                    <p className="text-gray-700 leading-relaxed mt-3">
                        Once your payment is successfully completed, you will instantly receive your
                        booking confirmation.
                    </p>
                </section>

                {/* 4. Cancellations & Refunds */}
                <section id="cancellations" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">4. Cancellations & Refunds</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        Airline-specific rules apply to cancellations, refunds, and modifications. Some fares are non‑refundable, while others may allow limited changes. FlyHigh will assist where possible, but refund approval depends on the airline or booking provider.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Users should review fare rules before completing a reservation to avoid unexpected restrictions.
                    </p>
                </section>

                {/* 5. Memberships */}
                <section id="membership" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">5. Memberships & Deals</h3>
                    <p className="text-gray-700 leading-relaxed">
                        FlyHigh may offer optional membership programs that include benefits such as exclusive discounts, travel perks, or early access to promotions. Membership details, charges, renewal terms, and cancellation rules are clearly provided within your membership dashboard.
                    </p>
                </section>

                {/* 6. User Responsibilities */}
                <section id="responsibilities" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">6. User Responsibilities</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        You agree to use FlyHigh responsibly and honestly. This includes providing accurate traveler information, respecting airline rules, and avoiding harmful activities such as fraud, scraping, unauthorized data extraction, or attempts to disrupt platform operations.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Violations may result in temporary or permanent account suspension.
                    </p>
                </section>


                {/* 7. Platform Availability */}
                <section id="availability" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">7. Platform Availability</h3>
                    <p className="text-gray-700 leading-relaxed">
                        While we strive for continuous service availability, occasional downtime may occur due to updates, maintenance, or technical issues. FlyHigh will make reasonable efforts to minimize disruptions and keep users informed where possible.
                    </p>
                </section>


                {/* 8. Accuracy of Information */}
                <section id="accuracy" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">8. Accuracy of Information</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Flight pricing, availability, and schedules are updated directly from airline or partner systems. Although we aim to provide accurate and up‑to‑date information, occasional discrepancies may occur due to rapid changes in inventory. Please review details carefully before completing your booking.
                    </p>
                </section>

                {/* 9. Limitation of Liability */}
                <section id="liability" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">9. Limitation of Liability</h3>
                    <p className="text-gray-700 leading-relaxed">
                        FlyHigh functions as a booking platform and is not the direct provider of transportation services. To the fullest extent permitted by law, we are not responsible for airline operational issues, delays, lost baggage, travel disruptions, visa complications, or other matters controlled by third‑party providers.
                    </p>
                </section>


                {/* 10. Changes to Terms */}
                <section id="changes" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">10. Changes to Terms</h3>
                    <p className="text-gray-700 leading-relaxed">
                        We may revise these Terms & Conditions periodically to reflect improvements, legal requirements, or updates to our services. When major changes occur, we will make reasonable efforts to notify users. Continued use of the platform implies acceptance of the revised terms.
                    </p>
                </section>


                {/* Contact */}
                <section className="mt-16 border-t pt-10">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Contact Us</h3>
                    <p className="text-gray-700 leading-relaxed">
                        For any questions or concerns regarding these Terms & Conditions, feel free to reach out through our official <strong>Contact Us</strong> form.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        <em>This page provides general, simplified legal information and is not intended as professional legal advice.</em>
                    </p>
                </section>
            </article>
        </div>
    );
}
