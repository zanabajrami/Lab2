import React, { useState, useEffect } from "react";

export default function CookiesModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const [bannerVisible, setBannerVisible] = useState(false);
    const [preferences, setPreferences] = useState({
        performance: false,
        advertising: false,
    });

    useEffect(() => {
        setBannerVisible(true);

        const decision = localStorage.getItem("cookieDecision");

        if (decision !== "set") {
            setModalOpen(true);
        }

        // Gjithmonë fillon me false
        setPreferences({
            performance: false,
            advertising: false,
        });
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
        setModalOpen(false);
        setBannerVisible(false);
    };

    const handleAcceptAll = () => {
        const allPrefs = { performance: true, advertising: true };
        setPreferences(allPrefs);
        localStorage.setItem("cookiePreferences", JSON.stringify(allPrefs));
        localStorage.setItem("cookieDecision", "set");
        setModalOpen(false);
        setBannerVisible(false);
    };

    const togglePreference = (type) => {
        setPreferences((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    return (
        <>
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
                            <button
                                onClick={handleSavePreferences}
                                className="px-4 py-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-800 transition-colors"
                            >
                                Save
                            </button>
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

            {/* Banner */}
            {bannerVisible && !modalOpen && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center justify-between max-w-3xl w-full z-40">
                    <span>This website uses cookies to improve your experience.</span>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="ml-4 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 transition"
                    >
                        Manage Cookies
                    </button>
                </div>
            )}
        </>
    );
}
