import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from '../Components/Logo'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 py-3 px-5 sm:px-10 backdrop-blur-lg ${scrolled ? 'bg-white/80 shadow-sm' : 'bg-white/30'} border-b border-white/20`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Services</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
            </div>
            
            <button className="ml-6 px-5 cursor-pointer py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-medium shadow hover:shadow-md transition-all">
              Sign Up
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-gray-200"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-white/95 backdrop-blur-lg pt-24 px-5 md:hidden"
        >
          <div className="flex flex-col items-center gap-8">
            <a 
              href="/contract" 
              className="text-2xl font-medium text-gray-800 hover:text-blue-600 transition-colors"
              onClick={toggleMobileMenu}
            >
              Contract Gen
            </a>
            <a 
              href="#" 
              className="text-2xl font-medium text-gray-800 hover:text-blue-600 transition-colors"
              onClick={toggleMobileMenu}
            >
              Services
            </a>
            <a 
              href="#" 
              className="text-2xl font-medium text-gray-800 hover:text-blue-600 transition-colors"
              onClick={toggleMobileMenu}
            >
              About
            </a>
            <a 
              href="#" 
              className="text-2xl font-medium text-gray-800 hover:text-blue-600 transition-colors"
              onClick={toggleMobileMenu}
            >
              Contact
            </a>
            
            <button className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-medium text-lg shadow">
              Sign Up
            </button>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default Navbar