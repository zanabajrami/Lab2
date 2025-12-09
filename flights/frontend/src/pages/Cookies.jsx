import React, { useState, useEffect } from "react";

export default function CookiePolicy() {
    const [modalOpen, setModalOpen] = useState(false);
    const [, setBannerVisible] = useState(false);
    const [preferences, setPreferences] = useState({
        performance: true,
        advertising: true,
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });

        const decision = localStorage.getItem("cookieDecision");
        if (!decision) {
            setModalOpen(true); // hap modal automatikisht herën e parë
        } else {
            const savedPrefs = localStorage.getItem("cookiePreferences");
            if (savedPrefs) setPreferences(JSON.parse(savedPrefs));
        }

        // Banner-i shfaqet gjithmonë, përveç kur modal është i hapur
        setBannerVisible(true);
    }, []);

    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [modalOpen]);

    const handleSavePreferences = () => {
        localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
        localStorage.setItem("cookieDecision", "set");
        alert("Your cookie preferences have been saved.");
        setModalOpen(false);
    };

    const handleAcceptAll = () => {
        const allPrefs = { performance: true, advertising: true };
        setPreferences(allPrefs);
        localStorage.setItem("cookiePreferences", JSON.stringify(allPrefs));
        localStorage.setItem("cookieDecision", "set");
        alert("All cookies have been accepted.");
        setModalOpen(false);
    };

    const togglePreference = (type) => {
        setPreferences((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-16 relative">
            <header className="mb-5 text-center">

                <h1 className="text-3xl font-bold text-slate-800 mb-2 -mt-5">
                    Cookie Policy
                </h1>

                <p className="text-sm text-slate-500">
                    Last updated: <strong>December 9, 2025</strong>
                </p>
            </header>
            <section className="mb-10 max-w-2xl mx-auto text-center">
                <p className="text-gray-700 leading-relaxed bg-white p-6 rounded-2xl shadow border border-gray-200">
                    This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
                </p>
            </section>

            <article className="space-y-10">
                <section className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">
                        1. What Are Cookies?
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-sm">
                        Cookies are small text files stored on your device when you visit a website.
                        They help the website recognize your device and remember your preferences.
                    </p>
                </section>

                <section className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">
                        2. How We Use Cookies
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-sm">
                        We use cookies to ensure proper website functionality, understand how visitors interact
                        with our site, and deliver relevant and personalized content.
                    </p>
                </section>

                <section className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">
                        3. Your Cookie Choices
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-sm mb-4">
                        You can manage your cookie preferences at any time. You may choose to accept all cookies
                        or customize your preferences based on your comfort level.
                    </p>

                    <button
                        onClick={() => setModalOpen(true)}
                        className="px-6 py-3 rounded-2xl bg-blue-700 text-white font-semibold shadow-md hover:bg-blue-800 transition"
                    >
                        Manage Cookie Preferences
                    </button>
                </section>

                <section className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">
                        Contact Us
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-sm">
                        If you have any questions about our Cookie Policy, please reach out through
                        our official <strong>Contact Us</strong> form.
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
                        <div className="mt-6 flex justify-between items-center">
                            <button
                                onClick={handleAcceptAll}
                                className="px-4 py-2 rounded-2xl bg-blue-900 text-white hover:bg-blue-600 transition-colors"
                            >
                                Accept All
                            </button>
                            <div className="space-x-3">
                                <button
                                    onClick={() => setModalOpen(false)}
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
                            onClick={() => setModalOpen(false)}
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
