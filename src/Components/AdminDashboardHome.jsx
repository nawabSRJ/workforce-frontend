import React from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, Tooltip, Legend, PointElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Tooltip, Legend);

const AdminDashboardHome = () => {
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: [5000, 11000, 15000, 19000, 23000],
        backgroundColor: "rgba(30, 136, 229, 0.7)",
        borderRadius: 8,
      },
    ],
  };

  const projectData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [120, 50, 15],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };

  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "New Users",
        data: [200, 400, 600, 850, 1250],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const earningsData = {
    labels: ["SaaS Revenue", "Project Earnings", "Other Income"],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ["#007bff", "#28a745", "#ffc107"],
      },
    ],
  };

  return (
    <div className="p-6 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
        Admin Dashboard
      </h1>
      <p className="text-base md:text-lg text-gray-600 text-center mb-6 md:mb-8">
        Real-time analytics for better decision-making
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Revenue", value: "₹5,00,000", color: "text-blue-600" },
          { title: "Total Users", value: "1,250", color: "text-green-600" },
          { title: "Active Developers", value: "98", color: "text-yellow-600" },
          { title: "Pending Projects", value: "15", color: "text-red-600" },
        ].map((item, index) => (
          <div
            key={index}
            className="p-4 sm:p-6 bg-white rounded-lg shadow-lg flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span className={`text-2xl md:text-3xl font-bold ${item.color}`}>
              {item.value}
            </span>
            <p className="text-sm md:text-base text-gray-600">{item.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Revenue Trend */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-3 md:mb-4">
            Revenue Trend
          </h3>
          <Bar data={revenueData} />
        </div>

        {/* Project Distribution */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-3 md:mb-4">
            Project Distribution
          </h3>
          <Doughnut data={projectData} />
        </div>

        {/* User Growth */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-3 md:mb-4">
            User Growth
          </h3>
          <Line data={userGrowthData} />
        </div>

        {/* Earnings Breakdown */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-3 md:mb-4">
            Earnings Breakdown
          </h3>
          <Pie data={earningsData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;