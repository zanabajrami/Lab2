import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react"; // Për butonin mbyllës

export default function EditUserModal({ user, onClose, onSuccess, token }) {
    const [editData, setEditData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role: "user"
    });

    useEffect(() => {
        if (user) {
            setEditData({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                role: user.role || "user"
            });
        }
    }, [user]);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8800/api/users/${user.id}`, editData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onSuccess(); // Rifreskon listën te Users.jsx
            onClose();   // Mbyll modalin
        } catch (err) {
            alert("Failed to update user.");
        }
    };

    if (!user) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden transform transition-all">

                {/* Header */}
                <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Edit Profile</h2>
                        <p className="text-slate-500 text-sm mt-1">Update user information.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">First Name</label>
                            <input
                                type="text"
                                value={editData.first_name}
                                onChange={(e) => setEditData({ ...editData, first_name: e.target.value })}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Last Name</label>
                            <input
                                type="text"
                                value={editData.last_name}
                                onChange={(e) => setEditData({ ...editData, last_name: e.target.value })}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                        <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Permissions</label>
                        <select
                            value={editData.role}
                            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none"
                        >
                            <option value="user">Standard User</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdate}
                            className="px-6 py-3 rounded-xl bg-slate-950 text-white font-bold text-sm hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}