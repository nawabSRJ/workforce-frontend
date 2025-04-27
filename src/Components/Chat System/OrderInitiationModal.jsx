import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import axios from 'axios';

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
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const backendURL = import.meta.env.VITE_REACT_BACKEND_URL;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // We're assuming the sender is the client
        const response = await axios.get(`${backendURL}/open-tasks/${senderId}`);
        
        // Filter to only show 'Open' status tasks
        const availableTasks = response.data.filter(task => task.status === 'Open');
        
        setOpenTasks(availableTasks);
        setError('');
      } catch (err) {
        setError('Failed to load open tasks');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && senderId) {
      fetchTasks();
    }
  }, [isOpen, senderId, backendURL]);

  // When a task is selected, set its budget as the initial amount
  useEffect(() => {
    if (selectedTask) {
      setAmount(selectedTask.budgetAmount.toString());
    }
  }, [selectedTask]);

  const handleBack = () => {
    setSelectedTask(null);
    setAmount('');
  };

  const handleOrderCreation = () => {
    if (!selectedTask || !amount) return;

    // Create an order message object
    const orderMessage = {
      senderId,
      receiverId,
      senderModel,
      receiverModel,
      isOrder: true,
      orderDetails: {
        openTaskId: selectedTask._id,
        title: selectedTask.projTitle,
        description: selectedTask.description,
        amount: parseFloat(amount),
        deadline: selectedTask.deadline,
        category: selectedTask.category
      }
    };

    onSendOrder(orderMessage);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md relative p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Initiate Public Order</h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="animate-spin h-8 w-8 text-blue-500 mb-4" />
            <p>Loading open tasks...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : openTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No open tasks available.</p>
            <p className="text-sm mt-2">Create a public task first before initiating an order.</p>
          </div>
        ) : !selectedTask ? (
          <div className="space-y-4">
            <h3 className="font-medium">Select an Open Task</h3>
            <div className="max-h-96 overflow-y-auto space-y-3">
              {openTasks.map(task => (
                <div
                  key={task._id}
                  onClick={() => setSelectedTask(task)}
                  className="p-4 border dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h4 className="font-medium">{task.projTitle}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Budget: ₹{task.budgetAmount}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {new Date(task.deadline).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">{selectedTask.projTitle}</h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {selectedTask.description}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Final Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="50"
                    step="50"
                    required
                    className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter negotiated amount"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleOrderCreation}
                    disabled={!amount}
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderInitiationModal;