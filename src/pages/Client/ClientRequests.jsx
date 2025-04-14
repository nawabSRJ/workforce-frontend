import { useEffect, useState } from "react";
import axios from "axios";
import ClientRequestCard from "./ClientRequestCard";

export default function ClientRequests({ clientId }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendURL = import.meta.env.VITE_REACT_BACKEND_URL;

  // Get client email from localStorage for filtering
  const getClientEmail = () => {
    try {
      const clientData = JSON.parse(localStorage.getItem("clientData") || "{}");
      return clientData.email;
    } catch (err) {
      console.error("Error getting client email:", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      if (!clientId) {
        console.error("clientId is undefined");
        setError("Client ID is missing. Please log in again.");
        setLoading(false);
        return;
      }

      const clientEmail = getClientEmail();
      if (!clientEmail) {
        setError("Client email not found. Please log in again.");
        setLoading(false);
        return;
      }

      console.log(`Fetching requests for client ID: ${clientId}, email: ${clientEmail}`);
      
      try {
        const res = await axios.get(`${backendURL}/api/freelancer-requests/${clientId}`);
        console.log("Received all requests:", res.data);
        
        // Filter requests to only include those for projects owned by this client
        // We do this by checking if the populated projectId's clientEmail matches this client's email
        const filteredRequests = res.data.filter(req => {
          if (!req.projectId || typeof req.projectId !== 'object') return false;
          return req.projectId.clientEmail === clientEmail;
        });
        
        console.log(`Filtered to ${filteredRequests.length} requests for this client`);
        setRequests(filteredRequests);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch requests", err);
        setError(err.response?.data?.message || "Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequests();
  }, [clientId, backendURL]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.length > 0 ? (
        requests.map(req => (
          <ClientRequestCard key={req._id} request={req} />
        ))
      ) : (
        <div className="p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-500">No requests yet for your projects.</p>
          <p className="text-sm text-gray-400 mt-1">Requests will appear here when freelancers apply for your projects.</p>
        </div>
      )}
    </div>
  );
}