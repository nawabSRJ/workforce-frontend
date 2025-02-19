import React from 'react'
import ServiceCard from '../Components/ServiceCard';
import Navbar from '../Components/Navbar';
import exploreVideo from '../assets/exploreVideo.mp4'
import arrow1 from '../assets/arrow.webp'
import ReviewComponent from '../Components/ReviewComponent';
import Footer from '../Components/Footer';
import FAQ from '../Components/faq';
import { services } from '../Data/Services';
// small change

export default function Home() {
    return (
        <>{/* Navbar */}
            <Navbar />
            {/* Hero Section */}
            <section className='hero w-full h-fit mt-10 px-5'>
                <h1 className='text-xl sm:text-3xl text-center mx-auto mt-2 mb-3 font-thin'>
                    Hire the Best Professionals
                </h1>
                <h1 className='text-2xl sm:text-5xl text-center mx-auto my-3 font-bold'>
                    Get the Job DONE ASAP
                </h1>
                <p className='info text-md text-center font-serif w-full sm:w-[55%] mx-auto mt-7 text-wrap'>
                    At <b>WorkForce</b> we are revolutionising the contract-based gig worker industry with a platform to connect you with skilled professionals.
                </p>

                <div className='heroBtns mx-auto text-center my-7'>
                    <button className='bg-black text-white text-xl text-center px-4 py-2 rounded-full m-3'>
                        Get Started
                    </button>
                    <button className='bg-black text-white text-xl text-center px-4 py-2 rounded-full m-3'>
                        Contact Us
                    </button>
                </div>
            </section>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            {/* Service Cards Section */}
            <section className='our-services-section w-full h-fit'>
                <div className='services-marquee overflow-x-auto whitespace-nowrap bg-white-100 '>
                    <div className="animate-marquee flex flex-row gap-5 sm:p-5 flex-nowrap">
                        {
                            services.map((v, i) => {
                                return (
                                     <ServiceCard key={i} name={v.serviceName} desc={v.serviceDesc} image={v.image} />
                                )
                            })
                        }

                    </div>
                </div>
                <br></br>
                <br></br>
                <div className='w-[70%] bg-white-300 mx-auto'>
                    <h1 className='text-center text-black text-2xl font-semibold my-5 mx-auto '>Our Partners</h1>
                    <div className='partners-marquee overflow-x-auto whitespace-nowrap bg-white-100 '>
                        <div className="animate-marquee flex flex-row gap-5 sm:p-5 flex-nowrap">
                            <ServiceCard />
                            <ServiceCard />
                            <ServiceCard />
                            <ServiceCard />
                            <ServiceCard />
                        </div>
                    </div>
                </div>
                <br></br>
            </section>

            {/* video section */}
            <section className='vid-section w-1/1 sm:h-[500px] bg-[#F3CCE7] flex sm:flex-row flex-col sm:px-40 px-5 sm:py-20 py-10 '>

                <div className='vid-left w-[55%] bg-transparent m-1 p-3'>
                    <h1 className='text-4xl font-bold'>Hit Play to know our World</h1>
                    <p className='my-5 font-medium z-10 absolute text-wrap'>Explore the world of WorkForce. Know how we are transforming the <br></br> freelancing  industry and contractual work culture across the <br></br> nation. Watch now to see the magic unfold</p>
                    <img src={arrow1} className=' relative -top-20 left-0 h-3/3 w-5/5 bg-transparent z-0' />
                </div>
                <div className='vid-right w-[45%] bg-transparent m-1 p-0 '>
                    <video src={exploreVideo} controls={true} className='w-1/1 h-1/1 rounded-xl' />
                </div>
            </section>
            <br></br>
            <br></br>

            <section className='testimonial-section w-1/1 sm:h-[600px] bg-slate-100'>
                <h1 className='text-3xl text-center pt-4 font-semibold'>Our happy Customers</h1>
                <div className='reviews-div px-10 py-20 flex flex-row flex-wrap gap-5 bg-slate-100 w-[90%] mx-auto'>
                    {/* pic name msg in props */}
                    <ReviewComponent />
                    <ReviewComponent />
                    <ReviewComponent />
                    <ReviewComponent />
                    <ReviewComponent />
                    <ReviewComponent />
                </div>
            </section>
            <FAQ />
            <Footer />
        </>
    )
}
