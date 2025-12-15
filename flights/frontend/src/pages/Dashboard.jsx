import { BarChart3, Users, DollarSign, Activity } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { title: "Total Users", value: "1,245", icon: Users },
    { title: "Revenue", value: "$12,430", icon: DollarSign },
    { title: "Active Sessions", value: "312", icon: Activity },
    { title: "Reports", value: "48", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800">
          New Action
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-2xl font-semibold">{item.value}</h2>
            </div>
            <item.icon className="w-8 h-8 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>User John registered</li>
            <li>Payment received from Anna</li>
            <li>New report generated</li>
            <li>Server backup completed</li>
          </ul>
        </div>

        {/* Admin Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Admin Panel</h3>
          <p className="text-sm text-gray-600 mb-4">
            Manage users, view reports and control system settings.
          </p>
          <button className="w-full border border-gray-300 rounded-xl py-2 hover:bg-gray-100">
            Go to Settings
          </button>
        </div>
      </div>
    </div>
  );
}
