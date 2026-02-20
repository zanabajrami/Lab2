import React, { useEffect, useState } from "react";
import axios from "axios";
import { UsersIcon, ArrowPathIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { IoTicketOutline } from "react-icons/io5";
import { TbUserStar } from "react-icons/tb";

import NewUsersChart from "../../components/dashboard/NewUsersChart";
import KPICard from "../../components/dashboard/KPICard";
import EditUser from "../../components/dashboard/EditUser";
import BookingsChart from "../../components/dashboard/BookingsChart";

export default function Dashboard() {
    const token = localStorage.getItem("token");
    const [stats, setStats] = useState({ users: 0, bookings: 0, revenue: 0 });
    const [allUsers, setAllUsers] = useState([]);
    const [latestUsers, setLatestUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [allBookings, setAllBookings] = useState([]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);

            const usersRes = await axios.get("http://localhost:8800/api/users", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const usersData = usersRes.data;
            setAllUsers(usersData);

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

            const bookingsRes = await axios.get("http://localhost:8800/api/bookings", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const bookingsData = bookingsRes.data;
            setStats(prev => ({ ...prev, bookings: bookingsData.length }));

            const passengersRes = await axios.get("http://localhost:8800/api/bookings/all-passengers", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const totalPassengers = passengersRes.data.length;

            setStats(prev => ({ ...prev, revenue: totalPassengers }));

        } catch (err) {
            console.error("Dashboard load failed", err);
        } finally {
            setLoading(false);
        }

        const bookingsRes = await axios.get("http://localhost:8800/api/bookings", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const bookingsData = bookingsRes.data;
        setAllBookings(bookingsData); // kjo është e reja
        setStats(prev => ({ ...prev, bookings: bookingsData.length }));

    };

    useEffect(() => {
        loadDashboardData(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

                    <KPICard
                        title="Total Passengers"
                        value={stats.revenue.toLocaleString()}
                        percent={18}
                        compareLabel="last week"
                        sparkline={[20, 25, 30, 28, 32]}
                        tooltip="Total passengers across all bookings"
                        icon={<TbUserStar className="w-6 h-6 text-emerald-600" />}
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

                    {/* --- BOOKINGS SECTION --- */}
                    <div className="lg:col-span-3 bg-slate-950 p-6 rounded-[2.5rem] border border-slate-800 shadow-sm mt-8">

                        {/* --- Monthly Bookings Chart --- */}
                        <div className="mb-8">
                            <h3 className="text-xl font-black text-slate-200 tracking-tight mb-4">
                                <span className="text-blue-600">Booking </span>Overview
                            </h3>
                            {loading ? (
                                <div className="h-full flex items-center justify-center text-slate-400">
                                    Loading Chart...
                                </div>
                            ) : (
                                <BookingsChart bookings={allBookings} />
                            )}
                        </div>

                        {/* --- Latest Bookings Table --- */}
                        <div className="flex flex-col bg-slate-900 p-4 rounded-[2rem] border border-slate-800 shadow-sm">
                            <h4 className="text-lg font-black text-slate-200 mb-4">Latest Bookings</h4>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-slate-300">
                                    <thead className="border-b border-slate-700">
                                        <tr>
                                            <th className="px-4 py-2 text-slate-400 font-bold text-sm">Booking Code</th>
                                            <th className="px-4 py-2 text-slate-400 font-bold text-sm">Route</th>
                                            <th className="px-4 py-2 text-slate-400 font-bold text-sm">Departure</th>
                                            <th className="px-4 py-2 text-slate-400 font-bold text-sm">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {allBookings
                                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                            .slice(0, 5)
                                            .map((b) => (
                                                <tr key={b.id} className="hover:bg-slate-800 transition-all">
                                                    <td className="px-4 py-2 font-bold text-slate-200">{b.booking_code}</td>
                                                    <td className="px-4 py-2 text-slate-300">{b.origin} → {b.destination}</td>
                                                    <td className="px-4 py-2 text-slate-400">{new Date(b.departure_date).toLocaleDateString('en-GB')}</td>
                                                    <td className="px-4 py-2 text-blue-400 font-black">€{b.total_price}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- EDIT MODAL --- */}
                <EditUser
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                    onSuccess={loadDashboardData}
                    token={token}
                />

            </div>
        </div>
    );
}