import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import axios from 'axios';
import { chats as mockChats } from '../Data/chats';
import { messages as mockMessages } from '../Data/messages';
const socket = io("http://localhost:5000");
export default function Inbox({ user, receiver }) {
    const [messages, setMessages] = useState([]);
        const [newMessage, setNewMessage] = useState("");
        const [chats, setChats] = useState([]);
        const [activeChat, setActiveChat] = useState(receiver);
        const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

        useEffect(() => {
            console.log("Initializing chat component");
            // Connect and authenticate socket
            socket.connect();
            socket.emit("authenticate", localStorage.getItem("token"));
            
            // Log socket connection status
            socket.on("connect", () => {
                console.log("Socket connected:", socket.id);
            });
            
            socket.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
            });
    
            // Fetch user chat list
            axios.get(`http://localhost:5000/api/chats/${user.id}`)
                .then(res => setChats(res.data))
                .catch(err => {
                    console.error("Error fetching chats:", err);
                    // Use mock data in case of error (remove in production)
                    setChats(mockChats);
                });
    
            // Fetch messages if active chat exists
            if (activeChat) {
                axios.get(`http://localhost:5000/api/chats/${user.id}/${activeChat.id}`)
                    .then(res => setMessages(res.data))
                    .catch(err => {
                        console.error("Error fetching chat history:", err);
                        // Use mock data in case of error (remove in production)
                        setMessages(mockMessages);
                    });
            }
    
            // Listen for incoming messages
            const handleReceiveMessage = (data) => {
                console.log("Received message:", data);
                setMessages(prev => {
                    const messageExists = prev.some(msg => 
                        msg.senderId === data.senderId && 
                        msg.timestamp === data.timestamp && 
                        msg.message === data.message
                    );
                    if (messageExists) return prev;
                    return [...prev, data];
                });
            };
    
            socket.on("receiveMessage", handleReceiveMessage);
    
            return () => {
                socket.off("receiveMessage", handleReceiveMessage);
                socket.disconnect();
            };
        }, [user.id, activeChat?.id]);


    return (
        <div className='flex sm:flex-col min-h-screen'>
            <div className="header bg-[#0c1317] text-white text-center font-semibold">
                My Chats
            </div>
            {/* Chat List */}
            <div className={`w-1/1 min-w-[320px] bg-[#111b21] border-r border-gray-700 flex flex-col md:block ${isMobileChatOpen ? 'hidden' : 'block'}`}>
                
                <div className="overflow-y-auto flex-1 cursor-pointer">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            className={`p-4 cursor-pointer border-b border-gray-700 ${activeChat?.id === chat.id ? 'bg-[#202c33]' : 'hover:bg-[#2a3942]'
                                }`}
                            onClick={() => {
                                setActiveChat(chat);
                                setIsMobileChatOpen(true);
                            }}
                        >
                            <div className="text-white font-medium cursor-pointer">{chat.name}</div>
                            <div className="text-gray-400 text-sm truncate">{chat.lastMessage}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
