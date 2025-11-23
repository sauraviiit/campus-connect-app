"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, MessageSquare, HelpCircle, Settings, GraduationCap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Sidebar = () => {
    const { user } = useAuth();
    const pathname = usePathname();

    const menuItems = [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
        { icon: Users, label: 'My Mentors (Seniors)', path: '/dashboard/mentors' },
        { icon: Users, label: 'My Mentees (Juniors)', path: '/dashboard/mentees' },
        { icon: FileText, label: 'Shared Content', path: '/dashboard/content' },
        { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages' },
        { icon: HelpCircle, label: 'Quiz Zone', path: '/dashboard/quiz' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    return (
        <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 flex flex-col font-sans">
            <div className="p-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    C
                </div>
                <span className="text-xl font-bold text-gray-800">Campus Connect</span>
            </div>

            <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Hello, {user?.name?.split(' ')[0] || 'User'}!</h2>
                <div className="mt-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="text-sm text-gray-600 font-mono">Student</span>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1">
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.path;
                        return (
                            <li key={index}>
                                <Link
                                    href={item.path}
                                    className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive
                                        ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
