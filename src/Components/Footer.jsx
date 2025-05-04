import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"
import Logo from './Logo'
import { motion } from 'framer-motion'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8 px-5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between gap-12 mb-16"
        >
          <div className="lg:w-1/4">
            <Logo lightMode />
            <p className="mt-4 text-gray-300">
              Revolutionizing the gig economy with top-tier professionals and seamless project management.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:w-3/4">
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="/get-started" className="text-gray-300 hover:text-white transition-colors">Join Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/business" className="text-gray-300 hover:text-white transition-colors">For Business</a></li>
                <li><a href="/privacypolicy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/customer" className="text-gray-300 hover:text-white transition-colors">For Customers</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">
                  <FaFacebook />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">
                  <FaTwitter />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">
                  <FaInstagram />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">
                  <FaLinkedin />
                </a>
              </div>
              <button
                onClick={() => navigate("/admin-auth")}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full font-medium hover:shadow-lg transition-all"
              >
                Admin Login
              </button>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} WorkForce. All rights reserved.</p>
          <p className="mt-2">Developed by Vaishnavi Awasthi and Srajan Saxena</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer