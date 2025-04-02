import React from 'react'
import { Search, Plus } from 'lucide-react';
import DashSideBar from '../../Components/DashSideBar';
import ProjectsCard from '../../Components/ProjectsCard';
import { useState } from 'react';
import { projects } from '../../Data/projects';
import Inbox from '../../Components/Chat System/Inbox';
import { Button } from '@/Components/ui/button';
import { useNavigate } from 'react-router-dom';
import ClientHome from '../../Components/Client/ClientHome';

export default function ClientDash() {
    const [select, setSelect] = useState('Home');
    const cliData = JSON.parse(localStorage.getItem("clientData") || "{}");
    const user = {
        id: cliData._id || cliData.id,
        name: cliData.name,
        type: "Client"
    };
    const navigate = useNavigate();

    return (
        <div className="flex">
            {/* Sidebar spacer */}
            <div className="hidden sm:block w-56 flex-shrink-0"></div>
            
            {/* Main Content */}
            <div className={`flex-1 min-h-screen ${select === "Inbox" ? "bg-[#121b20]" : "bg-white"} p-4 sm:p-6`}>
                <h1 className="text-2xl font-semibold mb-6 inline">
                    {select === "Projects" ? "My Projects" : select === "Inbox" ? "" : `Welcome ${cliData.name}`}
                </h1>

                <DashSideBar select={select} setSelect={setSelect} />

                {select === 'Home' && (
                    <div className="">
                        <ClientHome clientData={cliData} />
                    </div>
                )}

                {select === 'Projects' && (
                    <div className="inline">
                        <Button 
                            className='sm:ml-5 cursor-pointer sm:inline sm:w-fit sm:my-0 block w-full my-3 bg-blue-600 hover:bg-blue-700'
                            onClick={() => navigate('/new-project')}
                        >
                            {/* <Plus size={18} className="mr-2" /> */}
                            New Project
                        </Button>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            {projects.map((project, index) => (
                                <ProjectsCard key={index} {...project} />
                            ))}
                        </div>
                    </div>
                )}

                {select === 'Inbox' && (
                    <div className="inbox-page-setup grid md:grid-cols-1">
                        <Inbox user={user} />
                    </div>
                )}
            </div>
        </div>
    )
}