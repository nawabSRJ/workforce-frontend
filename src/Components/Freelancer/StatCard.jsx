import React from 'react';

export default function StatCard({ icon, value, label, gradient, progressValue, progressColor }) {
  return (
    <div className="bg-black rounded-xl p-4 text-white">
      <div className="flex items-start gap-2 mb-4">
        <div className={`flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-r ${gradient} text-white font-bold`}>
          {icon}
        </div>
        <div>
          <p className="text-lg font-bold">{value}</p>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${progressColor}`} 
          style={{ width: `${progressValue}%` }}
        ></div>
      </div>
    </div>
  );
}