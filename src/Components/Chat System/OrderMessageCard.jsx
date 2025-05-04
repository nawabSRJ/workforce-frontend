import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

const OrderMessageCard = ({ orderDetails, isClient, onPlaceOrder, onCancelOrder }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = async () => {
    console.log("Place order button clicked in OrderMessageCard");
    setIsLoading(true);
    
    try {
      console.log("Calling parent onPlaceOrder function with orderDetails:", orderDetails);
      await onPlaceOrder(orderDetails);
      console.log("Parent onPlaceOrder function completed");
    } catch (error) {
      console.error("Error in OrderMessageCard.handlePlaceOrder:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Cancel button clicked in OrderMessageCard");
    onCancelOrder();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-[80%] p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg">{orderDetails.title}</h3>
        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
          Order Request
        </span>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {orderDetails.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Category:</span>
            <p className="font-medium">{orderDetails.category}</p>
          </div>
          
          <div>
            <span className="text-gray-500 dark:text-gray-400">Deadline:</span>
            <p className="font-medium">{formatDate(orderDetails.deadline)}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          ₹{orderDetails.amount}
        </span>
        
        {isClient && (
          <div className="flex gap-2">
            <button 
              onClick={handlePlaceOrder}
              disabled={isLoading}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-60"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin h-4 w-4 mr-1" />
                  Processing...
                </span>
              ) : (
                'Place Order'
              )}
            </button>
            
            <button 
              onClick={handleCancel}
              disabled={isLoading}
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