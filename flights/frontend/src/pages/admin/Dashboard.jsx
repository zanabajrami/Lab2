import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import AdminLayout from "./Layout";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({ users: 0, bookings: 0, revenue: 0 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!userData || userData.role !== "admin") {
      navigate("/");
    }
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data.stats);
      setUsers(res.data.users);
    } catch (err) { console.error(err); }
  };

  return (
    <AdminLayout user={userData}>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">System Overview</h1>
        <p className="text-gray-500 mt-1">Real-time analytics and user management.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
        <StatCard title="Total Users" value={stats.users} change="+12.5%" />
        <StatCard title="Total Bookings" value={stats.bookings} change="+3.2%" />
        <StatCard title="Revenue" value={`€${stats.revenue}`} change="+18.7%" />
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, change }) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg flex items-center">
          {change} <ArrowUpIcon className="w-3 h-3 ml-1" />
        </span>
      </div>
      <p className="text-3xl font-extrabold text-gray-900 leading-none">{value}</p>
    </div>
  );
}