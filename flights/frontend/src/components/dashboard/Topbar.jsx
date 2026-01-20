import React, { useState, useEffect } from "react";
import { Search, Menu, ChevronDown, Mail, MailOpen, Trash2 } from "lucide-react";
import axios from "axios";

export default function Topbar({ user, onToggleSidebar }) {
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const userName = user?.name || "Admin";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/messages");
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, []);

  /* UNREAD CHECK */
  const hasUnread = messages.some((m) => Number(m.is_read) === 0);

  /*MARK AS READ */
  const markAsRead = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:8800/api/messages/${id}/read`);

      if (res.status === 200) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, is_read: 1 } : m))
        );
      }
    } catch (err) {
      console.error("Serveri nuk u përditësua:", err);
      fetchMessages();
    }
  };

  /* DELETE MESSAGE */
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/messages/${id}`);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-3 flex items-center justify-between">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden p-2.5 hover:bg-slate-100 rounded-xl text-slate-600" onClick={onToggleSidebar}>
          <Menu size={22} />
        </button>

        <div className="relative hidden md:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-72 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10"
            placeholder="Search records..."
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {/* MESSAGES DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setIsMessagesOpen(!isMessagesOpen)}
            className="relative p-2.5 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
          >
            <Mail size={22} />
            {hasUnread && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-600 border-2 border-white rounded-full"></span>
            )}
          </button>

          {isMessagesOpen && (
            /* NDRYSHIMI KËTU: shtuam fixed në mobile, absolute në md+, dhe rregulluam gjerësinë */
            <div className="fixed inset-x-4 top-16 md:absolute md:inset-auto md:right-0 md:mt-3 w-auto md:w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">

              <div className="px-4 py-3 font-bold border-b flex justify-between items-center bg-slate-50/50 text-slate-800">
                <span>Messages</span>
                {hasUnread && (
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                    New Activity
                  </span>
                )}
              </div>

              {/* Rritëm lartësinë max për mobile që të shfrytëzohet ekrani */}
              <div className="max-h-[60vh] md:max-h-[400px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm italic">No messages found</div>
                ) : (
                  messages.map((msg) => {
                    const isUnread = Number(msg.is_read) === 0;

                    return (
                      <div
                        key={msg.id || msg._id}
                        onClick={() => {
                          if (isUnread) markAsRead(msg.id || msg._id);
                        }}
                        className={`group relative px-4 py-4 border-b last:border-b-0 cursor-pointer transition-all duration-300
                  ${isUnread
                            ? "bg-blue-50/60 border-l-4 border-blue-600 opacity-100"
                            : "bg-white opacity-50 hover:opacity-100"}
                `}
                      >
                        <div className="absolute top-5 left-3">
                          {isUnread ? (
                            <Mail size={16} className="text-blue-600" />
                          ) : (
                            <MailOpen size={16} className="text-slate-400" />
                          )}
                        </div>

                        <div className="pl-6 pr-6">
                          <div className="flex justify-between items-start">
                            <p className={`text-sm truncate max-w-[150px] md:max-w-none ${isUnread ? "font-black text-slate-900" : "font-normal text-slate-500"}`}>
                              {msg.name}
                            </p>
                            {isUnread && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mt-1"></span>
                            )}
                          </div>

                          <p className={`text-[11px] mb-1 truncate ${isUnread ? "font-bold text-blue-700" : "font-normal text-slate-400"}`}>
                            {msg.email}
                          </p>

                          <p className={`text-sm line-clamp-2 leading-snug ${isUnread ? "font-bold text-slate-800" : "font-light text-slate-500"}`}>
                            {msg.message}
                          </p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(msg.id || msg._id);
                          }}
                          className="absolute top-4 right-2 p-1.5 rounded-lg text-slate-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* USER PROFILE */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-slate-900 leading-tight">{userName}</p>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">{user?.role || "Administrator"}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex items-center justify-center font-black shadow-md shadow-blue-100">
            {initials}
          </div>
          <ChevronDown size={16} className="text-slate-400 hidden md:block" />
        </div>
      </div>
    </header>
  );
}