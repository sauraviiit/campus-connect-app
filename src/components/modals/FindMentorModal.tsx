"use client";
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronLeft, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useConnection } from '@/context/ConnectionContext';

interface FindMentorModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'mentor' | 'mentee';
}

const FindMentorModal = ({ isOpen, onClose, mode }: FindMentorModalProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const { user } = useAuth();
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const getYearValue = (yearString: string): number => {
        if (!yearString) return 0;
        if (yearString.includes('1st')) return 1;
        if (yearString.includes('2nd')) return 2;
        if (yearString.includes('3rd')) return 3;
        if (yearString.includes('4th')) return 4;
        if (yearString.includes('Alumni')) return 5;
        return 0;
    };

    useEffect(() => {
        if (isOpen && user) {
            const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const currentUserYear = getYearValue(user.year || '');

            const filtered = storedUsers.filter((u: any) => {
                // Skip current user
                if (u.email === user.email) return false;

                const otherUserYear = getYearValue(u.year || '');
                if (otherUserYear === 0) return false;

                if (mode === 'mentor') {
                    // Show seniors (higher year)
                    return otherUserYear > currentUserYear;
                } else {
                    // Show juniors (lower year)
                    return otherUserYear < currentUserYear;
                }
            });

            setFilteredUsers(filtered);
        }
    }, [isOpen, user, mode]);

    if (!isVisible && !isOpen) return null;

    const title = mode === 'mentor' ? 'Find a Mentor' : 'Find a Junior';
    const cardTitle = mode === 'mentor' ? 'Mentor Cards' : 'Junior Cards';
    const data = filteredUsers;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={`relative bg-gray-50 w-full max-w-4xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                    }`}
            >
                {/* Header */}
                <div className="p-6 flex items-center justify-between bg-white border-b border-gray-100">
                    <button
                        onClick={onClose}
                        className="flex items-center text-blue-600 font-medium gap-1 hover:underline"
                    >
                        <ChevronLeft size={20} />
                        Back
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            C
                        </div>
                        <span className="font-bold text-gray-800">Campus Connect</span>
                    </div>
                    <div className="w-16"></div> {/* Spacer for centering */}
                </div>

                <div className="p-8 flex-1 overflow-y-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">{title}</h2>

                    {/* Search and Filter */}
                    <div className="flex gap-4 mb-8 max-w-3xl mx-auto">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search (e.g, Python, Java, Web Dev...)"
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            />
                        </div>
                        <button className="px-6 py-3 bg-white border border-blue-200 text-blue-600 rounded-xl font-medium flex items-center gap-2 shadow-sm hover:bg-blue-50 transition-colors">
                            Filter: Branch
                            <ChevronDown size={18} />
                        </button>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-6 max-w-3xl mx-auto">{cardTitle}</h3>

                    {/* Mentor/Mentee Grid */}
                    {data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                            {data.map((person, index) => (
                                <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                                    <div className="w-32 h-32 rounded-full p-1 border-2 border-blue-500 mb-4">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 relative">
                                            {person.image ? (
                                                <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                                            ) : (
                                                // Default Avatar
                                                <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>

                                    <h4 className="text-xl font-bold text-gray-900">{person.name}</h4>
                                    <p className="text-gray-500 mb-4">{person.branch} • {person.year}</p>

                                    <div className="flex gap-2 mb-6 flex-wrap justify-center">
                                        {person.skills && person.skills.map((skill: string, idx: number) => (
                                            <span key={idx} className="px-4 py-1 bg-blue-500 text-white text-sm rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <ConnectionButton email={person.email} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={40} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No {mode === 'mentor' ? 'Mentors' : 'Juniors'} Found</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                {mode === 'mentor'
                                    ? "We couldn't find any seniors matching your criteria. Try adjusting your filters or check back later."
                                    : "We couldn't find any juniors at the moment. More students will join soon!"}
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {data.length > 0 && (
                        <div className="flex justify-center items-center gap-4 mt-12 text-gray-500 font-medium">
                            <span className="text-blue-600 font-bold">1</span>
                            <ChevronDown size={16} className="text-gray-400" />
                            <button className="text-blue-600 hover:underline ml-4">Next</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Helper component for connection button
const ConnectionButton = ({ email }: { email: string }) => {
    const { sendRequest, getConnectionStatus } = useConnection();
    const status = getConnectionStatus(email);

    const getButtonConfig = () => {
        switch (status) {
            case 'connected':
                return {
                    text: 'Message',
                    className: 'bg-green-600 hover:bg-green-700 text-white',
                    disabled: false,
                    onClick: () => alert('Messaging feature coming soon!')
                };
            case 'pending_sent':
                return {
                    text: 'Requested',
                    className: 'bg-gray-200 text-gray-500 cursor-not-allowed',
                    disabled: true,
                    onClick: () => { }
                };
            case 'pending_received':
                return {
                    text: 'Accept Request',
                    className: 'bg-blue-600 hover:bg-blue-700 text-white',
                    disabled: false,
                    onClick: () => alert('Please check your notifications to accept.')
                };
            default:
                return {
                    text: 'Connect',
                    className: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 shadow-lg',
                    disabled: false,
                    onClick: () => sendRequest(email)
                };
        }
    };

    const config = getButtonConfig();

    return (
        <button
            onClick={config.onClick}
            disabled={config.disabled}
            className={`w-full py-3 rounded-full font-semibold text-lg transition-colors ${config.className}`}
        >
            {config.text}
        </button>
    );
};

export default FindMentorModal;
