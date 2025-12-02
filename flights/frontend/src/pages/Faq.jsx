import React, { useEffect } from "react";

export default function FAQ({ onShowContact }) {
    const faqs = [
        {
            question: "How do I book a flight?",
            answer: "To book a flight, navigate to the Flight Booking section, select your departure and destination cities, choose dates, and pick your preferred flight. Follow the prompts to enter passenger details and payment information."
        },
        {
            question: "Can I cancel my booking?",
            answer: "Yes, you can cancel your booking through the Flight Cancellation page. Keep in mind that some tickets may have restrictions or fees depending on the airline's policy."
        },
        {
            question: "What is the baggage allowance?",
            answer: "Baggage allowance depends on your ticket type. Typically, economy class includes 1 carry-on and 1 checked bag. Check the Baggage Allowance page for detailed rules and weight limits for each airline."
        },
        {
            question: "How do I send a message to the admin?",
            answer: "You can fill out our 'Contact Us' form with your name, email, and message. Our support team will respond within 24 hours."
        },
        {
            question: "Can I chat with someone instantly?",
            answer: "Yes! Use the Live Chat feature to talk directly with our staff or support bot in real-time."
        },
        {
            question: "Do you offer membership benefits?",
            answer: "Yes! Members enjoy exclusive discounts, priority support, and access to last-minute deals. Visit the Membership page to join and see all benefits."
        },
        {
            question: "Are there any hidden fees?",
            answer: "No. All taxes and standard fees are displayed during the booking process. Additional fees for services like extra baggage will be clearly indicated."
        },
        {
            question: "Is my payment secure?",
            answer: "Absolutely. All payments are encrypted and processed through secure gateways. We do not store your payment information on our servers."
        },
        {
            question: "Do you offer refunds?",
            answer: "Refund policies vary depending on the airline and ticket type. You can check the refund eligibility on the Flight Cancellation page or contact support for guidance."
        }
    ];

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">
                Frequently Asked Questions
            </h1>
            <p className="text-center text-gray-700 mb-12">
                Find answers to the most common questions about bookings, memberships, support, and travel policies.
            </p>

            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <details key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition-shadow duration-300">
                        <summary className="cursor-pointer text-lg font-medium text-blue-900">
                            {faq.question}
                        </summary>
                        <p className="mt-3 text-gray-700">{faq.answer}</p>
                    </details>
                ))}
            </div>

            <section className="mt-16 text-center">
                <h2 className="text-2xl font-semibold mb-4 text-blue-800">Need More Help?</h2>
                <p className="text-gray-700 mb-4">
                    If you can't find the answer here, please contact our support team using the "Contact Us" form. We are happy to assist you.
                </p>
                <button
                    onClick={onShowContact}
                    className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-lg"

                >
                    Go to Contact Form
                </button>
            </section>
        </div>
    );
}
