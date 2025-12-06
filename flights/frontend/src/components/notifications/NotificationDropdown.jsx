import React, { useState } from "react";
import { useNotifications } from "../../context/NotificationContext";

export default function NotificationDropdown({ open, onSelect }) {
    const { notifications, markAsRead, markAllAsRead } = useNotifications();
    const [expandedId, setExpandedId] = useState(null);

    if (!open) return null;

    const handleClick = (notification) => {
        markAsRead(notification.id);
        onSelect(notification);
        setExpandedId(expandedId === notification.id ? null : notification.id);
    };

    return (
        <div className="absolute right-0 mt-4 w-80 bg-white shadow-xl rounded-xl p-3 border z-50">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">Notifications</h3>
                <button className="text-sm text-blue-500" onClick={markAllAsRead}>
                    Mark all as read
                </button>
            </div>

            {notifications.length === 0 && (
                <p className="text-gray-500 text-center py-6">No notifications</p>
            )}

            <div className="space-y-2 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                    <div
                        key={n.id}
                        onClick={() => handleClick(n)}
                        className={`p-3 rounded-lg cursor-pointer border ${n.read ? "bg-gray-100" : "bg-blue-50 border-blue-400"}`}
                    >
                        <p className="font-medium">{n.title}</p>
                        {expandedId === n.id && (
                            <p className="text-sm text-gray-600 mt-2">
                                {n.message} <br />
                                Flight: XYZ123, Departure: 10:00AM, Seat: 12A
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
