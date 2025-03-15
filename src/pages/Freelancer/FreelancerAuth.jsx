import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FreelancerLogin from "./FreelancerLogin";
import FreelancerSignUp from "./FreelancerSignUp";

export default function FreelancerAuth() {
  const [isSignUp, setIsSignUp] = useState(false);

  const switchToSignUp = () => setIsSignUp(true);
  const switchToLogin = () => setIsSignUp(false);

  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-gray-100 transition-all duration-500 p-4 ${isSignUp ? "bg-blue-200" : "bg-gray-100"}`}
    >
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      {isSignUp ? (
        <FreelancerSignUp switchToLogin={switchToLogin} />
      ) : (
        <FreelancerLogin switchToSignUp={switchToSignUp} />
      )}
    </div>
  );
}