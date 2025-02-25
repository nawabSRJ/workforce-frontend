import { useEffect, useState } from "react"; 
import { motion } from "framer-motion"; 
import Navbar from "./Navbar"; 
import Footer from "./Footer";

const AboutUs = () => { const [isVisible, setIsVisible] = useState(false);

useEffect(() => { setIsVisible(true); }, []);

return ( <div className="bg-primary text-secondary min-h-screen"> <Navbar /> {/* Hero Section */} <motion.section initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="h-[80vh] flex flex-col justify-center items-center text-center px-6" > <h1 className="text-5xl font-bold mb-4 text-accent">About Us</h1> <p className="text-lg max-w-2xl"> We are a team of passionate individuals dedicated to innovation and excellence. Our mission is to deliver outstanding solutions that make an impact. </p> </motion.section>

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
      {[1, 2, 3].map((_, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.1 }}
          className="bg-secondary rounded-xl p-6 shadow-lg"
        >
          <img
            src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
            alt="Team Member"
            className="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h3 className="text-xl font-medium">John Doe</h3>
          <p className="text-secondary-light">Software Engineer</p>
        </motion.div>
      ))}
    </div>
  </section>
  <Footer />
</div>

); };

export default AboutUs;