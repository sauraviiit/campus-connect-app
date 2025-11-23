"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, MessageCircle, LogOut, User, Check, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useConnection } from '@/context/ConnectionContext';

const Header = () => {
    const { user, logout } = useAuth();
    const { getPendingRequests, acceptRequest, rejectRequest } = useConnection();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const pendingRequests = getPendingRequests();

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 fixed top-0 left-64 right-0 z-10">
            <div className="flex-1 max-w-xl">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for Seniors, Topics..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative"
                    >
                        <Bell size={20} />
                        {pendingRequests.length > 0 && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200 z-50">
                            <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-900">Notifications</h3>
                                <span className="text-xs text-blue-600 font-medium">{pendingRequests.length} New</span>
                            </div>

                            <div className="max-h-80 overflow-y-auto">
                                {pendingRequests.length > 0 ? (
                                    pendingRequests.map((req, index) => (
                                        <div key={index} className="px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">
                                                    {req.fromName ? req.fromName.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-800">
                                                        <span className="font-semibold">{req.fromName || 'Someone'}</span> sent you a connection request.
                                                    </p>
                                                    <div className="flex gap-2 mt-2">
                                                        <button
                                                            onClick={() => acceptRequest(req.from)}
                                                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg flex items-center gap-1 transition-colors"
                                                        >
                                                            <Check size={12} /> Accept
                                                        </button>
                                                        <button
                                                            onClick={() => rejectRequest(req.from)}
                                                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors"
                                                        >
                                                            <X size={12} /> Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center text-gray-500 text-sm">
                                        No new notifications
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <Link href="/dashboard/messages" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                    <MessageCircle size={20} />
                </Link>

                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-8 h-8 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center text-blue-600 font-bold hover:ring-2 hover:ring-blue-200 transition-all"
                    >
                        {user?.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 animate-in fade-in zoom-in-95 duration-200 z-50">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                            <button
                                onClick={() => {
                                    logout();
                                    setShowDropdown(false);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                                <LogOut size={16} />
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
