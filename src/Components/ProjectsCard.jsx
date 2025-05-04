import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Clock, AlertCircle, User, Edit } from 'lucide-react';
import axios from 'axios';

export default function ProjectsCard({ 
    _id,
    title, 
    description, 
    tags = [], 
    clientName,
    dueDate, 
    progress: initialProgress = 0, 
    amount, 
    status = 'Pending', 
    completeDate,
    revisionsAllowed = 0,
    revisionsLeft = 0,
    onViewDetails,
    onProgressUpdate // New prop for parent communication
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentProgress, setCurrentProgress] = useState(initialProgress);

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const getStatusColor = () => {
        switch(status) {
            case 'In Progress': return 'bg-blue-100 text-blue-600';
            case 'Completed': return 'bg-green-100 text-green-600';
            case 'Pending': return 'bg-yellow-100 text-yellow-600';
            case 'Revision Requested': return 'bg-purple-100 text-purple-600';
            case 'Disputed': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const handleProgressUpdate = async () => {
        setIsLoading(true);
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_REACT_BACKEND_URL}/projects/${_id}/progress`,
                { progress: currentProgress }
            );
            
            toast.success('Progress updated successfully!');
            setIsEditModalOpen(false);
            
            // Notify parent component about the update
            if (onProgressUpdate) {
                onProgressUpdate(_id, currentProgress);
            }
        } catch (error) {
            console.error('Error updating progress:', error);
            toast.error('Failed to update progress');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white">
            {/* Progress Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Update Project Progress</h3>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Current Progress: {currentProgress}%
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={currentProgress}
                                onChange={(e) => setCurrentProgress(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0%</span>
                                <span>100%</span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleProgressUpdate}
                                disabled={isLoading}
                                className={`px-4 py-2 text-white rounded-md transition-colors ${
                                    isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {isLoading ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Card Content */}
            <div className="flex justify-between items-start mb-2">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-left sm:text-lg text-sm font-medium">{title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor()}`}>
                            {status}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>
                </div>
                <button 
                    onClick={() => {
                        setIsEditModalOpen(true);
                        setCurrentProgress(initialProgress);
                    }}
                    className="text-gray-400 hover:text-blue-500 transition-colors p-1"
                    title="Edit progress"
                >
                    <Edit size={16} />
                </button>
            </div>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User size={16} className="text-gray-500" />
                    </div>
                    <div>
                        <p className="text-sm">{clientName || 'Client'}</p>
                        <p className="text-xs text-gray-500">
                            {status === 'Completed' 
                                ? `Completed: ${formatDate(completeDate)}` 
                                : `Due: ${formatDate(dueDate)}`}
                        </p>
                    </div>
                </div>
                
                {(revisionsLeft !== undefined && revisionsAllowed > 0) && (
                    <div className="flex items-center gap-1 text-xs">
                        <AlertCircle size={14} />
                        <span>Revisions: {revisionsLeft}/{revisionsAllowed}</span>
                    </div>
                )}
            </div>

            <div className="mb-3">
                <div className="flex justify-between mb-1">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm">{Math.round(currentProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full ${
                            status === 'Completed' ? 'bg-green-500' : 
                            status === 'Pending' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${currentProgress}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">${amount?.toFixed(2)}</span>
                <button 
                    onClick={onViewDetails}
                    className="text-blue-600 text-sm cursor-pointer hover:underline"
                >
                    View Details →
                </button>
            </div>
        </div>
    );
}