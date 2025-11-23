import React from 'react';
import { HelpCircle, Wand2 } from 'lucide-react';

const QuizPractice = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Quiz & Practice</h3>
            <p className="text-gray-500 text-sm mb-6">Test your knowledge based a course material or shared notes.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg flex items-center justify-center gap-3 font-medium text-lg transition-colors">
                        <HelpCircle size={24} />
                        Take a Quiz
                    </button>
                    <p className="text-center text-xs text-gray-500">Attempt quizzes on various subjects</p>
                </div>

                <div className="flex flex-col gap-2">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg flex items-center justify-center gap-3 font-medium text-lg transition-colors">
                        <Wand2 size={24} />
                        Generate a Custom Quiz
                    </button>
                    <p className="text-center text-xs text-gray-500">Create quizzes from shared notes or specific topics</p>
                </div>
            </div>
        </div>
    );
};

export default QuizPractice;
