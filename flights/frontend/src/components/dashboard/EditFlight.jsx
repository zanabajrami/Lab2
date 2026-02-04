import { useEffect } from "react"; 
import { Loader2, X, Plane, Clock, Euro, Tag, ShieldCheck } from "lucide-react";

export default function EditFlightModal({
    flight,
    setFlight,
    onClose,
    onSave,
    saving = false,
}) {
    useEffect(() => {
        if (flight) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [flight]);

    if (!flight) return null;

    const handleChange = (field, value) => {
        setFlight({ ...flight, [field]: value });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* OVERLAY */}
            <div 
                className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-300" 
                onClick={onClose} 
            />

            {/* MODAL CONTAINER */}
            <div className="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
                
                {/* HEADER - DARK THEME (SLATE-900) */}
                <div className="flex justify-between items-center px-8 py-7 bg-slate-900 text-white">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Plane size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Edit Flight Details</h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X size={20} className="text-slate-400 hover:text-white" />
                    </button>
                </div>

                {/* FORM BODY */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
                    <div className="space-y-8">
                        
                        {/* SECTION: FLIGHT IDENTITY (READ ONLY) */}
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <Tag size={16} className="text-blue-600" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Flight Code</label>
                                    <span className="text-slate-900 font-black font-mono">{flight.flight_code}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                                <ShieldCheck size={12} className="text-emerald-500" />
                                READ ONLY
                            </div>
                        </div>

                        {/* INPUT GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Airline Name" value={flight.airline}
                                onChange={v => handleChange("airline", v)} />

                            <div className="grid grid-cols-2 gap-3">
                                <Input label="From " value={flight.from_code}
                                    onChange={v => handleChange("from_code", v)} />
                                <Input label="To " value={flight.to_code}
                                    onChange={v => handleChange("to_code", v)} />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Input label="Departure" placeholder="HH:MM" value={flight.departure_time}
                                    icon={<Clock size={14}/>}
                                    onChange={v => handleChange("departure_time", v)} />
                                <Input label="Arrival" placeholder="HH:MM" value={flight.arrival_time}
                                    icon={<Clock size={14}/>}
                                    onChange={v => handleChange("arrival_time", v)} />
                            </div>

                            <Input label="Price (€)" type="number" 
                                icon={<Euro size={14}/>}
                                value={flight.price}
                                onChange={v => handleChange("price", v)} />

                            <Input label="Duration" value={flight.duration}
                                onChange={v => handleChange("duration", v)} />

                            <Input label="Active Days" value={flight.valid_days}
                                onChange={v => handleChange("valid_days", v)} />
                        </div>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="px-8 py-6 border-t border-slate-100 bg-white flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 font-bold text-sm transition-colors"
                    >
                        Cancel Changes
                    </button>

                    <button
                        onClick={onSave}
                        disabled={saving}
                        className="px-8 py-4 bg-blue-600 text-slate-900 hover:bg-slate-900 hover:text-blue-600 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {saving ? <Loader2 size={18} className="animate-spin" /> : null}
                        {saving ? "Updating..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Input({ label, value, onChange, type = "text", placeholder = "", icon }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">
                {label}
            </label>
            <div className="relative group">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value || ""}
                    onChange={e => onChange(e.target.value)}
                    className={`
                        w-full ${icon ? 'pl-11' : 'px-5'} py-3.5 
                        bg-slate-50 border border-slate-200 rounded-xl 
                        text-slate-900 text-sm font-bold transition-all 
                        focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/5
                    `}
                />
            </div>
        </div>
    );
}