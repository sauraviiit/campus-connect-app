import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
    return (
        <div className="bg-gray-50 p-8 rounded-2xl flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-default border border-gray-100">
            <div className="mb-4 text-blue-600">
                <Icon size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                {description}
            </p>
        </div>
    );
};

export default FeatureCard;
