import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, Loader2, Globe, CreditCard, Calendar, Phone, Save, Mail, Fingerprint } from "lucide-react";

export default function AddPassenger({ onClose, onAdded }) {
    const [bookings, setBookings] = useState([]);
    const [formData, setFormData] = useState({
        booking_code: "",
        booking_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        passport_number: "",
        birthday: "",
        nationality: ""
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Block scroll kur hapet modali
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    // --- Fetch booking codes ---
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:8800/api/bookings/codes", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookings(res.data);
            } catch (err) {
                console.error("Error fetching booking codes:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!formData.booking_code || !formData.booking_id) {
            alert("Please select a booking first!");
            return;
        }

        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8800/api/passengers", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            alert("Passenger added successfully!");
            onAdded();
            onClose();
        } catch (err) {
            console.error("Error adding passenger:", err.response || err);
            alert(err.response?.data?.message || "Failed to add passenger");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            {/* Overlay */}
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />

            <div className="relative w-full max-w-lg bg-[#0b0f1a] border border-slate-800 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
                
                {/* Header */}
                <div className="flex justify-between items-center px-6 sm:px-8 py-6 border-b border-slate-800/50">
                    <div>
                        <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">Add New Passenger</h2>
                        <p className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-widest">Flight Registration</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-slate-900 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition-all">
                        <X size={18} />
                    </button>
                </div>

                <div className="flex flex-col overflow-hidden">
                    <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar">
                        
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-10">
                                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                <p className="text-slate-400 mt-2 text-sm font-bold">Loading booking codes...</p>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                {/* Booking Selection Box */}
                                <div className="p-4 sm:p-5 bg-blue-500/5 border border-blue-500/20 rounded-2xl sm:rounded-3xl space-y-3">
                                    <label className="text-[9px] sm:text-[10px] font-black uppercase text-blue-500 tracking-widest ml-1 flex items-center gap-2">
                                        <CreditCard size={12} /> Link to Booking
                                    </label>
                                    <select
                                        name="booking_code"
                                        value={formData.booking_code}
                                        onChange={(e) => {
                                            const selected = bookings.find(b => b.booking_code === e.target.value);
                                            if (selected) {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    booking_code: selected.booking_code,
                                                    booking_id: selected.id
                                                }));
                                            }
                                        }}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500 transition-all text-sm font-bold shadow-inner"
                                    >
                                        <option value="">Select booking code</option>
                                        {bookings.map(b => (
                                            <option key={b.booking_code} value={b.booking_code}>
                                                {b.booking_code} (ID: {b.id})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Personal Info Row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">First Name</label>
                                        <input type="text" name="first_name" placeholder="Alice" onChange={handleChange} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:border-blue-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Last Name</label>
                                        <input type="text" name="last_name" placeholder="Smith" onChange={handleChange} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:border-blue-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-2"><Mail size={12}/> Email</label>
                                        <input type="email" name="email" placeholder="alice@gmail.com" onChange={handleChange} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:border-blue-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-2"><Phone size={12}/> Phone</label>
                                        <input type="text" name="phone" placeholder="+383..." onChange={handleChange} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:border-blue-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                </div>

                                {/* Document & Birthday */}
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-2"><Fingerprint size={12}/> Passport Number</label>
                                        <input type="text" name="passport_number" placeholder="AA000000" onChange={handleChange} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:border-blue-500 outline-none transition-all text-sm font-bold" />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-2"><Calendar size={12}/> Birthday</label>
                                            <input type="date" name="birthday" onChange={handleChange} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:border-blue-500 outline-none transition-all text-sm font-bold uppercase" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-2"><Globe size={12}/> Nationality</label>
                                            <input type="text" name="nationality" placeholder="Kosovar" onChange={handleChange} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:border-blue-500 outline-none transition-all text-sm font-bold" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 sm:p-8 border-t border-slate-800/50 bg-slate-900/20 flex flex-col-reverse sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm sm:text-base uppercase tracking-widest"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting || loading}
                            className="flex-[2] px-5 py-3 sm:py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl sm:rounded-2xl font-black shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 text-sm sm:text-base uppercase tracking-widest"
                        >
                            {submitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            {submitting ? "Adding..." : "Add Passenger"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}