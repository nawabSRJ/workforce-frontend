// ProjectsPage.jsx
import React, { useState, useEffect } from 'react';
import ProjectsCard from '../../Components/ProjectsCard';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Clock } from 'lucide-react';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const freelancerData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_REACT_BACKEND_URL}/projects/${freelancerData.username}`);
                
                if (response.data && Array.isArray(response.data)) {
                    setProjects(response.data);
                    console.log('This is the proj data : ',response.data)
                } else {
                    setProjects([]);
                    toast.info('No projects found');
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                toast.error('Failed to load projects');
                setProjects([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, [freelancerData.username]);

    const handleViewDetails = (projectId) => {
        // Navigate to project details page
        console.log('View details for project:', projectId);
    };

    if (isLoading) {
        return (
            <div className="mt-4 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <ToastContainer/>
            {projects.length > 0 ? (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid md:grid-cols-2 gap-6"
                >
                    {projects.map((project) => (
                        <ProjectsCard 
                            key={project._id}
                            {...project}
                            onViewDetails={() => handleViewDetails(project._id)}
                        />
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-10 rounded-lg bg-gray-50"
                >
                    <p className="text-gray-500 text-lg mb-2">No projects found</p>
                    <p className="text-gray-400 text-sm flex items-center">
                        <Clock className="mr-1" size={16} />
                        Your projects will appear here when you get assigned any
                    </p>
                </motion.div>
            )}
        </div>
    );
}