import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { ChevronLeft, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OrderMessageCard from './OrderMessageCard';
import OrderInitiationModal from './OrderInitiationModal';
import ChatActionMenu from './ChatActionMenu';
import { handleGeminiRequest } from './geminiService';
import AITagHighlighter from './AITagHighlighter';
const backendURL = import.meta.env.VITE_REACT_BACKEND_URL;
const socket = io(`${backendURL}`, {
    autoConnect: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
});

export default function Inbox({ user }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [chatUsers, setChatUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [orderMessage, setOrderMessage] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, activeChat]);

    useEffect(() => {
        const handleReconnect = () => {
            console.log("Socket reconnected, rejoining room");
            if (user?.id) {
                socket.emit("joinUser", user.id);
            }
        };
        
        socket.on("connect", handleReconnect);
        
        return () => {
            socket.off("connect", handleReconnect);
        };
    }, [user?.id]);

    useEffect(() => {
        if (!user?.id) return;

        console.log("Connecting socket for user:", user.id);
        
        if (!socket.connected) {
            socket.connect();
        }

        socket.emit("joinUser", user.id);
        
        socket.off("receiveMessage");

        socket.on("receiveMessage", (message) => {
            console.log("Received message via socket:", message);
            
            if (activeChat && 
                ((message.senderId === activeChat._id && message.receiverId === user.id) || 
                 (message.receiverId === activeChat._id && message.senderId === user.id))) {
                
                setMessages(prev => {
                    const exists = prev.some(m => 
                        (m._id === message._id) || 
                        (m._id.toString().startsWith('temp-'))
                    );
                    
                    if (!exists) {
                        return [...prev, message];
                    }
                    return prev;
                });
                
                scrollToBottom();
            }
            
            fetchChats();
        });

        socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });

        return () => {
            console.log("Cleaning up socket");
            socket.off("receiveMessage");
            socket.emit("leaveUser", user.id);
        };
    }, [user?.id, activeChat]);

    const fetchChats = async () => {
        try {
            setLoading(true);
            
            if (!user?.id) {
                console.error("Cannot fetch chats: user ID is missing");
                setLoading(false);
                return;
            }
            
            console.log("Fetching chats for:", user.id);
            const res = await axios.get(`${backendURL}/chats/${user.id}`);
            
            console.log("Raw chat response:", res);
            
            if (res.data && Array.isArray(res.data)) {
                console.log("Received chats:", res.data);
                
                if (res.data.length > 0) {
                    const sampleChat = res.data[0];
                    console.log("Sample chat structure:", JSON.stringify(sampleChat));
                    console.log("Chat _id exists?", Boolean(sampleChat._id));
                    console.log("Chat userType exists?", Boolean(sampleChat.userType));
                }
                
                setChats(res.data);
                
                const userDetailsPromises = res.data.map(async (chat) => {
                    try {
                        const endpoint = chat.userType === 'Freelancer' 
                            ? `/freelancers/${chat._id}`
                            : `/clients/${chat._id}`;
                            
                        const userRes = await axios.get(`${backendURL}${endpoint}`);
                        return { id: chat._id, data: userRes.data };
                    } catch (error) {
                        console.error(`Error fetching user ${chat._id}:`, error);
                        return { id: chat._id, data: { name: "Unknown User" } };
                    }
                });
                
                const userDetails = await Promise.all(userDetailsPromises);
                const userMap = {};
                userDetails.forEach(detail => {
                    userMap[detail.id] = detail.data;
                });
                
                setChatUsers(userMap);
            } else {
                console.warn("Unexpected chats response format:", res.data);
                setChats([]);
            }
        } catch (err) {
            console.error("Error fetching chats:", err);
            if (err.response) {
                console.error("Error response data:", err.response.data);
                console.error("Error response status:", err.response.status);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChats();
    }, [user?.id]);

    const fetchMessages = async (chatId) => {
        try {
            console.log(`Fetching messages between ${user.id} and ${chatId}`);
            const res = await axios.get(`${backendURL}/messages/${user.id}/${chatId}`);
            
            if (res.data?.success && Array.isArray(res.data.messages)) {
                console.log("Received messages:", res.data.messages);
                setMessages(res.data.messages);
            } else {
                setMessages([]);
            }
        } catch (err) {
            console.error("Error fetching messages:", err);
            setMessages([]);
        }
    };

    const selectChat = (chat) => {
        console.log("Selected chat:", chat);
        setActiveChat(chat);
        fetchMessages(chat._id);
    };

    const handleInitiateOrder = () => {
        setShowOrderModal(true);
    };

    const handleSendOrder = async (orderData) => {
        setSending(true);
        
        try {
            const tempId = 'temp-' + Date.now().toString();
            
            setMessages(prev => [...prev, {
                ...orderData,
                _id: tempId,
                timestamp: new Date().toISOString()
            }]);
            
            socket.emit("sendMessage", orderData, (response) => {
                if (response && response.success) {
                    setMessages(prev => 
                        prev.map(msg => 
                            msg._id === tempId ? response.message : msg
                        )
                    );
                } else {
                    setMessages(prev => prev.filter(msg => msg._id !== tempId));
                }
            });
            
            scrollToBottom();
        } catch (err) {
            console.error("Error sending order:", err);
        } finally {
            setSending(false);
            setOrderMessage(null);
        }
    };

    const handlePlaceOrder = (message) => {
        console.log("Placing order:", message);
        alert(`Order placed for: ${message.orderDetails.title}`);
    };

    const handleCancelOrder = (message) => {
        console.log("Order cancelled:", message);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        
        if (orderMessage) {
            handleSendOrder(orderMessage);
            return;
        }
        
        if (!newMessage.trim() || !activeChat || sending) return;

        setSending(true);
        
        const messageData = {
            senderId: user.id,
            receiverId: activeChat._id,
            senderModel: user.type || "Client",
            receiverModel: activeChat.userType || "Freelancer",
            message: newMessage.trim(),
            containsAITag: newMessage.includes('@ai')
        };

        console.log("Sending message:", messageData);

        try {
            const tempId = 'temp-' + Date.now().toString();
            
            setMessages(prev => [...prev, {
                ...messageData,
                _id: tempId,
                timestamp: new Date().toISOString()
            }]);
            
            setNewMessage("");
            
            socket.emit("sendMessage", messageData, async (response) => {
                if (response && response.success) {
                    setMessages(prev => 
                        prev.map(msg => 
                            msg._id === tempId ? response.message : msg
                        )
                    );
                    
                    if (newMessage.includes('@ai')) {
                        await handleGeminiRequest(
                            newMessage.trim(),
                            user.id,
                            activeChat._id,
                            user.type || "Client",
                            activeChat.userType || "Freelancer",
                            socket
                        );
                    }
                } else {
                    setMessages(prev => prev.filter(msg => msg._id !== tempId));
                }
            });
            
            scrollToBottom();
        } catch (err) {
            console.error("Error sending message:", err);
            setMessages(prev => prev.filter(msg => msg._id !== tempId));
        } finally {
            setSending(false);
        }
    };

    const getChatName = (chat) => {
        return chatUsers[chat._id]?.name || chat.name || "Unknown User";
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="h-[calc(100vh-80px)] w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {!activeChat ? (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col"
                >
                    <div className="p-4 border-b dark:border-gray-700">
                        <h2 className="text-xl font-bold">Messages</h2>
                    </div>
                    
                    {loading ? (
                        <div className="flex-1 flex items-center justify-center">
                            <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
                        </div>
                    ) : chats.length > 0 ? (
                        <div className="flex-1 overflow-y-auto">
                            {chats.map(chat => (
                                <motion.div
                                    key={chat._id}
                                    whileTap={{ scale: 0.98 }}
                                    className="p-4 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                                    onClick={() => selectChat(chat)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-lg">
                                            {getChatName(chat).charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-semibold truncate">{getChatName(chat)}</h3>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {chat.timestamp ? formatTime(chat.timestamp) : ''}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                {chat.lastMessage || "No messages yet"}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                            <p className="mb-4">No conversations yet</p>
                        </div>
                    )}
                </motion.div>
            ) : (
                <AnimatePresence>
                    <motion.div
                        key="chat-view"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="h-full flex flex-col"
                    >
                        <div className="p-3 border-b dark:border-gray-700 flex items-center gap-3 bg-white dark:bg-gray-800">
                            <button 
                                onClick={() => setActiveChat(null)}
                                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                    {getChatName(activeChat).charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{getChatName(activeChat)}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
                            {messages.length > 0 ? (
                                messages.map((msg) => (
                                    msg.isOrder ? (
                                        <motion.div
                                            key={msg._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <OrderMessageCard
                                                orderDetails={msg.orderDetails}
                                                isClient={msg.receiverId === user.id && user.type === 'Client'}
                                                onPlaceOrder={() => handlePlaceOrder(msg)}
                                                onCancelOrder={() => handleCancelOrder(msg)}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key={msg._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div 
                                                className={`max-w-[80%] p-3 rounded-lg ${
                                                    msg.senderId === user.id 
                                                        ? 'bg-blue-500 text-white rounded-br-none' 
                                                        : 'bg-gray-200 dark:bg-gray-700 rounded-bl-none'
                                                }`}
                                            >
                                                <p>
                                                    <AITagHighlighter text={msg.message} />
                                                </p>
                                                <p className={`text-xs mt-1 text-right ${
                                                    msg.senderId === user.id 
                                                        ? 'text-blue-100' 
                                                        : 'text-gray-500 dark:text-gray-400'
                                                }`}>
                                                    {formatTime(msg.timestamp)}
                                                    {msg.isAIResponse && " (AI Response)"}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )
                                ))
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                                    <p>No messages yet. Start the conversation!</p>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form 
                            onSubmit={sendMessage}
                            className="p-3 border-t dark:border-gray-700 bg-white dark:bg-gray-800"
                        >
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    disabled={sending}
                                />
                                <ChatActionMenu
                                    onFileUpload={() => console.log("File upload clicked")}
                                    onAskAI={() => console.log("Ask AI clicked")}
                                    onInitiateOrder={handleInitiateOrder}
                                    isFreelancer={user.type === 'Freelancer'}
                                />
                                <button
                                    type="submit"
                                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50"
                                    disabled={(!newMessage.trim() && !orderMessage) || sending}
                                >
                                    {sending ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <Send className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </AnimatePresence>
            )}

            {showOrderModal && (
                <OrderInitiationModal
                    isOpen={showOrderModal}
                    onClose={() => setShowOrderModal(false)}
                    onSendOrder={(order) => {
                        setOrderMessage(order);
                        setShowOrderModal(false);
                    }}
                    senderId={user.id}
                    receiverId={activeChat._id}
                    senderModel={user.type || "Client"}
                    receiverModel={activeChat.userType || "Freelancer"}
                />
            )}
        </div>
    );
}