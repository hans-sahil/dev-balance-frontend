import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PriorityTagProps {
  priority: 'low' | 'medium' | 'high';
}

const PriorityTag: React.FC<PriorityTagProps> = ({ priority }) => {
  const getIcon = () => {
    switch (priority) {
      case 'high':
        return (
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute top-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <span className="font-semibold text-red-700">URGENT</span>
          </div>
        );
      case 'medium':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="font-medium text-yellow-700">MEDIUM</span>
          </div>
        );
      case 'low':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-medium text-green-700">LOW</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getBadgeVariant = () => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100';
      case 'low':
        return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Badge className={`${getBadgeVariant()} border transition-colors cursor-default`}>
      {getIcon()}
    </Badge>
  );
};

export default PriorityTag;
