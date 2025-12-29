import React from "react";
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
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform border-r border-gray-200 bg-white">
      <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
        <div className="flex items-center ps-2.5 mb-10">
          <div className="bg-indigo-600 p-1.5 rounded-lg mr-3">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <span className="self-center text-xl font-bold whitespace-nowrap">TailAdmin</span>
        </div>
        
        <ul className="space-y-2 font-medium flex-1">
          <SidebarItem icon={<HomeIcon className="w-5 h-5"/>} label="Dashboard" active />
          <SidebarItem icon={<UsersIcon className="w-5 h-5"/>} label="Users" />
          <SidebarItem icon={<CalendarDaysIcon className="w-5 h-5"/>} label="Bookings" />
          <SidebarItem icon={<CurrencyDollarIcon className="w-5 h-5"/>} label="Revenue" />
          <hr className="my-4 border-gray-100" />
          <SidebarItem icon={<Cog6ToothIcon className="w-5 h-5"/>} label="Settings" />
        </ul>

        <div className="mt-auto p-2 border-t border-gray-100 pt-4">
          <button className="flex items-center w-full p-2 text-red-600 transition duration-75 rounded-lg hover:bg-red-50 group">
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active = false }) {
  return (
    <li>
      <button className={`flex items-center w-full p-2.5 rounded-xl transition-all group ${
        active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-gray-600 hover:bg-gray-100"
      }`}>
        <span className={`${active ? "text-white" : "text-gray-400 group-hover:text-indigo-600"}`}>
          {icon}
        </span>
        <span className="ml-3 font-semibold">{label}</span>
      </button>
    </li>
  );
}