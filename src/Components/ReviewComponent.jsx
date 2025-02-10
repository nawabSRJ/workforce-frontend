import React from 'react'
import pic from '../assets/profilePic1.webp'
export default function ReviewComponent() {
    return (
        <div className='border-black border-2 p-1 flex flex-row w-[30%] rounded-xl bg-[#FEFEFF]'>
            <div className='pic w-[60px] h-[60px] ml-1 mr-4 mt-1 bg-slate-500 rounded-full'>
                    <img src={pic} className='w-1/1 h-1/1'/>
            </div>
            <div className='matter w-[70%]'>
                    <h1 className='font-bold '>Name</h1>
                    <p className='font-semibold '>It was a fantastic experience using the WorkForce!!It was a fantastic experience using the WorkForce!!It was a fantastic experience using the WorkForce!!</p>
            </div>
        </div>
    )
}