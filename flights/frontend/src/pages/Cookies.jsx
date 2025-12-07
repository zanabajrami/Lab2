import React, { useState, useEffect } from "react";

export default function CookiePolicy() {
    const [modalOpen, setModalOpen] = useState(false);
    const [preferences, setPreferences] = useState({
        performance: true,
        advertising: true,
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
        // Ngarko preferencat nga localStorage
        const savedPrefs = localStorage.getItem("cookiePreferences");
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }
    }, []);

    const lastUpdated = "December 7, 2025";

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleManageCookies = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleSavePreferences = () => {
        localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
        alert("Your cookie preferences have been saved.");
        setModalOpen(false);
    };

    const handleAcceptAll = () => {
        const allPrefs = { performance: true, advertising: true };
        setPreferences(allPrefs);
        localStorage.setItem("cookiePreferences", JSON.stringify(allPrefs));
        alert("All cookies have been accepted.");
        setModalOpen(false);
    };

    const togglePreference = (type) => {
        setPreferences((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-16 relative">
            <header className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-blue-900 mb-3 -mt-5">Cookie Policy</h1>
                <p className="text-sm text-gray-500">
                    Last updated: <strong>{lastUpdated}</strong>
                </p>
            </header>

            {/* Table of Contents */}
            <section className="mb-10 border-l-4 border-blue-400 pl-4">
                <h2 className="text-xl font-semibold text-blue-900 mb-3">Table of Contents</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>
                        <button
                            className="text-blue-700 hover:underline"
                            onClick={() => scrollToSection("cookies")}
                        >
                            1. What Are Cookies?
                        </button>
                    </li>
                    <li>
                        <button
                            className="text-blue-700 hover:underline"
                            onClick={() => scrollToSection("usage")}
                        >
                            2. How We Use Cookies
                        </button>
                    </li>
                    <li>
                        <button
                            className="text-blue-700 hover:underline"
                            onClick={() => scrollToSection("control")}
                        >
                            3. Managing Cookies
                        </button>
                    </li>
                    <li>
                        <button
                            className="text-blue-700 hover:underline"
                            onClick={() => scrollToSection("contact")}
                        >
                            4. Contact Us
                        </button>
                    </li>
                </ul>
            </section>

            <article className="prose prose-lg max-w-none prose-blue">
                <section id="cookies" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">1. What Are Cookies?</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Cookies are small text files stored on your device when you visit a website. They help improve your browsing experience, remember preferences, and provide analytics to the site owner.
                    </p>
                </section>

                <section id="usage" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">2. How We Use Cookies</h3>
                    <p className="text-gray-700 leading-relaxed">
                        We use cookies to enhance website functionality, analyze traffic, and deliver personalized content. This includes essential cookies, performance cookies, and advertising cookies.
                    </p>
                </section>

                <section id="control" className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">3. Managing Cookies</h3>
                    <p className="text-gray-700 leading-relaxed">
                        You can manage or disable cookies via your browser settings. Note that disabling certain cookies may affect website functionality and user experience.
                    </p>
                    <button
                        onClick={handleManageCookies}
                        className="mt-4 px-5 py-2 rounded-2xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-800 transition-colors"
                    >
                        Manage Cookies
                    </button>
                </section>

                <section id="contact" className="mt-16 border-t pt-10">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Contact Us</h3>
                    <p className="text-gray-700 leading-relaxed">
                        For any questions about this Cookie Policy, please contact us through our official <strong>Contact Us</strong> form.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        <em>This page provides general information and is not professional legal advice.</em>
                    </p>
                </section>
            </article>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-lg">
                        <h3 className="text-xl font-semibold text-blue-900 mb-4">Cookie Preferences</h3>
                        <div className="space-y-3">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" checked disabled />
                                <span>Essential Cookies (Always Active)</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={preferences.performance}
                                    onChange={() => togglePreference("performance")}
                                />
                                <span>Performance Cookies</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={preferences.advertising}
                                    onChange={() => togglePreference("advertising")}
                                />
                                <span>Advertising Cookies</span>
                            </label>
                        </div>
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={handleAcceptAll}
                                className="px-4 py-2 rounded-2xl bg-blue-900 text-white hover:bg-green-800 transition-colors"
                            >
                                Accept All
                            </button>
                            <div className="space-x-3">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 rounded-2xl bg-gray-300 hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSavePreferences}
                                    className="px-4 py-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-800 transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
