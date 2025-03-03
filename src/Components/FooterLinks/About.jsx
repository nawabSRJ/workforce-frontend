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
    <div className="bg-primary text-secondary min-h-screen">
      <Navbar />
       {/* Hero Section */}
       <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="h-[80vh] flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-20"
      >
        <h1 className="text-5xl font-extrabold mb-6 text-accent leading-tight">
          Empowering Innovation, <br className="hidden md:inline" /> Transforming Workforce
        </h1>
        <p className="text-lg max-w-3xl text-black-300">
          <strong>Workforce</strong> is a next-generation platform designed to *redefine project management and collaboration*. 
          We bridge the gap between businesses and skilled developers, ensuring seamless execution of projects through an *efficient and transparent workflow*.
        </p>
        <p className="text-lg max-w-3xl mt-4 text-black-400">
          From task assignment to *real-time tracking and milestone updates, Workforce simplifies the **Software Development Life Cycle (SDLC)*, 
          creating a smooth, structured, and highly productive work environment.
        </p>
      </motion.section>
      {/* Mission & Vision */}
      <section className="py-16 px-6 grid md:grid-cols-2 gap-10 container mx-auto">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-secondary-light">
            To innovate and provide top-tier solutions that empower businesses
            worldwide.
          </p>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="text-secondary-light">
            To be recognized as a global leader in cutting-edge technological
            advancements.
          </p>
        </motion.div>
      </section>
      {/* Video Section */}
      <section className="relative py-16 px-6 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-full max-w-3xl overflow-hidden rounded-lg shadow-lg"
        >
          <iframe
            className="w-full h-64 md:h-96"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Company Video"
            allowFullScreen
          ></iframe>
        </motion.div>
      </section>
      {/* Team Section */}
      <section className="py-16 px-6 container mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { name: "Srajan Saxena", role: "Software Engineer", imgId: 11 },
            {
              name: "Vaishnavi Awasthi",
              role: "Software Developer",
              imgId: 12,
            },
            { name: "John Doe", role: "Software Engineer", imgId: 13 },
          ].map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="bg-secondary rounded-xl p-6 shadow-lg"
            >
              <img
                src={`https://randomuser.me/api/portraits/men/${member.imgId}.jpg`}
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-medium">{member.name}</h3>
              <p className="text-secondary-light">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;