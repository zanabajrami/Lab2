import { useState, useEffect } from "react";

function Login({ isOpen, onSwitchToRegister, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // blloko scroll
      const timer = setTimeout(() => setIsVisible(true), 20);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "auto"; // rikthe scroll
      };
    } else {
      setIsVisible(false);
      document.body.style.overflow = "auto"; // rikthe scroll nëse modal nuk është hapur
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and include at least one number!"
      );
      return;
    }
    alert("You are logged in!");
    setEmail("");
    setPassword("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className={`text-xl relative bg-gray-800/75 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-3xl border-2 border-gray-600 w-11/12 sm:w-3/4 md:w-full max-w-sm md:max-w-md text-center text-blue-400 shadow-xl animate-formGlow transform transition-all duration-500 ${isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-5"
          }`}
      >
        <h2 className="text-3xl font-bold font-serif mb-2 tracking-wide glow-label">
          Welcome Back
        </h2>
        <p className="text-blue-300 font-serif mb-8 glow-label">
          Login to continue
        </p>

        {/* Email input */}
        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="peer w-full p-3 rounded-xl bg-gray-700/50 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400/60 shadow-lg shadow-blue-800/50 transition duration-300"
            placeholder="Email"
            autoComplete="email"
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

        {/* Password input */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="peer w-full p-3 rounded-xl bg-gray-700/50 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400/60 shadow-lg shadow-blue-800/50 transition duration-300"
            placeholder="Password"
            autoComplete="current-password"
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

        {/* Login button with glow */}
        <button
          type="submit"
          className="font-serif w-full py-3 rounded-xl bg-gradient-to-r from-blue-900 via-blue-500 to-blue-700 text-white font-bold shadow-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.4)] animate-pulseButton"
        >
          Login
        </button>

        <p className="mt-8 text-slate-500 text-base text-center">
          Don’t have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-blue-500 hover:underline hover:text-white transition"
          >
            Sign up
          </button>
        </p>

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

export default Login;
