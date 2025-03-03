import React from "react";
import { FaTwitter, FaLinkedin, FaDribbble, FaEnvelope, FaUserPlus, FaMapMarkerAlt } from "react-icons/fa";

export default function ProfileCard({name,description,tags,location}) {
  return (
    <div className="flex items-right justify-center min-screen bg-gray-100 ml-40">
      <div className="max-w-4xl w-full p-5">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="flex flex-col md:flex-row">
            {/* Left Section - Profile Image */}
            <div className="md:w-1/3 bg-blue-500 flex items-center justify-center p-6">
              <img
                src="https://randomuser.me/api/portraits/women/64.jpg"
                alt="Profile"
                className="w-28 h-28 rounded-full shadow-lg"
              />
            </div>

            {/* Right Section - Content */}
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-bold text-blue-600">{name}</h3>
                <span className="px-3 py-2 text-blue-600 bg-blue-100 rounded-full text-sm font-semibold">
                  {tags}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                {description}
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mb-4">
                <button className="flex items-center gap-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium transition hover:bg-blue-600">
                  <FaEnvelope />
                  Contact
                </button>
                <button className="flex items-center gap-2 cursor-pointer border border-blue-500 text-blue-600 px-4 py-2 rounded-full text-sm font-medium transition hover:bg-blue-500 hover:text-white">
                  <FaUserPlus />
                  Follow
                </button>
              </div>

              {/* Social Icons & Location */}
              <div className="border-t pt-3 flex justify-between items-center">
                <div className="flex gap-4 text-blue-600">
                  <FaTwitter className="text-xl cursor-pointer transition-transform transform hover:scale-125" />
                  <FaLinkedin className="text-xl cursor-pointer transition-transform transform hover:scale-125" />
                  <FaDribbble className="text-xl cursor-pointer transition-transform transform hover:scale-125" />
                </div>
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <FaMapMarkerAlt />
                  {location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
