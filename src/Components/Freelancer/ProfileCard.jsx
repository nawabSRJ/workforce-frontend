import React, { useState } from 'react';
import { FaMapMarkerAlt, FaClock, FaPencilAlt } from 'react-icons/fa';
import EditProfileModal from './EditProfileModal';

export default function ProfileCard({ 
  _id, 
  username, 
  name, 
  role, 
  location, 
  joinDate, 
  tags, 
  languages, 
  bio,
  portfolioWebsite,
  linkedIn,
  twitter,
  email,
  phone
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    _id,
    username,
    name,
    bio: bio || '',
    tags: tags || [],
    email: email || '',
    portfolioWebsite: portfolioWebsite || '',
    linkedIn: linkedIn || '',
    twitter: twitter || '',
    phone: phone || { code: '', number: '' }
  });

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

  const updateUserData = (newData) => {
    setUserData(prev => ({
      ...prev,
      ...newData
    }));
  };

  return (
    <div className="bg-black rounded-xl overflow-hidden">
      {/* Profile Header with Gradient */}
      <div className="h-24 bg-gradient-to-r from-purple-600 to-pink-500 relative">
        {/* Profile Image */}
        <div className="absolute bottom-0 left-4 transform translate-y-1/2 bg-purple-600 rounded-full p-1 w-16 h-16 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">
            {userData.name?.charAt(0) || username?.charAt(0) || 'F'}
          </span>
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="p-6 pt-12 text-white">
        <h2 className="text-xl font-bold">{userData.username || username}</h2>
        <p className="text-gray-400 mb-2">{userData.name || name}</p>
        
        <div className="flex items-center text-gray-400 mb-1">
          <FaMapMarkerAlt className="mr-2" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center text-gray-400 mb-4">
          <FaClock className="mr-2" />
          <span>Member since {typeof joinDate === 'string' ? joinDate : new Date(joinDate).toLocaleDateString()}</span>
        </div>
        
        {/* Bio if available */}
        {userData.bio && (
          <div className="mb-4">
            <p className="text-gray-300 text-sm">{userData.bio}</p>
          </div>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {userData.tags.map((tag, index) => (
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
        
        {/* External Links */}
        {(userData.portfolioWebsite || userData.linkedIn || userData.twitter) && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Links</h3>
            <div className="space-y-1">
              {userData.portfolioWebsite && (
                <a 
                  href={userData.portfolioWebsite.startsWith('http') ? userData.portfolioWebsite : `https://${userData.portfolioWebsite}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-blue-400 hover:text-blue-300 text-sm truncate"
                >
                  Portfolio Website
                </a>
              )}
              {userData.linkedIn && (
                <a 
                  href={userData.linkedIn.startsWith('http') ? userData.linkedIn : `https://${userData.linkedIn}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-blue-400 hover:text-blue-300 text-sm truncate"
                >
                  LinkedIn
                </a>
              )}
              {userData.twitter && (
                <a 
                  href={userData.twitter.startsWith('http') ? userData.twitter : `https://${userData.twitter}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-blue-400 hover:text-blue-300 text-sm truncate"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        )}
        
        {/* Edit Profile Button */}
        <button 
          className="mt-6 flex items-center justify-center text-white bg-transparent border border-gray-600 rounded-md px-4 py-2 w-full hover:bg-gray-800 transition-colors"
          onClick={handleEditClick}
        >
          <FaPencilAlt className="mr-2" /> Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        userData={userData}
        updateUserData={updateUserData}
      />
    </div>
  );
}