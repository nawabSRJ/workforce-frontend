import React from 'react'
import SocialCard from '../Components/ServiceCard'
import Logo from '../Components/Logo'


export default function Footer() {
  return (
    <footer className='footer relative bottom-0 bg-[#F5F3ED] p-5 pb-5'>
      <div className='foot-left flex flex-col pt-5 pl-10'>
        {/* <a className='text-3xl text-black'>WorkForce</a> */}
        <Logo/>
        <div className='foot-links flex sm:flex-row flex-col p-5 justify-between text-xl'>
          <div className='flex sm:flex-row flex-col'>

            <div className='flex flex-col p-4 sm:mx-5 mx-auto'><h2 className='font-bold text-2xl mb-3'>Company</h2>
              <a className='my-1 hover:text-green-900' href="">About Us</a>
              <a className='my-1 hover:text-green-900' href="">For Business</a>
              <a className='my-1 hover:text-green-900' href="">For Customers</a>
            </div>
            <div className='flex flex-col p-4 sm:mx-5 sm:ml-20 mx-auto'>
              <h2 className='font-bold text-2xl mb-3'>Resources</h2>
              <a className='my-1 hover:text-green-900' href="">Documentation</a>
              <a className='my-1 hover:text-green-900' href="">Pricing</a>
              <a className='my-1 hover:text-green-900' href="">Admin Login</a>
            </div>
          </div>
          <div className='w-1/3 '>

            <div className='foot-address p-5 bg-green-900 rounded-xl text-white w-1/1 '>
              <h2 className=' font-bold '>Address</h2>
              <p>Write down the address here :) </p>

              <h2 className='font-white font-bold my-2'>Email</h2>
              <p className='mb-5'>info@workforce.in</p>

              
              <SocialCard/>
            </div>
          </div>
          {/* set a dark bg color which is your primary color */}
        </div>
      </div>
      <div className='foot-right'></div>
    </footer>
  )
}