import React from 'react';
import { FaMapMarkerAlt, FaClock, FaPencilAlt, FaUser, FaEnvelope, FaVenusMars } from 'react-icons/fa';

export default function ClientProfileCard({ name, email, gender, joinDate, projectsPosted }) {
  const getGenderIcon = () => {
    switch(gender.toLowerCase()) {
      case 'male': return <FaVenusMars className="text-blue-400" />;
      case 'female': return <FaVenusMars className="text-pink-400" />;
      default: return <FaVenusMars className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
      {/* Profile Header with Gradient */}
      <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-800 relative">
        {/* Profile Initial */}
        <div className="absolute bottom-0 left-4 transform translate-y-1/2 bg-blue-700 rounded-full w-16 h-16 flex items-center justify-center">
          <FaUser className="text-white text-2xl" />
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="p-6 pt-12 text-white">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-400 mb-4">Client</p>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-300">
            <FaEnvelope className="mr-3 text-blue-400" />
            <span className="truncate">{email}</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            {getGenderIcon()}
            <span className="ml-3 capitalize">{gender}</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <FaClock className="mr-3 text-yellow-400" />
            <span>Member since {joinDate}</span>
          </div>
        </div>
        
        {/* Projects Posted */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-400">Projects Posted</span>
            <span className="font-semibold">{projectsPosted}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${Math.min(projectsPosted * 10, 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Edit Profile Button */}
        <button className="flex items-center justify-center text-white bg-transparent border border-gray-600 rounded-md px-4 py-2 w-full hover:bg-gray-800 transition-colors">
          <FaPencilAlt className="mr-2" /> Edit Profile
        </button>
      </div>
    </div>
  );
}