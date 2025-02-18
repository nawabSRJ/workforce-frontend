import React from 'react';
import ServiceCard from '../Components/ServiceCard';
import Navbar from '../Components/Navbar';
import exploreVideo from '../assets/exploreVideo.mp4';
import arrow1 from '../assets/arrow.webp';
import ReviewComponent from '../Components/ReviewComponent';
import Footer from '../Components/Footer';
import FAQ from '../Components/faq';
import { services } from '../Data/Services';

export default function Home() {
    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className='hero w-full h-fit mt-10 px-5 text-center'>
                <h1 className='text-xl sm:text-3xl font-thin'>
                    Hire the Best Professionals
                </h1>
                <h1 className='text-2xl sm:text-5xl my-3 font-bold'>
                    Get the Job DONE ASAP
                </h1>
                <p className='info text-md font-serif w-full sm:w-[55%] mx-auto mt-7 text-wrap'>
                    At <b>WorkForce</b>, we are revolutionizing the contract-based gig worker industry with a platform to connect you with skilled professionals.
                </p>

                {/* Buttons */}
                <div className='heroBtns mx-auto text-center my-7 flex flex-wrap justify-center gap-4'>
                    <button className='bg-black text-white text-xl px-4 py-2 rounded-full'>
                        Get Started
                    </button>
                    <button className='bg-black text-white text-xl px-4 py-2 rounded-full'>
                        Contact Us
                    </button>
                </div>
            </section>

            {/* Services Section */}
            <section className='our-services-section w-full h-fit bg-gray-100 py-10'>
                <h2 className='text-2xl text-center font-semibold mb-5'>Our Services</h2>
                <div className='overflow-x-auto sm:overflow-hidden flex sm:justify-center scrollbar-hide'>
                    <div className='flex flex-nowrap sm:animate-marquee gap-5 p-5'>
                        {services.map((v, i) => (
                            <ServiceCard key={i} name={v.serviceName} desc={v.serviceDesc} image={v.image} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className='partners-section w-full bg-white py-10'>
                <h2 className='text-2xl text-center font-semibold mb-5'>Our Partners</h2>
                <div className='overflow-x-auto sm:overflow-hidden flex sm:justify-center scrollbar-hide'>
                    <div className='flex flex-nowrap sm:animate-marquee gap-5 p-5'>
                        <ServiceCard />
                        <ServiceCard />
                        <ServiceCard />
                        <ServiceCard />
                        <ServiceCard />
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className='vid-section w-full sm:h-[500px] bg-[#F3CCE7] flex flex-col sm:flex-row items-center px-5 sm:px-40 py-10 sm:py-20'>
                <div className='vid-left w-full sm:w-[55%] bg-transparent p-3 text-center sm:text-left relative'>
                    <h1 className='text-3xl sm:text-4xl font-bold'>Hit Play to Know Our World</h1>
                    <p className='my-5 font-medium text-wrap'>
                        Explore the world of WorkForce. Know how we are transforming the freelancing industry and contractual work culture across the nation. Watch now to see the magic unfold.
                    </p>
                    <img src={arrow1} className='hidden sm:block w-16 sm:w-24 absolute -bottom-10 left-[50%] transform -translate-x-1/2 rotate-[15deg]' />
                </div>
                <div className='vid-right w-full sm:w-[45%] bg-transparent p-0 flex justify-center'>
                    <video src={exploreVideo} controls className='w-[90%] sm:w-full h-auto rounded-xl' />
                </div>
            </section>

            {/* Testimonials Section */}
            <section className='testimonial-section w-full bg-slate-100 py-10'>
                <h1 className='text-2xl text-center font-semibold mb-5'>Our Happy Customers</h1>
                <div className='reviews-div px-5 sm:px-10 flex flex-wrap justify-center gap-5'>
                    <ReviewComponent />
                    <ReviewComponent />
                    <ReviewComponent />
                    <ReviewComponent />
                </div>
            </section>

            {/* FAQ & Footer */}
            <FAQ />
            <Footer />
        </>
    );
}
