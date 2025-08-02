import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, to, color }) => {
  return (
    <Link to={to} className="group">
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${color}`}>
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
          <span>Get Started</span>
          <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;