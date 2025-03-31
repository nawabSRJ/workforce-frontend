import React, { useState } from "react";
import { FaTwitter, FaLinkedin, FaDribbble, FaEnvelope, FaUserPlus, FaMapMarkerAlt } from "react-icons/fa";

export default function ProfileCard({name, description, tags, location, _id}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleRequestService = () => {
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
      const clientData = JSON.parse(localStorage.getItem('clientData'));
      const token = localStorage.getItem('token');

      if (!clientData || !token) {
        throw new Error("You need to be logged in as a client to send messages");
      }

      const response = await fetch('http://localhost:8000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          senderId: clientData.id,
          receiverId: _id,
          senderModel: 'Client',
          receiverModel: 'Freelancer',
          message: message
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsModalOpen(false);
        setMessage("");
        alert("Message sent successfully!");
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert(error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="flex items-right justify-center min-screen bg-gray-100 ml-40">
        <div className="max-w-4xl w-full p-5">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex flex-col md:flex-row">
              {/* Left Section - Profile Image */}
              <div className="md:w-1/3 bg-blue-500 flex items-center justify-center p-6">
                <img
                  src="https://randomuser.me/api/portraits/women/64.jpg"
                  alt="Profile"
                  className="w-28 h-28 rounded-full shadow-lg"
                />
              </div>

              {/* Right Section - Content */}
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-2xl font-bold text-blue-600">{name}</h3>
                  <span className="px-3 py-2 text-blue-600 bg-blue-100 rounded-full text-sm font-semibold">
                    {tags}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {description}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mb-4">
                  <button 
                    onClick={handleRequestService}
                    className="flex items-center gap-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium transition hover:bg-blue-600"
                  >
                    <FaEnvelope />
                    Request Service
                  </button>
                  <button className="flex items-center gap-2 cursor-pointer border border-blue-500 text-blue-600 px-4 py-2 rounded-full text-sm font-medium transition hover:bg-blue-500 hover:text-white">
                    <FaUserPlus />
                    Follow
                  </button>
                </div>

                {/* Social Icons & Location */}
                <div className="border-t pt-3 flex justify-between items-center">
                  <div className="flex gap-4 text-blue-600">
                    <FaTwitter className="text-xl cursor-pointer transition-transform transform hover:scale-125" />
                    <FaLinkedin className="text-xl cursor-pointer transition-transform transform hover:scale-125" />
                    <FaDribbble className="text-xl cursor-pointer transition-transform transform hover:scale-125" />
                  </div>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <FaMapMarkerAlt />
                    {location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Request Service from {name}</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Your Initial Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Hi, I'd like to discuss a project with you..."
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={isSending}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSending ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}