import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const formatDateForInput = (date) => {
    if (!date) return "";

    //"YYYY-MM-DD"
    if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date;
    }

    // nëse vjen si string → merr vetëm pjesën e datës
    return date.split("T")[0];
};

export default function EditUserModal({ user, onClose, onSuccess }) {
    const [editData, setEditData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role: "user",
        birthday: "",
        gender: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            const first_name =
                user.first_name || user.username?.split(" ")[0] || "";
            const last_name =
                user.last_name || user.username?.split(" ").slice(1).join(" ") || "";

            setEditData({
                first_name,
                last_name,
                email: user.email || "",
                role: user.role || "user",
                birthday: formatDateForInput(user.birthday),
                gender: user.gender || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:8800/api/users/${user.id}`,
                editData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onSuccess(); // rifreskon listën
            onClose();   // mbyll modalin
        } catch (err) {
            console.error("Failed to update user:", err);
            alert(err.response?.data?.message || "Failed to update user.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden transform transition-all">

                {/* HEADER */}
                <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Edit User</h2>
                        <p className="text-slate-500 text-sm mt-1">Update user information and profile details.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-8 space-y-5">

                    {/* First & Last Name */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={editData.first_name}
                                onChange={handleChange}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={editData.last_name}
                                onChange={handleChange}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={editData.email}
                            onChange={handleChange}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Birthday & Gender */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Birthday</label>
                            <input
                                type="date"
                                name="birthday"
                                value={editData.birthday}
                                onChange={handleChange}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Gender</label>
                            <select
                                name="gender"
                                value={editData.gender}
                                onChange={handleChange}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all"
                            >
                                <option value="">Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                    </div>

                    {/* Role */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Role</label>
                        <select
                            name="role"
                            value={editData.role}
                            onChange={handleChange}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all"
                        >
                            <option value="user">Standard User</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="px-6 py-3 rounded-xl bg-slate-950 text-white font-bold text-sm hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                        >
                            {loading ? "Updating..." : "Save Changes"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
