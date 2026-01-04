import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Search, Menu, ChevronDown } from "lucide-react";

export default function AdminLayout({ children, user }) {
  const userName = user?.name || "Admin";
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">

          {/* Left Side: Mobile Menu & Search */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu size={20} />
            </button>

            <div className="relative hidden md:block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                className="block w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
                placeholder="Search records..."
              />
            </div>
          </div>

          {/* Right Side: User Profile */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 leading-none">
                  {userName}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {user?.role || "System Administrator"}
                </p>
              </div>

              {/* Profile Avatar with Dropdown Indicator */}
              <button className="flex items-center gap-2 group">
                <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-offset-2 ring-transparent group-hover:ring-indigo-100 transition-all">
                  {initials}
                </div>
                <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
}