import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import DashSideBar from '../Components/DashSideBar';
import ProjectsCard from '../Components/ProjectsCard';
import { projects } from '../Data/projects';
import Chat from '../Components/Chat';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../Components/Logo'; // Logo Component

export default function ClientDashboard({ setAuth }) {
  const [select, setSelect] = useState('Home'); // State for the selected tab
  const [activeChat, setActiveChat] = useState(null); // To manage the selected chat
  const user = { id: "1", name: "User1" };
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    axios.post('http://localhost:8000/client-logout', {}, { withCredentials: true })
      .then(res => {
        if (res.data.status === "Success") {
          setAuth(false);  // Logging out the user
          navigate('./');  // Redirect to the home page or login page
        }
      })
      .catch(err => console.log(err));
  };

  const contacts = [
    { name: 'User2', lastMessage: 'Hey, let’s catch up!' },
    { name: 'User3', lastMessage: 'How’s the project going?' }
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className="w-70 bg-blue-600 min-h-screen p-6"> {/* Increased sidebar width */}
        <div className="flex flex-col items-center bg-white rounded p-8 mb-10"> {/* Increased the white box size */}
          <Logo className="w-15 h-15 mb-4" /> {/* Adjusted logo size */}
        </div>

        <nav className="space-y-2">
          {['Home', 'Projects', 'Inbox'].map((item) => (
            <button
              key={item}
              onClick={() => setSelect(item)}
              className={`w-full text-left p-2 rounded ${
                select === item ? 'bg-blue-500 text-white' : 'text-white hover:bg-blue-500'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          {select === 'Home' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-3xl font-semibold mb-4">Welcome, User!</h1>
              <button
                onClick={handleLogout}
                className="bg-pink-500 text-white rounded-md px-6 py-2">Logout
              </button>
            </div>
          )}

          {select === 'Projects' && (
            <div>
              <h1 className="text-2xl font-semibold mb-6">My Projects</h1>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <ProjectsCard key={index} {...project} />
                ))}
              </div>
            </div>
          )}

          {select === 'Inbox' && (
            <div className="flex gap-6">
              {/* Left side: Contacts List (My Chats) */}
              <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">My Chats</h2>
                <div className="flex items-center mb-4">
                  <Search className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search chats"
                    className="ml-2 border-b border-gray-400 outline-none focus:border-blue-500 w-full"
                  />
                </div>

                <div className="overflow-y-auto h-80">
                  {contacts.map((contact, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveChat(contact)}
                      className="p-3 cursor-pointer hover:bg-gray-200 rounded-lg"
                    >
                      <h3 className="font-medium">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.lastMessage}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side: Chat window */}
              <div className="w-2/3 ml-4 bg-white p-4 rounded-lg shadow-lg">
                {activeChat ? (
                  <>
                    <div className="border-b pb-3 mb-4">
                      <h2 className="font-semibold text-lg">Chat with {activeChat.name}</h2>
                    </div>
                    <Chat user={user} receiver={activeChat} />
                  </>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <h2 className="text-xl font-semibold">Welcome to Workforce!</h2>
                    <p className="text-gray-600">Select a chat to start messaging</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}