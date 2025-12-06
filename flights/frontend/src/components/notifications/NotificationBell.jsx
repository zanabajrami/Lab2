import { useNotifications } from "../context/NotificationContext";
import { Bell } from "lucide-react";

export default function NotificationBell({ onClick }) {
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <button onClick={onClick} className="relative p-2">
      <Bell className="w-6 h-6 text-gray-700" />

      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
