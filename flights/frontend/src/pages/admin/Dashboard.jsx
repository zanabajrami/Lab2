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
  ArrowUpIcon,
  UsersIcon,
  ShoppingCartIcon,
  CurrencyEuroIcon
} from "@heroicons/react/24/outline";
import { PiUserCirclePlus } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({ users: 0, bookings: 0, revenue: 0 });
  const [latestUsers, setLatestUsers] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  // For "Edit User" modal
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({ first_name: "", last_name: "", email: "", role: "user" });

  // Fetch dashboard data
  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch users
      const usersRes = await axios.get("http://localhost:8800/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const usersData = usersRes.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      // Latest 5 users
      const latest = usersData.slice(0, 5).map(u => ({
        id: u.id,
        name: u.username,
        email: u.email,
        role: u.role,
        created_at: u.created_at
      }));

      setStats(prev => ({ ...prev, users: usersData.length }));
      setLatestUsers(latest);

      // Fetch bookings & revenue
      const bookingsRes = await axios.get("http://localhost:8800/api/bookings/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats(prev => ({
        ...prev,
        bookings: bookingsRes.data.totalBookings,
        revenue: bookingsRes.data.totalRevenue
      }));

      // Revenue chart (last 6 months)
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
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#13173aff",
          },
        ],
      });

    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Update user
  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:8800/api/users/${editingUser.id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingUser(null);
      loadDashboardData();
    } catch (err) {
      alert("Failed to update user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Admin! 👋</h1>
          <p className="text-gray-500 mt-1">Overview of your users and revenue.</p>
        </div>
        <button
          className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
          onClick={loadDashboardData}
        >
          Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Users"
          value={stats.users.toLocaleString()}
          change="+12%"
          icon={<UsersIcon className="w-6 h-6 text-blue-600" />}
          bgColor="bg-blue-100"
          textColor="text-green-600"
        />
        <StatCard
          title="Bookings"
          value={stats.bookings.toLocaleString()}
          change="+3%"
          icon={<ShoppingCartIcon className="w-6 h-6 text-indigo-600" />}
          bgColor="bg-indigo-100"
          textColor="text-green-600"
        />
        <StatCard
          title="Revenue"
          value={`€${stats.revenue.toLocaleString()}`}
          change="+18%"
          icon={<CurrencyEuroIcon className="w-6 h-6 text-emerald-600" />}
          bgColor="bg-emerald-100"
          textColor="text-green-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Revenue Trend</h3>
            <select className="text-sm border-none bg-gray-50 rounded-md focus:ring-0">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-80">
            <Line data={chartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: { backgroundColor: '#1e293b', padding: 12, titleFont: { size: 14 }, bodyFont: { size: 14 }, displayColors: false }
              },
              scales: {
                y: { beginAtZero: true, grid: { color: "rgba(0, 0, 0, 0.05)" }, ticks: { callback: v => "€" + v.toLocaleString() } },
                x: { grid: { display: false } }
              }
            }} />
          </div>
        </div>

        {/* Latest Users */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Latest Users</h3>
          <div className="space-y-6">
            {loading ? (
              <p className="text-gray-400 text-sm text-center">Loading...</p>
            ) : latestUsers.length > 0 ? (
              latestUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between">
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
                  <button
                    className="ml-2 text-blue-600 hover:underline text-xs"
                    onClick={() => {
                      const names = u.name.split(" ");
                      setEditingUser(u);
                      setEditData({ first_name: names[0] || "", last_name: names.slice(1).join(" ") || "", email: u.email, role: u.role });
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center">No users yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <input
              placeholder="First Name"
              value={editData.first_name}
              onChange={e => setEditData(prev => ({ ...prev, first_name: e.target.value }))}
              className="w-full p-3 mb-3 border rounded-xl"
            />
            <input
              placeholder="Last Name"
              value={editData.last_name}
              onChange={e => setEditData(prev => ({ ...prev, last_name: e.target.value }))}
              className="w-full p-3 mb-3 border rounded-xl"
            />
            <input
              placeholder="Email"
              value={editData.email}
              onChange={e => setEditData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full p-3 mb-3 border rounded-xl"
            />
            <select
              value={editData.role}
              onChange={e => setEditData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full p-3 mb-3 border rounded-xl"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setEditingUser(null)} className="px-4 py-2 border rounded-xl">Cancel</button>
              <button onClick={updateUser} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// StatCard Component
function StatCard({ title, value, change, icon, bgColor, textColor }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${bgColor}`}>{icon}</div>
        <span className={`flex items-center text-xs font-bold ${textColor}`}><ArrowUpIcon className="w-3 h-3 mr-1" /> {change}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}
