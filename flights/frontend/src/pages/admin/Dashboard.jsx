import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!userData || userData.role !== "admin") {
            navigate("/"); // redirect user normal
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-10">
            <h1 className="text-3xl font-bold text-blue-400 mb-6">
                Admin Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl">Users</div>
                <div className="bg-gray-800 p-6 rounded-xl">Bookings</div>
                <div className="bg-gray-800 p-6 rounded-xl">Deals</div>
            </div>
        </div>
    );
}

export default AdminDashboard;
