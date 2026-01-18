import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  UsersIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sticky top-0 left-0 h-[calc(100vh-0px)] w-20 sm:w-64 border-r border-gray-100 bg-slate-50/50 backdrop-blur-xl">
      <div className="h-full flex flex-col px-2 sm:px-4 py-6 overflow-y-auto bg-white">
        {/* Logo Section */}
        <div className="flex items-center justify-center sm:justify-start mb-10">
          <div className="bg-[#040628ff] p-2 rounded-xl shadow-lg shadow-blue-200">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <span className="ml-0 sm:ml-3 text-xl font-bold tracking-tight text-slate-800 hidden sm:block">
            Flyhigh
          </span>
        </div>

        {/* Navigation Items */}
        <ul className="space-y-1.5 flex-1">
          <SidebarItem
            icon={<HomeIcon className="w-5 h-5" />}
            label="Dashboard"
            active={location.pathname === "/admin/"}
            onClick={() => navigate("/admin/")}
          />

          <SidebarItem
            icon={<UsersIcon className="w-5 h-5" />}
            label="Users"
            active={location.pathname === "/admin/users"}
            onClick={() => navigate("/admin/users")}
          />

          <SidebarItem
            icon={<CalendarDaysIcon className="w-5 h-5" />}
            label="Bookings"
            onClick={() => navigate("/admin/bookings")}
          />

          <SidebarItem
            icon={<CurrencyDollarIcon className="w-5 h-5" />}
            label="Revenue"
            onClick={() => navigate("/admin/revenue")}
          />

          <SidebarItem
            icon={<Cog6ToothIcon className="w-5 h-5" />}
            label="Settings"
            active={location.pathname === "/admin/settings"}
            onClick={() => navigate("/admin/settings")}
          />
        </ul>

        {/* Logout Section */}
        <div className="mt-auto pt-4 border-t border-gray-50">
          <button className="flex items-center justify-center sm:justify-start w-full p-3 text-slate-500 transition-all duration-200 rounded-xl hover:bg-red-50 hover:text-red-600 group">
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-0 sm:mr-3 transition-colors" />
            <span className="hidden sm:block font-semibold text-sm">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active = false, onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center justify-center sm:justify-start w-full p-3 rounded-xl transition-all duration-200 group ${
          active
            ? "bg-[#040628ff] text-white shadow-md shadow-blue-100"
            : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
        }`}
      >
        <span
          className={`${
            active
              ? "text-white"
              : "text-slate-400 group-hover:text-blue-600"
          } transition-colors duration-200`}
        >
          {icon}
        </span>
        <span className="ml-0 sm:ml-3 font-semibold text-sm hidden sm:block">{label}</span>
      </button>
    </li>
  );
}
