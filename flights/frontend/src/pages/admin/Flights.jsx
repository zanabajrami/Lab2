import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { Trash2, Edit3, Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function Flights() {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const flightsPerPage = 6;
    const token = localStorage.getItem("token");

    const loadFlights = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8800/api/flights", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const sortedFlights = res.data.data.sort((a, b) => a.id - b.id);
            setFlights(sortedFlights);
        } catch (err) {
            console.error("Failed to fetch flights");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        loadFlights();
    }, [loadFlights]);

    const filteredFlights = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return flights.filter(f =>
            f.flight_code.toLowerCase().includes(term) ||
            (f.airline && f.airline.toLowerCase().includes(term))
        );
    }, [flights, searchTerm]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this flight?")) return;
        try {
            await axios.delete(`http://localhost:8800/api/flights/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFlights((prev) => prev.filter((f) => f.id !== id));
        } catch (err) {
            alert("Error: Could not delete flight.");
        }
    };

    const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);
    const currentFlights = filteredFlights.slice((page - 1) * flightsPerPage, page * flightsPerPage);

    const formatDays = (daysString) => {
        if (!daysString || daysString.trim() === "") return "Daily";
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return daysString.split(",").map(day => dayNames[parseInt(day.trim())] || day).join(", ");
    };

    return (
        <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 rounded-2xl">
            <div className="max-w-[1600px] mx-auto">

                {/* --- HEADER --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 -mt-5 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-950 tracking-tight">
                            All <span className="text-blue-600">Flights</span>
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">Monitor and manage all airline schedules and routes.</p>
                    </div>

                    <div className="relative w-full lg:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search flights..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* --- MAIN CONTENT --- */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">

                    {/* DESKTOP VIEW */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-950 text-white">
                                    <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider">Flight Code</th>
                                    <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider">Airline</th>
                                    <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider">Route</th>
                                    <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider">Schedule</th>
                                    <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider">Duration</th>
                                    <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider">Valid Days</th>
                                    <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr><td colSpan="8" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={40} /></td></tr>
                                ) : currentFlights.map(f => (
                                    <tr key={f.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded text-[10px]">{f.flight_code}</span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-sm">{f.airline}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-sm font-semibold text-slate-800">
                                                <span>{f.from_code} → {f.to_code}</span>
                                                <span className="text-[10px] text-slate-400 font-normal italic">{f.origin} - {f.destination}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[11px] text-slate-600">
                                            <div>↑ {f.departure_time}</div>
                                            <div>↓ {f.arrival_time}</div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-600">{f.duration}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100 font-medium">
                                                {formatDays(f.valid_days)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-900">€{f.price}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => window.location.href = `/admin/flights-edit/${f.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={18} /></button>
                                                <button onClick={() => handleDelete(f.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* MOBILE & IPAD VIEW */}
                    <div className="lg:hidden flex flex-col divide-y divide-slate-100">
                        {loading ? (
                            <div className="py-20 text-center">
                                <Loader2 className="animate-spin mx-auto text-blue-600" size={32} />
                            </div>
                        ) : currentFlights.map((f) => (
                            <div key={f.id} className="p-4 sm:p-6 flex flex-col gap-5">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-2xl bg-slate-900 flex flex-shrink-0 items-center justify-center text-blue-400 font-black text-xs shadow-lg shadow-slate-200">
                                            {f.from_code}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-slate-900 text-base truncate">{f.flight_code}</p>
                                            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{f.airline}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-black text-blue-600">€{f.price}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Per Seat</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                        <p className="text-slate-400 font-bold uppercase text-[9px] mb-1">Route</p>
                                        <p className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                            {f.from_code} <span className="text-slate-300">→</span> {f.to_code}
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                        <p className="text-slate-400 font-bold uppercase text-[9px] mb-1">Schedule</p>
                                        <p className="font-bold text-slate-800 text-sm italic">
                                            {f.departure_time} - {f.arrival_time}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-5 border-t border-slate-100">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Operating Days</p>
                                            <div className="flex">
                                                <span className="inline-flex px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl text-[10px] font-black uppercase">
                                                    {formatDays(f.valid_days)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 mt-1">
                                            <button
                                                onClick={() => window.location.href = `/admin/flights-edit/${f.id}`}
                                                className="flex items-center justify-center h-11 w-11 text-slate-500 bg-white border border-slate-200 rounded-2xl shadow-sm hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all active:scale-95"
                                            >
                                                <Edit3 size={19} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(f.id)}
                                                className="flex items-center justify-center h-11 w-11 text-slate-500 bg-white border border-slate-200 rounded-2xl shadow-sm hover:text-red-600 hover:border-red-500 hover:bg-red-50 transition-all active:scale-95"
                                            >
                                                <Trash2 size={19} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- PAGINATION --- */}
                    <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Showing <span className="text-slate-900">{currentFlights.length}</span> of {filteredFlights.length} Flights
                        </p>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-xl border border-slate-200 bg-white"><ChevronLeft size={20} /></button>
                            <div className="px-5 py-2 bg-slate-950 text-white rounded-xl text-xs font-black">PAGE {page} / {totalPages || 1}</div>
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-xl border border-slate-200 bg-white"><ChevronRight size={20} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}