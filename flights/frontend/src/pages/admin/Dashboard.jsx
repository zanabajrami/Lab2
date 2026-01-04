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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
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

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Overview of key metrics, users, bookings, and flights.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
                <StatCard title="Users" value={stats.users} change="+12%" icon={<UsersIcon className="w-6 h-6 text-blue-500" />} bgColor="bg-blue-50" textColor="text-blue-600" />
                <StatCard title="Bookings" value={stats.bookings} change="+3%" icon={<ShoppingCartIcon className="w-6 h-6 text-green-500" />} bgColor="bg-green-50" textColor="text-green-600" />
                <StatCard title="Revenue" value={`€${stats.revenue}`} change="+18%" icon={<CurrencyEuroIcon className="w-6 h-6 text-yellow-500" />} bgColor="bg-yellow-50" textColor="text-yellow-600" />
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 max-w-6xl">
                <Line data={chartData} options={chartOptions} />
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
        </>
    );
}

// StatCard
function StatCard({ title, value, change, icon, bgColor, textColor }) {
    return (
        <div className="flex items-center p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow w-full">
            <div className={`flex-shrink-0 p-3 rounded-full ${bgColor}`}>{icon}</div>
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