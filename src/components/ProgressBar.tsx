'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  className?: string;
}

export default function ProgressBar({ current, total, label, className = '' }: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-500">{current}/{total}</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 ease-out rounded-full flex items-center justify-end pr-1"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 15 && (
            <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
          )}
        </div>
      </div>
      {percentage > 0 && (
        <div className="text-right mt-1">
          <span className="text-xs text-gray-500">{Math.round(percentage)}% complete</span>
        </div>
      )}
    </div>
  );
}
