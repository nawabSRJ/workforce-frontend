import React from 'react'
import { FaCalendarAlt, FaAngleDoubleRight, FaAward } from "react-icons/fa";

export default function OpenWorkCard({ projTitle, description, category, deadline, budgetAmount, clientName }) {
    // Format the deadline date
    const formatDeadline = (deadlineDate) => {
        if (!deadlineDate) return "No deadline";
        
        try {
            const date = new Date(deadlineDate);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Invalid date";
        }
    };

    return (
        <div>
            <div className="flex items-right justify-center min-screen bg-gray-100 ml-40">
                <div className="max-w-3xl w-full p-5">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                        <div className="flex flex-col md:flex-row">
                            {/* Right Section - Content */}
                            <div className="md:w-1/1 p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-2xl font-bold text-blue-600">{projTitle}</h3>
                                    <span className="px-3 py-2 text-blue-600 bg-blue-100 rounded-full text-sm font-semibold">
                                        {category}
                                    </span>
                                </div>

                                <div className="text-gray-500 text-xs mb-2">
                                    Posted by: {clientName}
                                </div>

                                <p className="text-gray-600 text-sm mb-4">
                                    {description}
                                </p>

                                {/* Buttons */}
                                <div className="flex gap-3 mb-4">
                                    <button className="flex items-center gap-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium transition hover:bg-blue-600">
                                        <FaAward />
                                        Request Project
                                    </button>
                                    <button className="flex items-center gap-2 cursor-pointer border border-blue-500 text-blue-600 px-4 py-2 rounded-full text-sm font-medium transition hover:bg-blue-500 hover:text-white">
                                        <FaAngleDoubleRight />
                                        View More
                                    </button>
                                </div>

                                {/* Budget & Deadline */}
                                <div className="border-t pt-3 flex justify-between items-center">
                                    <div className="flex gap-4 text-blue-600 font-semibold text-2xl">
                                        ₹ {budgetAmount || 0}
                                    </div>
                                    <span className="text-gray-500 text-sm flex items-center gap-1">
                                        <FaCalendarAlt />
                                        Deadline: {formatDeadline(deadline)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}