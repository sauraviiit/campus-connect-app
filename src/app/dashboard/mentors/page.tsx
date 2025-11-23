"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useConnection } from '@/context/ConnectionContext';
import { Search, MessageCircle, User } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

const MentorsPage = () => {
    const { user } = useAuth();
    const { connections } = useConnection();
    const [mentors, setMentors] = useState<any[]>([]);

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
        if (user && connections.length > 0) {
            const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const currentUserYear = getYearValue(user.year || '');

            const myConnections = connections.map(c => {
                const otherEmail = c.user1 === user.email ? c.user2 : c.user1;
                return allUsers.find((u: any) => u.email === otherEmail);
            }).filter(Boolean);

            // Filter for mentors (seniors)
            const myMentors = myConnections.filter((u: any) => {
                const otherYear = getYearValue(u.year || '');
                return otherYear > currentUserYear;
            });

            setMentors(myMentors);
        }
    }, [user, connections]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <Header />

            <main className="pl-64 pt-16 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Mentors</h1>
                            <p className="text-gray-500">Connect and learn from your seniors</p>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search mentors..."
                                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {mentors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mentors.map((mentor) => (
                                <div key={mentor.email} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                                    <div className="w-24 h-24 rounded-full p-1 border-2 border-blue-500 mb-4">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 relative">
                                            {mentor.image ? (
                                                <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-2xl">
                                                    {mentor.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                                    <p className="text-sm text-gray-500 mb-1">{mentor.branch} • {mentor.year}</p>

                                    <div className="flex gap-2 mb-6 flex-wrap justify-center mt-2">
                                        {mentor.skills && mentor.skills.slice(0, 3).map((skill: string, idx: number) => (
                                            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href="/dashboard/messages"
                                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <MessageCircle size={18} />
                                        Message
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <User size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Mentors Yet</h3>
                            <p className="text-gray-500 max-w-md mx-auto mb-8">
                                You haven't connected with any seniors yet. Use the "Find a Senior" feature to start building your network.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MentorsPage;
