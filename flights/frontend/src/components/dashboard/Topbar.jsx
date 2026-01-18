import React, { useState } from "react";
import { Search, Menu, ChevronDown, X, Bell } from "lucide-react";

export default function Topbar({ user, onToggleSidebar }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const userName = user?.name || "Admin";
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-3 flex items-center justify-between">
      
      {/* Left Side: Mobile Menu & Desktop Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          className="lg:hidden p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-600"
          onClick={onToggleSidebar}
        >
          <Menu size={22} />
        </button>

        {/* Desktop Search - I përshtatur me stilin e tabelës */}
        <div className="relative hidden md:block group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <Search size={18} />
          </span>
          <input
            type="text"
            className="block w-72 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all"
            placeholder="Search records..."
          />
        </div>
      </div>

      {/* Right Side: Search Toggle, Notifications, User */}
      <div className="flex items-center gap-2 md:gap-5">
        
        {/* Mobile Search Toggle */}
        <button
          className="md:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          {isSearchOpen ? <X size={22} /> : <Search size={22} />}
        </button>

        {/* Profile Section */}
        <div className="flex items-center gap-3 pl-2 md:pl-5 border-l border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none">
              {userName}
            </p>
            <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-tight">
              {user?.role || "Administrator"}
            </p>
          </div>

          <button className="flex items-center gap-2 group p-1 hover:bg-slate-50 rounded-2xl transition-all">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
              {initials}
            </div>
            <ChevronDown
              size={16}
              className="text-slate-400 group-hover:text-slate-600 transition-colors hidden md:block"
            />
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay - E rregulluar që të mos prishë tabelën */}
      {isSearchOpen && (
        <div className="absolute top-[100%] left-0 w-full p-4 bg-white border-b border-slate-200 shadow-xl md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search size={18} />
            </span>
            <input
              autoFocus
              type="text"
              className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="Search anything..."
            />
          </div>
        </div>
      )}
    </header>
  );
}