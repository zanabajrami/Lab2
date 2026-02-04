import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserRoundSearch, Phone, Mail, Globe, Plus, Search, CreditCard, Trash2, Edit3, Loader2, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import EditPassenger from "../../components/dashboard/EditPassenger";

const Passengers = () => {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editPassenger, setEditPassenger] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // items per page

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8800/api/bookings/all-passengers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPassengers(res.data);
      } catch (err) {
        console.error("Error fetching passengers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPassengers();
  }, []);

  const filteredPassengers = passengers.filter(p =>
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.booking_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- ITEMS PER PAGE ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPassengers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPassengers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a]">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="mt-4 text-slate-400 font-medium animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-blue-500/30 py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-5 -mt-7">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-slate-900 p-3 rounded-2xl border border-slate-700">
                <UserRoundSearch className="text-blue-400" size={28} />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800 italic tracking-tight">Passenger Records</h1>
              <p className="text-slate-400 text-sm font-medium mt-1">Manage and monitor all traveler activities</p>
            </div>
          </div>

          <button className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20 active:scale-95">
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Add New Passenger</span>
          </button>
        </div>

        {/* Stats & Search Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-3 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-200" size={20} />
            <input
              type="text"
              placeholder="Search by name, code or passport..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset te faqja 1 kur kërkon diçka
              }}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl text-sm placeholder:text-slate-400 shadow-sm shadow-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:shadow-md transition-all duration-200 outline-none"
            />
          </div>
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 px-6 rounded-2xl backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Records</span>
            <span className="text-2xl font-black text-blue-400">{filteredPassengers.length}</span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-hidden rounded-[2rem] border border-slate-800 bg-[#0b0f1a] backdrop-blur-md shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/30 border-b border-slate-800">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Booking Code</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Personal Info</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Document & Bio</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {currentItems.map((p) => (
                <tr key={p.id} className="hover:bg-blue-500/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="text-blue-500 font-mono text-sm bg-blue-500/10 px-3 py-1 rounded-lg w-fit font-bold border border-blue-500/20">
                      #{p.booking_code}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center border border-slate-700 group-hover:border-blue-500/50 transition-colors">
                        <span className="text-blue-400 font-bold text-xs">{(p.first_name?.[0] || "?")}{(p.last_name?.[0] || "?")}</span>
                      </div>
                      <div>
                        <div className="text-white font-bold text-base group-hover:text-blue-400 transition-colors">{p.first_name} {p.last_name}</div>
                        <div className="text-slate-500 text-[11px] flex items-center gap-1.5 mt-0.5"><Globe size={12} /> {p.nationality || "N/A"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1.5 text-slate-300 text-sm">
                      <div className="flex items-center gap-2"><Mail size={14} className="text-slate-500" /> {p.email}</div>
                      {p.phone && <div className="flex items-center gap-2 text-slate-500 text-xs"><Phone size={13} /> {p.phone}</div>}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-200 font-mono text-xs bg-slate-800/50 w-fit px-2.5 py-1 rounded-lg border border-slate-700">
                      <CreditCard size={14} className="text-blue-500" /> {p.passport_number}
                    </div>
                    <div className="text-slate-500 text-[10px] mt-2 font-bold uppercase tracking-wider flex items-center gap-1.5"><Calendar size={12} /> Born: {p.birthday ? new Date(p.birthday).toLocaleDateString() : "---"}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => setEditPassenger(p)}
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"><Edit3 size={18} /></button>
                      <button className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile & iPad Cards */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentItems.map((p) => (
            <div key={p.id} className="bg-[#0b0f1a] border border-slate-800 rounded-[2rem] p-6 shadow-xl backdrop-blur-md">
              <div className="flex justify-between items-start mb-5">
                <div className="text-blue-500 font-mono text-xs bg-blue-500/10 px-3 py-1 rounded-lg font-bold border border-blue-500/20">#{p.booking_code}</div>
                <div className="flex gap-1">
                  <button onClick={() => setEditPassenger(p)}
                    className="p-2 text-slate-400 hover:bg-slate-800 rounded-xl"><Edit3 size={18} /></button>
                  <button className="p-2 text-slate-400 hover:text-red-400 rounded-xl"><Trash2 size={18} /></button>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
                  <span className="text-blue-400 font-bold">{(p.first_name?.[0] || "?")}{(p.last_name?.[0] || "?")}</span>
                </div>
                <div>
                  <div className="text-white font-bold">{p.first_name} {p.last_name}</div>
                  <div className="text-slate-500 text-xs">{p.nationality}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800/50 space-y-2">
                <div className="flex items-center gap-2 text-slate-400 text-xs"><Mail size={12} /> {p.email}</div>
                <div className="flex items-center gap-2 text-slate-400 text-xs"><CreditCard size={12} /> {p.passport_number}</div>
              </div>
            </div>
          ))}
        </div>

        {editPassenger && (
          <EditPassenger
            passenger={editPassenger}
            onClose={() => setEditPassenger(null)}
            onUpdated={() => window.location.reload()}
          />
        )}

        {/* --- PAGINATION UI CONTROLS --- */}
        {filteredPassengers.length > itemsPerPage && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/50 pt-6">
            <span className="text-slate-500 text-sm">
              Showing <span className="text-slate-200">{indexOfFirstItem + 1}</span> to <span className="text-slate-200">{Math.min(indexOfLastItem, filteredPassengers.length)}</span> of <span className="text-slate-200">{filteredPassengers.length}</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`w-9 h-9 rounded-xl font-bold text-xs transition-all border ${currentPage === i + 1
                      ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPassengers.length === 0 && (
          <div className="bg-slate-900 rounded-[2rem] py-32 text-center border border-dashed border-slate-800 backdrop-blur-sm">
            <div className="bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserRoundSearch size={40} className="text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No passengers found</h3>
            <p className="text-slate-500 max-w-xs mx-auto text-sm">Try adjusting your search terms or add a new record.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Passengers;