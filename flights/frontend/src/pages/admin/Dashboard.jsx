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
    Filler
} from "chart.js";
import { 
    ArrowUpIcon, 
    UsersIcon, 
    ShoppingCartIcon, 
    CurrencyEuroIcon,
    CalendarDaysIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline";

// Regjistrimi i elementeve të ChartJS (Shtuar Filler për efektin gradient)
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
    const stats = {
        users: 1240,
        bookings: 856,
        revenue: 23450,
    };

    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                fill: true,
                label: "Revenue",
                data: [12000, 19000, 17000, 22000, 24000, 30000],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: "#3b82f6",
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { size: 14 },
                bodyFont: { size: 14 },
                displayColors: false
            }
        },
        scales: { 
            y: { 
                beginAtZero: true,
                grid: { color: "rgba(0, 0, 0, 0.05)" },
                ticks: { callback: (value) => "€" + value.toLocaleString() }
            },
            x: { grid: { display: false } }
        },
    };

    const latestUsers = [
        { name: "John Doe", email: "john@example.com", role: "user", registered: "25 Dhj 2025" },
        { name: "Jane Smith", email: "jane@example.com", role: "user", registered: "24 Dhj 2025" },
        { name: "Admin User", email: "admin@example.com", role: "admin", registered: "20 Dhj 2025" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Mirëseerdhët, Admin! 👋</h1>
                    <p className="text-gray-500 mt-1">Ja çfarë po ndodh me biznesin tuaj sot.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                        <ArrowPathIcon className="w-4 h-4 mr-2" /> Rifresko
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Përdorues" value={stats.users.toLocaleString()} change="+12%" icon={<UsersIcon className="w-6 h-6 text-blue-600" />} bgColor="bg-blue-100" textColor="text-green-600" />
                <StatCard title="Rezervime" value={stats.bookings.toLocaleString()} change="+3%" icon={<ShoppingCartIcon className="w-6 h-6 text-indigo-600" />} bgColor="bg-indigo-100" textColor="text-green-600" />
                <StatCard title="Fitimi" value={`€${stats.revenue.toLocaleString()}`} change="+18%" icon={<CurrencyEuroIcon className="w-6 h-6 text-emerald-600" />} bgColor="bg-emerald-100" textColor="text-green-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart - Merr 2/3 e hapësirës në desktop */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Ecuria e Fitimit</h3>
                        <select className="text-sm border-none bg-gray-50 rounded-md focus:ring-0">
                            <option>6 muajt e fundit</option>
                            <option>Viti i fundit</option>
                        </select>
                    </div>
                    <div className="h-80">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>

                {/* Latest Users - Merr 1/3 e hapësirës */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Përdoruesit e Fundit</h3>
                    <div className="space-y-6">
                        {latestUsers.map((u, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                                        {u.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{u.name}</p>
                                        <p className="text-xs text-gray-500">{u.email}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                                    u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                    {u.role}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                        Shiko të gjithë
                    </button>
                </div>
            </div>
        </div>
    );
}

// StatCard Component i përmirësuar
function StatCard({ title, value, change, icon, bgColor, textColor }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${bgColor}`}>
                    {icon}
                </div>
                <span className={`flex items-center text-xs font-bold ${textColor}`}>
                    <ArrowUpIcon className="w-3 h-3 mr-1" /> {change}
                </span>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
        </div>
    );
}