import React, { useState } from 'react'
import ProjectsCard from '../../Components/ProjectsCard';
import FreelancerSideBar from '../../Components/Freelancer/FreelancerSideBar';
import { projects } from '../../Data/projects';
import Inbox from '../../Components/Chat System/Inbox';
import Reminders from '../../Components/Freelancer/Reminders';
import Todo from '@/Components/Freelancer/Todo';
import FreelancerHome from '@/Components/Freelancer/FreelancerHome';
import ProjectsPage from '@/Components/Freelancer/ProjectsPage';

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
                {select === "Projects"
                    ?
                    <a href={'/explore'}>
                        <button className='px-4 py-2 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 ml-5'>
                            Find Projects
                        </button>
                    </a>
                    :
                    <></>
                }
                {/* Pass select and setSelect as props */}
                <FreelancerSideBar select={select} setSelect={setSelect} />

                {select === 'Projects' && (
                    <div className="">
                        <ProjectsPage />
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
                        <Reminders freelancerData={freelancerData} />
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