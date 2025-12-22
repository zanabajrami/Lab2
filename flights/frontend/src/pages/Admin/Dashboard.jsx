import { BarChart3, DollarSign, Activity, Users, MoreVertical, Search, Bell } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { title: "Total Users", value: "1,245", icon: Users, color: "text-blue-500" },
    { title: "Revenue", value: "$12,430", icon: DollarSign, color: "text-green-500" },
    { title: "Active Sessions", value: "312", icon: Activity, color: "text-orange-500" },
    { title: "Reports", value: "48", icon: BarChart3, color: "text-purple-500" },
  ];

  const recentTransactions = [
    { id: 1, user: "Arben Hoxha", status: "Completed", amount: "$250.00", date: "Oct 24, 2023" },
    { id: 2, user: "Blerina Leka", status: "Pending", amount: "$120.50", date: "Oct 23, 2023" },
    { id: 3, user: "Dritan Rama", status: "Completed", amount: "$89.00", date: "Oct 22, 2023" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, here is what's happening today.</p>
        </div>
        <div className="flex gap-4">
          <button className="p-2 bg-white rounded-lg shadow-sm border border-gray-100"><Search size={20} /></button>
          <button className="p-2 bg-white rounded-lg shadow-sm border border-gray-100"><Bell size={20} /></button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-sm font-medium text-gray-500">{item.title}</p>
                <h2 className="text-3xl font-bold mt-1 text-gray-800">{item.value}</h2>
              </div>
              <div className={`p-3 rounded-xl bg-gray-50 ${item.color}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Recent Transactions</h3>
            <button className="text-blue-600 text-sm font-semibold hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm border-b">
                  <th className="pb-4 font-medium">Customer</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Amount</th>
                  <th className="pb-4 font-medium text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-medium text-gray-700">{tx.user}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-600 font-semibold">{tx.amount}</td>
                    <td className="py-4 text-gray-500 text-sm text-right">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Mini Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">Generate Report</button>
            <button className="w-full py-2.5 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">Manage Users</button>
          </div>
          <div className="mt-8 p-4 bg-indigo-50 rounded-xl">
            <p className="text-indigo-700 text-sm font-bold">System Health</p>
            <div className="w-full bg-indigo-200 h-2 rounded-full mt-2">
              <div className="bg-indigo-600 h-2 rounded-full w-[92%]"></div>
            </div>
            <p className="text-indigo-500 text-xs mt-2 text-right">92% Operational</p>
          </div>
        </div>
      </div>
    </div>
  );
}