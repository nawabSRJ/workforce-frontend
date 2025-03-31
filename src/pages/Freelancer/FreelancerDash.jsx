import React, { useState } from 'react'
import ProjectsCard from '../../Components/ProjectsCard';
import FreelancerSideBar from '../../Components/Freelancer/FreelancerSideBar';
import { projects } from '../../Data/projects';
import Inbox from '../../Components/Chat System/Inbox';
import Reminders from '../../Components/Freelancer/Reminders';
import Todo from '@/Components/Freelancer/Todo';
import FreelancerHome from '@/Components/Freelancer/FreelancerHome';
import axios from 'axios';

export default function FreelancerDash() {
    const [select, setSelect] = useState('Home'); // tab state
    const freelancerData = JSON.parse(localStorage.getItem('userData'));
    const user = {
        id: freelancerData._id || freelancerData.id,
        name: freelancerData.name,
        type: "Freelancer"
    };

    console.log(freelancerData);
    
    return (
        <div className="flex">
            {/* Sidebar - hidden on mobile, shown on sm and up */}
            <div className="hidden sm:block w-56 flex-shrink-0">
                {/* This empty div maintains the space for the sidebar */}
            </div>
            
            {/* Main Content */}
            <div className={`flex-1 min-h-screen ${select === 'Inbox' ? "bg-[#121b20]" : 'bg-white'} p-4 sm:p-6`}>
                <h1 className="text-2xl font-semibold mb-10 inline">
                    {select === "Projects" ? "My Projects" : select === "Inbox" ? "" : `Welcome ${freelancerData.name}`}
                </h1>

                {/* Pass select and setSelect as props */}
                <FreelancerSideBar select={select} setSelect={setSelect} />

                {/* Project Cards : when select is 'Projects' */}
                {select === 'Projects' && (
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                        {projects.map((project, index) => (
                            <ProjectsCard key={index} {...project} />
                        ))}
                    </div>
                )}

                {select === 'Home' && (
                    <div className="">
                        <FreelancerHome freelancerData={freelancerData} />
                    </div>
                )}

                {select === 'Inbox' && (
                    <div className="inbox-page-setup">
                        <Inbox user={user} />
                    </div>
                )}

                {select === 'Reminders' && (
                    <div className="">
                        <Reminders />
                    </div>
                )}
                {select === 'Todo' && (
                    <div className="">
                        <Todo />
                    </div>
                )}
            </div>
        </div>
    )
}