import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { Search, Send, ChevronLeft, Users } from 'lucide-react';
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
        <div className="h-[calc(100vh-0.5rem)] -mx-6 -mt-6 flex bg-gray-900 md:flex-row flex-col">
            {/* Chat List */}
            {/* <div className={`sm:w-1/3 w-full min-w-[320px] bg-gray-800 border-r border-gray-700 flex flex-col md:block ${isMobileChatOpen ? 'hidden' : 'block'}`}>
                <div className="p-4 border-b border-gray-700 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-white text-xl font-bold">My Chats</h2>
                        <Users className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="overflow-y-auto flex-1">
                    {chats.map(chat => (
                        <div 
                            key={chat.id} 
                            className={`p-4 cursor-pointer border-b border-gray-700 hover:bg-gray-700 ${
                                activeChat?.id === chat.id ? 'bg-gray-700' : ''
                            }`}
                            onClick={() => {
                                setActiveChat(chat);
                                setIsMobileChatOpen(true);
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-medium">{chat.name.charAt(0)}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="text-white font-medium">{chat.name}</div>
                                    <div className="text-gray-400 text-sm truncate">{chat.lastMessage}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Chat Messages */}
            <div className={`flex-1 flex flex-col bg-gray-900 ${isMobileChatOpen ? 'block' : 'hidden'} md:block`}>
                <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center gap-4">
                    <button 
                        className="md:hidden text-gray-400 hover:text-white" 
                        onClick={() => setIsMobileChatOpen(false)}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    {activeChat && (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">{activeChat.name.charAt(0)}</span>
                            </div>
                            <h2 className="text-white font-bold">{activeChat.name}</h2>
                        </div>
                    )}
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`p-3 rounded-lg max-w-[75%] ${
                                msg.senderId === user.id 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-700 text-white'
                            }`}>
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-gray-800 border-t border-gray-700">
                    <form onSubmit={sendMessage} className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <Send className="w-5 h-5" />
                            <span className="hidden sm:inline">Send</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}