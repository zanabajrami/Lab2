import React, { useState } from "react";
import axios from "axios";
import { X, UserPlus } from "lucide-react";

export default function AddUserModal({ isOpen, onClose, onSuccess, token }) {
  const [addData, setAddData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "user",
    gender: "",
    birthday: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      await axios.post(
        "http://localhost:8800/api/auth/register",
        addData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 1. Pastro formën
      setAddData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "user",
        gender: "",
        birthday: ""
      });

      // 2. Rifresko listën te Users.jsx
      onSuccess();

      // 3. Mbyll modalin
      onClose();
    } catch (err) {
      alert("Failed to create user. Please check all fields.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <UserPlus size={22} className="text-slate-800" />
              Add New User
            </h2>
            <p className="text-slate-500 text-sm mt-1">Create a new system account</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="first_name"
              placeholder="First name"
              value={addData.first_name}
              onChange={handleChange}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              name="last_name"
              placeholder="Last name"
              value={addData.last_name}
              onChange={handleChange}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={addData.email}
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              name="gender"
              value={addData.gender}
              onChange={handleChange}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-600 outline-none"
            >
              <option value="">Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            <input
              name="birthday"
              type="date"
              value={addData.birthday}
              onChange={handleChange}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 outline-none"
            />
          </div>

          <input
            name="password"
            type="password"
            placeholder="Secure Password"
            value={addData.password}
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            name="role"
            value={addData.role}
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none"
          >
            <option value="user">Standard User</option>
            <option value="admin">Administrator</option>
          </select>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-6 py-3 bg-slate-950 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95"
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}