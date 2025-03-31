import React, { useState } from 'react';

const OrderInitiationModal = ({ 
  isOpen, 
  onClose, 
  onSendOrder,
  senderId,
  receiverId,
  senderModel,
  receiverModel
}) => {
  const [orderDetails, setOrderDetails] = useState({
    title: '',
    description: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderMessage = {
      senderId,
      receiverId,
      senderModel,
      receiverModel,
      isOrder: true,
      orderDetails
    };
    onSendOrder(orderMessage);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Initiate Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={orderDetails.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={orderDetails.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              rows="3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Amount ($)</label>
            <input
              type="number"
              name="amount"
              value={orderDetails.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              min="1"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Send Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderInitiationModal;