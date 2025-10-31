import React, { useState, useEffect } from "react";

function Header({ openLogin, openSignup, openContact }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Explore", action: null },
    { label: "Flights", action: null },
    { label: "Offers", action: null },
    { label: "Contact", action: openContact },
  ];

  return (
    <header
      className={`rounded-b-lg fixed w-full top-0 left-0 z-50 transition-all duration-500 bg-gray-900 relative shadow-lg shadow-indigo-500/50 ${scrolled ? "backdrop-blur-md" : ""}`}
    >
      {/* Glow / Shadow poshtë header */}
      <div className="absolute bottom-0 left-0 w-full h-4 pointer-events-none">
        <div className="w-full h-full rounded-lg bg-blue-500/30 shadow-[0_4px_30px_rgba(59,130,246,0.6)] blur-xl animate-pulseGlow"></div>
      </div>

      <div className="max-w-6xl mx-auto flex justify-between items-center p-4 relative z-10">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-200 to-white">
          FlyHigh Agency
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10">
          {menuItems.map((item) => (
            <li
              key={item.label}
              className="cursor-pointer text-white font-semibold tracking-wide transition-colors duration-300 hover:text-blue-400 hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.7)]"
              onClick={item.action}
            >
              {item.label}
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
            <li
              key={item.label}
              className="cursor-pointer hover:text-blue-400 transition-all duration-300 font-semibold"
              onClick={item.action}
            >
              {item.label}
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
