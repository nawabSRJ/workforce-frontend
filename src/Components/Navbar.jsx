import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 flex justify-between items-center px-8 py-4 md:px-12 transition-all duration-300">
      {/* Logo */}
      <div className="cursor-pointer flex items-center" onClick={() => navigate("/")}> 
        <Logo />
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
      </div>

      {/* Menu Items */}
      <ul
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none md:flex gap-8 items-center px-8 md:px-0 py-4 md:py-0 transform transition-transform duration-300 ease-in-out ${menuOpen ? "block" : "hidden md:flex"}`}
      >
        <li 
          className="text-lg font-medium hover:text-blue-600 cursor-pointer transition duration-200"
          onClick={() => navigate("/contract")}
        >
          ContractGen
        </li>
        <li 
          className="text-lg font-medium hover:text-blue-600 cursor-pointer transition duration-200"
          onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
        >
          Services
        </li>
      </ul>

      {/* Login Button with Dropdown */}
      <div className="relative">
        <button 
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-200"
          onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
        >
          Login
        </button>
        {loginDropdownOpen && (
          <ul className="absolute right-0 mt-2 w-44 bg-white shadow-lg py-2 rounded-lg border border-gray-200">
            <li 
              className="px-5 py-3 hover:bg-gray-100 cursor-pointer transition duration-200"
              onClick={() => navigate("/client-auth")}
            >
              Client Login
            </li>
            <li 
              className="px-5 py-3 hover:bg-gray-100 cursor-pointer transition duration-200"
              onClick={() => navigate("/freelancer-auth")}
            >
              Freelancer Login
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;