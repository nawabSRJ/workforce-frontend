import React from 'react';
import ProfileCard from './ProfileCard';
import StatCard from './StatCard';
import MetricsSection from './MetricsSection';
import ReviewsSection from './ReviewsSection';

export default function FreelancerHome({ freelancerData }) {
  console.log('Freelancer data:', freelancerData);
  
  // Default data in case props aren't passed
  const defaultFreelancer = {
    _id: '',
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
    responseTime: 'Under 2 hours',
    bio: '',
    portfolioWebsite: '',
    linkedIn: '',
    twitter: '',
    email: '',
    phone: { code: '', number: '' }
  };

  // Use provided data or fall back to defaults
  const freelancer = freelancerData || defaultFreelancer;

  // Ensure these properties exist
  const mergedFreelancer = {
    ...defaultFreelancer,
    ...freelancer
  };

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

  // const reviews = freelancer.reviews.length > 0 ? freelancer.reviews : sampleReviews;

  return (
    <div className="flex flex-col gap-6 w-full mt-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column - Profile Card */}
        <div className="md:col-span-1">
          <ProfileCard 
            _id={mergedFreelancer._id}
            username={mergedFreelancer.username}
            name={mergedFreelancer.name}
            role={mergedFreelancer.role}
            location={mergedFreelancer.location}
            joinDate={mergedFreelancer.createdAt}
            tags={mergedFreelancer.tags} 
            languages={mergedFreelancer.languages || defaultFreelancer.languages}
            bio={mergedFreelancer.bio}
            portfolioWebsite={mergedFreelancer.portfolioWebsite}
            linkedIn={mergedFreelancer.linkedIn}
            twitter={mergedFreelancer.twitter}
            email={mergedFreelancer.email}
            phone={mergedFreelancer.phone}
          />
        </div>
        
        {/* Right Column - Stats & Metrics */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard 
              icon="$"
              value={`$ ${mergedFreelancer.totalEarnings}`}
              label="Total Earnings"
              gradient="from-green-400 to-green-600"
              progressValue={mergedFreelancer.totalEarnings > 0 ? 50 : 0}
              progressColor="bg-green-500"
            />
            
            <StatCard 
              icon="✓"
              value={mergedFreelancer.completedProjects}
              label="Completed Projects"
              gradient="from-purple-500 to-indigo-600"
              progressValue={mergedFreelancer.completedProjects > 0 ? 50 : 0}
              progressColor="bg-purple-500"
            />
          </div>
          
          {/* Metrics Section */}
          <MetricsSection 
            rating={mergedFreelancer.rating}
            completionRate={mergedFreelancer.completionRate || defaultFreelancer.completionRate}
            responseTime={mergedFreelancer.responseTime || defaultFreelancer.responseTime}
          />
        </div>
      </div>
      
      {/* Reviews Section */}
      {/* <ReviewsSection reviews={reviews} avgRating={freelancer.rating} /> */}
    </div>
  );
}