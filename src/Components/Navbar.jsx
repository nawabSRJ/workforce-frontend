import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Using lucide-react for menu icons
import { useNavigate } from 'react-router-dom';
import Logo from '../Components/Logo';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSignupDropdown = () => {
    setIsSignupDropdownOpen(!isSignupDropdownOpen);
  };

  return (
    <nav className="navbar relative flex items-center justify-between px-5 py-4 bg-white shadow-md sm:px-10">
      {/* Logo */}
      <Logo />

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden">
        {!isMobileMenuOpen ? (
          <Menu onClick={toggleMobileMenu} className="cursor-pointer" size={24} />
        ) : null}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex flex-col items-center justify-center sm:hidden">
          {/* Close Button */}
          <div className="absolute top-5 right-5">
            <X onClick={toggleMobileMenu} className="cursor-pointer text-white" size={24} />
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-6 text-center text-xl text-white">
            <a href="/client-auth" className="hover:text-green-400">User Login</a>
            <a href="/freelancer-auth" className="hover:text-green-400">Freelancer Login</a>

            {/* ✅ Chat Bot Linked */}
            <button 
              onClick={() => navigate("/contract")} 
              className="hover:text-green-400 transition-all"
            >
              Chat Bot
            </button>

            <a href="#" className="hover:text-green-400">Link 4</a>
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden sm:flex flex-row items-center text-lg gap-6">
        <a href="/client-auth" className="text-gray-700 hover:text-indigo-500 transition-all duration-300">User Login</a>
        <a href="/freelancer-auth" className="text-gray-700 hover:text-indigo-500 transition-all duration-300">Freelancer Login</a>

        {/* ✅ Chat Bot Linked */}
        <button 
          onClick={() => navigate("/contract")} 
          className="text-gray-700 hover:text-indigo-500 transition-all duration-300"
        >
          Chat Bot
        </button>

        <a href="#" className="text-gray-700 hover:text-indigo-500 transition-all duration-300">Link 4</a>

        {/* Sign-Up Button with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleSignupDropdown}
            className="rounded-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Sign Up
          </button>
          {isSignupDropdownOpen && (
            <div className="absolute left-0 mt-3 w-48 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden animate-fadeIn">
              <button
                onClick={() => navigate('/client-auth')}
                className="block w-full px-5 py-3 text-gray-700 hover:bg-gray-100 transition-all"
              >
                User
              </button>
              <button
                onClick={() => navigate('/freelancer-auth')}
                className="block w-full px-5 py-3 text-gray-700 hover:bg-gray-100 transition-all"
              >
                Freelancer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Keyframe Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
