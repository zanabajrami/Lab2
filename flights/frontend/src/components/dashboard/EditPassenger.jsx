import axios from "axios";
import { X, Loader2, Globe, CreditCard, Calendar, Phone, Lock, Save } from "lucide-react";
import { useState, useEffect } from "react";

const EditPassenger = ({ passenger, onClose, onUpdated }) => {
    // Clone passenger data
    const [form, setForm] = useState({ ...passenger });
    const [loading, setLoading] = useState(false);

    // Check if this passenger is linked to a user
    const isUser = !!passenger.user_id;

    // Block scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isUser) return; // don't allow update if not a user
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:8800/api/passengers/${passenger.id}`,
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onUpdated();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to update passenger");
        } finally {
            setLoading(false);
        }
    };

    if (!passenger) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            {/* Overlay */}
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}/>
            <div className="relative w-full max-w-lg bg-[#0b0f1a] border border-slate-800 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="flex justify-between items-center px-6 sm:px-8 py-6 border-b border-slate-800/50">
                    <div>
                        <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">Edit Profile</h2>
                        <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Updating passenger information</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-slate-900 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition-all">
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                    <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar">
                        <div className="grid grid-cols-1 gap-4 p-4 sm:p-5 bg-blue-500/5 border border-blue-500/20 rounded-2xl sm:rounded-3xl">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 sm:w-14 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center text-slate-800 text-base sm:text-lg font-black shadow-lg shadow-blue-600/20">
                                        {form.first_name?.[0]}{form.last_name?.[0]}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={form.first_name || ""}
                                            onChange={handleChange}
                                            readOnly={!isUser}
                                            className={`text-white font-bold text-sm sm:text-base bg-transparent border-b ${!isUser ? "opacity-50 cursor-not-allowed" : "border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"}`
                                            }
                                        />
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={form.last_name || ""}
                                            onChange={handleChange}
                                            readOnly={!isUser}
                                            className={`text-white font-bold text-sm sm:text-base bg-transparent border-b ${!isUser ? "opacity-50 cursor-not-allowed" : "border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"}`
                                            }
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email || ""}
                                            onChange={handleChange}
                                            readOnly={!isUser}
                                            className={`text-blue-400 text-[10px] sm:text-[11px] font-mono bg-transparent border-b ${!isUser ? "opacity-50 cursor-not-allowed" : "border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"}`
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-3 border-t border-blue-500/10">
                                <div className="flex items-center gap-2 text-slate-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                                    <Calendar size={13} className="text-blue-500" />
                                    DOB:
                                </div>
                                <input
                                    type="date"
                                    name="dob"
                                    value={form.dob?.split("T")[0] || ""}
                                    onChange={handleChange}
                                    readOnly={!isUser}
                                    className={`text-slate-200 font-mono text-[11px] sm:text-xs bg-slate-800/50 px-2 py-0.5 rounded-md ${!isUser ? "opacity-50 cursor-not-allowed" : "focus:ring-1 focus:ring-blue-500 focus:outline-none"}`}
                                />
                                <Lock size={10} className="text-slate-600 ml-auto" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:gap-5">
                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-2">
                                    <CreditCard size={12} /> Passport Number
                                </label>
                                <input
                                    type="text"
                                    name="passport_number"
                                    value={form.passport_number || ""}
                                    onChange={handleChange}
                                    className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-900/50 border border-slate-800 rounded-xl sm:rounded-2xl text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none text-sm sm:text-base"
                                />
                            </div>

                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-2">
                                    <Globe size={12} /> Nationality
                                </label>
                                <input
                                    type="text"
                                    name="nationality"
                                    value={form.nationality || ""}
                                    onChange={handleChange}
                                    className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-900/50 border border-slate-800 rounded-xl sm:rounded-2xl text-white focus:border-blue-500 outline-none transition-all text-sm sm:text-base"
                                />
                            </div>

                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-2">
                                    <Phone size={12} /> Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone || ""}
                                    onChange={handleChange}
                                    className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-900/50 border border-slate-800 rounded-xl sm:rounded-2xl text-white focus:border-blue-500 outline-none transition-all text-sm sm:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 sm:p-8 border-t border-slate-800/50 bg-slate-900/20 flex flex-col-reverse sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm sm:text-base"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !isUser}
                            className="flex-[2] px-5 py-3 sm:py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl sm:rounded-2xl font-black shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            {loading ? "Updating..." : "Update Details"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPassenger;
