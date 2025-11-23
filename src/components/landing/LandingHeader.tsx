import React from 'react';
import Link from 'next/link';

interface LandingHeaderProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
}

const LandingHeader = ({ onLoginClick, onSignupClick }: LandingHeaderProps) => {
    return (
        <header className="h-20 bg-white flex items-center justify-between px-8 md:px-16 fixed top-0 left-0 right-0 z-50 shadow-sm">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    C
                </div>
                <span className="text-xl font-bold text-gray-900">Campus Connect</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium">Contact</Link>
            </nav>

            <div className="flex items-center gap-4">
                <button
                    onClick={onLoginClick}
                    className="px-6 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                    Login
                </button>
                <button
                    onClick={onSignupClick}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                >
                    Sign Up
                </button>
            </div>
        </header>
    );
};

export default LandingHeader;
