import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const OrderInitiationModal = ({ 
  isOpen, 
  onClose, 
  onSendOrder,
  senderId,
  receiverId,
  senderModel,
  receiverModel
}) => {
  const [openTasks, setOpenTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const backendURL = import.meta.env.VITE_REACT_BACKEND_URL;

  useEffect(() => {
    if (isOpen && senderModel === 'Client') {
      const fetchOpenTasks = async () => {
        try {
          console.log('Fetching open tasks for client:', senderId);
          setLoading(true);
          setError(null);
          setOpenTasks([]);
          
          const res = await axios.get(`${backendURL}/open-tasks/${senderId}`);
          console.log('Received open tasks:', res.data);
          
          setOpenTasks(res.data);
        } catch (error) {
          console.error("Error fetching open tasks:", error);
          setError("Failed to load open tasks. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchOpenTasks();
    } else {
      // Reset state when modal closes
      setOpenTasks([]);
      setSelectedTask(null);
      setLoading(true);
      setError(null);
    }
  }, [isOpen, senderId, senderModel]);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setAmount(task.budgetAmount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTask) return;

    const orderMessage = {
      senderId,
      receiverId,
      senderModel,
      receiverModel,
      isOrder: true,
      orderDetails: {
        title: selectedTask.projTitle,
        description: selectedTask.description,
        amount,
        openTaskId: selectedTask._id
      }
    };
    onSendOrder(orderMessage);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Initiate Order</h2>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="animate-spin h-8 w-8 text-blue-500 mb-2" />
            <p>Loading open tasks...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">
            {error}
          </div>
        ) : !selectedTask ? (
          <div className="space-y-3">
            <h3 className="font-medium">Select an Open Task:</h3>
            {openTasks.length > 0 ? (
              openTasks.map(task => (
                <div 
                  key={task._id}
                  className="p-3 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleTaskSelect(task)}
                >
                  <h4 className="font-medium">{task.projTitle}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Budget: ${task.budgetAmount}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No open tasks found. Please create an open task first.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h3 className="font-medium mb-2">{selectedTask.projTitle}</h3>
              
              <div className="mb-3">
                <button 
                  type="button"
                  className="flex items-center text-sm text-blue-500 hover:text-blue-600 transition-colors"
                  onClick={() => setShowDescription(!showDescription)}
                >
                  {showDescription ? '−' : '+'} Description
                </button>
                {showDescription && (
                  <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                    {selectedTask.description}
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Amount ($)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Back
              </button>
              <div className="flex gap-3">
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
                  disabled={!amount}
                >
                  Place Order
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderInitiationModal;