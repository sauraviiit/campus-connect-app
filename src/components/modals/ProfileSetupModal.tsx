"use client";
import React, { useState, useEffect } from 'react';
import { User, Upload, MoreVertical, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProfileSetupModalProps {
    isOpen: boolean;
    initialData: { name: string; email: string; password?: string };
}

const ProfileSetupModal = ({ isOpen, initialData }: ProfileSetupModalProps) => {
    const router = useRouter();
    const { signup } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        branch: '',
        year: '1st Year',
        about: '',
        skills: [] as string[],
        skillInput: '',
        linkedin: '',
        mentorship: true,
    });

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const handleAddSkill = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && formData.skillInput.trim()) {
            e.preventDefault();
            if (!formData.skills.includes(formData.skillInput.trim())) {
                setFormData({
                    ...formData,
                    skills: [...formData.skills, formData.skillInput.trim()],
                    skillInput: '',
                });
            }
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter(skill => skill !== skillToRemove),
        });
    };

    const handleSave = async () => {
        if (!initialData.password) return;

        if (!formData.branch.trim()) {
            alert("Please enter your Branch / Department");
            return;
        }
        if (!formData.year) {
            alert("Please select your Current Status (Year)");
            return;
        }

        setIsLoading(true);
        try {
            await signup({
                name: initialData.name,
                email: initialData.email,
                password: initialData.password,
                branch: formData.branch,
                year: formData.year,
                about: formData.about,
                skills: formData.skills,
                linkedin: formData.linkedin,
                mentorship: formData.mentorship
            });
            router.push('/dashboard');
        } catch (error) {
            console.error("Signup failed", error);
            alert("Signup failed. User might already exist.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto py-10">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 relative my-auto">

                <div className="flex items-center gap-2 mb-6">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        C
                    </div>
                    <span className="font-bold text-gray-800">Campus Connect</span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-6">My Profile</h2>

                {/* Avatar Upload */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2 overflow-hidden">
                        <User size={48} className="text-gray-400" />
                    </div>
                    <button className="text-blue-500 text-sm font-medium hover:underline">
                        Upload Photo
                    </button>
                </div>

                <div className="space-y-5">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={initialData.name}
                            readOnly
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* Branch */}
                    <div>
                        <input
                            type="text"
                            placeholder="Your Branch / Department"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            value={formData.branch}
                            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        />
                    </div>

                    {/* Year Selection */}
                    <div className="border border-gray-200 rounded-xl p-1">
                        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 mb-1">
                            <span className="text-sm font-medium text-gray-700">Your Current Status</span>
                            <MoreVertical size={16} className="text-gray-400" />
                        </div>
                        <div className="flex justify-between px-2 pb-1">
                            {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Alumni'].map((year) => (
                                <button
                                    key={year}
                                    onClick={() => setFormData({ ...formData, year })}
                                    className={`text-xs px-2 py-1 rounded-md transition-colors ${formData.year === year
                                        ? 'bg-gray-100 text-gray-900 font-medium'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="text-xs text-gray-400">This determines your peer relations on the platform</p>

                    {/* About Me */}
                    <textarea
                        placeholder="About Me (Optional)"
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                        value={formData.about}
                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    />

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Skills & Interests</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {formData.skills.map((skill) => (
                                <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center gap-1">
                                    {skill}
                                    <button onClick={() => removeSkill(skill)} className="hover:text-blue-900">
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Type skill and press Enter"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            value={formData.skillInput}
                            onChange={(e) => setFormData({ ...formData, skillInput: e.target.value })}
                            onKeyDown={handleAddSkill}
                        />
                    </div>

                    {/* LinkedIn */}
                    <input
                        type="text"
                        placeholder="Linkedin Profile URL (Optional)"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    />

                    {/* Mentorship Toggle */}
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <h4 className="font-medium text-gray-900">Open to receiving Mentorship Requests?</h4>
                            <p className="text-xs text-gray-400 mt-1">Enable this if you're willing to guide juniors</p>
                        </div>
                        <button
                            onClick={() => setFormData({ ...formData, mentorship: !formData.mentorship })}
                            className={`w-12 h-6 rounded-full transition-colors relative ${formData.mentorship ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${formData.mentorship ? 'left-6.5' : 'left-0.5'
                                }`} />
                        </button>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] mt-4 disabled:opacity-70"
                    >
                        {isLoading ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetupModal;
