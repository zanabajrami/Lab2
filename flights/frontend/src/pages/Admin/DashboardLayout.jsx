import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Not authorized");
        return data;
      })
      .then((data) => {
        console.log("Admin verified:", data.user);
        setAuthorized(true);
      })
      .catch((err) => {
        console.log("Redirect:", err.message);
        navigate("/"); // redirect për jo-admin
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (!authorized) return <p>Not authorized</p>; // optional

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <main className="p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </main>
      </div>
    </div>
  );
}
