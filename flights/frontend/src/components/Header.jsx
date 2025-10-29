import React from "react";
import { Link } from "react-router-dom";
import Contact from "../pages/Contact";

function Header({ openLogin, openSignup, openContact }) {
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
            onClick={openContact}
          >
            Contact Us
          </li>
        </ul>

        {/* Login / SignUp */}
        <div className="flex items-center space-x-3">
          <button
            onClick={openLogin}
            className="bg-transparent border border-blue-500 text-blue-500 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 hover:shadow-lg transition-all duration-300"
          >
            Login
          </button>
          <button
            onClick={openSignup}
            className="bg-blue-500 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
