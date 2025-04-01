import React, { useState } from 'react';
import { reminders } from '../../Data/reminders';
import axios from 'axios';
import { Button } from '../ui/button';
import StatsContainer from '../ui/StatsContainer';
import { Search, Filter, Clock, CheckCircle, XCircle, Mail, Bell } from 'lucide-react';

export default function Reminders(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    function addNewReminder() {
        const newReminder = {
            username: "vaishnavi",
            email: "srajan.saxena02@gmail.com",
            phone: "9838726101",
            title: "WorkForce Project Submission Deadline",
            message: "Reminder: Your project submission is due soon. hehe reminder app se mail bheja hai yeh :)",
            sendAt: new Date(Date.now() + 2 * 60 * 1000)
        }
        axios.post(`${backendURL}/add-reminder`, newReminder)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    }

    const filteredReminders = reminders.filter(reminder => {
        // Search filter
        const matchesSearch = reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            reminder.message.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Status filter
        const matchesStatus = statusFilter === 'all' || 
                            (statusFilter === 'completed' && reminder.sent) || 
                            (statusFilter === 'pending' && !reminder.sent);
        
        // Date filter (simplified for demo)
        const now = new Date();
        const reminderDate = new Date(reminder.sendAt);
        const matchesDate = dateFilter === 'all' ||
                           (dateFilter === 'today' && reminderDate.toDateString() === now.toDateString()) ||
                           (dateFilter === 'upcoming' && reminderDate > now) ||
                           (dateFilter === 'past' && reminderDate < now);
        
        return matchesSearch && matchesStatus && matchesDate;
    });

    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
            <StatsContainer />
            
            {/* Filters Section */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 sm:p-6 mb-6 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                    {/* Search Input */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search reminders..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-transparent dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    {/* Filter Controls */}
                    <div className="flex flex-wrap gap-2">
                        <div className="relative">
                            <select
                                className="appearance-none pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-transparent dark:text-white"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                            </select>
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        
                        <div className="relative">
                            <select
                                className="appearance-none pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-transparent dark:text-white"
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
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors"
                            onClick={addNewReminder}
                        >
                            <Bell size={18} />
                            New Reminder
                        </Button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <table className="w-full">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 font-medium">S.No.</th>
                            <th className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 font-medium">Reminder</th>
                            <th className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 font-medium">Due Date</th>
                            <th className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 font-medium">Status</th>
                            <th className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 font-medium">Method</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredReminders.length > 0 ? (
                            filteredReminders.map((reminder, index) => (
                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="py-3 px-6 text-gray-700 dark:text-gray-300">{index + 1}</td>
                                    <td className="py-3 px-6 font-medium text-gray-900 dark:text-white">{reminder.title}</td>
                                    <td className="py-3 px-6 text-gray-700 dark:text-gray-300">
                                        {new Date(reminder.sendAt).toLocaleString()}
                                    </td>
                                    <td className="py-3 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            reminder.sent 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                        }`}>
                                            {reminder.sent ? (
                                                <>
                                                    <CheckCircle className="mr-1" size={14} />
                                                    Completed
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="mr-1" size={14} />
                                                    Pending
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-gray-700 dark:text-gray-300">
                                        <div className="flex items-center">
                                            <Mail className="mr-1" size={16} />
                                            Email
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
        </div>
    );
}