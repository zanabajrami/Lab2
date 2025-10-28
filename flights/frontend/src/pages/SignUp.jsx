import React, { useState } from "react";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validimi i fjalëkalimit
    const passwordRegex = /^(?=.*\d).{8,}$/; // të paktën 8 karaktere + 1 numër
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters long and include at least one number!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // ✅ Mesazhi i suksesit
    alert("🎉 You have created an account!");

    // ✅ Pastrimi i fushave pas krijimit të accountit
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-indigo-200 via-blue-200 to-cyan-200 font-[Poppins]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/50 backdrop-blur-lg border border-gray/30 p-10 rounded-2xl shadow-2xl w-[480px] text-center text-gray-800"
      >
        <h2 className="text-3xl font-semibold mb-3 text-gray-800">
          Create Account
        </h2>
        <p className="text-md text-gray-700 mb-8">
          Join us and explore amazing features
        </p>

        {/* First Name */}
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Last Name */}
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (min. 8 chars & 1 number)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ✅ Show Password Checkbox */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2 accent-blue-500"
          />
          <label
            htmlFor="showPassword"
            className="text-gray-700 text-sm cursor-pointer select-none"
          >
            Show Password
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 hover:from-cyan-400 hover:to-indigo-500 transition-all duration-300 font-semibold text-white shadow-lg"
        >
          Sign Up
        </button>

        <p className="mt-5 text-md text-gray-700">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-gray font-medium underline hover:text-cyan-600"
          >
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
