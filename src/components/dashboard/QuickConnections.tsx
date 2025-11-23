"use client";
import React, { useState } from 'react';
import { GraduationCap, UserPlus } from 'lucide-react';
import FindMentorModal from '../modals/FindMentorModal';

const QuickConnections = () => {
    const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'mentor' | 'mentee'>('mentor');

    const openModal = (mode: 'mentor' | 'mentee') => {
        setModalMode(mode);
        setIsMentorModalOpen(true);
    };

    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Quick Connections</h3>
                <p className="text-gray-500 text-sm mb-6">Connect with Seniors or find guidance.</p>

                <div className="flex gap-4">
                    <button
                        onClick={() => openModal('mentor')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                    >
                        <GraduationCap size={20} />
                        Find a Senior (Mentor)
                    </button>
                    <button
                        onClick={() => openModal('mentee')}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                    >
                        <UserPlus size={20} />
                        Connect with Juniors
                    </button>
                </div>
            </div>

            <FindMentorModal
                isOpen={isMentorModalOpen}
                onClose={() => setIsMentorModalOpen(false)}
                mode={modalMode}
            />
        </>
    );
};

export default QuickConnections;
