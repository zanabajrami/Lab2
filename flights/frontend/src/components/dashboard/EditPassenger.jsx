import axios from "axios";
import { X, Loader2, Calendar, Lock, Save } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

const EditPassenger = ({ passenger, onClose, onUpdated }) => {
  const [form, setForm] = useState({ ...passenger });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // Fetch USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8800/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, []);

  // Check if passenger is linked to a user
  const isLinkedToUser = useMemo(() => {
    if (passenger?.user_id) return true;

    return users.some(
      (user) =>
        user.email?.toLowerCase() === passenger?.email?.toLowerCase()
    );
  }, [users, passenger]);

  // Block scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      isLinkedToUser &&
      ["first_name", "last_name", "email", "birthday"].includes(name)
    ) {
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const payload = { ...form };

      // SECURITY: mos dergo fushat e bllokuara
      if (isLinkedToUser) {
        delete payload.first_name;
        delete payload.last_name;
        delete payload.email;
        delete payload.birthday;
      }

      await axios.put(
        `http://localhost:8800/api/passengers/${passenger.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update passenger");
    } finally {
      setLoading(false);
    }
  };

  if (!passenger) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#0b0f1a] border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-black text-white">Edit Passenger</h2>
            <p className="text-xs text-slate-500">
              {isLinkedToUser ? "Linked to user account" : "Guest passenger"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-900 rounded-xl">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Name & Email */}
            <div className="space-y-2">
              <input
                name="first_name"
                value={form.first_name || ""}
                onChange={handleChange}
                readOnly={isLinkedToUser}
                placeholder="First name"
                className={`w-full bg-transparent border-b text-white font-bold ${
                  isLinkedToUser && "opacity-50 cursor-not-allowed"
                }`}
              />
              <input
                name="last_name"
                value={form.last_name || ""}
                onChange={handleChange}
                readOnly={isLinkedToUser}
                placeholder="Last name"
                className={`w-full bg-transparent border-b text-white font-bold ${
                  isLinkedToUser && "opacity-50 cursor-not-allowed"
                }`}
              />
              <input
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                readOnly={isLinkedToUser}
                placeholder="Email"
                className={`w-full bg-transparent border-b text-blue-400 font-mono ${
                  isLinkedToUser && "opacity-50 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Birthday */}
            <div className="flex items-center gap-3">
              <Calendar size={14} />
              <input
                type="date"
                name="birthday"
                value={form.birthday?.substring(0, 10) || ""}
                onChange={handleChange}
                readOnly={isLinkedToUser}
                className={`bg-slate-800/50 px-2 py-1 rounded ${
                  isLinkedToUser && "opacity-50 cursor-not-allowed"
                }`}
              />
              {isLinkedToUser && <Lock size={14} className="ml-auto text-slate-500" />}
            </div>

            {/* Editable fields */}
            <input
              name="passport_number"
              value={form.passport_number || ""}
              onChange={handleChange}
              placeholder="Passport number"
              className="w-full bg-slate-900/50 px-4 py-3 rounded-xl text-white"
            />

            <input
              name="nationality"
              value={form.nationality || ""}
              onChange={handleChange}
              placeholder="Nationality"
              className="w-full bg-slate-900/50 px-4 py-3 rounded-xl text-white"
            />

            <input
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full bg-slate-900/50 px-4 py-3 rounded-xl text-white"
            />
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-800 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-black flex justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPassenger;
