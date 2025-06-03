import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
}) => {
  const colorStyles = {
    blue: {
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-500',
      text: 'text-blue-600',
    },
    green: {
      bg: 'bg-green-50',
      iconBg: 'bg-green-500',
      text: 'text-green-600',
    },
    purple: {
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-500',
      text: 'text-purple-600',
    },
    yellow: {
      bg: 'bg-amber-50',
      iconBg: 'bg-amber-500',
      text: 'text-amber-600',
    },
    red: {
      bg: 'bg-red-50',
      iconBg: 'bg-red-500',
      text: 'text-red-600',
    },
  };

  const currentColor = colorStyles[color];

  return (
    <div className={`p-6 rounded-lg border border-gray-200 ${currentColor.bg}`}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-gray-600 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${currentColor.iconBg}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center">
          <span
            className={`text-sm font-medium ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.isPositive ? '+' : '-'}{trend.value}
          </span>
          <span className="text-xs text-gray-500 ml-1">so với tháng trước</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard; 