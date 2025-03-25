import React from 'react';
import { FaStar, FaUser } from 'react-icons/fa';

export default function ReviewCard({ clientName, clientRole, rating, timeAgo, comment }) {
  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i < rating ? "text-yellow-400" : "text-gray-600"} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="border-t border-gray-800 pt-4">
      <div className="flex items-start">
        {/* User Avatar */}
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">
          <FaUser className="text-gray-400" />
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{clientName}</h4>
              <p className="text-xs text-gray-400">{clientRole}</p>
            </div>
            
            <div>
              <div className="flex mb-1">
                {renderStars()}
              </div>
              <p className="text-xs text-gray-400 text-right">{timeAgo}</p>
            </div>
          </div>
          
          <p className="mt-2 text-sm text-gray-300">{comment}</p>
        </div>
      </div>
    </div>
  );
}