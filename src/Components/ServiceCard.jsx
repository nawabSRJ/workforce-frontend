import React from "react";

export default function ServiceCard({ name, desc, image }) {
  return (
    <div className="w-[220px] min-h-[280px] flex flex-col items-center bg-green-100 shadow-md hover:shadow-lg transition-all duration-300 border border-green-500 rounded-lg overflow-hidden p-4">
      
      {/* Service Image */}
      {image && (
        <div className="w-full h-[120px] overflow-hidden rounded-md">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Service Details */}
      <h1 className="text-center text-green-900 font-semibold text-lg mt-3 break-words leading-tight">
        {name}
      </h1>
      <p className="text-center text-green-700 text-sm mt-2 px-3 break-words whitespace-normal">
        {desc}
      </p>
    </div>
  );
}
