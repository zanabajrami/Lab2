import React, { useState, useEffect } from "react";
import { CircleUserRound } from "lucide-react";

function Account({ isOpen, onClose, userData, setUserData }) {
    const [yourPassword, setYourPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [error, setError] = useState("");
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // ✅ modal Log Out

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto"; // cleanup on unmount
        };
    }, [isOpen]);

    if (!isOpen || !userData) return null;

    const handleChangePassword = () => {
        if (!userData) return;

        if (yourPassword.trim() !== (userData.password || "").trim()) {
            setError("❌ Your password is incorrect!");
            return;
        }

        if (newPassword.trim().length < 8) {
            setError("⚠️ New password must be at least 8 characters!");
            return;
        }

        setUserData({
            ...userData,
            password: newPassword,
        });

        setIsChangingPassword(false);
        setYourPassword("");
        setNewPassword("");
        setError("");
        alert("✔️ Password updated successfully!");
    };

    const handleLogout = () => {
        setUserData(null); // mbyll account
        setShowLogoutConfirm(false);
        onClose();
        alert("✔️ You have been logged out!");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 animate-fadeIn">
            <div className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-3xl w-[95%] max-w-[500px] text-white text-xl shadow-xl shadow-black/70 border border-blue-700/50 transform transition-transform duration-300 hover:scale-[1.02]">                <div className="flex justify-center items-center w-full mb-3">
                <CircleUserRound
                    className="w-10 h-10 text-blue-400 cursor-pointer transition-all duration-300 hover:text-blue-200"
                />
            </div>
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-400 drop-shadow-md glow-label">
                    Your Account
                </h2>

                <p className="mb-3"><strong>First Name:</strong> {userData.firstName}</p>
                <p className="mb-3"><strong>Last Name:</strong> {userData.lastName}</p>
                <p className="mb-3"><strong>Email:</strong> {userData.email}</p>
                <p className="mb-3"><strong>Gender:</strong> {userData.gender}</p>
                <p className="mb-3"><strong>Birthday:</strong> {userData.birthday}</p>

                <div className="flex justify-between items-center mb-3">
                    <p><strong>Password:</strong> ••••••••</p>
                    <button
                        onClick={() => setIsChangingPassword(true)}
                        className="text-blue-400 underline text-sm hover:text-blue-200 transition-colors duration-200"
                    >
                        Change
                    </button>
                </div>

                {error && <p className="text-red-400 mb-2">{error}</p>}

                {isChangingPassword && (
                    <div className="mt-4 space-y-3">
                        <input
                            type="password"
                            className="w-full p-3 rounded-xl bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                            placeholder="Your Password"
                            value={yourPassword}
                            onChange={(e) => setYourPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className="w-full p-3 rounded-xl bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={handleChangePassword}
                                className="flex-1 bg-blue-600 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md text-white font-semibold animate-pulseButton"
                            >
                                Save New Password
                            </button>
                            <button
                                onClick={() => setIsChangingPassword(false)}
                                className="flex-1 bg-gray-700/50 border border-gray-600 py-2 rounded-xl hover:bg-gray-600 transition-colors duration-300 shadow-md text-blue-400 font-semibold"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* ✅ Log Out Button */}
                <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="mt-6 w-full bg-red-600/70 border border-red-500 py-2 rounded-xl hover:bg-red-700 transition-colors duration-300 shadow-lg text-white font-semibold"
                >
                    Log Out
                </button>

                <button
                    onClick={onClose}
                    className="mt-3 w-full bg-gray-900/50 border border-blue-600 py-2 rounded-xl hover:bg-blue-900 transition-colors duration-300 shadow-lg text-blue-400 font-semibold"
                >
                    Close
                </button>

                {/* ✅ Modal për konfirmim Log Out */}
                {showLogoutConfirm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-60">
                        <div className="bg-gray-800 p-6 rounded-3xl w-full max-w-[350px] text-center text-white shadow-lg">
                            <p className="mb-4 text-blue-400 font-semibold">Are you sure you want to log out?</p>
                            <div className="flex justify-between gap-4">
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 py-2 bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="flex-1 py-2 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <style>{`
                    @keyframes fadeIn {
                        0% { opacity: 0; }
                        100% { opacity: 1; }
                    }
                    .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
                    .glow-label { text-shadow: 0 0 12px rgba(99,123,163,0.9); }
                    @keyframes pulseButton {
                        0%,100% { box-shadow: 0 0 10px rgba(59,130,246,0.4); }
                        50% { box-shadow: 0 0 20px rgba(59,130,246,0.7); }
                    }
                    .animate-pulseButton { animation: pulseButton 2s infinite; }
                `}</style>
            </div>
        </div>
    );
}

export default Account;
