import React from 'react';

const OrderMessageCard = ({ orderDetails, isClient, onPlaceOrder, onCancelOrder }) => {
  return (
    <div className="max-w-[80%] p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-md">
      <h3 className="font-bold text-lg mb-2">{orderDetails.title}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-3">{orderDetails.description}</p>
      <div className="flex justify-between items-center">
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          ${orderDetails.amount}
        </span>
        {isClient && (
          <div className="flex gap-2">
            <button 
              onClick={onPlaceOrder}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Place Order
            </button>
            <button 
              onClick={onCancelOrder}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderMessageCard;