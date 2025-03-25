import React from 'react';

export default function MetricBox({ icon, title, value, subtext, footer }) {
  return (
    <div className="p-3 flex flex-col">
      <div className="flex items-center gap-2 mb-1 text-gray-400">
        {icon}
        <span className="text-sm">{title}</span>
      </div>
      
      <div className="flex items-baseline mb-1">
        <span className="text-xl font-bold">{value}</span>
        {subtext && <span className="ml-1">{subtext}</span>}
      </div>
      
      {footer && <div className="mt-auto">{footer}</div>}
    </div>
  );
}