import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    // Handle form submission logic
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-6 py-12">
      <div className="max-w-4xl w-full bg-gray-100 shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-green-500 text-xl" />
              <p className="text-gray-700">Nationl P.G. College, Uttar Pradesh, India</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-blue-500 text-xl" />
              <p className="text-gray-700">info@workforce.in</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone className="text-red-500 text-xl" />
              <p className="text-gray-700">+91 xxxxx xxxxx</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-700 text-2xl hover:scale-110 transition"><FaFacebook /></a>
              <a href="#" className="text-blue-500 text-2xl hover:scale-110 transition"><FaTwitter /></a>
              <a href="#" className="text-blue-700 text-2xl hover:scale-110 transition"><FaLinkedin /></a>
              <a href="#" className="text-pink-600 text-2xl hover:scale-110 transition"><FaInstagram /></a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Your Message"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;