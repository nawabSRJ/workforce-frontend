import React, { useState } from 'react'
import ProjectsCard from '../../Components/ProjectsCard';
import FreelancerSideBar from '../../Components/Freelancer/FreelancerSideBar';
import { projects } from '../../Data/projects';
import Inbox from '../../Components/Inbox';
import Reminders from '../../Components/Freelancer/Reminders';
import Todo from '@/Components/Freelancer/Todo';
import FreelancerHome from '@/Components/Freelancer/FreelancerHome';


export default function FreelancerDash() {
    const [select, setSelect] = useState('Home'); // tab state
    const user = { id: "1", name: "User1" };
    const receiver = { id: "2", name: "User2" };
    console.log('Projects : ', projects)
    return (
        <div className={`${select === 'Inbox' ? "bg-[#121b20]" : 'bg-white'} sm:ml-48 text-center sm:text-left flex-1 sm:p-6 p-3`}>
            <h1 className="text-2xl font-semibold mb-10 inline">
                {select === "Projects" ? "My Projects" : select === "Inbox" ? "" : "Welcome User"}
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
                    <FreelancerHome />
                </div>
            )}



            {/* {select === 'Inbox' && <Chat user={user} receiver={receiver} />} */}
            {select === 'Inbox' && (
                <div className="inbox-page-setup ">
                    <Inbox user={user} receiver={receiver} />
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
    )
}
