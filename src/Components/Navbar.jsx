import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Using lucide-react for menu icons
import Logo from '../Components/Logo';
// small change

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
            <a href="#" className="text-2xl text-blue-500 hover:underline">Link 2</a>
            <a href="#" className="text-2xl text-blue-500 hover:underline">Link 3</a>
            <a href="#" className="text-2xl text-blue-500 hover:underline">Link 4</a>
            <button className='rounded-full px-5 py-2 bg-black text-white text-xl'>Sign Up</button>
          </div>
        </div>
      )}

      {/* Desktop menu */}
      <div className="hidden sm:flex flex-row items-center text-xl gap-5">
        <a href={'/contract'} className="text-blue-500 hover:underline">Contract Gen</a>
        <a href="#" className="text-blue-500 hover:underline">Link 2</a>
        <a href="#" className="text-blue-500 hover:underline">Link 3</a>
        <a href="#" className="text-2xl text-blue-500 hover:underline">Link 4</a>
        <button className='rounded-full px-5 py-2 bg-black text-white text-xl'>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;