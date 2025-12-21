import { BarChart3, Users, DollarSign, Activity } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { title: "Total Users", value: "1,245", icon: Users },
    { title: "Revenue", value: "$12,430", icon: DollarSign },
    { title: "Active Sessions", value: "312", icon: Activity },
    { title: "Reports", value: "48", icon: BarChart3 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-2xl font-semibold">{item.value}</h2>
            </div>
            <item.icon className="w-8 h-8 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
