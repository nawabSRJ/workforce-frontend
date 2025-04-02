import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ProjectsCard({ 
    title, 
    description, 
    tags, 
    freelancerId, 
    clientId,
    dueDate, 
    progress, 
    amount, 
    status, 
    completeDate,
    revisionsAllowed,
    revisionsLeft,
    onViewDetails
}) {
    const [isLoading, setIsLoading] = useState(false);

    const handleStatusUpdate = async (newStatus) => {
        setIsLoading(true);
        try {
            // Here you would call your API to update the project status
            // await updateProjectStatus(projectId, newStatus);
            toast.success(`Project marked as ${newStatus}`);
        } catch (error) {
            toast.error(`Failed to update status: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

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
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="p-4 border border-gray-200 rounded-lg mb-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-left sm:text-lg text-sm font-medium">{title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor()}`}>
                            {status}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{description}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
                {tags?.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        {tag}
                    </span>
                ))}
            </div>   

            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div>
                        <p className="text-sm">Freelancer ID: {freelancerId?.toString().slice(-6)}</p>
                        <p className="text-xs text-gray-500">
                            {status === 'Completed' 
                                ? `Completed: ${formatDate(completeDate)}` 
                                : `Due: ${formatDate(dueDate)}`}
                        </p>
                    </div>
                </div>
                
                {revisionsLeft !== undefined && (
                    <div className="flex items-center gap-1 text-xs">
                        <AlertCircle size={14} />
                        <span>Revisions: {revisionsLeft}/{revisionsAllowed}</span>
                    </div>
                )}
            </div>

            <div className="mb-3">
                <div className="flex justify-between mb-1">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full ${
                            status === 'Completed' ? 'bg-green-500' : 
                            status === 'Pending' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">${amount}</span>
                <div className="flex gap-2">
                    <button 
                        onClick={onViewDetails}
                        className="text-blue-600 text-sm cursor-pointer hover:underline"
                    >
                        View Details →
                    </button>
                </div>
            </div>
        </div>
    );
}