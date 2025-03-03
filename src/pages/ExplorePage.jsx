import React, { useState } from 'react'
import { Menu, X } from 'lucide-react';
import ProfileCard from '../Components/ProfileCard';
import { profiles } from '../Data/profile';


export default function ExplorePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <div className='flex sm:flex-row w-full h-full sm:pl-20 p-0'>
      {/* Mobile Toggle Button */}
      <div className="sm:hidden fixed top-3 right-7 z-50">
        {!isMobileMenuOpen ? (
          <Menu onClick={toggleMobileMenu} className="text-blue-500 cursor-pointer" size={28} />
        ) : (
          <X onClick={toggleMobileMenu} className="text-blue-500 cursor-pointer" size={28} />
        )}
      </div>

      {/* sidebar */}
      <div className={`fixed left sm:w-1/7 h-screen bg-blue-500 flex flex-col p-2 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-0.5'}`}>
        <nav className=''>
          <li className='cursor-pointer my-4 bg-green-300 rounded-xl w-fit px-2'>Pool</li>
          <li className='cursor-pointer my-4 bg-green-300 rounded-xl w-fit px-2'>Stories</li>
        </nav>
      </div>

      <div className="right sm:w-6/7 pl-5">
        <div className="top header sm:h-24 h-12 bg-amber-400 text-center">
          Ads or images here
        </div>
        <div className="down">
          <div className="filters bg-gray-400 w-ful l h-15 text-center">
              Filters here
          </div>
          <div className="cards">
            {profiles.map((project, index) => (
                                    <ProfileCard key={index} {...project} />
                                ))}
            
          </div>
        </div>
      </div>
    </div>
  )
}
