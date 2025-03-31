import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ServiceCard = ({ name, desc, image }) => {
  const colors = [
    "bg-gradient-to-br from-purple-600 to-blue-500",
    "bg-gradient-to-br from-rose-600 to-pink-500",
    "bg-gradient-to-br from-emerald-600 to-teal-500",
    "bg-gradient-to-br from-amber-600 to-orange-500",
    "bg-gradient-to-br from-indigo-600 to-violet-500",
    "bg-gradient-to-br from-cyan-600 to-blue-500",
    "bg-gradient-to-br from-lime-600 to-green-500",
    "bg-gradient-to-br from-red-600 to-rose-500",
    "bg-gradient-to-br from-sky-600 to-blue-400",
    "bg-gradient-to-br from-fuchsia-600 to-purple-500",
  ];

  const [bgCol, setBgCol] = useState("");

  useEffect(() => {
    let newCol;
    let prevCol;
    do {
      newCol = colors[Math.floor(Math.random() * colors.length)];
    } while (newCol === prevCol);
    setBgCol(newCol);
  }, []);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`min-w-[220px] md:w-[260px] h-[320px] flex flex-col ${bgCol} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}
    >
      {image && (
        <div className="w-full h-[140px] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col justify-center text-white">
        <h3 className="text-xl font-bold mb-3 text-center">{name}</h3>
        <p className="text-sm text-center opacity-90">{desc}</p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
