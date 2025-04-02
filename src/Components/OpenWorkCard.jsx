import React, { useState } from 'react';
import { FaCalendarAlt, FaAngleDoubleRight, FaAward } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

export default function OpenWorkCard({ projTitle, description, category, deadline, budgetAmount, clientName, _id }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleRequestProject = () => {
        setIsModalOpen(true);
    };

    const handleSendMessage = async () => {
        if (!message.trim()) {
            alert("Please enter a message");
            return;
        }

        setIsSending(true);
        try {
            // Get current user info from localStorage
            const freelancerData = JSON.parse(localStorage.getItem('freelancerData'));
            const token = localStorage.getItem('token');

            if (!freelancerData || !token) {
                throw new Error("You need to be logged in as a freelancer to send messages");
            }

            const response = await fetch('http://localhost:8000/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    senderId: freelancerData.id,
                    receiverId: _id, // Assuming _id is the client's ID
                    senderModel: 'Freelancer',
                    receiverModel: 'Client',
                    message: `Regarding project "${projTitle}": ${message}`
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                setIsModalOpen(false);
                setMessage("");
                alert("Project request sent successfully!");
            } else {
                throw new Error(data.error || "Failed to send request");
            }
        } catch (error) {
            console.error("Error sending project request:", error);
            alert(error.message);
        } finally {
            setIsSending(false);
        }
    };

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
        <>
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
                                        <button 
                                            onClick={handleRequestProject}
                                            className="flex items-center gap-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium transition hover:bg-blue-600"
                                        >
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

            {/* Request Project Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Request Project from {clientName}
                            </h3>
                            
                            <div className="mb-2 text-sm text-gray-600">
                                Project: <span className="font-medium">{projTitle}</span>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                    placeholder={`Hi, I'm interested in working on your "${projTitle}" project...`}
                                ></textarea>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setMessage("");
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isSending}
                                    className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSending ? 'Sending...' : 'Send Request'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}