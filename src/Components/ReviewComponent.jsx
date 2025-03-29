import React from 'react'
import pic from '../assets/profilePic1.webp'

export default function ReviewComponent() {
    const reviews = [
        {
            name: "Priya Sharma",
            text: "WorkForce has completely transformed the way we manage our projects! The interface is user-friendly, and tracking progress has never been this easy. Highly recommend!"
        },
        {
            name: "Rohit Mehta",
            text: "Using WorkForce has been a fantastic experience! The seamless collaboration tools and real-time updates keep our team productive and on track."
        },
        {
            name: "Ananya Verma",
            text: "I was skeptical at first, but WorkForce exceeded my expectations! The automation features save us so much time, and the customer support is top-notch!"
        },
        {
            name: "Vikram Joshi",
            text: "WorkForce has streamlined our workflow effortlessly. The analytics and reporting tools provide valuable insights that help us make better decisions."
        },
        {
            name: "Sneha Kapoor",
            text: "A game-changer for our team! The intuitive design and efficiency of WorkForce have made our daily operations smoother and more organized."
        },
        {
            name: "Arjun Malhotra",
            text: "I’ve tried multiple platforms, but WorkForce stands out in terms of performance and ease of use. A must-have tool for growing businesses!"
        }
    ];

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {reviews.slice(0, 6).map((review, index) => ( // Limiting to 6 reviews
                <div key={index} className='border-black border-2 p-3 flex items-start rounded-xl bg-purple-200 shadow-md'>
                    <div className='w-[60px] h-[60px] mr-4'>
                        <img src={pic} className='w-full h-full rounded-full object-cover' />
                    </div>
                    <div className='w-full'>
                        <h1 className='font-bold text-lg text-gray-900'>{review.name}</h1>
                        <p className='font-medium text-sm text-gray-700'>{review.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}