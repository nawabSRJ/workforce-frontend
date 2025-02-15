import React from 'react';
// small change

export default function ServiceCard({name , desc}) {
  return (
    <div className='w-full h-[95%] sm:w-[170px] sm:h-[150px] rounded-md p-4 sm:px-3 sm:py-2 flex flex-col bg-green-300 mx-2'>
      <h1 className='card-heading text-left text-black font-semibold text-md'>
        {name}
      </h1>
      <p className='text-wrap text-sm mt-2'>
        {desc}
      </p>
    </div>
  );
}