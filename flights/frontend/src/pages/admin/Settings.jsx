import React, { useState } from "react";

export default function SettingsPage() {
  const [userSettings, setUserSettings] = useState({
    username: "John Doe",
    email: "johndoe@example.com",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Settings saved:", userSettings);
    alert("Settings saved!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={userSettings.username}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={userSettings.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          name="notifications"
          checked={userSettings.notifications}
          onChange={handleChange}
        />
        <label className="text-sm font-medium">Enable Notifications</label>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
}
