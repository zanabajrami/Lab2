import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserRoundSearch, Phone, Mail, Globe, Calendar, CreditCard, Trash2 } from "lucide-react";

const Passengers = () => {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8800/api/bookings/all-passengers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPassengers(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching passengers:", err);
        setLoading(false);
      }
    };
    fetchPassengers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <UserRoundSearch className="text-indigo-600" />
            Passengers
          </h1>
          <p className="text-slate-500 text-sm">Manage and view all registered passengers across bookings.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
          <span className="text-slate-400 text-sm font-medium">Total Passengers:</span>
          <span className="text-indigo-600 font-bold">{passengers.length}</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Booking Code</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Personal Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Document & Bio</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {passengers.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  {/* Booking Code */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase">
                      {p.booking_code}
                    </span>
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{p.first_name} {p.last_name}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                      <Globe size={12} /> {p.nationality || "N/A"}
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail size={14} className="text-slate-400" /> {p.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                      <Phone size={14} className="text-slate-400" /> {p.phone || "No phone"}
                    </div>
                  </td>

                  {/* Passport & DOB */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-mono font-medium text-slate-700">
                      <CreditCard size={14} className="text-slate-400" /> {p.passport_number}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <Calendar size={14} className="text-slate-400" /> 
                      {p.dob ? new Date(p.dob).toLocaleDateString() : "N/A"}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {passengers.length === 0 && (
          <div className="py-20 text-center">
            <UserRoundSearch size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-medium">No passengers found in the records.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Passengers;