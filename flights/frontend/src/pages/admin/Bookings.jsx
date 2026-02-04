import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { Trash2, Search, Loader2, ChevronLeft, ChevronRight, User, Edit3, PlaneTakeoff, PlaneLanding, ArrowRight, Fingerprint } from "lucide-react";
import EditBooking from "../../components/dashboard/EditBooking";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const token = localStorage.getItem("token");
    const [editBooking, setEditBooking] = useState(null);
    const [saving, setSaving] = useState(false);

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8800/api/bookings", {
                headers: { Authorization: `Bearer ${token}` }
            });
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

    const handleUpdate = async () => {
        try {
            setSaving(true);
            const formattedBooking = {
                ...editBooking,
                // .slice(0, 10) merr vetëm pjesën YYYY-MM-DD
                departure_date: editBooking.departure_date ? editBooking.departure_date.slice(0, 10) : null,
                return_date: editBooking.return_date ? editBooking.return_date.slice(0, 10) : null
            };

            await axios.put(
                `http://localhost:8800/api/bookings/${editBooking.id}`,
                formattedBooking,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setBookings(prev =>
                prev.map(b => (b.id === editBooking.id ? formattedBooking : b))
            );

            setEditBooking(null);
            alert("Booking updated successfully!");
        } catch (err) {
            console.error("Update Error:", err.response?.data || err.message);
            alert("Update failed: Check console for details");
        } finally {
            setSaving(false);
        }
    };

    const filteredBookings = useMemo(() => {
        return bookings.filter(b =>
            b.booking_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.user_id?.toString().includes(searchTerm)
        );
    }, [bookings, searchTerm]);

    const currentItems = filteredBookings.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    return (
        <div className="min-h-screen p-4 lg:p-8 font-sans text-slate-900 bg-slate-50">
            <div className="max-w-[1600px] mx-auto">
                <div className="bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 mb-8 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="text-center lg:text-left">
                            <h1 className="text-2xl md:text-4xl font-black text-white italic tracking-tighter">
                                FLIGHT <span className="text-blue-500">RESERVATIONS</span>
                            </h1>
                            <p className="text-slate-500 mt-1 text-sm md:text-base font-medium">Live monitoring of booking traffic and routes.</p>
                        </div>
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search by Code, Origin, or User ID..."
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
                                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                            />
                        </div>
                    </div>
                </div>

                {/* --- DATA SECTION --- */}
                <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">

                    {/* TABLE HEADER (DESKTOP ONLY) */}
                    <div className="hidden xl:grid grid-cols-12 gap-4 bg-slate-50 p-6 border-b border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <div className="col-span-1 text-blue-600">Ref Code</div>
                        <div className="col-span-1">User ID</div>
                        <div className="col-span-3">Route (Origin → Destination)</div>
                        <div className="col-span-2">Flight Dates</div>
                        <div className="col-span-1">Pax</div>
                        <div className="col-span-1">Method</div>
                        <div className="col-span-1">Total</div>
                        <div className="col-span-1 text-center">Status</div>
                        <div className="col-span-1 text-right">Manage</div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
                    ) : (
                        <>
                            {/* --- DESKTOP --- */}
                            <div className="hidden xl:block">
                                <div className="divide-y divide-slate-100">
                                    {currentItems.map(b => (
                                        <div key={b.id} className="grid grid-cols-12 gap-4 items-center p-6 hover:bg-slate-50/50 transition-colors group">
                                            <div className="col-span-1 font-mono font-bold text-slate-900">{b.booking_code}</div>
                                            <div className="col-span-1">
                                                <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-bold border border-blue-100 flex items-center gap-1 w-fit">
                                                    <Fingerprint size={12} /> ID: {b.user_id}
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="text-sm font-black text-slate-800 flex items-center gap-2">
                                                        <PlaneTakeoff size={14} className="text-blue-500" /> {b.origin || "N/A"}
                                                    </div>
                                                    <ArrowRight size={14} className="text-slate-300" />
                                                    <div className="text-sm font-black text-slate-800 flex items-center gap-2">
                                                        <PlaneLanding size={14} className="text-emerald-500" /> {b.destination || "N/A"}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-2 flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                                                    <PlaneTakeoff size={12} className="text-blue-500" />
                                                    <span>{new Date(b.departure_date).toLocaleDateString('en-GB')}</span>
                                                </div>
                                                {b.return_date && (
                                                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                                                        <PlaneLanding size={12} className="text-emerald-500" />
                                                        <span>{new Date(b.return_date).toLocaleDateString('en-GB')}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-span-1 flex items-center gap-2 font-black text-slate-700">
                                                <User size={14} className="text-slate-300" /> {b.passengers_count}
                                            </div>
                                            <div className="col-span-1">
                                                <span className="text-[10px] font-black uppercase px-2 py-1 bg-slate-100 rounded-md text-slate-500">{b.payment_method}</span>
                                            </div>
                                            <div className="col-span-1 text-lg font-black text-slate-900">€{b.total_price}</div>
                                            <div className="col-span-1 text-center">
                                                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border ${b.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : b.status === 'cancelled' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                                    {b.status}
                                                </span>
                                            </div>
                                            <div className="col-span-1 text-right flex items-center justify-end gap-1">
                                                <button onClick={() => setEditBooking(b)}
                                                    className="group/edit flex items-center justify-center h-10 w-10 text-slate-400 bg-slate-50 border border-slate-200 rounded-xl hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all active:scale-90">
                                                    <Edit3 size={18} className="transition-transform group-hover/edit:rotate-12" />
                                                </button>
                                                <button onClick={() => handleDelete(b.id)}
                                                    className="group/delete flex items-center justify-center h-10 w-10 text-slate-400 bg-slate-50 border border-slate-200 rounded-xl hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all active:scale-90">
                                                    <Trash2 size={18} className="transition-transform group-hover/delete:scale-110" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* --- MOBILE --- */}
                            <div className="xl:hidden divide-y divide-slate-100">
                                {currentItems.map(b => (
                                    <div key={b.id} className="p-5 flex flex-col gap-4">

                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs">
                                                    {b.booking_code.substring(0, 2)}
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-black text-slate-900 leading-none">{b.booking_code}</p>
                                                    <p className="text-[11px] text-slate-400 font-bold mt-1 uppercase">ID: {b.user_id}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${b.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                b.status === 'cancelled' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                    'bg-amber-50 text-amber-600 border-amber-100'
                                                }`}>
                                                {b.status}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                                            <div className="flex-1">
                                                <p className="text-[10px] text-slate-400 font-black uppercase">Origin</p>
                                                <p className="text-xs font-black text-slate-800">{b.origin}</p>
                                            </div>
                                            <ArrowRight size={14} className="text-slate-300" />
                                            <div className="flex-1 text-right">
                                                <p className="text-[10px] text-slate-400 font-black uppercase">Dest</p>
                                                <p className="text-xs font-black text-slate-800">{b.destination}</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center px-1">
                                            <div>
                                                <p className="text-[9px] text-slate-400 font-black uppercase leading-none mb-1">Total</p>
                                                <p className="text-xl font-black text-slate-900 tracking-tighter">€{b.total_price.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <button onClick={() => setEditBooking(b)}
                                                    className="flex items-center justify-center h-10 w-10 text-slate-400 bg-slate-50 border border-slate-200 rounded-xl hover:text-blue-600 active:scale-90 transition-all">
                                                    <Edit3 size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(b.id)}
                                                    className="flex items-center justify-center h-10 w-10 text-slate-400 bg-slate-50 border border-slate-200 rounded-xl hover:text-rose-600 active:scale-90 transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <EditBooking
                    booking={editBooking}
                    setBooking={setEditBooking}
                    saving={saving}
                    onSave={handleUpdate}
                    onClose={() => setEditBooking(null)}
                />

                {/* --- PAGINATION --- */}
                <div className="mt-8 flex justify-center items-center gap-2 pb-8">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 disabled:opacity-50"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="bg-slate-950 text-white px-5 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase shadow-lg">
                        {page} / {totalPages}
                    </div>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 disabled:opacity-50"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

            </div>
        </div>
    );
}