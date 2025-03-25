import React from 'react';
import MetricBox from './MetricBox';
import { FaStar, FaCheck, FaClock } from 'react-icons/fa';

export default function MetricsSection({ rating, completionRate, responseTime }) {
  return (
    <div className="bg-black rounded-xl p-4 text-white">
      <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricBox 
          icon={<FaStar className="text-yellow-400" />}
          title="Rating"
          value={rating.toFixed(2)}
          subtext={<span className="text-xs text-gray-400">/ 5</span>}
          footer={<span className="text-xs text-gray-400">{`${0} reviews`}</span>}
        />
        
        <MetricBox 
          icon={<FaCheck className="text-green-400" />}
          title="Completion Rate"
          value={`${completionRate}%`}
          footer={<span className="text-xs text-gray-400">On-time delivery</span>}
        />
        
        <MetricBox 
          icon={<FaClock className="text-blue-400" />}
          title="Response Time"
          value={responseTime}
          footer={<span className="text-xs text-gray-400">Average</span>}
        />
      </div>
    </div>
  );
}