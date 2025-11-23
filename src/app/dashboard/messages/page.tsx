"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useConnection } from '@/context/ConnectionContext';
import { useMessage } from '@/context/MessageContext';
import { Search, Send, User, MoreVertical, Phone, Video, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const MessagesPage = () => {
    const { user } = useAuth();
    const { connections } = useConnection();
    const { messages, sendMessage, getMessages } = useMessage();
    const [selectedContact, setSelectedContact] = useState<string | null>(null);
    const [messageInput, setMessageInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [connectedUsers, setConnectedUsers] = useState<any[]>([]);

    useEffect(() => {
        if (user && connections.length > 0) {
            const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const myConnections = connections.map(c => {
                const otherEmail = c.user1 === user.email ? c.user2 : c.user1;
                return allUsers.find((u: any) => u.email === otherEmail);
            }).filter(Boolean);
            setConnectedUsers(myConnections);
        }
    }, [user, connections]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedContact || !messageInput.trim()) return;

        sendMessage(selectedContact, messageInput);
        setMessageInput('');
    };

    const currentMessages = selectedContact ? getMessages(selectedContact) : [];
    const selectedUser = connectedUsers.find(u => u.email === selectedContact);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentMessages]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <Header />

            <main className="pl-64 pt-16 h-screen flex">
                {/* Sidebar - Contact List */}
                <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {connectedUsers.length > 0 ? (
                            connectedUsers.map((contact) => (
                                <div
                                    key={contact.email}
                                    onClick={() => setSelectedContact(contact.email)}
                                    className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${selectedContact === contact.email ? 'bg-blue-50 border-r-4 border-blue-600' : ''
                                        }`}
                                >
                                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                                        {contact.image ? (
                                            <img src={contact.image} alt={contact.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-lg">
                                                {contact.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-semibold text-gray-900 truncate">{contact.name}</h4>
                                            <span className="text-xs text-gray-400">12:30 PM</span>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">
                                            Click to start chatting
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                <p>No connections yet.</p>
                                <p className="text-sm mt-2">Find a mentor or junior to start chatting!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-gray-50">
                    {selectedContact ? (
                        <>
                            {/* Chat Header */}
                            <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                        {selectedUser?.image ? (
                                            <img src={selectedUser.image} alt={selectedUser.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold">
                                                {selectedUser?.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{selectedUser?.name}</h3>
                                        <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            Online
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-gray-400">
                                    <button className="hover:text-blue-600 transition-colors"><Phone size={20} /></button>
                                    <button className="hover:text-blue-600 transition-colors"><Video size={20} /></button>
                                    <button className="hover:text-gray-600 transition-colors"><MoreVertical size={20} /></button>
                                </div>
                            </div>

                            {/* Messages List */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {currentMessages.map((msg) => {
                                    const isMe = msg.sender === user?.email;
                                    return (
                                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${isMe
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                                                }`}>
                                                <p>{msg.content}</p>
                                                <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-white border-t border-gray-200">
                                <form onSubmit={handleSend} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!messageInput.trim()}
                                        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send size={20} />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <MessageCircle size={48} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600">Select a conversation</h3>
                            <p>Choose a contact from the left to start chatting</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MessagesPage;
