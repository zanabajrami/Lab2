import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-indigo-200 via-blue-200 to-cyan-200 font-[Poppins]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/50 backdrop-blur-lg border border-gray/30 p-10 rounded-2xl shadow-2xl w-96 text-center text-gray-800"
      >
        <h2 className="text-3xl font-semibold mb-3">Welcome Back </h2>
        <p className="text-m text-gray-700 mb-8">
          Please login to continue
        </p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 hover:from-cyan-400 hover:to-indigo-500 transition-all duration-300 font-semibold text-white shadow-lg"
        >
          Login
        </button>

        <p className="mt-5 text-m text-gray-700">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-gray font-medium underline hover:text-cyan-600"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
