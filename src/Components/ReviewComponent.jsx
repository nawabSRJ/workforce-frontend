import React from 'react'
import pic from '../assets/profilePic1.webp'

export default function ReviewComponent() {
    return (
        <div className='border-black border-2 p-3 flex flex-col sm:flex-row items-center w-full sm:w-[45%] md:w-[30%] rounded-xl bg-[#FEFEFF] shadow-md'>
            
            {/* Profile Image */}
            <div className='w-[60px] h-[60px] mb-3 sm:mb-0 sm:mr-4 bg-slate-500 rounded-full flex-shrink-0'>
                <img src={pic} className='w-full h-full object-cover rounded-full' />
            </div>

            {/* Review Content */}
            <div className='text-center sm:text-left flex-1'>
                <h1 className='font-bold text-lg'>Name</h1>
                <p className='text-sm text-gray-700 leading-tight'>
                    It was a fantastic experience using WorkForce! Highly recommended for professionals!
                </p>
            </div>
        </div>
    )
}
