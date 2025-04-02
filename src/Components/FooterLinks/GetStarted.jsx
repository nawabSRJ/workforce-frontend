import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <h1 className="text-white text-4xl font-bold mb-6 drop-shadow-lg">
        Choose Your Role
      </h1>

      <div className="flex sm:flex-row flex-col gap-8">
        {/* Client Option */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer bg-white p-8 rounded-2xl shadow-xl transition duration-300 hover:shadow-2xl flex flex-col items-center"
          onClick={() => navigate("/client-auth")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Client Icon"
            className="w-24 h-24 mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">I'm a Client</h2>
          <p className="text-gray-600 text-center mt-2">
            Hire top professionals for your projects.
          </p>
        </motion.div>

        {/* Freelancer Option */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer bg-white p-8 rounded-2xl shadow-xl transition duration-300 hover:shadow-2xl flex flex-col items-center"
          onClick={() => navigate("/freelancer-auth")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995562.png"
            alt="Freelancer Icon"
            className="w-24 h-24 mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">I'm a Freelancer</h2>
          <p className="text-gray-600 text-center mt-2">
            Offer your skills and find amazing projects.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default GetStarted;