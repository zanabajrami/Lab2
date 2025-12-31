import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);

  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await axios.delete(`http://localhost:8800/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadUsers();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Users Management</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-3">{u.username}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{u.role}</td>
                <td className="p-3">
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center p-4 text-slate-400">No users found</p>
        )}
      </div>
    </div>
  );
}
