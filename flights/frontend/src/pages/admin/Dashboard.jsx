import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    UsersIcon,
    CurrencyEuroIcon,
    ArrowPathIcon,
    EllipsisVerticalIcon
} from "@heroicons/react/24/outline";
import { IoTicketOutline } from "react-icons/io5";

import NewUsersChart from "../../components/dashboard/NewUsersChart";
import KPICard from "../../components/dashboard/KPICard";
import EditUser from "../../components/dashboard/EditUser";

export default function Dashboard() {
    const token = localStorage.getItem("token");
    const [stats, setStats] = useState({ users: 0, bookings: 0, revenue: 0 });
    const [allUsers, setAllUsers] = useState([]); // Ruajmë të gjithë përdoruesit për grafikun
    const [latestUsers, setLatestUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [editData, setEditData] = useState({ first_name: "", last_name: "", email: "", role: "user" });

    const loadDashboardData = async () => {
        try {
            setLoading(true);

            const usersRes = await axios.get("http://localhost:8800/api/users", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const usersData = usersRes.data;
            setAllUsers(usersData); // Dërgohet te grafiku

            const sortedUsers = [...usersData].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            const latest = sortedUsers.slice(0, 5).map(u => ({
                id: u.id,
                name: `${u.first_name || u.username} ${u.last_name || ""}`,
                email: u.email,
                role: u.role,
                created_at: u.created_at
            }));

            setStats(prev => ({ ...prev, users: usersData.length }));
            setLatestUsers(latest);

            const bookingsRes = await axios.get("http://localhost:8800/api/bookings/stats", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setStats(prev => ({
                ...prev,
                bookings: bookingsRes.data.totalBookings,
                revenue: bookingsRes.data.totalRevenue
            }));

        } catch (err) {
            console.error("Dashboard load failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadDashboardData(); }, []);

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10 font-sans text-slate-900">
            <div className="max-w-7xl mx-auto">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center -mt-5 mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            Admin <span className="text-blue-600">Dashboard</span>
                        </h1>
                        <p className="text-slate-500 font-medium">Welcome back! Monitoring user growth and activity.</p>
                    </div>
                    <button
                        onClick={loadDashboardData}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all shadow-sm font-bold text-sm active:scale-95"
                    >
                        <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Sync Data
                    </button>
                </div>

                {/* --- STAT CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Kartela e parë - E bardhë me theks Blu */}
                    <KPICard
                        title="Total Users"
                        value={stats.users.toLocaleString()}
                        percent={12}
                        compareLabel="last week"
                        sparkline={[120, 125, 130, 140, 150, 158]}
                        tooltip="Total registered users"
                        icon={<UsersIcon className="w-6 h-6 text-blue-600" />}
                        className="bg-white border border-slate-200"
                    />

                    {/* Kartela e mesit - Slate 950 (Dark) */}
                    <KPICard
                        title="Total Bookings"
                        value={stats.bookings.toLocaleString()}
                        percent={-3}
                        compareLabel="yesterday"
                        sparkline={[80, 78, 76, 75, 73]}
                        tooltip="All completed bookings"
                        icon={<IoTicketOutline className="w-6 h-6 text-blue-400" />}
                        isDark={true}
                        className="bg-slate-950 text-white border border-slate-800 shadow-xl shadow-blue-900/10"
                    />

                    {/* Kartela e tretë - E bardhë me theks Emerald/Green */}
                    <KPICard
                        title="Total Revenue"
                        value={`€${stats.revenue.toLocaleString()}`}
                        percent={18}
                        compareLabel="last week"
                        sparkline={[2000, 2200, 2500, 2700, 3000]}
                        tooltip="Total generated revenue"
                        icon={<CurrencyEuroIcon className="w-6 h-6 text-emerald-600" />}
                        className="bg-white border border-slate-200"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- NEW USERS CHART SECTION --- */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">User Growth</h3>
                                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">New registrations per month</p>
                            </div>
                        </div>
                        <div className="h-80">
                            {loading ? (
                                <div className="h-full flex items-center justify-center text-slate-300">Loading Chart...</div>
                            ) : (
                                <NewUsersChart users={allUsers} />
                            )}
                        </div>
                    </div>

                    {/* --- LATEST USERS SECTION --- */}
                    <div className="bg-white p-4 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6 px-1">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight ml-4">New <span className="text-blue-600">Members</span></h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1.5 ml-4">Recent Activity</p>
                            </div>
                        </div>

                        <div className="space-y-2 flex-1">
                            {latestUsers.map((u) => (
                                <div key={u.id} className="flex items-center justify-between p-3 rounded-[1.25rem] group hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center font-black text-white group-hover:bg-blue-600 transition-all">
                                            <span>{u.name.charAt(0).toUpperCase()}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-[15px] font-black text-slate-900 truncate">{u.name}</p>
                                                <span className={`text-[9px] px-2 py-0.5 rounded-lg font-black uppercase ${u.role === 'admin' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{u.role}</span>
                                            </div>
                                            <p className="text-xs text-slate-400 font-bold truncate">{u.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const names = u.name.split(" ");
                                            const userToEdit = {
                                                ...u,
                                                first_name: names[0],
                                                last_name: names.slice(1).join(" ")
                                            };
                                            setEditingUser(userToEdit);
                                        }}
                                        className="p-2 text-slate-400 hover:text-slate-900"
                                    >
                                        <EllipsisVerticalIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- EDIT MODAL --- */}
                <EditUser
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                    onSuccess={loadDashboardData} // Këtu përdorim funksionin tënd të refresh-it
                    token={token}
                />

            </div>
        </div>
    );
}

function StatCard({ title, value, icon, isDark, color }) {
    const colors = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        slate: "bg-slate-800 text-blue-400 border-slate-700"
    };

    return (
        <div className={`${isDark ? 'bg-slate-900 text-white border-slate-800' : 'bg-white text-slate-900 border-slate-200'} p-6 rounded-[2rem] border shadow-sm flex items-center gap-5 transition-transform hover:-translate-y-1`}>
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${colors[color] || colors.blue}`}>
                {icon}
            </div>
            <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em]">{title}</p>
                <p className="text-3xl font-black mt-0.5">{value}</p>
            </div>
        </div>
    );
}