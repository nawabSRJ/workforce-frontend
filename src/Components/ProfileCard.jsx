import React, { useState } from "react";
import { 
  FaTwitter, 
  FaLinkedin, 
  FaGlobe, 
  FaRegStar, 
  FaStar,
  FaMapMarkerAlt,
  FaEnvelope,
  FaUserPlus
} from "react-icons/fa";
import { motion } from "framer-motion";

const Rating = ({ value }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className="text-lg">
      {index < Math.floor(value) ? (
        <FaStar className="text-yellow-400 inline" />
      ) : (
        <FaRegStar className="text-gray-300 inline" />
      )}
    </span>
  ));
  
  return (
    <div className="flex items-center gap-1">
      {stars}
      <span className="ml-2 text-gray-600">({value?.toFixed(1) || 0.0})</span>
    </div>
  );
};

export default function ProfileCard({
  _id,
  name,
  bio,
  tags,
  rating,
  portfolioWebsite,
  linkedIn,
  twitter,
  country,
  createdAt,
  location
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleRequestService = () => setIsModalOpen(true);

  const handleSendMessage = async () => {
    if (!message.trim()) return alert("Please enter a message");
    
    setIsSending(true);
    try {
      const clientData = JSON.parse(localStorage.getItem('clientData'));
      const token = localStorage.getItem('token');

      if (!clientData || !token) {
        throw new Error("Please login as client to send messages");
      }

      const response = await fetch(`${import.meta.env.VITE_REACT_BACKEND_URL}/send-message`, {
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
      if (!response.ok) throw new Error(data.error || "Message send failed");
      
      setIsModalOpen(false);
      setMessage("");
      alert("Message sent successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <motion.div 
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {name?.[0]?.toUpperCase()}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Joined {new Date(createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  <FaMapMarkerAlt className="inline mr-1" />
                  {country}
                </span>
              </div>

              <Rating value={rating || 0} />

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {tags?.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bio */}
          {bio && (
            <p className="mt-4 text-gray-600 leading-relaxed">
              {bio}
            </p>
          )}

          {/* Social Links */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex gap-4 text-gray-500">
              {portfolioWebsite && (
                <a
                  href={portfolioWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  <FaGlobe className="text-xl" />
                </a>
              )}
              {linkedIn && (
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  <FaLinkedin className="text-xl" />
                </a>
              )}
              {twitter && (
                <a
                  href={`https://twitter.com/${twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  <FaTwitter className="text-xl" />
                </a>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={handleRequestService}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <FaEnvelope />
                Contact
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                <FaUserPlus />
                Follow
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Contact {name}
              </h3>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                rows="4"
                placeholder="Write your message..."
              />

              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={isSending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70"
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