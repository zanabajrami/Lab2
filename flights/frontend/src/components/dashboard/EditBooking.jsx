import React, { useEffect } from "react";
import { X, Loader2, Lock, PlaneTakeoff, PlaneLanding, Repeat } from "lucide-react";

export default function EditBooking({
    booking,
    setBooking,
    onClose,
    onSave,
    saving = false,
}) {
    // BLOCK SCROLL
    useEffect(() => {
        if (booking) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [booking]);

    if (!booking) return null;

    const handleChange = (field, value) => {
        setBooking({ ...booking, [field]: value });
    };

    // Funksioni për të ndryshuar llojin e udhëtimit
    const toggleTripType = () => {
        if (booking.return_date) {
            // Nëse ka datë kthimi, e heqim (bëhet One Way)
            handleChange("return_date", null);
        } else {
            // Nëse nuk ka, i vendosim një datë default (psh 7 ditë pas nisjes)
            const departure = booking.departure_date ? new Date(booking.departure_date) : new Date();
            const defaultReturn = new Date(departure);
            defaultReturn.setDate(departure.getDate() + 7);
            handleChange("return_date", defaultReturn.toISOString());
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
                
                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-5 border-b shrink-0">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                            Edit Booking
                            <span className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded-lg text-sm">
                                #{booking.booking_code}
                            </span>
                        </h2>
                        <p className="text-xs text-slate-400 font-medium">Update reservation details</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* TRIP TYPE SELECTOR (ONE WAY / ROUND TRIP) */}
                        <div className="md:col-span-2 flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-3xl">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl ${booking.return_date ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                                    <Repeat size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-700">Trip Type</p>
                                    <p className="text-xs text-slate-400">{booking.return_date ? "Round Trip Flight" : "One-Way Flight"}</p>
                                </div>
                            </div>
                            <button 
                                onClick={toggleTripType}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${booking.return_date ? 'bg-blue-600' : 'bg-slate-300'}`}
                            >
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${booking.return_date ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        <Input
                            label="Booking Code"
                            value={booking.booking_code}
                            onChange={v => handleChange("booking_code", v)}
                        />

                        <Input
                            label="User ID"
                            value={booking.user_id}
                            readOnly={true}
                        />

                        <Input
                            label="Origin"
                            value={booking.origin}
                            readOnly={true}
                        />

                        <Input
                            label="Destination"
                            value={booking.destination}
                            readOnly={true}
                        />

                        {/* DEPARTURE DATE */}
                        <div className="relative">
                            <PlaneTakeoff size={14} className="absolute right-4 top-11 text-slate-400" />
                            <Input
                                label="Departure Date"
                                type="date"
                                value={booking.departure_date?.slice(0, 10) || ""}
                                onChange={v => handleChange("departure_date", v)}
                            />
                        </div>

                        {/* RETURN DATE */}
                        <div className="relative">
                            {booking.return_date ? (
                                <>
                                    <PlaneLanding size={14} className="absolute right-4 top-11 text-slate-400" />
                                    <Input
                                        label="Return Date"
                                        type="date"
                                        value={booking.return_date?.slice(0, 10) || ""}
                                        onChange={v => handleChange("return_date", v)}
                                    />
                                </>
                            ) : (
                                <div className="flex flex-col gap-1.5 h-full opacity-60">
                                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Return Date</label>
                                    <div className="flex-1 px-4 py-3.5 border border-dashed border-slate-300 rounded-2xl bg-slate-50 text-slate-400 text-sm flex items-center italic">
                                        No return flight
                                    </div>
                                </div>
                            )}
                        </div>

                        <Input
                            label="Passengers"
                            type="number"
                            value={booking.passengers_count}
                            readOnly={true}
                        />

                        <Select
                            label="Payment Method"
                            value={booking.payment_method}
                            onChange={v => handleChange("payment_method", v)}
                            options={["card", "cash", "paypal"]}
                        />

                        <Select
                            label="Status"
                            value={booking.status}
                            onChange={v => handleChange("status", v)}
                            options={["paid", "pending", "cancelled"]}
                        />

                        <Input
                            label="Total Price (€)"
                            type="number"
                            value={booking.total_price}
                            onChange={v => handleChange("total_price", v)}
                        />
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 px-6 py-5 border-t bg-slate-50 shrink-0">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-2xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-100 transition-all"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onSave}
                        disabled={saving}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 text-white font-black flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-60 shadow-lg shadow-blue-200 transition-all active:scale-95"
                    >
                        {saving ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Input({ label, value, onChange, type = "text", readOnly = false }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1 flex items-center gap-1">
                {label}
                {readOnly && <Lock size={10} className="text-slate-300" />}
            </label>
            <input
                type={type}
                value={value ?? ""}
                readOnly={readOnly}
                tabIndex={readOnly ? -1 : 0}
                onChange={e => !readOnly && onChange(e.target.value)}
                className={`px-4 py-3.5 border rounded-2xl transition-all font-medium outline-none ${
                    readOnly 
                    ? "bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed select-none shadow-inner" 
                    : "bg-slate-50 border-slate-200 focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 focus:bg-white"
                }`}
            />
        </div>
    );
}

function Select({ label, value, onChange, options }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">
                {label}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium appearance-none cursor-pointer"
                >
                    {options.map(o => (
                        <option key={o} value={o} className="capitalize">
                            {o.charAt(0).toUpperCase() + o.slice(1)}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
            </div>
        </div>
    );
}