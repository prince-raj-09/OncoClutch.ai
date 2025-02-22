import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#0b132b] p-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="text-white text-2xl font-bold">CLUTCH.AI</div>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-lg font-semibold">
        <Link to="/" className="text-gray-300 hover:text-blue-400 transition">
          Home
        </Link>
        <Link to="/ai" className="text-gray-300 hover:text-blue-400 transition">
          AI
        </Link>
        <Link
          to="/about"
          className="text-gray-300 hover:text-blue-400 transition"
        >
          About
        </Link>
        <Link
          to="/synapse"
          className="text-gray-300 hover:text-blue-400 transition"
        >
          Synapse
        </Link>
        <Link
          to="/breast"
          className="text-gray-300 hover:text-blue-400 transition"
        >
          Breast
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
