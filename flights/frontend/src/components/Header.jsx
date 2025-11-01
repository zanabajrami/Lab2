import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Header({ openLogin, openSignup, openContact }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDealsOptions, setShowDealsOptions] = useState(false);
  const dealsRef = useRef(null);
  const navigate = useNavigate();

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click jashtë listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dealsRef.current && !dealsRef.current.contains(event.target)) {
        setShowDealsOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Destinations", action: null },
    { label: "Flights", action: null },
    { label: "Deals", action: () => setShowDealsOptions(!showDealsOptions) },
    { label: "Contact", action: openContact },
  ];

  // Navigation për dropdown
  const handleOptionClick = (option) => {
    if (option === "Memberships") {
      navigate("/membership");
    } else if (option === "Last Minute Deals") {
      navigate("/deals");
    }
    setShowDealsOptions(false);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -15, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { opacity: 0, y: -15, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <header
      className={`rounded-b-lg fixed w-full top-0 left-0 z-50 transition-all duration-500 bg-gray-900 relative shadow-lg shadow-indigo-500/50 ${scrolled ? "backdrop-blur-md" : ""}`}
    >
      {/* Glow poshtë header */}
      <div className="absolute bottom-0 left-0 w-full h-4 pointer-events-none">
        <div className="w-full h-full rounded-lg bg-blue-500/30 shadow-[0_4px_30px_rgba(59,130,246,0.6)] blur-xl animate-pulseGlow"></div>
      </div>

      <div className="max-w-6xl mx-auto flex justify-between items-center p-4 relative z-10">
        <div className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-200 to-white">
          FlyHigh Agency
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 relative">
          {menuItems.map((item) => (
            <li key={item.label} className="relative" ref={item.label === "Deals" ? dealsRef : null}>
              <div
                className="cursor-pointer text-white font-semibold tracking-wide transition-colors duration-300 hover:text-blue-400 hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.7)]"
                onClick={item.action}
              >
                {item.label}
              </div>

              {/* Dropdown me animacion */}
              <AnimatePresence>
                {item.label === "Deals" && showDealsOptions && (
                  <motion.ul
                    className="absolute left-0 mt-2 w-48 rounded-xl bg-gray-900/80 backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-gray-700 overflow-hidden z-50"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                  >
                    <li
                      className="px-4 py-2 cursor-pointer text-gray-400 hover:bg-blue-600/20 transition-colors duration-200 hover:text-gray-200"
                      onClick={() => handleOptionClick("Last Minute Deals")}
                    >
                      Last Minute Deals
                    </li>
                    <li
                      className="px-4 py-2 cursor-pointer text-gray-400 hover:bg-blue-600/20 transition-colors duration-200 hover:text-gray-200"
                      onClick={() => handleOptionClick("Memberships")}
                    >
                      Memberships
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={openLogin}
            className="relative px-4 py-2 font-semibold text-blue-500 border border-blue-500 rounded-lg 
             bg-transparent shadow-lg transition-all duration-300 transform 
             hover:text-blue-300 hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.5)] hover:scale-105"
          >
            Login
          </button>
          <button
            onClick={openSignup}
            className="relative px-4 py-2 font-semibold bg-blue-500 text-gray-900 rounded-lg shadow-lg hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.4)] transition-all duration-300 hover:scale-105"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden mt-4 bg-gray-800 rounded-lg p-4 space-y-3 text-center">
          {menuItems.map((item) => (
            <li key={item.label} className="cursor-pointer hover:text-blue-400 transition-all duration-300 font-semibold">
              {item.label}
              {item.label === "Deals" && (
                <ul className="mt-2 bg-gray-700/90 rounded-xl p-2 space-y-1 backdrop-blur-md shadow-lg">
                  <li
                    className="px-2 py-1 hover:bg-blue-500/20 cursor-pointer transition-colors duration-200"
                    onClick={() => handleOptionClick("Last Minute Deals")}
                  >
                    Last Minute Deals
                  </li>
                  <li
                    className="px-2 py-1 hover:bg-blue-500/20 cursor-pointer transition-colors duration-200"
                    onClick={() => handleOptionClick("Memberships")}
                  >
                    Memberships
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 1px 10px rgba(59,130,246,0.6); }
          50% { box-shadow: 0 4px 20px rgba(59,130,246,0.9); }
        }
        .animate-pulseGlow {
          animation: pulseGlow 2s infinite;
        }
      `}</style>
    </header>
  );
}

export default Header;
