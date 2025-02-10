// Chat.jsx (Frontend)
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io("http://localhost:5000");

export default function Chat({ user, receiver }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(receiver);

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
            .catch(err => console.error("Error fetching chats:", err));

        // Fetch messages if active chat exists
        if (activeChat) {
            axios.get(`http://localhost:5000/api/chats/${user.id}/${activeChat.id}`)
                .then(res => setMessages(res.data))
                .catch(err => console.error("Error fetching chat history:", err));
        }

        // Listen for incoming messages
        const handleReceiveMessage = (data) => {
            console.log("Received message:", data);
            setMessages(prev => {
                // Check if message already exists to prevent duplicates
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

        // Update local state immediately
        setMessages(prev => [...prev, messageData]);
        socket.emit("sendMessage", messageData);
        setNewMessage("");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/3 bg-white border-r border-gray-300">
                <div className="p-4 border-b border-gray-300 font-bold">Chats</div>
                <ul className="overflow-auto h-full">
                    {chats.map(chat => (
                        <li 
                            key={chat.id} 
                            className={`p-3 cursor-pointer ${activeChat?.id === chat.id ? 'bg-gray-200' : 'hover:bg-gray-100'}`} 
                            onClick={() => setActiveChat(chat)}
                        >
                            {chat.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-2/3 flex flex-col">
                <div className="p-4 bg-white border-b border-gray-300 font-bold">
                    {activeChat?.name || "Select a chat"}
                </div>
                <div className="flex-1 overflow-auto p-4">
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`p-2 my-2 rounded-lg max-w-xs ${
                                msg.senderId === user.id ? 'ml-auto bg-green-200' : 'mr-auto bg-gray-200'
                            }`}
                        >
                            {msg.message}
                        </div>
                    ))}
                </div>
                <form onSubmit={sendMessage} className="p-4 flex bg-white border-t border-gray-300">
                    <input
                        type="text"
                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button 
                        type="submit"
                        className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}