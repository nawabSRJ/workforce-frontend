import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import StatsContainer from '../ui/StatsContainer';
import { Search, Filter, Clock, CheckCircle, XCircle, Mail, Bell } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Reminders({ freelancerData }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [time, setTime] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [reminders, setReminders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const backendURL = import.meta.env.VITE_REACT_BACKEND_URL;

    // Fetch reminders based on username
    const fetchReminders = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${backendURL}/get-reminders`, {
                params: { 
                    username: freelancerData.username,
                }
            });
            
            if (response.data.success) {
                setReminders(response.data.reminders || []);
                toast.success('Reminders loaded successfully');
            } else {
                toast.error(response.data.message || 'Failed to load reminders');
                setReminders([]);
            }
        } catch (err) {
            console.error('Error fetching reminders:', err);
            toast.error(err.response?.data?.message || 'Failed to load reminders');
            setReminders([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReminders();
    }, [freelancerData.username, freelancerData.email]);

    const handleAddReminder = async () => {
        if (!title || !message || !time) {
            setError('All fields are required');
            toast.error('All fields are required');
            return;
        }

        const selectedTime = new Date(time);
        const currentTime = new Date();

        if (selectedTime <= currentTime) {
            setError('Please select a future time for the reminder');
            toast.error('Please select a future time for the reminder');
            return;
        }

        const newReminder = {
            username: freelancerData.username,
            email: freelancerData.email,
            phone: freelancerData.phone,
            title: title,
            message: message,
            sendAt: selectedTime.toISOString()
        };

        try {
            const response = await axios.post(`${backendURL}/add-reminder`, newReminder);
            
            if (response.data.status === "ok") {
                toast.success('Reminder added successfully!');
                setIsModalOpen(false);
                setTitle('');
                setMessage('');
                setTime('');
                setError('');
                // Refresh reminders after adding new one
                await fetchReminders();
            } else {
                throw new Error(response.data.message || 'Failed to add reminder');
            }
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.message || 'Failed to add reminder. Please try again.';
            setError(errorMsg);
            toast.error(errorMsg);
        }
    };

    const filteredReminders = reminders.filter(reminder => {
        const matchesSearch = reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            reminder.message.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || 
                            (statusFilter === 'completed' && reminder.sent) || 
                            (statusFilter === 'pending' && !reminder.sent);
        
        const now = new Date();
        const reminderDate = new Date(reminder.sendAt);
        const matchesDate = dateFilter === 'all' ||
                           (dateFilter === 'today' && reminderDate.toDateString() === now.toDateString()) ||
                           (dateFilter === 'upcoming' && reminderDate > now) ||
                           (dateFilter === 'past' && reminderDate < now);
        
        return matchesSearch && matchesStatus && matchesDate;
    });

    return (
        <div className="p-2 sm:p-6 w-full max-w-full overflow-hidden">
            <ToastContainer position="top-right" autoClose={5000} />
            {/* <StatsContainer /> */}
            
            {/* Filters Section */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 sm:p-6 mb-4 sm:mb-6 shadow-sm">
                <div className="flex flex-col gap-4">
                    {/* Search Input - Full width on mobile */}
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search reminders..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-transparent dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    {/* Filter Controls - Stacked on mobile */}
                    <div className="flex flex-col sm:flex-row gap-2 w-full">
                        <div className="relative flex-1 min-w-[120px]">
                            <select
                                className="w-full appearance-none pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-transparent dark:text-white"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                            </select>
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        
                        <div className="relative flex-1 min-w-[120px]">
                            <select
                                className="w-full appearance-none pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-transparent dark:text-white"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            >
                                <option value="all">All Dates</option>
                                <option value="today">Today</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="past">Past</option>
                            </select>
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        
                        <Button 
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors py-2 px-4 sm:px-6 flex-1 sm:flex-none"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Bell size={18} />
                            <span className="cursor-pointer hidden sm:inline">New Reminder</span>
                            <span className="sm:hidden">Add</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Responsive Table */}
            <div className="w-full overflow-x-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <table className="w-full min-w-[600px]">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="py-3 px-3 sm:px-6 text-left text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">#</th>
                            <th className="py-3 px-3 sm:px-6 text-left text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">Reminder</th>
                            <th className="py-3 px-3 sm:px-6 text-left text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">Due Date</th>
                            <th className="py-3 px-3 sm:px-6 text-left text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">Status</th>
                            <th className="py-3 px-3 sm:px-6 text-left text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">Method</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-gray-500 dark:text-gray-400">
                                    Loading reminders...
                                </td>
                            </tr>
                        ) : filteredReminders.length > 0 ? (
                            filteredReminders.map((reminder, index) => (
                                <tr key={reminder._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="py-3 px-3 sm:px-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base">{index + 1}</td>
                                    <td className="py-3 px-3 sm:px-6 font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                                        <div className="line-clamp-1">{reminder.title}</div>
                                    </td>
                                    <td className="py-3 px-3 sm:px-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                                        {new Date(reminder.sendAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </td>
                                    <td className="py-3 px-3 sm:px-6">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                            reminder.send 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                        }`}>
                                            {reminder.send ? (
                                                <>
                                                    <CheckCircle className="mr-1 hidden sm:inline" size={14} />
                                                    <span className="sm:hidden">✓</span>
                                                    <span className="hidden sm:inline">Completed</span>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="mr-1 hidden sm:inline" size={14} />
                                                    <span className="sm:hidden">!</span>
                                                    <span className="hidden sm:inline">Pending</span>
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 sm:px-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                                        <div className="flex items-center">
                                            <Mail className="mr-1 hidden sm:block" size={16} />
                                            <span className="sm:hidden">✉️</span>
                                            <span className="hidden sm:inline">Email</span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-gray-500 dark:text-gray-400">
                                    No reminders found matching your criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Reminder Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Reminder</h3>
                            <button 
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setError('');
                                }}
                                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter reminder title"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter reminder message"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Schedule Time
                                </label>
                                <div className="relative">
                                    <input
                                        id="time"
                                        type="datetime-local"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white pr-10"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        min={new Date().toISOString().slice(0, 16)}
                                    />
                                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </div>
                            
                            {error && (
                                <div className="text-red-500 text-sm">{error}</div>
                            )}
                            
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setError('');
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAddReminder}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                >
                                    Set Reminder
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}