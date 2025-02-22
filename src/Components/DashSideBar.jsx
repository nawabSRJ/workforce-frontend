import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// small change

export default function DashSideBar({ select, setSelect}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();

  // DashSideBar.jsx - improved handleLogout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
};


  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="sm:hidden fixed top-3 right-7 z-50">
        {!isMobileMenuOpen ? (
          <Menu onClick={toggleMobileMenu} className="text-blue-500 cursor-pointer" size={28} />
        ) : (
          <X onClick={toggleMobileMenu} className="text-blue-500 cursor-pointer" size={28} />
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`w-48 bg-blue-600 min-h-screen fixed left-0 top-0 transition-transform sm:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:block z-40`}
        style={{ width: '200px' }}
      >
        <div className="p-4">
          <div className="bg-white rounded p-2 mb-8">
            <span className="font-semibold">Logo</span>
          </div>
          <nav className="space-y-2">
            {['Home', 'Projects', 'Inbox'].map((item) => (
              <button
                onClick={() => setSelect(item)}
                key={item}
                className={`w-full text-left cursor-pointer hover:bg-white hover:text-blue-600 p-2 rounded ${item === select ? 'bg-white text-blue-600' : 'text-white'
                  }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-white hover:text-blue-600 transition-all cursor-pointer">Logout</button>
          </nav>
        </div>
      </div>
    </>
  );
}
