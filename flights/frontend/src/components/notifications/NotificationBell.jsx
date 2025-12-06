import { Bell } from "lucide-react";
import { LuBellDot } from "react-icons/lu";
import { useNotifications } from "../../context/NotificationContext"; // import context

export default function NotificationBell({ onClick }) {
  const { notifications } = useNotifications(); // merr notifications direkt nga context
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <button onClick={onClick} className="relative p-2">
      {unreadCount > 0 ? (
        <LuBellDot className="w-7 h-7 text-blue-400" />
      ) : (
        <Bell className="w-7 h-7 text-blue-200" />
      )}
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 rounded-full">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
