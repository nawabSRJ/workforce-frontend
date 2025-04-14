import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import axios from 'axios';

const OrderInitiationModal = ({ 
  isOpen, 
  onClose, 
  clientId,
  onOrderCreated
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
        const response = await axios.get(`${backendURL}/open-tasks/${clientId}`);
        setOpenTasks(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load open tasks');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && clientId) {
      fetchTasks();
    }
  }, [isOpen, clientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/create-project`, {
        sourceType: 'open',
        taskId: selectedTask._id,
        clientId,
        freelancerId: selectedTask.freelancerId,
        amount: parseFloat(amount)
      });

      if (response.data) {
        onOrderCreated(response.data);
        onClose();
      }
    } catch (err) {
      setError('Failed to create project');
      console.error('Error creating project:', err);
    }
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

        <h2 className="text-2xl font-bold mb-6">Initiate Order</h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="animate-spin h-8 w-8 text-blue-500 mb-4" />
            <p>Loading open tasks...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : !selectedTask ? (
          <div className="space-y-4">
            <h3 className="font-medium">Select an Open Task</h3>
            {openTasks.length > 0 ? (
              openTasks.map(task => (
                <div
                  key={task._id}
                  onClick={() => setSelectedTask(task)}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h4 className="font-medium">{task.projTitle}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Budget: ₹{task.budgetAmount}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No open tasks found
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-medium mb-4">{selectedTask.projTitle}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {selectedTask.description}
              </p>

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
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter negotiated amount"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedTask(null)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderInitiationModal;