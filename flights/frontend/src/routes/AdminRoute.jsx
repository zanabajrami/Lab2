import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-xl font-semibold">
          ❌ Nuk je i autorizuar me pa këtë faqe
        </div>
      </div>
    );
  }

  return children;
}
