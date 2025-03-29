import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-purple-400 py-8 px-4 md:px-16 lg:px-24">
      {" "}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {" "}
        <div>
          {" "}
          <h2 className="text-Purple font-bold text-lg">WorkForce</h2>{" "}
          <p className="mt-2 text-purple-200">
            {" "}
            Connecting skilled{" "}
            <span className="font-bold text-darkPurple">
              professionals seamlessly
            </span>{" "}
            and efficiently.{" "}
          </p>{" "}
          <div className="flex space-x-4 mt-4">
            {" "}
            <FaFacebook className="text-white text-xl" />{" "}
            <FaLinkedin className="text-white text-xl" />{" "}
            <FaInstagram className="text-white text-xl" />{" "}
            <FaXTwitter className="text-white text-xl" />{" "}
          </div>{" "}
        </div>{" "}
        <div>
          {" "}
          <h3 className="text-darkPurple font-bold">Company</h3>{" "}
          <ul className="mt-2 space-y-2">
            {" "}
            <li>
              <a href="#" className="text-purple-200">
                About Us
              </a>
            </li>{" "}
            <li>
              <a href="#" className="text-purple-200">
                For Business
              </a>
            </li>{" "}
            <li>
              <a href="#" className="text-purple-200">
                For Customers
              </a>
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        <div>
          {" "}
          <h3 className="text-darkPurple font-bold">Resources</h3>{" "}
          <ul className="mt-2 space-y-2">
            {" "}
            <li>
              <a href="#" className="text-purple-200">
                Privacy Policy
              </a>
            </li>{" "}
            <li>
              <a href="#" className="text-purple-200">
                Pricing
              </a>
            </li>{" "}
          </ul>{" "}
          <button className="mt-4 px-4 py-2 bg-purple-500 font-bold text-white rounded-lg">
            Admin Login
          </button>{" "}
        </div>{" "}
      </div>{" "}
      <div className="text-center text-white text-sm mt-6">
        {" "}
        © 2025 WorkForce. All Rights Reserved.
        <br /> Developed by Vaishnavi Awasthi and Srajan Saxena.{" "}
      </div>{" "}
    </footer>
  );
};

export default Footer;
