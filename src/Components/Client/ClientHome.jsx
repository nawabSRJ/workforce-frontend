import React from 'react';
import ClientProfileCard from './ClientProfileCard';
import ClientStatCard from './ClientStatCard';
import { FaChartLine, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';

export default function ClientHome({ clientData }) {
  // Default data in case props aren't passed
  const defaultClient = {
     _id: '', // Add _id field to default
    name: 'Client Name',
    email: 'client@example.com',
    gender: 'Prefer not to say',
    projectsPosted: 0,
    projectsCompleted: 0,
    totalExpense: 0,
    joinDate: new Date().toLocaleDateString()
  };

  // Use provided data or fall back to defaults
  const client = clientData || defaultClient;
  console.log('This is the client Id here : ', clientData.id)
  return (
    <div className="flex flex-col gap-6 w-full mt-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column - Profile Card */}
        <div className="md:col-span-1">
          <ClientProfileCard 
            _id={client.id}
            name={client.name}
            email={client.email}
            gender={client.gender}
            joinDate={client.joinDate}
            projectsPosted={client.projectsPosted}
          />
        </div>
        
        {/* Right Column - Stats */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ClientStatCard 
              icon={<FaMoneyBillWave className="text-lg" />}
              value={`$${client.totalExpense}`}
              label="Total Spent"
              gradient="from-blue-500 to-blue-600"
            />
            
            <ClientStatCard 
              icon={<FaChartLine className="text-lg" />}
              value={client.projectsPosted}
              label="Projects Posted"
              gradient="from-purple-500 to-purple-600"
            />

            <ClientStatCard 
              icon={<FaCheckCircle className="text-lg" />}
              value={client.projectsCompleted}
              label="Projects Completed"
              gradient="from-green-500 to-green-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}