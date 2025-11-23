import React from 'react';

const RecentInteractions = () => {
    const interactions = [
        { id: 1, role: 'Senior', name: 'Senior id name' },
        { id: 2, role: 'Junior', name: 'junior id name' },
        { id: 3, role: 'Senior', name: 'Senior id name' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Recent Interactions</h3>
            <p className="text-gray-500 text-sm mb-6">Catch up on recent messages or shared content.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {interactions.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer h-32">
                        <h4 className="font-serif text-lg font-medium text-gray-900">{item.name}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentInteractions;
