import React from 'react';

export default function ClientStatCard({ icon, value, label, gradient }) {
  return (
    <div className="bg-gray-900 rounded-xl p-5 text-white border border-gray-700 hover:border-blue-500 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${gradient}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
      </div>
      
      {/* Progress indicator (small line) */}
      <div className="mt-4 w-full bg-gray-700 rounded-full h-1 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${gradient}`}
          style={{ width: '100%' }}
        ></div>
      </div>
    </div>
  );
}