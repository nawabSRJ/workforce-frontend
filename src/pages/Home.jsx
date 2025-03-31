import React from 'react'
import { motion } from 'framer-motion'
import ServiceCard from '../Components/ServiceCard';
import Navbar from '../Components/Navbar';
import exploreVideo from '../assets/exploreVideo.mp4'
import arrow1 from '../assets/arrow.webp'
import ReviewComponent from '../Components/ReviewComponent';
import Footer from '../Components/Footer';
import FAQ from '../Components/faq';
import { services } from '../Data/Services';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center px-5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-3xl text-center font-light mb-2 text-gray-600"
        >
          Hire the Best Professionals
        </motion.h1>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-6xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-6"
        >
          Get the Job DONE ASAP
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-md text-center font-medium w-full sm:w-[55%] mx-auto text-gray-600"
        >
          At <span className="font-bold text-blue-600">WorkForce</span> we are revolutionizing the contract-based gig worker industry.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 mt-8"
        >
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105">
            Get Started
          </button>
          <button className="px-6 py-3 bg-white text-gray-800 rounded-full font-medium shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:scale-105">
            Contact Us
          </button>
        </motion.div>
      </section>

      {/* Infinite Marquee Services Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          Our Services
        </h2>
        
        <div className="relative h-[320px] overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <div className="animate-infinite-scroll flex gap-8">
              {[...services, ...services].map((v, i) => (
                <ServiceCard key={`${i}-${v.serviceName}`} name={v.serviceName} desc={v.serviceDesc} image={v.image} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-5 sm:px-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sm:w-1/2"
          >
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-6">
              Hit Play to Know Our World
            </h1>
            <p className="text-lg text-gray-600 mb-8 relative z-10">
              Explore the world of WorkForce. Know how we are transforming the freelancing industry and contractual work culture across the nation.
            </p>
            <img src={arrow1} className="absolute -z-0 -left-20 -top-20 opacity-30 w-64" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sm:w-1/2 rounded-2xl overflow-hidden shadow-2xl"
          >
            <video src={exploreVideo} controls className="w-full h-auto rounded-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          Our Happy Customers
        </h2>
        
        <div className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <div className="animate-infinite-scroll-slow flex gap-8">
              {[...Array(6)].map((_, i) => (
                <ReviewComponent key={i} />
              ))}
              {[...Array(6)].map((_, i) => (
                <ReviewComponent key={`copy-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
      
      {/* Global Styles */}
      <style jsx global>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes infinite-scroll-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
          display: flex;
          width: 200%;
        }
        .animate-infinite-scroll-slow {
          animation: infinite-scroll-slow 60s linear infinite;
          display: flex;
          width: 300%;
        }
      `}</style>
    </div>
  )
}

export default Home