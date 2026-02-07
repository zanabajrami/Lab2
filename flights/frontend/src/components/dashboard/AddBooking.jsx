import { useEffect, useState } from "react";
import axios from "axios";
import {X, Plus, Trash2, PlaneTakeoff, Calendar, CreditCard, Mail, Phone, Fingerprint, Globe} from "lucide-react";

export default function AddBooking({ onClose, onSuccess }) {
    const token = localStorage.getItem("token");

    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [tripType, setTripType] = useState("one-way");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [passengers, setPassengers] = useState([
        { firstName: "", lastName: "", email: "", phone: "", passportNumber: "", birthday: "", nationality: "" }
    ]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/flights", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFlights(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFlights();
    }, [token]);

    useEffect(() => {
        if (tripType === "one-way") setReturnDate("");
    }, [tripType]);

    const totalPrice = selectedFlight ? selectedFlight.price * passengers.length : 0;

    const addPassenger = () => {
        setPassengers([...passengers, { firstName: "", lastName: "", email: "", phone: "", passportNumber: "", birthday: "", nationality: "" }]);
    };

    const removePassenger = (index) => {
        if (passengers.length === 1) return;
        setPassengers(passengers.filter((_, i) => i !== index));
    };

    const handlePassengerChange = (index, field, value) => {
        const updated = [...passengers];
        updated[index][field] = value;
        setPassengers(updated);
    };

    const handleSubmit = async () => {
        if (!selectedFlight || !departureDate) {
            alert("Flight dhe departure date janë të detyrueshme");
            return;
        }
        try {
            setLoading(true);
            await axios.post("http://localhost:8800/api/bookings",
                { userId: 10, flightId: selectedFlight.id, departureDate, returnDate: tripType === "return" ? returnDate : null, passengers },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onSuccess();
            onClose();
        } catch (err) {
            alert("Failed to create booking");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200">

                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-5 sm:px-10 sm:py-7 border-b border-slate-100 bg-white">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-3">
                        <div className="hidden sm:flex p-2 bg-blue-600 rounded-lg text-white">
                            <PlaneTakeoff size={20} />
                        </div>
                        Add Booking
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200">
                        <X size={24} />
                    </button>
                </div>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-10">

                    {/* STEP 1: FLIGHT DETAILS */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-800 text-white text-xs font-black">1</span>
                            <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase text-sm">Flight Info</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-slate-50 p-5 sm:p-7 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 shadow-inner">
                            <div className="lg:col-span-4 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Trip Type</label>
                                <div className="flex p-1 bg-white border border-slate-200 rounded-xl">
                                    {["one-way", "return"].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setTripType(type)}
                                            className={`flex-1 py-2 rounded-lg text-[11px] font-black uppercase transition-all ${tripType === type ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "text-slate-500 hover:bg-slate-50"}`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-8 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Select Flight</label>
                                <select
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all font-bold text-sm shadow-sm"
                                    value={selectedFlight?.id || ""}
                                    onChange={(e) => setSelectedFlight(flights.find(f => f.id === Number(e.target.value)))}
                                >
                                    <option value="">Search for available flight...</option>
                                    {flights
                                        .filter(f => (tripType === "one-way" ? !f.is_return : f.is_return))
                                        .map(f => (
                                            <option key={f.id} value={f.id}>
                                                {f.airline} • {f.origin} ➔ {f.destination} • {f.departure_time} - {f.arrival_time} • (€{f.price})
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="lg:col-span-6 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Departure Date</label>
                                <div className="relative group">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                                    <input type="date" className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 outline-none font-bold text-sm shadow-sm" value={departureDate} onChange={e => setDepartureDate(e.target.value)} />
                                </div>
                            </div>

                            <div className="lg:col-span-6 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Return Date</label>
                                <div className="relative group">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                                    <input
                                        type="date"
                                        disabled={tripType === "one-way"}
                                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 outline-none font-bold text-sm shadow-sm disabled:bg-slate-100 disabled:text-slate-300 transition-all"
                                        value={returnDate}
                                        onChange={e => setReturnDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* STEP 2: PASSENGERS */}
                    <section className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-800 text-white text-xs font-black">2</span>
                                <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase text-sm">Passengers</h3>
                            </div>
                            <button onClick={addPassenger} className="w-full sm:w-auto px-5 py-3 bg-blue-50 text-blue-700 rounded-xl font-black text-xs hover:bg-blue-100 transition-all flex items-center justify-center gap-2 border border-blue-200 shadow-sm">
                                <Plus size={16} strokeWidth={3} /> Add Passager
                            </button>
                        </div>

                        <div className="space-y-6">
                            {passengers.map((p, index) => (
                                <div key={index} className="relative bg-white border border-slate-200 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 hover:border-blue-300 transition-all shadow-sm">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-xs font-black text-slate-800 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-tighter">Passenger #{index + 1}</span>
                                        {passengers.length > 1 && (
                                            <button onClick={() => removePassenger(index)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all border border-transparent hover:border-red-100">
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">First Name</label>
                                            <input placeholder="Alice" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-sm" onChange={e => handlePassengerChange(index, "firstName", e.target.value)} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Last Name</label>
                                            <input placeholder="Smith" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-sm" onChange={e => handlePassengerChange(index, "lastName", e.target.value)} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Email</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <input placeholder="alice@gmail.com" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-sm" onChange={e => handlePassengerChange(index, "email", e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Phone Number</label>
                                            <div className="relative group">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <input placeholder="+383 49..." className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-sm" onChange={e => handlePassengerChange(index, "phone", e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Passport No.</label>
                                            <div className="relative group">
                                                <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <input placeholder="A123..." className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-sm" onChange={e => handlePassengerChange(index, "passportNumber", e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Birthday</label>
                                            <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-sm text-slate-700 uppercase" onChange={e => handlePassengerChange(index, "birthday", e.target.value)} />
                                        </div>
                                        <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Nationality</label>
                                            <div className="relative group">
                                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <input placeholder="Kosovar" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-sm" onChange={e => handlePassengerChange(index, "nationality", e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* FOOTER */}
                <div className="p-6 sm:p-10 border-t border-slate-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                        <div className="text-left">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total</p>
                            <p className="text-3xl font-black text-blue-600">€{totalPrice}</p>
                        </div>
                    </div>
                    <div className="flex w-full sm:w-auto gap-3">
                        <button onClick={onClose} className="flex-1 sm:px-8 py-4 rounded-2xl font-black text-slate-400 hover:text-slate-800 transition-all text-xs uppercase tracking-widest">
                            Close
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className=" sm:px-12 py-2 bg-slate-800 text-blue-600 hover:bg-blue-600 hover:text-slate-900 rounded-2xl font-black shadow-xl shadow-slate-100 disabled:opacity-50 transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
                        >
                            {loading ? "Saving..." : <><CreditCard size={18} /> Confirm Booking</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}