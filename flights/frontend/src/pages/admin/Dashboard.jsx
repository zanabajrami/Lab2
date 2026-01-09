import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

import {
    UsersIcon,
    CurrencyEuroIcon,
    ArrowPathIcon,
    EllipsisVerticalIcon
} from "@heroicons/react/24/outline";
import { IoTicketOutline } from "react-icons/io5";
import { XMarkIcon } from "@heroicons/react/24/solid";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
    const token = localStorage.getItem("token");
    const [stats, setStats] = useState({ users: 0, bookings: 0, revenue: 0 });
    const [latestUsers, setLatestUsers] = useState([]);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [editData, setEditData] = useState({ first_name: "", last_name: "", email: "", role: "user" });

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const usersRes = await axios.get("http://localhost:8800/api/users", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const usersData = usersRes.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            const latest = usersData.slice(0, 5).map(u => ({
                id: u.id,
                name: u.username,
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

            const monthlyRevenueRes = await axios.get("http://localhost:8800/api/bookings/monthly-revenue", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setChartData({
                labels: monthlyRevenueRes.data.map(d => d.month),
                datasets: [
                    {
                        label: "Revenue",
                        data: monthlyRevenueRes.data.map(d => d.revenue),
                        fill: true,
                        borderColor: "#2563eb",
                        backgroundColor: "rgba(37, 99, 235, 0.05)",
                        borderWidth: 3,
                        pointBackgroundColor: "#fff",
                        pointBorderColor: "#2563eb",
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        tension: 0.4,
                    },
                ],
            });
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
                        <p className="text-slate-500 font-medium">Welcome back! Here is what's happening today.</p>
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
                    <StatCard
                        title="Total Users"
                        value={stats.users.toLocaleString()}
                        icon={<UsersIcon className="w-6 h-6" />}
                        color="blue"
                    />
                    <StatCard
                        title="Total Bookings"
                        value={stats.bookings.toLocaleString()}
                        icon={<IoTicketOutline className="w-6 h-6" />}
                        color="slate"
                        isDark
                    />
                    <StatCard
                        title="Total Revenue"
                        value={`€${stats.revenue.toLocaleString()}`}
                        icon={<CurrencyEuroIcon className="w-6 h-6" />}
                        color="emerald"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- CHART SECTION --- */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">Revenue Analysis</h3>
                                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">Monthly performance</p>
                            </div>
                        </div>
                        <div className="h-80">
                            {loading ? (
                                <div className="h-full flex items-center justify-center text-slate-300">Loading Chart...</div>
                            ) : (
                                <Line data={chartData} options={chartOptions} />
                            )}
                        </div>
                    </div>

                    {/* --- LATEST USERS SECTION --- */}
                    <div className="bg-white p-4 rounded-[2.5rem] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-full">
                        {/* Header me stil më të pastër */}
                        <div className="flex items-center justify-between mb-6 px-1">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none ml-4">
                                    New <span className="text-blue-600">Members</span>
                                </h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.15em] mt-1.5 ml-4">
                                    Recent Activity
                                </p>
                            </div>
                            <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                                <UsersIcon className="w-5 h-5 text-slate-400" />
                            </div>
                        </div>

                        <div className="space-y-2 flex-1 -mt-3">
                            {latestUsers.map((u) => (
                                <div
                                    key={u.id}
                                    className="flex items-center justify-between p-3 rounded-[1.25rem] transition-all duration-300 group border border-transparent hover:border-slate-100 hover:bg-slate-50/50 hover:shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center font-black text-white border-2 border-slate-900 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 shadow-lg shadow-slate-200 group-hover:shadow-blue-100">
                                            <span className="text-base">{u.name.charAt(0).toUpperCase()}</span>
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <p className="text-[15px] font-black text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                                    {u.name}
                                                </p>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black uppercase tracking-wider ${u.role === 'admin'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                                                    }`}>
                                                    {u.role}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-400 font-bold group-hover:text-slate-500 transition-colors truncate max-w-[150px]">
                                                {u.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Button - Slate Style */}
                                    <button
                                        onClick={() => {
                                            const names = u.name.split(" ");
                                            setEditingUser(u);
                                            setEditData({
                                                first_name: names[0] || "",
                                                last_name: names.slice(1).join(" ") || "",
                                                email: u.email,
                                                role: u.role,
                                            });
                                        }}
                                        className="p-2.5 text-slate-400 hover:text-slate-900 bg-transparent hover:bg-white rounded-xl transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-sm active:scale-90"
                                    >
                                        <EllipsisVerticalIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- MODAL I RI --- */}
                {editingUser && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                        <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden transform animate-in zoom-in-95 duration-200">

                            {/* Header i Modal-it */}
                            <div className="bg-slate-50 px-8 py-6 border-b border-slate-100">
                                <h2 className="text-xl font-black text-slate-900 tracking-tight">Edit Profile</h2>
                                <p className="text-slate-500 text-sm mt-1">Update user information and access levels.</p>
                            </div>

                            <div className="p-8">
                                <div className="flex flex-col gap-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                                            <input
                                                type="text"
                                                value={editData.first_name}
                                                onChange={(e) => setEditData(prev => ({ ...prev, first_name: e.target.value }))}
                                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 transition-all text-sm font-medium"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                                            <input
                                                type="text"
                                                value={editData.last_name}
                                                onChange={(e) => setEditData(prev => ({ ...prev, last_name: e.target.value }))}
                                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 transition-all text-sm font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={editData.email}
                                            onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 transition-all text-sm font-medium"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">System Permissions</label>
                                        <select
                                            value={editData.role}
                                            onChange={(e) => setEditData(prev => ({ ...prev, role: e.target.value }))}
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 transition-all text-sm font-bold text-slate-700 appearance-none"
                                        >
                                            <option value="user">Standard User</option>
                                            <option value="admin">Administrator</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 mt-8">
                                    <button
                                        onClick={() => setEditingUser(null)}
                                        className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={async () => {
                                            try {
                                                await axios.put(`http://localhost:8800/api/users/${editingUser.id}`, editData, {
                                                    headers: { Authorization: `Bearer ${token}` },
                                                });
                                                setEditingUser(null);
                                                loadDashboardData(); // Refresho të dhënat
                                            } catch (err) {
                                                alert("Failed to update user.");
                                            }
                                        }}
                                        className="px-6 py-3 rounded-xl bg-slate-950 text-white font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/10 active:scale-95"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- SUB-COMPONENTS ---
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

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: '#0f172a',
            padding: 12,
            cornerRadius: 12,
            titleFont: { size: 12, weight: 'bold' },
            bodyFont: { size: 14, weight: '900' },
            displayColors: false
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: { color: "rgba(226, 232, 240, 0.4)", drawBorder: false },
            ticks: {
                font: { weight: '600', size: 11 },
                color: '#94a3b8',
                callback: v => "€" + v.toLocaleString()
            }
        },
        x: {
            grid: { display: false },
            ticks: { font: { weight: '600', size: 11 }, color: '#94a3b8' }
        }
    }
};