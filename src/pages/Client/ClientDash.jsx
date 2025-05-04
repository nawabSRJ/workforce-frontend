import React from 'react'
import { Search, Plus } from 'lucide-react';
import DashSideBar from '../../Components/DashSideBar';
import ProjectsCard from '../../Components/Freelancer/ProjectsCard';
import { useState, useEffect } from 'react';
import { projects } from '../../Data/projects';
import Inbox from '../../Components/Chat System/Inbox';
import { Button } from '@/Components/ui/button';
import { useNavigate } from 'react-router-dom';
import ClientHome from '../../Components/Client/ClientHome';
import ClientRequests from './ClientRequests';
import ProjectsPage from '@/Components/Client/ProjectsPage';

export default function ClientDash() {
    const [select, setSelect] = useState('Home');
    const [clientData, setClientData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Get client data from localStorage
        const rawClientData = localStorage.getItem("clientData");
        console.log("Raw client data from localStorage:", rawClientData);

        if (rawClientData) {
            try {
                const parsedData = JSON.parse(rawClientData);
                setClientData(parsedData);

                // Log client ID for debugging
                console.log("Client ID:", parsedData._id || parsedData.id);
            } catch (err) {
                console.error("Error parsing client data:", err);
            }
        } else {
            console.warn("No client data found in localStorage");
        }
    }, []);

    if (!clientData) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    // Create user object for chat system
    const user = {
        id: clientData._id || clientData.id,
        name: clientData.name,
        type: "Client"
    };

    // Client ID with validation
    const clientId = clientData._id || clientData.id;

    return (
        <div className="flex">
            {/* Sidebar spacer */}
            <div className="hidden sm:block w-56 flex-shrink-0"></div>

            {/* Main Content */}
            <div className={`flex-1 min-h-screen ${select === "Inbox" ? "bg-[#121b20]" : "bg-white"} p-4 sm:p-6`}>
                <h1 className="text-2xl font-semibold mb-6 inline">
                    {select === "Projects" ? "My Projects" : select === "Inbox" ? "" : `Welcome ${clientData.name}`}
                </h1>

                <DashSideBar select={select} setSelect={setSelect} />

                {select === 'Home' && (
                    <div className="">
                        <ClientHome clientData={clientData} />
                    </div>
                )}

                {select === 'Projects' && (
                    <div className="inline">
                        <Button
                            className='sm:ml-5 cursor-pointer sm:inline sm:w-fit sm:my-0 block w-full my-3 bg-blue-600 hover:bg-blue-700'
                            onClick={() => navigate('/new-project')}
                        >
                            New Project
                        </Button>
                        {select === 'Projects' && (
                            <div className="">
                                <ProjectsPage />
                            </div>
                        )}
                    </div>
                )}

                {select === 'Inbox' && (
                    <div className="inbox-page-setup grid md:grid-cols-1">
                        <Inbox user={user} />
                    </div>
                )}

                {select === 'Requests' && clientId && (
                    <>
                        <div className="mb-4">
                            <h2 className="text-lg font-medium">Freelancer Requests</h2>
                            <p className="text-sm text-gray-500">Manage requests from freelancers interested in your projects</p>
                        </div>
                        <ClientRequests clientId={clientId} />
                    </>
                )}
            </div>
        </div>
    )
}