import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../Footer";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="h-[80vh] flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-20"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-indigo-700 leading-tight">
          Empowering Innovation, <br className="hidden md:inline" /> Transforming Workforce
        </h1>
        <p className="text-lg md:text-xl max-w-3xl text-gray-700">
          <strong>Workforce</strong> is a next-generation platform designed to revolutionize project management and collaboration. 
          We bridge the gap between businesses and skilled developers, ensuring seamless execution of projects through an efficient and transparent workflow.
        </p>
        <p className="text-lg md:text-xl max-w-3xl mt-4 text-gray-600">
          From task assignment to real-time tracking and milestone updates, Workforce simplifies the Software Development Life Cycle (SDLC), 
          creating a smooth, structured, and highly productive work environment for teams of all sizes.
        </p>
      </motion.section>

      {/* Mission & Vision - Expanded Section */}
      <section className="py-16 px-6 container mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
            className="bg-indigo-50 p-8 rounded-xl shadow-md"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-indigo-800">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              To innovate and provide top-tier solutions that empower businesses worldwide with cutting-edge technology.
            </p>
            <p className="text-gray-600">
              We are committed to delivering exceptional value through our platform, enabling organizations to streamline their development processes and achieve remarkable efficiency gains.
            </p>
          </motion.div>
          
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
            className="bg-indigo-50 p-8 rounded-xl shadow-md"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-indigo-800">Our Vision</h2>
            <p className="text-lg text-gray-700 mb-4">
              To be recognized as a global leader in cutting-edge technological advancements and workforce collaboration.
            </p>
            <p className="text-gray-600">
              We aspire to transform how teams work together, breaking down barriers and creating a more connected, productive world of software development.
            </p>
          </motion.div>
        </div>

        {/* Additional Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-medium mb-6 text-gray-800">Why Choose Workforce?</h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Our platform combines intuitive design with powerful features to give your team the tools they need to succeed. 
            With real-time collaboration, comprehensive analytics, and seamless integration capabilities, 
            we're setting a new standard for project management excellence.
          </p>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 container mx-auto text-center bg-gray-50">
        <h2 className="text-4xl font-semibold mb-12 text-gray-800">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Srajan Saxena", role: "Developer" },
            { name: "Vaishnavi Awasthi", role: "Developer" },
            { name: "Rinku Raheja", role: "Project Mentor" }
          ].map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-24 h-24 mx-auto rounded-full mb-4 bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-medium text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;