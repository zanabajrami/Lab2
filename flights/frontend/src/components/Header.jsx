import React, { useState } from "react";
import { Link } from "react-router-dom";
import Contact from "../pages/Contact";

function Header() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">FlyHigh Agency</div>

        {/* Menu */}
        <ul className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <li className="hover:text-blue-400 cursor-pointer">Services</li>
          <li className="hover:text-blue-400 cursor-pointer">Destinations</li>
          <li className="hover:text-blue-400 cursor-pointer">Deals</li>
          <li
            className="hover:text-blue-400 cursor-pointer"
            onClick={() => setIsContactOpen(true)}
          >
            Contact Us
          </li>
        </ul>

        {/* Login / SignUp */}
        <div className="flex items-center space-x-3">
          <Link
            to="/login"
            className="bg-transparent border border-blue text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 hover:shadow-lg transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-500 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-200 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Contact Modal */}
      {isContactOpen && (
        <Contact onClose={() => setIsContactOpen(false)} />
      )}
    </header>
  );
}

export default Header;
