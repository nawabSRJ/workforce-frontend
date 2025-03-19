import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Reports = () => {
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: [15000, 22000, 18000, 25000, 27000, 30000],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const ordersData = {
    labels: ["Completed", "Pending", "Cancelled"],
    datasets: [
      {
        data: [900, 250, 100],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };

  const freelancersData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [500, 250],
        backgroundColor: ["#2196F3", "#9E9E9E"],
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Platform Analytics
      </h2>
      <p className="text-lg text-gray-600 text-center mb-8">
        Track earnings, order volume, and freelancer performance.
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-blue-500 text-white text-xl rounded-lg shadow-lg">
          <h3 className="font-bold">Total Sales</h3>
          <p className="text-2xl">$120,500</p>
        </div>
        <div className="p-6 bg-green-500 text-white text-xl rounded-lg shadow-lg">
          <h3 className="font-bold">Total Orders</h3>
          <p className="text-2xl">1,250</p>
        </div>
        <div className="p-6 bg-orange-500 text-white text-xl rounded-lg shadow-lg">
          <h3 className="font-bold">Freelancers</h3>
          <p className="text-2xl">750</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-8">
        {/* Bar Chart - Sales Overview */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Monthly Sales Overview</h3>
          <Bar data={salesData} />
        </div>

        {/* Doughnut Chart - Orders Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Orders Breakdown</h3>
          <Doughnut data={ordersData} />
        </div>
      </div>

      <div className="mt-8">
        {/* Line Chart - Freelancer Activity */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Freelancer Activity
          </h3>
          <div className="w-2/3 md:w-1/2 lg:w-1/3">
            <Doughnut
              data={{
                labels: ["Active", "Inactive"],
                datasets: [
                  {
                    data: [70, 30], // Example data
                    backgroundColor: ["#36A2EB", "#B0BEC5"],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                    labels: { font: { size: 14 } },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
