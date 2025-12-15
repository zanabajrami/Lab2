import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <Button className="rounded-2xl">New Action</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => (
          <Card key={index} className="rounded-2xl shadow-sm">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h2 className="text-2xl font-semibold">{item.value}</h2>
              </div>
              <item.icon className="w-8 h-8 text-gray-400" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity */}
        <Card className="lg:col-span-2 rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>User John registered</li>
              <li>Payment received from Anna</li>
              <li>New report generated</li>
              <li>Server backup completed</li>
            </ul>
          </CardContent>
        </Card>

        {/* Profile / Info */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Admin Panel</h3>
            <p className="text-sm text-gray-600 mb-4">
              Manage users, view reports and control system settings.
            </p>
            <Button variant="outline" className="w-full rounded-2xl">
              Go to Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
