import React from 'react'
import { Search, Plus } from 'lucide-react';
import DashSideBar from '../Components/DashSideBar';
import ProjectsCard from '../Components/ProjectsCard';
import { useState } from 'react';
import { projects } from '../Data/projects';
import Chat from '../Components/Chat';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// small change

export default function ClientDash(setAuth) {
    const [select, setSelect] = useState('Home'); // for state of DashSideBar tabs
    const user = { id: "1", name: "User1" };
    const receiver = { id: "2", name: "User2" };
    const navigate = useNavigate();

    const handleLogout = () =>{
        console.log(setAuth); // This should log a function if everything is correct

        axios.post('http://localhost:8000/client-logout',{},{withCredentials:true})
        .then(res =>{
            if(res.data.status === "Success"){
                setAuth(false);
                navigate('/');  // home route
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='sm:ml-48 text-center sm:text-left flex-1 sm:p-6 p-3'>
            <h1 className="text-2xl font-semibold mb-6 inline">
                {select === "Projects" ? "My Projects" : select === "Inbox" ? "My Chats" : "Welcome User"}
            </h1>

            <button
             onClick={handleLogout}
             className="w-1/10 p-2 inline relative left-5 bottom-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all cursor-pointer">Logout</button>



            {/* Pass select and setSelect as props */}
            <DashSideBar select={select} setSelect={setSelect} />


            {/* Project Cards : when select is 'Projects' */}
            {select === 'Projects' && (
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <ProjectsCard key={index} {...project} />
                    ))}
                </div>
            )}


            {/* Chat.jsx when select is 'Inbox' */}

            {select === 'Inbox' && <Chat user={user} receiver={receiver} />}
        </div>
    )
}
