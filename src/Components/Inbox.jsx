import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { ChevronLeft } from 'lucide-react';

const socket = io("http://localhost:8000");

export default function Inbox({ user }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
    const [chatUsers, setChatUsers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("receiveMessage", (data) => {
            // Check if the message is related to the current active chat
            if (activeChat && (data.senderId === activeChat._id || data.receiverId === activeChat._id)) {
                setMessages((prev) => [...prev, data]);
            }
            
            // Also refresh the chats list to show the latest message
            fetchChats();
        });

        return () => {
            socket.off("receiveMessage");
            socket.disconnect();
        };
    }, [activeChat]);

    // Fetch chats
    const fetchChats = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:8000/chats/${user.id}`);
            console.log("Chats response:", res.data);
            
            if (res.data && Array.isArray(res.data)) {
                setChats(res.data);
                
                // Fetch user details for each chat
                const userDetailsPromises = res.data.map(async (chat) => {
                    try {
                        // Determine if we should fetch client or freelancer details
                        // This would need to be adjusted based on your specific user model structure
                        const endpoint = chat.userType === 'Freelancer' 
                            ? `/freelancers/${chat._id}`
                            : `/clients/${chat._id}`;
                            
                        const userRes = await axios.get(`http://localhost:8000${endpoint}`);
                        return { id: chat._id, data: userRes.data };
                    } catch (error) {
                        console.error(`Error fetching details for user ${chat._id}:`, error);
                        return { id: chat._id, data: { name: "Unknown User" } };
                    }
                });
                
                const userDetails = await Promise.all(userDetailsPromises);
                const userMap = {};
                userDetails.forEach(detail => {
                    userMap[detail.id] = detail.data;
                });
                
                setChatUsers(userMap);
            }
            setLoading(false);
        } catch (err) {
            console.error("Error fetching chats:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChats();
    }, [user.id]);

    const selectChat = async (chat) => {
        setActiveChat(chat);
        setIsMobileChatOpen(true);
        
        try {
            const res = await axios.get(`http://localhost:8000/messages/${user.id}/${chat._id}`);
            console.log("Messages response:", res.data);
            
            if (res.data && res.data.success && Array.isArray(res.data.messages)) {
                setMessages(res.data.messages);
            } else {
                setMessages([]);
            }
        } catch (err) {
            console.error("Error fetching messages:", err);
            setMessages([]);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeChat) return;

        // Determine the model types based on your application logic
        // This is an assumption - adjust based on your actual user types
        const senderModel = user.type || "Client"; // Default to Client if not specified
        const receiverModel = activeChat.userType || "Freelancer"; // Default to Freelancer if not specified

        const messageData = {
            senderId: user.id,
            receiverId: activeChat._id,
            senderModel,
            receiverModel,
            message: newMessage.trim(),
            timestamp: new Date().toISOString()
        };

        // Send via socket
        socket.emit("sendMessage", messageData);
        
        // Also send via HTTP for persistence
        axios.post('http://localhost:8000/send-message', messageData)
            .then(res => console.log("Message sent successfully:", res.data))
            .catch(err => console.error("Error sending message:", err));

        // Optimistically add to UI
        setMessages((prev) => [...prev, messageData]);
        setNewMessage("");
    };

    const getChatName = (chat) => {
        if (chatUsers[chat._id] && chatUsers[chat._id].name) {
            return chatUsers[chat._id].name;
        }
        
        // Fallback
        return chat.name || "Unknown User";
    };

    return (
        <div className="h-full w-full bg-gray-900">
            {!isMobileChatOpen ? (
                <div className="h-full flex flex-col">
                    <div className="bg-gray-800 text-white py-4 px-6 font-semibold text-lg border-b border-gray-700">
                        My Chats
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <p className="text-gray-400 text-center py-4">Loading chats...</p>
                        ) : chats.length > 0 ? (
                            chats.map(chat => (
                                <div
                                    key={chat._id}
                                    className={`p-4 cursor-pointer border-b border-gray-700 hover:bg-gray-800 ${activeChat?._id === chat._id ? 'bg-gray-800' : ''}`}
                                    onClick={() => selectChat(chat)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-medium">
                                                {getChatName(chat).charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-white font-medium">{getChatName(chat)}</div>
                                            <div className="text-gray-400 text-sm truncate">
                                                {chat.lastMessage || "No messages yet"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-center py-4">No chats available</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="h-screen flex flex-col">
                    <div className="bg-gray-800 text-white py-3 px-4 flex items-center gap-3 border-b border-gray-700">
                        <button onClick={() => setIsMobileChatOpen(false)} className="p-1 hover:bg-gray-700 rounded-full">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">
                                    {activeChat ? getChatName(activeChat).charAt(0) : '?'}
                                </span>
                            </div>
                            <span className="font-medium">
                                {activeChat ? getChatName(activeChat) : 'Unknown User'}
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                                    <div 
                                        className={`p-3 rounded-lg max-w-[75%] ${
                                            msg.senderId === user.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
                                        }`}
                                    >
                                        {msg.message}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-center py-4">No messages yet. Start the conversation!</p>
                        )}
                    </div>
                    <div className="p-4 bg-gray-800 border-t border-gray-700">
                        <form onSubmit={sendMessage} className="flex gap-2">
                            <input
                                type="text"
                                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button 
                                type="submit" 
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                disabled={!activeChat}
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