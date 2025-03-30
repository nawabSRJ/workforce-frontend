import React from 'react'; import ServiceCard from '../Components/ServiceCard'; import Navbar from '../Components/Navbar'; import exploreVideo from '../assets/exploreVideo.mp4'; import arrow1 from '../assets/arrow.webp'; import ReviewComponent from '../Components/ReviewComponent'; import Footer from '../Components/Footer'; import FAQ from '../Components/faq'; import { services } from '../Data/Services'; import { Link } from 'react-router-dom';

export default function Home() { return ( <> {/* Navbar */} <Navbar />

{/* Hero Section */}
        <section className='hero w-full h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-5'>
            <h1 className='text-xl sm:text-3xl font-light tracking-widest'>Hire the Best Professionals</h1>
            <h1 className='text-3xl sm:text-6xl font-extrabold my-3'>Get the Job <span className='text-purple-400'>DONE ASAP</span></h1>
            <p className='text-md sm:text-lg font-serif w-full sm:w-2/3 mx-auto mt-4 opacity-80'>
                At <b className='text-purple-400'>WorkForce</b>, we revolutionize the gig economy by connecting you with skilled professionals seamlessly and efficiently.
            </p>
            
            <div className='flex flex-row gap-4 mt-6'>
                <Link to="/get-started">
                    <button className='bg-purple-600 hover:bg-purple-700 transition-all text-white text-lg px-6 py-3 rounded-full shadow-lg'>
                        Get Started
                    </button>
                </Link>
                <Link to="/contact">
                    <button className='border border-purple-400 hover:bg-purple-500 hover:text-white transition-all text-lg px-6 py-3 rounded-full shadow-lg'>
                        Contact Us
                    </button>
                </Link>
            </div>
        </section>
        
        {/* Service Cards Section */}
        <section className='our-services-section w-full h-fit py-10 bg-gray-900 text-white'>
            <h2 className='text-3xl font-semibold text-center mb-8'>Our Services</h2>
            <div className='services-marquee overflow-x-auto whitespace-nowrap flex gap-6 p-5'>
                {services.map((v, i) => (
                    <ServiceCard key={i} name={v.serviceName} desc={v.serviceDesc} image={v.image} />
                ))}
            </div>
        </section>
        
        {/* Video Section */}
        <section className='vid-section w-full sm:h-[500px] bg-gradient-to-r from-gray-800 to-gray-900 flex flex-col sm:flex-row px-10 py-20 text-white'>
            <div className='w-full sm:w-1/2 flex flex-col justify-center'>
                <h2 className='text-4xl font-bold mb-4'>Explore Our World</h2>
                <p className='text-lg opacity-80'>
                    Discover how WorkForce is transforming the freelancing industry and contractual work culture across the nation. Watch now to see the magic unfold.
                </p>
            </div>
            <div className='w-full sm:w-1/2 flex justify-center'>
                <video src={exploreVideo} controls className='w-full sm:w-3/4 rounded-xl shadow-lg' />
            </div>
        </section>
        
        {/* Testimonials */}
        <section className='testimonial-section w-full py-16 bg-gray-900 text-white'>
            <h2 className='text-3xl text-center font-semibold mb-6'>Our Happy Customers</h2>
            <div className='reviews-div flex flex-wrap justify-center gap-6'>
                <ReviewComponent />
            </div>
        </section>
        
        {/* FAQ and Footer */}
        <FAQ />
        <Footer />
    </>
);

}