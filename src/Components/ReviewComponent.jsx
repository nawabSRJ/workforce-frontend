import React from 'react'
import { motion } from 'framer-motion'
// import pic from '../assets/profilePic1.webp'

const ReviewComponent = ({name,text,profilePic}) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      className="w-[300px] sm:w-[350px] flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden border border-white/20 backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img src={profilePic} className="w-full h-full object-cover" alt="Profile" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{name}</h3>
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-600 italic">
          {text}
        </p>
      </div>
    </motion.div>
  )
}

export default ReviewComponent