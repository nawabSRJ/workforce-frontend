import React from 'react';
import axios from 'axios';

export default function ClientRequestCard({ request }) {
  const backendURL = import.meta.env.VITE_REACT_BACKEND_URL;
  
  // Handle potential null values safely
  if (!request) return null;
  
  // Destructure the request data safely
  const { 
    _id, 
    freelancerId, 
    projectId, 
    note, 
    status, 
    createdAt 
  } = request;
  
  // Access the populated data safely
  const freelancer = freelancerId && typeof freelancerId === 'object' 
    ? freelancerId 
    : { name: 'Unknown Freelancer' };
    
  const project = projectId && typeof projectId === 'object' 
    ? projectId 
    : { projTitle: 'Unknown Project' };

  // Debug what we have
  console.log("Rendering request:", request);
  console.log("Freelancer data:", freelancer);
  console.log("Project data:", project);

  const handleAccept = async () => {
    try {
      // Update request status to 'Accepted'
      await axios.patch(`${backendURL}/freelancer-request/${_id}`, {
        status: 'Accepted'
      });
      
      alert(`Request accepted from ${freelancer.name || 'freelancer'}`);
      // You could add a callback to refresh the requests list
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Failed to accept request. Please try again.");
    }
  };

  const handleReject = async () => {
    try {
      // Update request status to 'Rejected'
      await axios.patch(`${backendURL}/freelancer-request/${_id}`, {
        status: 'Rejected'
      });
      
      alert(`Request rejected`);
      // You could add a callback to refresh the requests list
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request. Please try again.");
    }
  };
  
  // Format the date
  const formattedDate = createdAt ? new Date(createdAt).toLocaleString() : 'Unknown date';

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="flex flex-col gap-2">
        {/* Request header with freelancer name */}
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">
            {freelancer.name || freelancer.username || 'Unknown Freelancer'}
          </h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            status === 'Accepted' ? 'bg-green-100 text-green-800' : 
            status === 'Rejected' ? 'bg-red-100 text-red-800' : 
            'bg-blue-100 text-blue-800'
          }`}>
            {status || 'Pending'}
          </span>
        </div>
        
        {/* Project title */}
        <p className="text-sm text-gray-600">
          Project: {project.projTitle || 'Unknown Project'}
        </p>
        
        {/* Request message */}
        <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-100">
          <p className="text-gray-700">{note || 'No message provided'}</p>
        </div>
        
        {/* Timestamp */}
        <p className="text-xs text-gray-400 mt-1">{formattedDate}</p>
        
        {/* Action buttons - only show if status is Pending */}
        {(!status || status === 'Pending') && (
          <div className="flex justify-end gap-3 mt-3">
            <button
              onClick={handleReject}
              className="px-3 py-1 text-red-500 border border-red-200 rounded hover:bg-red-50"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
}