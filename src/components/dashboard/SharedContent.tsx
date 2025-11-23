import React from 'react';
import { FileText } from 'lucide-react';

const SharedContent = () => {
    const content = [
        { id: 1, title: 'Data Structures Final', author: 'Senior Aarna P.', type: 'PDF Document', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
        { id: 2, title: 'Sets & Relations Final Prep', author: 'Senior Aarav P.', type: 'PDF Document', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
        { id: 3, title: 'Data Structures', author: 'Shams S.', type: 'PDF Document', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Content Shared by My Seniors</h3>
            <p className="text-gray-500 text-sm mb-6">Access your course material or shared notes.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {content.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <img src={item.image} alt={item.author} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm truncate">{item.title}</h4>
                            <p className="text-xs text-gray-500 truncate">by {item.author}</p>
                            <p className="text-xs text-gray-400 mt-1">{item.type}</p>
                        </div>
                        {item.id === 3 && (
                            <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1 px-3 rounded transition-colors">
                                View Content
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SharedContent;
