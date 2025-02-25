import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Using lucide-react for menu icons
import Logo from '../Components/Logo';
import { useNavigate } from 'react-router-dom';
// small change

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
  const handleNavigate = ()=>{
    navigate('/client-auth')
  }

  return (
    <nav className='navbar relative flex flex-row items-center justify-between sm:px-10 px-5 py-5 bg-white'>
      {/* Logo */}
      {/* <a className='text-3xl text-black'>WorkForce</a> */}
      <Logo/>

      {/* Mobile Menu Toggle (Only visible on mobile screens) */}
      <div className='sm:hidden'>
        {!isMobileMenuOpen ? (
          <Menu 
            onClick={toggleMobileMenu} 
            className='cursor-pointer' 
            size={24} 
          />
        ) : null}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className='fixed inset-0 bg-green-300 z-50 sm:hidden'>
          {/* Close Button - Positioned at top right */}
          <div className='absolute top-5 right-5'>
            <X 
              onClick={toggleMobileMenu} 
              className='cursor-pointer text-black' 
              size={24} 
            />
          </div>

          {/* Menu Items - Centered */}
          <div className='flex flex-col items-center justify-center h-full gap-6'>
            <a href={'/contract'} className="text-2xl text-blue-500 hover:underline">Contract Gen</a>
            <a href={'/client-auth'} className="text-2xl text-blue-500 hover:underline">Client Login</a>
            <a href={'/freelancer-auth'} className="text-2xl text-blue-500 hover:underline">Freelancer Login</a>
            <a href="#" className="text-2xl text-blue-500 hover:underline">Link 4</a>
            <button className='rounded-full px-5 py-2 bg-black text-white text-xl'>Sign Up</button>
          </div>
        </div>
      )}

      {/* Desktop menu */}
      <div className="hidden sm:flex flex-row items-center text-xl gap-5">
        <a href={'/contract'} className="text-blue-500 hover:underline">Contract Gen</a>
        <a href={'/client-auth'} className="text-blue-500 hover:underline">Client Login</a>
        <a href={'/freelancer-auth'} className="text-blue-500 hover:underline">Freelancer Login</a>
        <a href="#" className="text-2xl text-blue-500 hover:underline">Link 4</a>
        <button
            onClick={handleNavigate}
            className="rounded-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Sign Up
          </button>
        {/* <button
            onClick={toggleSignupDropdown}
            className="rounded-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:scale-105 transition-transform duration-300"
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
          )} */}
      </div>
    </nav>
  );
};

export default Navbar;