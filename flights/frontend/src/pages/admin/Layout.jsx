import React from "react";
import Sidebar from "../../components/Sidebar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AdminLayout({ children, user }) {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans antialiased text-gray-900">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Top Navbar */}
        <div className="flex items-center justify-between mb-8">
          <div className="relative w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </span>
            <input 
              type="text" 
              className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5 outline-none" 
              placeholder="Search..." 
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold">{user?.name || "Admin"}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{user?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 text-indigo-700 font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}