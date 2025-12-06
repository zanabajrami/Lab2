import { useNotifications } from "../context/NotificationContext";

export default function NotificationDropdown({ open }) {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  if (!open) return null;

  return (
    <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl p-3 border">
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
            onClick={() => markAsRead(n.id)}
            className={`p-3 rounded-lg cursor-pointer border 
              ${n.read ? "bg-gray-100" : "bg-blue-50 border-blue-200"}
            `}
          >
            <p className="font-medium">{n.title}</p>
            <p className="text-sm text-gray-600">{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
