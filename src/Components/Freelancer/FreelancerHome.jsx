import React from 'react';
import ProfileCard from './ProfileCard';
import StatCard from './StatCard';
import MetricsSection from './MetricsSection';
import ReviewsSection from './ReviewsSection';

export default function FreelancerHome({ freelancerData }) {
  // Default data in case props aren't passed
  const defaultFreelancer = {
    username: 'saranshj123',
    name: 'Developer',
    location: 'IN',
    joinDate: 'March 2023',
    tags: ['test', 'heavyyy'],
    languages: ['English', 'Hindi'],
    totalEarnings: 0,
    completedProjects: 0,
    rating: 0,
    reviews: [],
    completionRate: 0,
    responseTime: 'Under 2 hours'
  };

  // Use provided data or fall back to defaults
  const freelancer = freelancerData || defaultFreelancer;

  // Sample reviews data (in real app, this would come from API/props)
  const sampleReviews = [
    {
      id: 1,
      clientName: 'Darrell Brown',
      clientRole: 'Client',
      rating: 5,
      timeAgo: '2 weeks ago',
      comment: 'Alex delivered exceptional work on our e-commerce platform. The code is clean, well-documented, and he implemented all the features we requested. Very responsive and professional throughout the project.'
    },
    {
      id: 2,
      clientName: 'Sarah Wilson',
      clientRole: 'Client',
      rating: 5,
      timeAgo: '1 month ago',
      comment: 'Great communication and excellent work. Alex helped us redesign our dashboard UI and improved the overall user experience. Would definitely hire again for future projects.'
    }
  ];

  const reviews = freelancer.reviews.length > 0 ? freelancer.reviews : sampleReviews;

  return (
    <div className="flex flex-col gap-6 w-full mt-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column - Profile Card */}
        <div className="md:col-span-1">
          <ProfileCard 
            username={freelancer.username}
            role={freelancer.name}
            location={freelancer.location}
            joinDate={freelancer.joinDate}
            tags={freelancer.tags}
            languages={freelancer.languages}
          />
        </div>
        
        {/* Right Column - Stats & Metrics */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard 
              icon="$"
              value={`$${freelancer.totalEarnings.toFixed(2)}`}
              label="Total Earnings"
              gradient="from-green-400 to-green-600"
              progressValue={freelancer.totalEarnings > 0 ? 50 : 0}
              progressColor="bg-green-500"
            />
            
            <StatCard 
              icon="✓"
              value={freelancer.completedProjects}
              label="Completed Projects"
              gradient="from-purple-500 to-indigo-600"
              progressValue={freelancer.completedProjects > 0 ? 50 : 0}
              progressColor="bg-purple-500"
            />
          </div>
          
          {/* Metrics Section */}
          <MetricsSection 
            rating={freelancer.rating}
            completionRate={freelancer.completionRate}
            responseTime={freelancer.responseTime}
          />
        </div>
      </div>
      
      {/* Reviews Section */}
      <ReviewsSection reviews={reviews} avgRating={freelancer.rating} />
    </div>
  );
}