import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { Trash2, Edit3, Loader2, AlertCircle, ChevronLeft, ChevronRight, Mail, Calendar, ShieldCheck, Search, UserCheck } from "lucide-react";
import { BiUserCircle } from "react-icons/bi";
import { PiUserCirclePlus } from "react-icons/pi";

import EditUser from "../../components/dashboard/EditUser";
import AddUser from "../../components/dashboard/AddUser";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 6;
  const token = localStorage.getItem("token");

  const [editingUser, setEditingUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8800/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const sortedUsers = res.data.sort((a, b) => a.id - b.id);
      setUsers(sortedUsers);
      setError(null);
    } catch (err) {
      setError("Unable to sync with server. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return users.filter(u =>
      (u.username || "").toLowerCase().includes(term) ||
      (u.email || "").toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:8800/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert("Error: Could not delete user.");
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);

  useEffect(() => {
    document.body.style.overflow = (editingUser || showAddModal) ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [editingUser, showAddModal]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* --- TOP BAR SECTION --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 -mt-5 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-950 tracking-tight">
              All <span className="text-blue-600">Users</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">Manage your organization's directory and permissions.</p>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center h-11 w-11 bg-slate-950 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 shadow-md active:scale-90 group"
            >
              <PiUserCirclePlus size={30} />
            </button>
          </div>
        </div>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <UserCheck size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Members</p>
              <p className="text-3xl font-black text-slate-950">{users.length}</p>
            </div>
          </div>
          <div className="bg-slate-950 p-4 rounded-[2rem] shadow-xl flex items-center gap-5">
            <div className="h-14 w-14 bg-white/10 text-blue-400 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
            <div>
              <p className="text-slate-300 text-xs font-bold uppercase tracking-widest text-white/60">Admin Roles</p>
              <p className="text-3xl font-black text-white">{users.filter(u => u.role === 'admin').length}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl flex items-center gap-3">
            <AlertCircle size={20} />
            <p className="font-bold text-sm">{error}</p>
          </div>
        )}

        {/* --- MAIN CONTENT (TABLE & MOBILE CARDS) --- */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">

          {/* 1. VERSIONI PER DESKTOP/IPAD (I njëjti si i joti) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">User Profile</th>
                  <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</th>
                  <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
                  <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Joined Date</th>
                  <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-32 text-center">
                      <Loader2 className="animate-spin mx-auto text-blue-600 mb-4" size={48} />
                      <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Syncing...</p>
                    </td>
                  </tr>
                ) : currentUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-blue-50/30 transition-all group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-blue-400 font-black text-lg shadow-lg group-hover:scale-110 transition-transform">
                          {u.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-base">{u.username}</p>
                          <p className="text-[12px] font-mono text-slate-400">ID: {u.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-slate-600 font-medium text-sm">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-300" />
                        {u.email}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border shadow-sm ${u.role === "admin" ? "bg-blue-600 text-white border-blue-500" : "bg-white text-slate-600 border-slate-200"}`}>
                        {u.role === "admin" ? <ShieldCheck size={15} /> : <BiUserCircle size={17} />}
                        {u.role}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                        <Calendar size={14} className="text-slate-300" />
                        {new Date(u.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => { setEditingUser(u); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit3 size={18} /></button>
                        <button onClick={() => deleteUser(u.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. VERSIONI PER MOBILE (Kartela Moderne) */}
          <div className="lg:hidden flex flex-col divide-y divide-slate-100">
            {loading ? (
              <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={32} /></div>
            ) : currentUsers.map((u) => (
              <div key={u.id} className="p-5 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-900 text-blue-400 flex items-center justify-center font-black">
                      {u.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{u.username}</p>
                      <p className="text-[10px] text-slate-400 font-mono">ID: {u.id}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {u.role}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Mail size={14} className="text-slate-300" /> {u.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Calendar size={14} className="text-slate-300" /> {new Date(u.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const [first_name = "", last_name = ""] = u.username.split(" ");
                      setEditingUser({
                        ...u,
                        first_name,
                        last_name,
                      });
                    }}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  >
                    <Edit3 size={18} />
                  </button>

                  <button onClick={() => deleteUser(u.id)} className="flex-1 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* --- PAGINATION --- */}
          <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Showing <span className="text-slate-900">{currentUsers.length}</span> of {filteredUsers.length} Users
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-xl border border-slate-200 bg-white"><ChevronLeft size={20} /></button>
              <div className="px-5 py-2 bg-slate-950 text-white rounded-xl text-xs font-black">PAGE {page} / {totalPages || 1}</div>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-xl border border-slate-200 bg-white"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
      </div>

      <EditUser user={editingUser} onClose={() => setEditingUser(null)} onSuccess={loadUsers} token={token} />
      <AddUser isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSuccess={loadUsers} token={token} />
    </div>
  );
}