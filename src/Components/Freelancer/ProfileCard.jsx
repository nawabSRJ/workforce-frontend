import React from 'react';
import { FaMapMarkerAlt, FaClock, FaPencilAlt } from 'react-icons/fa';

export default function ProfileCard({ username, role, location, joinDate, tags, languages }) {
  return (
    <div className="bg-black rounded-xl overflow-hidden">
      {/* Profile Header with Gradient */}
      <div className="h-24 bg-gradient-to-r from-purple-600 to-pink-500 relative">
        {/* Profile Image */}
        <div className="absolute bottom-0 left-4 transform translate-y-1/2 bg-purple-600 rounded-full p-1 w-16 h-16 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">Profile</span>
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="p-6 pt-12 text-white">
        <h2 className="text-xl font-bold">{username}</h2>
        <p className="text-gray-400 mb-2">{role}</p>
        
        <div className="flex items-center text-gray-400 mb-1">
          <FaMapMarkerAlt className="mr-2" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center text-gray-400 mb-4">
          <FaClock className="mr-2" />
          <span>Member since {joinDate}</span>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Languages */}
        <h3 className="text-lg font-semibold mb-2">Languages</h3>
        <div className="flex flex-wrap gap-2">
          {languages.map((language, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
            >
              {language}
            </span>
          ))}
        </div>
        
        {/* Edit Profile Button */}
        <button className="mt-6 flex items-center justify-center text-white bg-transparent border border-gray-600 rounded-md px-4 py-2 w-full hover:bg-gray-800 transition-colors">
          <FaPencilAlt className="mr-2" /> Edit Profile
        </button>
      </div>
    </div>
  );
}