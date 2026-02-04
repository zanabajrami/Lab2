import React, { useEffect } from "react";
import { X, Loader2, Lock, PlaneTakeoff, PlaneLanding, Repeat, Ticket, CreditCard} from "lucide-react";

export default function EditBooking({
    booking,
    setBooking,
    onClose,
    onSave,
    saving = false,
}) {
    useEffect(() => {
        if (booking) document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, [booking]);

    if (!booking) return null;

    const handleChange = (field, value) => {
        setBooking({ ...booking, [field]: value });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
            <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
                
                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-slate-50 bg-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-blue-600 shadow-lg shadow-blue-200">
                            <Ticket size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-slate-900 leading-none">Edit Booking</h2>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
                        <X size={20} />
                    </button>
                </div>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-5 custom-scrollbar bg-slate-50/30">
                    
                    {/* BOOKING CODE */}
                    <div className="relative group overflow-hidden rounded-2xl shadow-lg shadow-blue-100">
                        <div className="absolute top-0 right-0 w-24 h-20 bg-white/10 rounded-full -mr-8 -mt-8 blur-2xl group-hover:bg-white/20 transition-all duration-700" />
                        <div className="relative flex items-center justify-between p-4 bg-blue-600 border border-blue-500 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-slate-950 rounded-xl shadow-lg border border-white/5">
                                    <Lock size={16} className="text-blue-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-blue-100 uppercase tracking-widest leading-none mb-1">Booking Ref</span>
                                    <span className="text-white font-black text-lg tracking-widest uppercase">{booking.booking_code}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/90 backdrop-blur-md rounded-lg border border-white/10 shadow-xl">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-[9px] font-black text-blue-600 uppercase tracking-wider uppercase">Secured</span>
                            </div>
                        </div>
                    </div>

                    {/* TRAVEL ROUTE */}
                    <div className="relative flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5 opacity-50" />
                        
                        <div className="relative z-10 flex flex-col flex-1">
                            <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1">From</span>
                            <span className="text-lg font-black text-white tracking-tight">{booking.origin}</span>
                        </div>

                        <div className="relative z-10 flex items-center px-3">
                            <div className="h-[1px] w-5 bg-slate-700" />
                            <div className="mx-2 p-1.5 bg-slate-800 rounded-lg border border-slate-700 group-hover:border-blue-500/50 transition-all">
                                <PlaneTakeoff size={14} className="text-blue-500 rotate-45" />
                            </div>
                            <div className="h-[1px] w-5 bg-slate-700" />
                        </div>

                        <div className="relative z-10 flex flex-col flex-1 text-right">
                            <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1">To</span>
                            <span className="text-lg font-black text-white italic tracking-tight">{booking.destination}</span>
                        </div>
                    </div>

                    {/* TRIP TOGGLE */}
                    <button 
                        onClick={() => handleChange("return_date", booking.return_date ? null : new Date().toISOString())}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-sm group"
                    >
                        <div className="flex items-center gap-3 text-left">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Repeat size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trip Configuration</p>
                                <p className="text-sm font-bold text-slate-900">{booking.return_date ? "Round Trip" : "One-Way Flight"}</p>
                            </div>
                        </div>
                        <div className={`w-10 h-5 rounded-full transition-all relative ${booking.return_date ? 'bg-blue-600' : 'bg-slate-200'}`}>
                            <div className={`absolute top-1 bg-white w-3 h-3 rounded-full transition-all ${booking.return_date ? 'left-6' : 'left-1'}`} />
                        </div>
                    </button>

                    {/* FORM GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Departure" type="date" value={booking.departure_date?.slice(0, 10)} icon={<PlaneTakeoff size={14}/>} onChange={v => handleChange("departure_date", v)} />
                        
                        {booking.return_date && (
                            <Input label="Return" type="date" value={booking.return_date?.slice(0, 10)} icon={<PlaneLanding size={14}/>} onChange={v => handleChange("return_date", v)} />
                        )}
                        
                        <Select label="Status" value={booking.status} options={["paid", "pending", "cancelled"]} onChange={v => handleChange("status", v)} />
                        <Input label="Price (€)" type="number" value={booking.total_price} icon={<CreditCard size={14}/>} onChange={v => handleChange("total_price", v)} />
                    </div>
                </div>

                {/* FOOTER */}
                <div className="p-5 sm:p-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button onClick={onClose} className="text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest order-2 sm:order-1">
                        Cancel Changes
                    </button>
                    <button
                        onClick={onSave}
                        disabled={saving}
                        className="w-full sm:w-auto px-12 py-4 bg-slate-950 text-blue-600 rounded-2xl font-black text-sm hover:bg-blue-600 hover:text-blue-800 shadow-xl shadow-slate-200 hover:shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 order-1 sm:order-2"
                    >
                        {saving && <Loader2 size={18} className="animate-spin text-blue-400" />}
                        {saving ? "UPDATING..." : "CONFIRM UPDATE"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// RE-USABLE INPUT COMPONENTS
function Input({ label, value, onChange, type = "text", readOnly = false, icon }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">{label}</label>
            <div className="relative group">
                {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">{icon}</div>}
                <input
                    type={type}
                    value={value ?? ""}
                    readOnly={readOnly}
                    onChange={e => !readOnly && onChange(e.target.value)}
                    className={`w-full ${icon ? 'pl-11' : 'px-4'} py-3.5 rounded-xl text-sm font-bold border transition-all outline-none ${
                        readOnly ? "bg-slate-50 border-slate-100 text-slate-400" : "bg-white border-slate-200 text-slate-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 shadow-sm"
                    }`}
                />
            </div>
        </div>
    );
}

function Select({ label, value, onChange, options }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">{label}</label>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:border-blue-600 outline-none font-bold text-sm appearance-none shadow-sm cursor-pointer"
            >
                {options.map(o => (
                    <option key={o} value={o}>{o.toUpperCase()}</option>
                ))}
            </select>
        </div>
    );
}