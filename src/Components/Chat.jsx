// Chat.jsx (Frontend)
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
// Import the mock data (remove in production)
import { chats as mockChats } from '../Data/chats';
import { messages as mockMessages } from '../Data/messages';

const socket = io("http://localhost:5000");

export default function Chat({ user, receiver }) {
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

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageData = {
            senderId: user.id,
            receiverId: activeChat.id,
            message: newMessage.trim(),
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, messageData]);
        socket.emit("sendMessage", messageData);
        setNewMessage("");
    };

    return (
        <div className="h-[calc(100vh-0.5rem)] -mx-6 -mt-6 flex bg-[#0c1317] md:flex-row flex-col">
            {/* Chat List */}
            <div className={`sm:w-1/3 w-1/1 min-w-[320px] bg-[#111b21] border-r border-gray-700 flex flex-col md:block ${isMobileChatOpen ? 'hidden' : 'block'}`}>
                <div className="p-4 border-b border-gray-700">
                    <h2 className="text-white text-2xl font-bold">My Chats</h2>
                </div>
                <div className="overflow-y-auto flex-1 cursor-pointer">
                    {chats.map(chat => (
                        <div 
                            key={chat.id} 
                            className={`p-4 cursor-pointer border-b border-gray-700 ${
                                activeChat?.id === chat.id ? 'bg-[#202c33]' : 'hover:bg-[#2a3942]'
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

            {/* Chat Messages */}
            <div className={`flex-1 flex flex-col bg-[#202c33] ${isMobileChatOpen ? 'block' : 'hidden'} md:block`}>
                <div className="p-4 bg-[#111b21] border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-white font-bold">{activeChat?.name || "Select a chat"}</h2>
                    <button className="md:hidden text-white" onClick={() => setIsMobileChatOpen(false)}>Back</button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`p-3 rounded-lg max-w-[75%] ${
                                msg.senderId === user.id 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-[#2a3942] text-white'
                            }`}>
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-gray-800 flex items-center sticky bottom-0 w-full">
                    <form onSubmit={sendMessage} className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 p-3 rounded-lg bg-[#2a3942] text-white border-none focus:ring-2 focus:ring-green-500"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button 
                            type="submit"
                            className="px-6 py-3 cursor-pointer bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
