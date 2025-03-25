import React from 'react';
import ReviewCard from './ReviewCard';
import { FaStar } from 'react-icons/fa';

export default function ReviewsSection({ reviews, avgRating }) {
  return (
    <div className="bg-black rounded-xl p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Client Reviews</h3>
        <div className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="mr-1 font-medium">{avgRating.toFixed(1)}</span>
          <span className="text-gray-400">({reviews.length})</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <ReviewCard 
              key={review.id}
              clientName={review.clientName}
              clientRole={review.clientRole}
              rating={review.rating}
              timeAgo={review.timeAgo}
              comment={review.comment}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No reviews yet</p>
        )}
      </div>
      
      {reviews.length > 2 && (
        <button className="mt-4 w-full text-center text-blue-400 hover:text-blue-300">
          View all reviews
        </button>
      )}
    </div>
  );
}