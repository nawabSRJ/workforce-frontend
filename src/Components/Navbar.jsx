import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#1E293B] shadow-lg z-50 flex justify-between items-center px-8 py-4 md:px-12 transition-all duration-300 text-white">
      {" "}
      <div
        className="cursor-pointer flex items-center"
        onClick={() => navigate("/")}
      >
        {" "}
        <Logo />{" "}
      </div>
      {/* Mobile Menu Icon */}
      <div
        className="md:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
      </div>
      {/* Desktop Navbar */}
      <ul className="hidden md:flex gap-8 items-center">
        <li
          className="text-lg font-medium hover:text-blue-400 cursor-pointer"
          onClick={() => navigate("/services")}
        >
          Services
        </li>
        <li
          className="text-lg font-medium hover:text-blue-400 cursor-pointer"
          onClick={() => navigate("/about")}
        >
          About Us
        </li>
        <li
          className="text-lg font-medium hover:text-blue-400 cursor-pointer"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </li>

        {/* Login Dropdown */}
        <div className="relative">
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-lg"
            onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
          >
            Login
          </button>
          {loginDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-44 bg-white text-black shadow-lg py-2 rounded-lg border border-gray-200">
              <li
                className="px-5 py-3 hover:bg-blue-100 cursor-pointer"
                onClick={() => navigate("/client-auth")}
              >
                Client Login
              </li>
              <li
                className="px-5 py-3 hover:bg-blue-100 cursor-pointer"
                onClick={() => navigate("/freelancer-auth")}
              >
                Freelancer Login
              </li>
            </ul>
          )}
        </div>
        <button
          className="bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-2 rounded-lg"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </ul>
      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-3/4 h-full bg-[#1E293B] shadow-lg z-50 flex flex-col px-8 py-4 text-white">
          <button
            className="self-end text-xl"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>
          <li
            className="text-lg font-medium hover:text-blue-400 cursor-pointer"
            onClick={() => navigate("/services")}
          >
            Services
          </li>
          <li
            className="text-lg font-medium hover:text-blue-400 cursor-pointer"
            onClick={() => navigate("/about")}
          >
            About Us
          </li>
          <li
            className="text-lg font-medium hover:text-blue-400 cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </li>

          {/* Login Dropdown in Mobile Menu */}
          <div className="relative">
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-lg w-full"
              onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
            >
              Login
            </button>
            {loginDropdownOpen && (
              <ul className="mt-2 w-full bg-white text-black shadow-lg py-2 rounded-lg border border-gray-200">
                <li
                  className="px-5 py-3 hover:bg-blue-100 cursor-pointer"
                  onClick={() => navigate("/client-auth")}
                >
                  Client Login
                </li>
                <li
                  className="px-5 py-3 hover:bg-blue-100 cursor-pointer"
                  onClick={() => navigate("/freelancer-auth")}
                >
                  Freelancer Login
                </li>
              </ul>
            )}
          </div>
          <button
            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-2 rounded-lg w-full mt-2"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
