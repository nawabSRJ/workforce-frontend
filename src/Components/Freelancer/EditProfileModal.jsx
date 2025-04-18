import React, { useState, useEffect } from 'react';
import { FaTimes, FaGlobe, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditProfileModal = ({ isOpen, onClose, userData, updateUserData }) => {
  const backendURL = import.meta.env.VITE_REACT_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    email: '',
    tags: [],
    portfolioWebsite: '',
    linkedIn: '',
    twitter: '',
    phone: { code: '', number: '' }
  });

  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        username: userData.username || '',
        bio: userData.bio || '',
        email: userData.email || '',
        tags: Array.isArray(userData.tags) ? [...userData.tags] : [],
        portfolioWebsite: userData.portfolioWebsite || '',
        linkedIn: userData.linkedIn || '',
        twitter: userData.twitter || '',
        phone: userData.phone || { code: '', number: '' }
      });
    }
  }, [userData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      phone: {
        ...prev.phone,
        [name]: value
      }
    }));
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    
    // Check if tag already exists
    if (!formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
    }
    
    setTagInput('');
  };

  const removeTag = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('freelancerToken');
      
      // Format the data for the API
      const dataToSubmit = {
        ...formData,
        // Only include fields that are actually editable
        name: formData.name,
        bio: formData.bio,
        tags: formData.tags,
        portfolioWebsite: formData.portfolioWebsite,
        linkedIn: formData.linkedIn,
        twitter: formData.twitter,
        phone: formData.phone
      };
      
      // Use username instead of ID
      const response = await axios.put(
        `${backendURL}/freelancer/update-profile/${formData.username}`,
        dataToSubmit,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data && response.data.user) {
        toast.success('Profile updated successfully!');
        updateUserData(response.data.user);
        
        // Also update localStorage to keep it in sync
        try {
          const localStorageData = JSON.parse(localStorage.getItem('userData') || '{}');
          const updatedData = { ...localStorageData, ...response.data.user };
          localStorage.setItem('userData', JSON.stringify(updatedData));
        } catch (err) {
          console.error('Error updating localStorage:', err);
        }
        
        onClose();
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Failed to update profile';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl relative border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          disabled={isLoading}
        >
          <FaTimes size={18} />
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6">Edit Your Profile</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="border-b border-gray-700 pb-6">
            <h3 className="text-lg font-medium text-white mb-4">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Display Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Tell clients about yourself and your expertise"
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Professional Details Section */}
          <div className="border-b border-gray-700 pb-6">
            <h3 className="text-lg font-medium text-white mb-4">Professional Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Skills & Expertise</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 flex items-center"
                    >
                      {tag}
                      <button 
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-2 text-gray-400 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyPress={handleTagKeyPress}
                    className="flex-1 bg-gray-800 border border-gray-600 rounded-l-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Add a skill (e.g., Web Development)"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="bg-purple-600 text-white px-4 rounded-r-md hover:bg-purple-700 transition"
                  >
                    Add
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Press Enter to add multiple skills</p>
              </div>
            </div>
          </div>
          
          {/* Contact & Social Links Section */}
          <div className="border-b border-gray-700 pb-6">
            <h3 className="text-lg font-medium text-white mb-4">Contact & Social Links</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-gray-400 text-sm mb-1">Country Code</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.phone.code}
                    onChange={handlePhoneChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="+91"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-gray-400 text-sm mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="number"
                    value={formData.phone.number}
                    onChange={handlePhoneChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    pattern="[0-9]{10}"
                    title="Please enter a 10-digit phone number"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-gray-400 text-sm mb-1 flex items-center">
                  <FaGlobe className="mr-2" /> Portfolio Website
                </label>
                <input
                  type="url"
                  name="portfolioWebsite"
                  value={formData.portfolioWebsite}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://yourportfolio.com"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm mb-1 flex items-center">
                  <FaLinkedin className="mr-2" /> LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://linkedin.com/in/yourusername"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm mb-1 flex items-center">
                  <FaTwitter className="mr-2" /> Twitter
                </label>
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md hover:from-purple-700 hover:to-pink-600 transition flex items-center justify-center min-w-[120px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;