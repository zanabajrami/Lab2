import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit3 } from "lucide-react";

export default function Flights() {
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;
    const [totalPages, setTotalPages] = useState(1);

    // Funksion për të kthyer numrat e ditëve në emra (p.sh. "1,2" -> "Mon, Tue")
    const formatDays = (daysString) => {
        if (!daysString) return "N/A";
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return daysString
            .split(",")
            .map(day => dayNames[parseInt(day)] || day)
            .join(", ");
    };

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:8800/api/flights?limit=1000`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const sorted = res.data.data.sort((a, b) => a.id - b.id);
                setFlights(sorted);
                setTotalPages(Math.ceil(sorted.length / limit));
            } catch (err) {
                setError("Failed to fetch flights");
            } finally {
                setLoading(false);
            }
        };
        fetchFlights();
    }, []);

    useEffect(() => {
        const filtered = flights.filter(
            f =>
                f.flight_code.toLowerCase().includes(search.toLowerCase()) ||
                (f.airline && f.airline.toLowerCase().includes(search.toLowerCase()))
        );
        setFilteredFlights(filtered);
        setTotalPages(Math.ceil(filtered.length / limit) || 1);
        setPage(1);
    }, [search, flights]);

    const displayedFlights = filteredFlights.slice((page - 1) * limit, page * limit);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this flight?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8800/api/flights/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFlights(flights.filter(f => f.id !== id));
        } catch (err) {
            alert("Failed to delete flight");
        }
    };

    if (loading) return <div className="p-10 text-center animate-pulse text-slate-600 font-medium">Loading flights...</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-950 font-sans">
            <div className="max-w-[1600px] mx-auto"> {/* Zgjeruar pak për të zënë kolonat e reja */}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-slate-950 tracking-tight">
                         <span className="text-blue-600">Flight </span>Management
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">
                            Monitor and manage all airline schedules and flight routes.
                        </p>
                    </div>

                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search code or airline..."
                            className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl w-full md:w-80 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <svg className="w-5 h-5 absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-950 text-white">
                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Flight Code</th>
                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Airline</th>
                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Route</th>
                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Schedule</th>
                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Duration</th>
                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Valid Days</th>
                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Price</th>
                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {displayedFlights.map(f => (
                                    <tr key={f.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4">
                                            <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded text-[10px]">
                                                {f.flight_code}
                                            </span>
                                        </td>
                                        <td className="p-4 font-medium text-sm">{f.airline}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                                {f.from_code} <span className="text-slate-300">→</span> {f.to_code}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] text-slate-400 whitespace-nowrap">
                                                <span className="truncate max-w-[60px]">{f.origin}</span>
                                                <span></span>
                                                <span className="truncate max-w-[60px]">{f.destination}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-[11px] font-medium text-slate-600">↑ {f.departure_time}</div>
                                            <div className="text-[11px] font-medium text-slate-600">↓ {f.arrival_time}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {f.duration}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {f.valid_days ? f.valid_days.split(',').map((d, i) => (
                                                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                                                        {formatDays(d)}
                                                    </span>
                                                )) : <span className="text-xs text-slate-400">Daily</span>}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-bold text-slate-900">€{f.price}</span>
                                        </td>
                                        <td className="p-4 text-right whitespace-nowrap">
                                            <div className="flex justify-end gap-2">
                                                {/* Butoni Edit */}
                                                <button
                                                    onClick={() => window.location.href = `/admin/flights-edit/${f.id}`}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="Edit Flight"
                                                >
                                                    <Edit3 size={18} />
                                                </button>

                                                {/* Butoni Delete */}
                                                <button
                                                    onClick={() => handleDelete(f.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete Flight"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                    <p className="text-sm text-slate-500">Showing page {page} of {totalPages}</p>
                    <div className="flex gap-2">
                        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold disabled:opacity-50">Prev</button>
                        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}