import React from 'react'; import ServiceCard from '../Components/ServiceCard'; import Navbar from '../Components/Navbar'; import exploreVideo from '../assets/exploreVideo.mp4'; import arrow1 from '../assets/arrow.webp'; import ReviewComponent from '../Components/ReviewComponent'; import Footer from '../Components/Footer'; import FAQ from '../Components/faq'; import { services } from '../Data/Services'; import { Link } from 'react-router-dom';

export default function Home() { return ( <div className='bg-[#0D0D0D] text-white font-sans'> {/* Navbar */} <Navbar />

{/* Hero Section */}
        <section className='hero w-full h-screen flex flex-col justify-center items-center text-center px-5'>
            <h1 className='text-2xl sm:text-4xl font-light tracking-wider'>Hire the Best Professionals</h1>
            <h1 className='text-4xl sm:text-6xl font-extrabold mt-2 gradient-text'>Get the Job DONE ASAP</h1>
            <p className='text-lg sm:text-xl font-light mt-4 sm:w-2/3'>
                At <b>WorkForce</b>, we revolutionize the gig economy by connecting you with skilled professionals seamlessly and efficiently.
            </p>
            <div className='flex gap-5 mt-6'>
                <Link to="/get-started">
                    <button className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-lg font-medium hover:opacity-90 transition'>Get Started</button>
                </Link>
                <Link to="/contact">
                    <button className='px-6 py-3 border border-white rounded-full text-lg font-medium hover:bg-white hover:text-black transition'>Contact Us</button>
                </Link>
            </div>
        </section>

        {/* Service Cards Section */}
        <section className='py-20'>
            <h2 className='text-center text-3xl font-semibold mb-10'>Our Services</h2>
            <div className='flex overflow-x-auto space-x-5 px-5 scrollbar-hide'>
                {services.map((v, i) => (
                    <ServiceCard key={i} name={v.serviceName} desc={v.serviceDesc} image={v.image} />
                ))}
            </div>
        </section>

        {/* Video Section */}
        <section className='flex flex-col sm:flex-row items-center bg-gray-900 px-10 py-16'>
            <div className='sm:w-1/2 text-center sm:text-left'>
                <h2 className='text-4xl font-bold mb-4'>Discover Our World</h2>
                <p className='text-lg font-light mb-5'>See how we are transforming freelancing and contract work nationwide.</p>
                <img src={arrow1} alt='arrow' className='hidden sm:block w-32' />
            </div>
            <div className='sm:w-1/2'>
                <video src={exploreVideo} controls className='rounded-xl w-full' />
            </div>
        </section>

        {/* Testimonials */}
        <section className='py-20 bg-gray-800'>
            <h2 className='text-center text-3xl font-semibold mb-10'>Our Happy Customers</h2>
            <div className='flex flex-wrap justify-center gap-6 px-5'>
                <ReviewComponent />
                <ReviewComponent />
                <ReviewComponent />
            </div>
        </section>

        {/* FAQ & Footer */}
        <FAQ />
        <Footer />
    </div>
);

}