import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // ✅ Import icons
import Logo from '../Components/Logo';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer bg-[#F5F3ED] p-5 pb-5 w-full">
      <div className="flex flex-col items-center pt-5 w-full max-w-6xl mx-auto">
        <Logo />
        
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center sm:justify-between p-5 text-xl w-full max-w-5xl">
          {/* Company Section */}
          <div className="flex flex-col p-4 text-center sm:text-left">
            <h2 className="font-bold text-2xl mb-3">Company</h2>
            <a className="my-1 hover:text-green-900 transition-all" href="/about">About Us</a>
            <a className="my-1 hover:text-green-900 transition-all" href="business">For Business</a>
            <a className="my-1 hover:text-green-900 transition-all" href="customer">For Customers</a>
          </div>
          {/* Resources Section */}
          <div className="flex flex-col p-4 text-center sm:text-left">
            <h2 className="font-bold text-2xl mb-3">Resources</h2>
            <a className="my-1 hover:text-green-900 transition-all" href="/privacypolicy">Privacy Policy</a>
            <a className="my-1 hover:text-green-900 transition-all" href="/pricing">Pricing</a>
          </div>
        </div>

        {/* Centered Admin Login Button */}
        <button
          onClick={() => navigate("/admin-auth")}
          className="mt-5 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-all text-lg"
        >
          Admin Login
        </button>

        {/* Address & Social Media */}
        <div className="w-full max-w-lg mt-5">
          <div className="p-5 bg-green-900 rounded-xl text-white text-center">
            <h2 className="font-bold">Address</h2>
            <p>NATIONAL P.G. COLLEGE :)</p>

            <h2 className="font-bold my-2">Email</h2>
            <p className="mb-5">info@workforce.in</p>

            {/* ✅ Social Media Icons */}
            <div className="flex justify-center gap-6 mt-4">
              <FaFacebook className="text-white text-2xl hover:text-blue-400 transition-all cursor-pointer" />
              <FaTwitter className="text-white text-2xl hover:text-blue-300 transition-all cursor-pointer" />
              <FaInstagram className="text-white text-2xl hover:text-pink-500 transition-all cursor-pointer" />
              <FaLinkedin className="text-white text-2xl hover:text-blue-600 transition-all cursor-pointer" />
            </div>


            <h2>Developed by Vaishnavi Awasthi and Srajan Saxena
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
}