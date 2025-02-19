import React, { useEffect, useState } from "react";

export default function ServiceCard({ name, desc, image }) {
  const colors = ["bg-red-800", "bg-blue-700", "bg-rose-600", "bg-purple-800", "bg-pink-800", "bg-green-800","bg-teal-700","bg-amber-600", "bg-fuchsia-600", "bg-sky-600"];
  const [bgCol,setBgCol] = useState("");
  
  useEffect(()=>{
    let newCol;
    let prevCol;
    // pick until new color
    do{
      newCol = colors[Math.floor(Math.random() * colors.length)]
    }while(newCol===prevCol);
    setBgCol(newCol)
  },[])
  
  return (
    <div className={`w-[180px] sm:w-[220px] min-h-[240px] sm:min-h-[280px] flex flex-col items-center ${bgCol} shadow-md hover:shadow-lg transition-all duration-300 border border-green-500 rounded-lg overflow-hidden p-3`}>
      
      {/* Service Image */}
      {image && (
        <div className="w-full h-[100px] sm:h-[120px] overflow-hidden rounded-md">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Service Details */}
      <h1 className="text-center text-white font-semibold text-md sm:text-lg mt-3 break-words leading-tight">
        {name}
      </h1>
      <p className="text-center text-white text-xs sm:text-sm mt-2 px-2 break-words whitespace-normal">
        {desc}
      </p>
    </div>
  );
}