import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
// small change

export default function DashSideBar({ select, setSelect }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        {!isMobileMenuOpen ? (
          <Menu onClick={toggleMobileMenu} className="text-black cursor-pointer" size={28} />
        ) : (
          <X onClick={toggleMobileMenu} className="text-black cursor-pointer" size={28} />
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`w-48 bg-blue-600 min-h-screen fixed left-0 top-0 transition-transform sm:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:block z-40`}
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
                className={`w-full text-left cursor-pointer hover:bg-white hover:text-blue-600 p-2 rounded ${
                  item === select ? 'bg-white text-blue-600' : 'text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
