import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import axios from 'axios';
import { ChevronLeft } from 'lucide-react';
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
        <div className="h-full w-full  bg-gray-900">

            {!isMobileChatOpen ? (
                // Chat List View
                <div className="h-full flex flex-col">
                    <div className="bg-gray-800 text-white py-4 px-6 font-semibold text-lg border-b border-gray-700">
                        My Chats
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {chats.map(chat => (
                            <div
                                key={chat.id}
                                className={`p-4 cursor-pointer border-b border-gray-700 hover:bg-gray-800 ${
                                    activeChat?.id === chat.id ? 'bg-gray-800' : ''
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
                                    <div>
                                        <div className="text-white font-medium">{chat.name}</div>
                                        <div className="text-gray-400 text-sm truncate">{chat.lastMessage}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // Active Chat View
                <div className="h-screen flex flex-col">
                    <div className="bg-gray-800 text-white py-3 px-4 flex items-center gap-3 border-b border-gray-700">
                        <button 
                            onClick={() => setIsMobileChatOpen(false)}
                            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">{activeChat?.name.charAt(0)}</span>
                            </div>
                            <span className="font-medium">{activeChat?.name}</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
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
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}