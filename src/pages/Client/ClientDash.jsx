import React from 'react'
import { Search, Plus } from 'lucide-react';
import DashSideBar from '../../Components/DashSideBar';
import ProjectsCard from '../../Components/ProjectsCard';
import { useState } from 'react';
import { projects } from '../../Data/projects';
import Inbox from '../../Components/Inbox';
import { Button } from '@/Components/ui/button';
import { useNavigate } from 'react-router-dom';
// small change

export default function ClientDash() {
    const [select, setSelect] = useState('Home'); // for state of DashSideBar tabs
    const user = { id: "1", name: "User1" };
    const receiver = { id: "2", name: "User2" };
    const navigate = useNavigate();


    return (
        <div className={`${select === "Inbox" ? "bg-[#121b20]" : "bg-white"} sm:ml-48 text-center sm:text-left flex-1 sm:p-6 p-3`}>
            <h1 className="text-2xl font-semibold mb-6 inline">
                {select === "Projects" ? "My Projects" : select === "Inbox" ? "" : "Welcome User"}
            </h1>




            {/* Pass select and setSelect as props */}
            <DashSideBar select={select} setSelect={setSelect} />


            {/* Project Cards : when select is 'Projects' */}
            {select === 'Projects' && (
                <div className="inline">
                    <Button className='sm:ml-5 cursor-pointer sm:inline sm:w-fit sm:my-0 block w-full my-3' onClick={()=>navigate('/new-project')}>New Project</Button>
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                        {projects.map((project, index) => (
                            <ProjectsCard key={index} {...project} />
                        ))}
                    </div>
                </div>
            )}


            {/* Chat.jsx when select is 'Inbox' */}

            {/* {select === 'Inbox' && <Chat user={user} receiver={receiver} />} */}
            {select === 'Inbox' && (
                <div className="inbox-page-setup grid md:grid-cols-1">

                    <Inbox user={user} receiver={receiver} />
                </div>
            )}
        </div>
    )
}
