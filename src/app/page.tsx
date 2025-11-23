"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Handshake, Layers, BrainCircuit } from 'lucide-react';
import LandingHeader from '@/components/landing/LandingHeader';
import FeatureCard from '@/components/landing/FeatureCard';
import SignupModal from '@/components/modals/SignupModal';
import ProfileSetupModal from '@/components/modals/ProfileSetupModal';

import LoginModal from '@/components/modals/LoginModal';

export default function LandingPage() {
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showProfileSetup, setShowProfileSetup] = useState(false);
    const [userData, setUserData] = useState({ name: '', email: '' });

    const handleSignupNext = (data: { name: string; email: string }) => {
        setUserData(data);
        setShowSignup(false);
        setShowProfileSetup(true);
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            <LandingHeader
                onLoginClick={() => setShowLogin(true)}
                onSignupClick={() => setShowSignup(true)}
            />

            <main className="pt-32 pb-16 px-4 flex flex-col items-center">
                {/* Hero Section */}
                <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <FeatureCard
                        icon={Handshake}
                        title="Find Mentors:"
                        description="Get guidance from seniors in your branch."
                    />
                    <FeatureCard
                        icon={Layers}
                        title="Share & Learn:"
                        description="Access valuable notes and resources."
                    />
                    <FeatureCard
                        icon={BrainCircuit}
                        title="Test Your Knowledge:"
                        description="Generate quizzes and prepare for exams."
                    />
                </div>

                {/* CTA Section */}
                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={() => setShowSignup(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-4 px-12 rounded-xl shadow-lg shadow-blue-200 transition-transform hover:scale-105"
                    >
                        Create an Account
                    </button>
                    <div className="flex items-center gap-1 text-lg">
                        <span className="text-blue-400">Already have account?</span>
                        <button
                            onClick={() => setShowLogin(true)}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </main>

            <SignupModal
                isOpen={showSignup}
                onClose={() => setShowSignup(false)}
                onNext={handleSignupNext}
            />

            <ProfileSetupModal
                isOpen={showProfileSetup}
                initialData={userData}
            />

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
                onSwitchToSignup={() => {
                    setShowLogin(false);
                    setShowSignup(true);
                }}
            />
        </div>
    );
}
