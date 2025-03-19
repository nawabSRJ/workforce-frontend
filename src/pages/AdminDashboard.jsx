import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "C:/Users/HP/Desktop/project work/workforce-frontend-main/src/Components/AdminSideBar.jsx";
import AdminDashboardHome from "C:/Users/HP/Desktop/project work/workforce-frontend-main/src/Components/AdminDashboardHome.jsx";
import Orders from "C:/Users/HP/Desktop/project work/workforce-frontend-main/src/Components/Orders.jsx";
import Reports from "C:/Users/HP/Desktop/project work/workforce-frontend-main/src/Components/Reports.jsx";
import Users from "C:/Users/HP/Desktop/project work/workforce-frontend-main/src/Components/Users.jsx";
import Settings from "C:/Users/HP/Desktop/project work/workforce-frontend-main/src/Components/Settings.jsx";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed md:relative h-full z-50">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-auto ml-20 md:ml-0">
        <Routes>
          <Route path="/" element={<AdminDashboardHome />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;