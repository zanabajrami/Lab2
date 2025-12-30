import React from "react";
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
} from "chart.js";
import { ArrowUpIcon, UsersIcon, ShoppingCartIcon, CurrencyEuroIcon, BellIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import AdminLayout from "./Layout";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DemoDashboard() {
    // Dummy data
    const stats = {
        users: 1240,
        bookings: 856,
        revenue: 23450,
        flightsToday: 12,
        cancellations: 5,
        pendingPayments: 8,
    };

    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Revenue",
                data: [1200, 1900, 1700, 2200, 2400, 3000],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
    };

    const latestUsers = [
        { name: "John Doe", email: "john@example.com", role: "user", registered: "2025-12-25" },
        { name: "Jane Smith", email: "jane@example.com", role: "user", registered: "2025-12-24" },
        { name: "Admin User", email: "admin@example.com", role: "admin", registered: "2025-12-20" },
    ];

    const recentBookings = [
        { user: "John Doe", flight: "Prishtinë → Berlin", date: "2025-12-28", status: "Paid", price: 250 },
        { user: "Jane Smith", flight: "Berlin → Paris", date: "2025-12-29", status: "Pending", price: 180 },
        { user: "John Doe", flight: "Paris → Rome", date: "2025-12-30", status: "Cancelled", price: 200 },
    ];

    const alerts = [
        { message: "Low seats on Prishtinë → Berlin flight", type: "warning", icon: <PaperAirplaneIcon className="w-5 h-5 text-red-500" /> },
        { message: "High demand on Berlin → Paris flight", type: "info", icon: <BellIcon className="w-5 h-5 text-blue-500" /> },
    ];

    return (
        <AdminLayout user={{ name: "Admin", role: "admin" }}>
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Dashboard </h1>
                <p className="text-gray-500 mt-1">Overview of key metrics, users, bookings, and flights.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
                <StatCard title="Users" value={stats.users} change="+12%" icon={<UsersIcon className="w-6 h-6 text-blue-500" />} bgColor="bg-blue-50" textColor="text-blue-600" />
                <StatCard title="Bookings" value={stats.bookings} change="+3%" icon={<ShoppingCartIcon className="w-6 h-6 text-green-500" />} bgColor="bg-green-50" textColor="text-green-600" />
                <StatCard title="Revenue" value={`€${stats.revenue}`} change="+18%" icon={<CurrencyEuroIcon className="w-6 h-6 text-yellow-500" />} bgColor="bg-yellow-50" textColor="text-yellow-600" />
                <StatCard title="Flights Today" value={stats.flightsToday} change="+1" icon={<PaperAirplaneIcon className="w-6 h-6 text-indigo-500" />} bgColor="bg-indigo-50" textColor="text-indigo-600" />
                <StatCard title="Cancellations" value={stats.cancellations} change="-2" icon={<BellIcon className="w-6 h-6 text-red-500" />} bgColor="bg-red-50" textColor="text-red-600" />
                <StatCard title="Pending Payments" value={stats.pendingPayments} change="+5" icon={<CurrencyEuroIcon className="w-6 h-6 text-purple-500" />} bgColor="bg-purple-50" textColor="text-purple-600" />
            </div>

            {/* Charts */}
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 max-w-6xl">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Revenue Over Time</h3>
                <Line data={chartData} options={chartOptions} />
            </div>

            {/* Alerts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {alerts.map((alert, i) => (
                    <div key={i} className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                        <div className="mr-3">{alert.icon}</div>
                        <p className="text-gray-700">{alert.message}</p>
                    </div>
                ))}
            </div>

            {/* Latest Users */}
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Latest Users</h3>
                <table className="w-full text-left table-auto border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Role</th>
                            <th className="py-2 px-4">Registered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {latestUsers.map((u, i) => (
                            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-2 px-4">{u.name}</td>
                                <td className="py-2 px-4">{u.email}</td>
                                <td className="py-2 px-4">{u.role}</td>
                                <td className="py-2 px-4">{u.registered}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Bookings</h3>
                <table className="w-full text-left table-auto border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="py-2 px-4">User</th>
                            <th className="py-2 px-4">Flight</th>
                            <th className="py-2 px-4">Date</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentBookings.map((b, i) => (
                            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-2 px-4">{b.user}</td>
                                <td className="py-2 px-4">{b.flight}</td>
                                <td className="py-2 px-4">{b.date}</td>
                                <td className="py-2 px-4">{b.status}</td>
                                <td className="py-2 px-4">€{b.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}

// StatCard Component
function StatCard({ title, value, change, icon, bgColor, textColor }) {
    return (
        <div className="flex items-center p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow w-full">
            {/* Ikona normale */}
            <div className={`flex-shrink-0 p-3 rounded-full ${bgColor}`}>
                {icon}
            </div>

            {/* Teksti dhe vlera */}
            <div className="ml-4 w-full">
                <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg flex items-center ${textColor} bg-opacity-20`}>
                        {change} <ArrowUpIcon className="w-3 h-3 ml-1" />
                    </span>
                </div>
                <p className="text-2xl font-extrabold text-gray-900">{value}</p>
            </div>
        </div>
    );
}
