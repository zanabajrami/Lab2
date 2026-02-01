import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { 
    Trash2, Search, Loader2, ChevronLeft, ChevronRight, 
    User, Calendar, PlaneTakeoff, PlaneLanding, MapPin, ArrowRight
} from "lucide-react";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const token = localStorage.getItem("token");

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8800/api/bookings", {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Ensure your backend query uses JOIN to include origin/destination names
            const sorted = res.data.sort((a, b) => b.id - a.id);
            setBookings(sorted);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => { fetchBookings(); }, [fetchBookings]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this booking?")) return;
        try {
            await axios.delete(`http://localhost:8800/api/bookings/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(prev => prev.filter(b => b.id !== id));
        } catch (err) {
            alert("Delete failed.");
        }
    };

    const filteredBookings = useMemo(() => {
        return bookings.filter(b => 
            b.booking_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.destination?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [bookings, searchTerm]);

    const currentItems = filteredBookings.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-[#f1f5f9] p-4 lg:p-8">
            <div className="max-w-[1600px] mx-auto">
                
                {/* --- HEADER --- */}
               <div className="bg-slate-950 rounded-[2.5rem] p-10 mb-8 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
                        <div>
                            <h1 className="text-4xl font-black text-white italic tracking-tighter">
                                FLIGHT <span className="text-blue-500">RESERVATIONS</span>
                            </h1>
                            <p className="text-slate-500 mt-1 font-medium">Live monitoring of booking traffic and routes.</p>
                        </div>
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search by Code, Origin, or Destination..." 
                                className="w-full pl-12 pr-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                            />
                        </div>
                    </div>
                </div>

                {/* --- DATA TABLE --- */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
                    <div className="hidden xl:grid grid-cols-12 gap-4 bg-slate-50 p-6 border-b border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <div className="col-span-1 text-blue-600">Ref Code</div>
                        <div className="col-span-3">Route (Origin → Destination)</div>
                        <div className="col-span-2">Departure Date</div>
                        <div className="col-span-1">Pax</div>
                        <div className="col-span-1">Method</div>
                        <div className="col-span-1">Total</div>
                        <div className="col-span-2 text-center">Status</div>
                        <div className="col-span-1 text-right">Manage</div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {currentItems.map(b => (
                                <div key={b.id} className="grid grid-cols-12 gap-4 items-center p-6 hover:bg-slate-50/50 transition-colors group">
                                    
                                    {/* Code */}
                                    <div className="col-span-1 font-mono font-bold text-slate-900">
                                        {b.booking_code}
                                    </div>

                                    {/* ROUTE - ORIGIN & DESTINATION */}
                                    <div className="col-span-3">
                                        <div className="flex items-center gap-3">
                                            <div className="text-sm font-black text-slate-800 flex items-center gap-2">
                                                <PlaneTakeoff size={14} className="text-blue-500"/> {b.origin || "N/A"}
                                            </div>
                                            <ArrowRight size={14} className="text-slate-300" />
                                            <div className="text-sm font-black text-slate-800 flex items-center gap-2">
                                                <PlaneLanding size={14} className="text-emerald-500"/> {b.destination || "N/A"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="col-span-2 flex items-center gap-2 text-xs font-bold text-slate-500">
                                        <Calendar size={14} className="text-slate-400" />
                                        {new Date(b.departure_date).toLocaleDateString('en-GB')}
                                    </div>

                                    {/* Passengers */}
                                    <div className="col-span-1 flex items-center gap-2 font-black text-slate-700">
                                        <User size={14} className="text-slate-300"/> {b.passengers_count}
                                    </div>

                                    {/* Method */}
                                    <div className="col-span-1">
                                        <span className="text-[10px] font-black uppercase px-2 py-1 bg-slate-100 rounded-md text-slate-500">
                                            {b.payment_method}
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-1 text-lg font-black text-slate-900">
                                        €{b.total_price}
                                    </div>

                                    {/* Status */}
                                    <div className="col-span-2 text-center">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border 
                                            ${b.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                              b.status === 'cancelled' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                                              'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                            {b.status}
                                        </span>
                                    </div>

                                    {/* Action */}
                                    <div className="col-span-1 text-right">
                                        <button onClick={() => handleDelete(b.id)} className="p-2 text-slate-300 hover:text-rose-600 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* --- PAGINATION --- */}
                <div className="mt-8 flex justify-center items-center gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} className="p-4 bg-white rounded-2xl shadow-sm hover:bg-slate-50 border border-slate-200 transition-all"><ChevronLeft/></button>
                    <div className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase shadow-lg">
                        Page {page} / {totalPages}
                    </div>
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="p-4 bg-white rounded-2xl shadow-sm hover:bg-slate-50 border border-slate-200 transition-all"><ChevronRight/></button>
                </div>

            </div>
        </div>
    );
}