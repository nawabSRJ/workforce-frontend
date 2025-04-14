import React, { useState } from 'react';
import { Menu, X, Home, Folder, Mail, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashSideBar({ select, setSelect }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("logged");
    navigate("/");
  };

  const menuItems = [
    { name: 'Home', icon: <Home className="w-5 h-5" /> },
    { name: 'Projects', icon: <Folder className="w-5 h-5" /> },
    { name: 'Inbox', icon: <Mail className="w-5 h-5" /> },
    // ✅ Added Requests tab here (icon kept same for now — you can swap if you want)
    { name: 'Requests', icon: <Mail className="w-5 h-5" /> }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="sm:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-gray-800 text-gray-200 hover:bg-gray-700 transition-all"
        >
          {!isMobileMenuOpen ? (
            <Menu className="w-6 h-6" />
          ) : (
            <X className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-56 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen fixed left-0 top-0 transition-all duration-300 sm:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
        } sm:block z-40`}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Navigation */}
          <nav className="flex-1 space-y-2 mt-4">
            {menuItems.map((item) => (
              <button
                onClick={() => {
                  setSelect(item.name);
                  setIsMobileMenuOpen(false);
                }}
                key={item.name}
                className={`flex items-center w-full p-3 rounded-lg transition-all ${
                  item.name === select
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
