import React, { useState, useEffect } from "react";

function Signup({ isOpen, onClose, onSwitchToLogin, onSignupSuccess }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // blloko scroll
      const timer = setTimeout(() => setIsVisible(true), 20);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "auto"; // rikthe scroll kur modal mbyllet
      };
    } else {
      setIsVisible(false);
      document.body.style.overflow = "auto"; // rikthe scroll
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kontroll password
    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and include at least one number!"
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!gender) {
      alert("Please select your gender!");
      return;
    }

    if (!birthday) {
      alert("Please select your birthday!");
      return;
    }

    // Kontroll format mm/dd/yyyy
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d\d$/;
    if (!dateRegex.test(birthday)) {
      alert("⚠️ Please enter a valid birthday in mm/dd/yyyy format!");
      return;
    }

    // Kontroll moshe 18+
    const [month, day, year] = birthday.split("/").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthday =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());
    if (!hasHadBirthday) age--;

    if (age < 18) {
      alert("🔞 You must be at least 18 years old to create an account!");
      return;
    }

    alert("🎉 You have created an account!");

    // Krijo account, thjesht ruaj userData
    onSignupSuccess({
      firstName,
      lastName,
      email,
      gender,
      birthday,
      password,
    });

    onClose();

    // Reset fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setGender("");
    setBirthday("");
  };

  return (
    <div
      className="fixed inset-0 flex justify-center bg-black/60 backdrop-blur-md z-50 p-4 md:items-center items-start"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className={`relative bg-gray-800/75 backdrop-blur-sm p-6 md:p-10 rounded-3xl shadow-xl
      w-full max-w-[480px] text-blue-400 border-2 border-gray-600
      animate-formGlow transform transition-all duration-500
      flex flex-col
      max-h-[95vh] overflow-y-auto
      ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-5"}
    `}
      >
        <h2 className="text-center text-3xl font-bold font-serif -mt-4 mb-4 tracking-wide glow-label">
          Create Account
        </h2>

        {/* First Name */}
        <div className="relative mb-6">
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="peer w-full p-3 rounded-xl bg-gray-700/50 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400/60 shadow-lg shadow-blue-800/50 transition duration-300"
            placeholder="First Name"
          />
          <label
            htmlFor="firstName"
            className={`absolute left-4 transition-all duration-300 ${firstName
              ? "top-0 text-white text-sm glow-label"
              : "top-3 text-gray-400 text-base"
              }`}
          >
            First Name
          </label>
        </div>

        {/* Last Name */}
        <div className="relative mb-6">
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="peer w-full p-3 rounded-xl bg-gray-700/50 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400/60 shadow-lg shadow-blue-800/50 transition duration-300"
            placeholder="Last Name"
          />
          <label
            htmlFor="lastName"
            className={`absolute left-4 transition-all duration-300 ${lastName
              ? "top-0 text-white text-sm glow-label"
              : "top-3 text-gray-400 text-base"
              }`}
          >
            Last Name
          </label>
        </div>

        {/* Email */}
        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="peer w-full p-3 rounded-xl bg-gray-700/50 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400/60 shadow-lg shadow-blue-800/50 transition duration-300"
            placeholder="Email"
          />
          <label
            htmlFor="email"
            className={`absolute left-4 transition-all duration-300 ${email
              ? "top-0 text-white text-sm glow-label"
              : "top-3 text-gray-400 text-base"
              }`}
          >
            Email address
          </label>
        </div>

        {/* Gender */}
        <div className="relative mb-6 flex items-center justify-between bg-gray-700/50 rounded-xl p-3 shadow-lg shadow-blue-800/50">
          <span className="text-gray-300 glow-label">Gender</span>

          <div className="flex gap-4">
            <label className={`cursor-pointer px-3 py-1 rounded-full border-2 border-gray-600 transition-all duration-300 ${gender === "F" ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.7)]" : "text-gray-200"
              }`}>
              <input
                type="radio"
                name="gender"
                value="F"
                className="hidden"
                onChange={() => setGender("F")}
              />
              F
            </label>

            <label className={`cursor-pointer px-3 py-1 rounded-full border-2 border-gray-600 transition-all duration-300 ${gender === "M" ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.7)]" : "text-gray-200"
              }`}>
              <input
                type="radio"
                name="gender"
                value="M"
                className="hidden"
                onChange={() => setGender("M")}
              />
              M
            </label>
          </div>
        </div>

        {/* Birthday */}
        <div className="relative mb-6 bg-gray-700/50 rounded-xl p-3 shadow-lg shadow-blue-800/50 flex items-center justify-between transition duration-300">
          <span className="text-gray-300 glow-label">Birthday</span>

          <input
            type="text"
            id="birthday"
            value={birthday}
            onChange={(e) => {
              let input = e.target.value.replace(/\D/g, ""); // vetëm numra
              if (input.length > 8) input = input.slice(0, 8);

              // Formatimi automatik mm/dd/yyyy
              if (input.length > 4) {
                input = input.slice(0, 2) + "/" + input.slice(2, 4) + "/" + input.slice(4);
              } else if (input.length > 2) {
                input = input.slice(0, 2) + "/" + input.slice(2);
              }

              setBirthday(input);
            }}
            placeholder="mm/dd/yyyy"
            required
            maxLength={10}
            className="bg-transparent text-white placeholder-gray-400 text-right w-[28%] tracking-wider 
               border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 
               rounded-lg transition duration-300"
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="peer w-full p-3 rounded-xl bg-gray-700/50 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400/60 shadow-lg shadow-blue-800/50 transition duration-300"
            placeholder="Password"
          />
          <label
            htmlFor="password"
            className={`absolute left-4 transition-all duration-300 ${password
              ? "top-0 text-white text-sm glow-label"
              : "top-3 text-gray-400 text-base"
              }`}
          >
            Password
          </label>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="peer w-full p-3 rounded-xl bg-gray-700/50 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400/60 shadow-lg shadow-blue-800/50 transition duration-300"
            placeholder="Confirm Password"
          />
          <label
            htmlFor="confirmPassword"
            className={`absolute left-4 transition-all duration-300 ${confirmPassword
              ? "top-0 text-white text-sm glow-label"
              : "top-3 text-gray-400 text-base"
              }`}
          >
            Confirm Password
          </label>
        </div>

        {/* Show Password */}
        <div className="flex items-center justify-start mb-6">
          <label
            htmlFor="showPassword"
            className="flex items-center cursor-pointer select-none"
          >
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="w-4 h-4 rounded-sm border-2 border-gray-600 bg-gray-700 appearance-none relative checked:after:content-['✓'] checked:after:text-blue-500 checked:after:absolute checked:after:left-[2px] checked:after:top-[-2px] checked:after:text-sm cursor-pointer"
            />
            <span className="ml-2 text-gray-300 text-sm">Show Password</span>
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-auto font-serif w-full py-3 rounded-xl bg-gradient-to-r from-blue-900 via-blue-500 to-blue-700 text-white font-bold shadow-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.4)] animate-pulseButton"
        >
          Sign Up
        </button>

        {/* Log in link */}
        <p className="mt-3 -mb-5 text-gray-400 text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={() => {
              onClose();
              onSwitchToLogin();
            }}
            className="text-blue-400 hover:underline hover:text-white"
          >
            Log in
          </button>
        </p>

        {/* Styles */}
        <style>{`
          .glow-label {
            text-shadow: 0 0 8px rgba(99, 123, 163, 0.8);
          }
          @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 10px rgba(59,130,246,0.4); }
            50% { box-shadow: 0 0 20px rgba(59,130,246,0.7); }
          }
          input:focus { animation: glowPulse 2s infinite; }
          input:-webkit-autofill {
            -webkit-box-shadow: 0 0 20px rgba(59,130,246,0.7) !important;
            box-shadow: 0 0 20px rgba(59,130,246,0.7) !important;
            -webkit-text-fill-color: #fff !important;
            animation: glowPulse 2s infinite !important;
            transition: background-color 5000s ease-in-out 0s;
          }
          @keyframes pulseButton {
            0%, 100% { box-shadow: 0 0 15px rgba(97, 121, 159, 0.5); }
            50% { box-shadow: 0 0 25px rgba(101, 116, 143, 0.8); }
          }
          .animate-pulseButton { animation: pulseButton 2s infinite; }
          @keyframes formGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(59,130,246,0.3); }
            50% { box-shadow: 0 0 40px rgba(59,130,246,0.6); }
          }
          .animate-formGlow { animation: formGlow 3s infinite; }
        `}</style>
      </form>
    </div>
  );
}

export default Signup;
