import { Loader2, X } from "lucide-react";

export default function EditFlightModal({
    flight,
    setFlight,
    onClose,
    onSave,
    saving = false,
}) {
    if (!flight) return null;

    const handleChange = (field, value) => {
        setFlight({ ...flight, [field]: value });
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-6 space-y-6">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-black text-slate-900">
                        Edit Flight <span className="text-blue-600">{flight.flight_code}</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-red-500 transition"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* FORM */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <Input label="Flight Code" value={flight.flight_code}
                        onChange={v => handleChange("flight_code", v)} />

                    <Input label="Airline" value={flight.airline}
                        onChange={v => handleChange("airline", v)} />

                    <Input label="From Code" value={flight.from_code}
                        onChange={v => handleChange("from_code", v)} />

                    <Input label="To Code" value={flight.to_code}
                        onChange={v => handleChange("to_code", v)} />

                    <Input label="Origin" value={flight.origin}
                        onChange={v => handleChange("origin", v)} />

                    <Input label="Destination" value={flight.destination}
                        onChange={v => handleChange("destination", v)} />

                    <Input label="Departure Time" value={flight.departure_time}
                        onChange={v => handleChange("departure_time", v)} />

                    <Input label="Arrival Time" value={flight.arrival_time}
                        onChange={v => handleChange("arrival_time", v)} />

                    <Input label="Duration" value={flight.duration}
                        onChange={v => handleChange("duration", v)} />

                    <Input label="Valid Days (0,1,2...)" value={flight.valid_days}
                        onChange={v => handleChange("valid_days", v)} />

                    <Input
                        label="Price (€)"
                        type="number"
                        value={flight.price}
                        onChange={v => handleChange("price", v)}
                    />

                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl border font-bold hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onSave}
                        disabled={saving}
                        className="px-6 py-3 rounded-xl bg-blue-600 text-white font-black flex items-center gap-2 hover:bg-blue-700 disabled:opacity-60"
                    >
                        {saving && <Loader2 size={16} className="animate-spin" />}
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
}

/* SMALL INPUT COMPONENT */
function Input({ label, value, onChange, type = "text" }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                {label}
            </label>
            <input
                type={type}
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500"
            />
        </div>
    );
}
