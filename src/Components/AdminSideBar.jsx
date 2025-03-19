import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaShoppingCart, FaChartBar, FaCog, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`h-screen bg-gray-900 text-white ${isOpen ? "w-64" : "w-20"} transition-all duration-300`}>
      {/* Toggle Button */}
      <button className="p-4 text-xl focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links */}
      <nav className="mt-5">
        <ul className="space-y-4">
          <li>
            <Link to="/users" className="flex items-center gap-3 p-4 hover:bg-gray-700">
              <FaUsers />
              {isOpen && <span>Users</span>}
            </Link>
          </li>
          <li>
            <Link to="/orders" className="flex items-center gap-3 p-4 hover:bg-gray-700">
              <FaShoppingCart />
              {isOpen && <span>Orders</span>}
            </Link>
          </li>
          <li>
            <Link to="/reports" className="flex items-center gap-3 p-4 hover:bg-gray-700">
              <FaChartBar />
              {isOpen && <span>Reports</span>}
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-3 p-4 hover:bg-gray-700">
              <FaCog />
              {isOpen && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;