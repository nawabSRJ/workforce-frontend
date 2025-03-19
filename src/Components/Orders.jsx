import React from "react";

const orders = [
  { id: 1, service: "Logo Design", user: "John Doe", freelancer: "Alice" },
  { id: 2, service: "Website Development", user: "Emma", freelancer: "Robert" },
  { id: 3, service: "SEO Optimization", user: "Michael", freelancer: "Sarah" },
];

const OrdersList = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Orders List</h2>
      <div className="shadow-lg rounded-xl overflow-hidden">
        <table className="w-full bg-white border border-gray-300">
          <thead className="bg-gray-200 text-lg">
            <tr>
              <th className="py-4 px-6 border-b text-left">Order ID</th>
              <th className="py-4 px-6 border-b text-left">Service</th>
              <th className="py-4 px-6 border-b text-left">User</th>
              <th className="py-4 px-6 border-b text-left">Freelancer</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-100 text-lg">
                <td className="py-4 px-6">{order.id}</td>
                <td className="py-4 px-6">{order.service}</td>
                <td className="py-4 px-6">{order.user}</td>
                <td className="py-4 px-6">{order.freelancer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;