import React, { useState } from "react";

function Contact({ onClose }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("📧 Message sent!"); setFullName("");
        setEmail("");
        setMessage("");
        onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget && onClose) onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-4 backdrop-blur-sm animate-fadeIn"
            onClick={handleOverlayClick}
        >
            <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-md p-10 rounded-3xl bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 shadow-2xl text-gray-900 animate-slideUp border border-blue-200 overflow-hidden"
            >
                {/* Header */}
                <h2 className="text-3xl font-bold mb-4 text-center text-blue-900">
                    Contact us
                </h2>
                <p className="text-gray-600 mb-8 text-center text-sm">
                    Send us a message and we’ll get back to you quickly.
                </p>

                {/* Custom Floating Input */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="peer w-full p-4 rounded-2xl border-2 border-blue-200 bg-white/70 text-black font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 shadow-md transition-all duration-300 hover:shadow-lg"
                    />
                    <span className="absolute left-4 top-2 text-blue-900 font-semibold text-sm transition-all duration-300
                   peer-placeholder-shown:top-4 peer-placeholder-shown:text-blue-400 peer-placeholder-shown:text-base
                   peer-focus:top-0 peer-focus:text-blue-800 peer-focus:text-sm">
                        Full Name
                    </span>
                </div>

                <div className="relative mb-6">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="peer w-full p-4 rounded-2xl border-2 border-blue-200 bg-white/70 text-black font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 shadow-md transition-all duration-300 hover:shadow-lg"
                    />
                    <span className="absolute left-4 top-2 text-blue-900 font-semibold text-sm transition-all duration-300
                   peer-placeholder-shown:top-4 peer-placeholder-shown:text-blue-400 peer-placeholder-shown:text-base
                   peer-focus:top-0 peer-focus:text-blue-800 peer-focus:text-sm">
                        Email Address
                    </span>
                </div>

                <div className="relative mb-6">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows="4"
                        className="peer w-full p-4 rounded-2xl border-2 border-blue-200 bg-white/70 text-black font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 shadow-md transition-all duration-300 hover:shadow-lg resize-none"
                    />
                    <span className="absolute left-4 top-2 text-blue-900 font-semibold text-sm transition-all duration-300
                   peer-placeholder-shown:top-4 peer-placeholder-shown:text-blue-400 peer-placeholder-shown:text-base
                   peer-focus:top-0 peer-focus:text-blue-800 peer-focus:text-sm">
                        Your Message
                    </span>
                </div>


                {/* Submit Button */}
                <button
                    type="submit"
                    className="relative w-full py-3 rounded-2xl bg-blue-900 text-white font-bold overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 opacity-20 animate-pulse"></span>
                    <span className="relative">Send Message</span>
                </button>
            </form>
        </div>
    );
}

export default Contact;
