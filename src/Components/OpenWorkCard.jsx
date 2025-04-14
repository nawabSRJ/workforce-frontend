import React, { useState } from 'react';
import {
  FaCalendarAlt,
  FaLink,
  FaFileAlt,
  FaComments,
  FaQuestionCircle,
  FaMoneyCheckAlt,
  FaSyncAlt,
  FaUserFriends,
  FaRegClock,
  FaTimes
} from "react-icons/fa";
import { formatDistanceToNow, format, differenceInDays } from 'date-fns';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function OpenWorkCard({
  projTitle,
  description,
  category,
  deadline,
  createdAt,
  budgetAmount,
  clientName,
  status,
  references,
  samples,
  revisionsAllowed,
  paymentMethod,
  freelancerNotes,
  freelancerQues,
  applicationsCount = 0,
  _id
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const statusColors = {
    Open: 'bg-green-100 text-green-800',
    'In Discussion': 'bg-blue-100 text-blue-800',
    Accepted: 'bg-purple-100 text-purple-800',
    Closed: 'bg-gray-100 text-gray-800'
  };

  const getDeadlineColor = () => {
    if (!deadline || status !== 'Open') return 'text-gray-500';
    const daysLeft = differenceInDays(new Date(deadline), new Date());

    if (daysLeft <= 0) return 'text-red-700';
    if (daysLeft <= 3) return 'text-red-600';
    if (daysLeft <= 7) return 'text-red-500';
    return 'text-gray-600';
  };

  const formatDate = (date, prefix) => {
    if (!date) return "";
    try {
      return `${prefix} ${format(new Date(date), 'MMM dd, yyyy')} (${formatDistanceToNow(new Date(date), { addSuffix: true })})`;
    } catch {
      return "";
    }
  };

  const handleRequestProject = () => setIsRequestModalOpen(true);

  // function to update applicants
  const applyForTask = async (taskId) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_REACT_BACKEND_URL}/open-task/apply/${taskId}`);
      console.log("Updated applicationsCount:", response.data.task.applicationsCount);
    } catch (error) {
      console.error("Error applying for task:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }
  
    setIsSending(true);
    try {
      // Get the freelancer data from localStorage
      const rawUserData = localStorage.getItem('userData');
      console.log("Raw userData from localStorage:", rawUserData);
      
      const freelancerData = JSON.parse(rawUserData || "{}");
      const token = localStorage.getItem('freelancerToken');
      const rawLoggedInfo = localStorage.getItem('logged');
      console.log("Raw logged info:", rawLoggedInfo);
      
      const whoisit = JSON.parse(rawLoggedInfo || "{}");
      
      // Check if the user is a freelancer
      if (whoisit.role !== 'freelancer') {
        throw new Error("Please login as freelancer to send requests");
      }
      
      // Ensure we have a valid freelancer ID
      const freelancerId = freelancerData._id || freelancerData.id;
      if (!freelancerId) {
        throw new Error("Could not find freelancer ID. Please log in again.");
      }
      
      // Ensure we have a valid task ID
      // This is the id of the OpenTask document from MongoDB
      if (!_id) {
        console.error("Task ID is undefined:", _id);
        throw new Error("Task ID is missing. Cannot send request.");
      }
      
      console.log("Sending request with:", {
        freelancerId,
        projectId: _id, // This is the task ID (OpenTask document ID)
        note: message
      });
      
      // Make the API request
      const response = await axios.post(`${import.meta.env.VITE_REACT_BACKEND_URL}/freelancer-request`, {
        freelancerId,
        projectId: _id, // Send the OpenTask ID as projectId
        note: message
      }, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Response:", response);
      
      // If we get here, the request was successful
      await applyForTask(_id);
      
      setIsRequestModalOpen(false);
      setMessage("");
      alert("Request sent successfully!");
    } catch (error) {
      console.error("Error sending request:", error);
      
      // Enhanced error reporting
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        alert(`Error: ${error.response.data.message || "Request failed"}`);
      } else {
        alert(error.message || "Failed to send request. Please try again.");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">{projTitle}</h2>
            <p className="text-sm text-gray-500">
              {formatDate(createdAt, 'Posted')}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        {/* Project Meta */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <FaMoneyCheckAlt className="text-gray-500" />
            <span className="text-gray-700">₹{budgetAmount}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegClock className="text-gray-500" />
            <span className={`${getDeadlineColor()} flex items-center gap-1`}>
              {deadline ? (
                <>
                  <span>Ending:</span>
                  {format(new Date(deadline), 'MMM dd')}
                </>
              ) : 'Flexible deadline'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaUserFriends className="text-gray-500" />
            <span className="text-gray-700">
              {applicationsCount} applied
              {applicationsCount === 0 && (
                <span className="ml-2 text-blue-600 text-sm">(Be first!)</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaSyncAlt className="text-gray-500" />
            <span className="text-gray-700">{revisionsAllowed} revisions</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-600 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Action Section */}
        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <div>
              {applicationsCount === 0 ? (
                <div className="text-green-600 text-sm flex items-center gap-2">
                  <span>✨ No applications yet - be the first!</span>
                </div>
              ) : (
                <div className="text-gray-600 text-sm">
                  {applicationsCount} freelancer{applicationsCount !== 1 && 's'} applied
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 shadow-sm cursor-pointer"
              >
                View Details
              </button>
              <button
                onClick={handleRequestProject}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 flex items-center gap-2 shadow-sm cursor-pointer"
              >
                {applicationsCount === 0 ? 'Apply Now' : 'Submit Proposal'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{projTitle}</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 cursor-pointer"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Project Overview</h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm text-gray-500">Posted By</dt>
                        <dd className="font-medium">{clientName}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Category</dt>
                        <dd className="font-medium">{category}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Budget</dt>
                        <dd className="font-medium">₹{budgetAmount}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Deadline</dt>
                        <dd className="font-medium">
                          {deadline ? format(new Date(deadline), 'MMM dd, yyyy') : 'Flexible'}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {(references?.length > 0 || samples?.length > 0) && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3">Attachments</h3>
                      {references?.length > 0 && (
                        <div className="mb-4">
                          <h4 className="flex items-center gap-2 text-sm font-medium mb-2">
                            <FaLink className="text-gray-500" /> Reference Links
                          </h4>
                          <div className="space-y-2">
                            {references.map((ref, index) => (
                              <a
                                key={index}
                                href={ref}
                                target="_blank"
                                rel="noopener"
                                className="text-blue-600 hover:underline block text-sm break-all"
                              >
                                {new URL(ref).hostname}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {samples?.length > 0 && (
                        <div>
                          <h4 className="flex items-center gap-2 text-sm font-medium mb-2">
                            <FaFileAlt className="text-gray-500" /> Sample Files
                          </h4>
                          <div className="space-y-2">
                            {samples.map((sample, index) => (
                              <a
                                key={index}
                                href={sample}
                                target="_blank"
                                rel="noopener"
                                className="text-blue-600 hover:underline block text-sm break-all"
                              >
                                Sample File {index + 1}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Project Description</h3>
                    <p className="text-gray-600 whitespace-pre-line">{description}</p>
                  </div>

                  {freelancerNotes && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <FaComments className="text-gray-500" /> Client Notes
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line">{freelancerNotes}</p>
                    </div>
                  )}

                  {freelancerQues && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <FaQuestionCircle className="text-gray-500" /> Questions for You
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line">{freelancerQues}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Request Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Apply for {projTitle}
                </h3>
                <button
                  onClick={() => setIsRequestModalOpen(false)}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 cursor-pointer"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-gray-500">Client</dt>
                      <dd className="font-medium">{clientName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Budget</dt>
                      <dd className="font-medium">₹{budgetAmount}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Deadline</dt>
                      <dd className="font-medium">
                        {deadline ? format(new Date(deadline), 'MMM dd, yyyy') : 'Flexible'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Status</dt>
                      <dd className="font-medium">{status}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Proposal
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    rows="6"
                    placeholder={`Explain your approach to this project...`}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsRequestModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={isSending}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 cursor-pointer"
                  >
                    {isSending ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}