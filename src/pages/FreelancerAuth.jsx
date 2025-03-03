import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function FreelancerAuth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handling submit
  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:8000/freelancer-login', { email, password })
      .then(result => {
        console.log(result); // debugging
        if (result.data.message === "Success") {
          navigate('/freelancer-dash', { state: { user: result.data.user } });
          localStorage.setItem('logged', true)
          setLoading(false);
        } else if (result.data.message === "Not Found") {
          setLoading(false); // stop loading
          toast.error('Please Re-enter details. No Record Found :/');
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }; // handleSignIn over

  // Function to validate inputs
  const validateInputs = () => {
    const trimmedName = name.trim();
    const hasMinTwoLetters = trimmedName.replace(/\s+/g, '').length >= 2;
    const nameWords = trimmedName.split(/\s+/);
  
    if (nameWords.length < 2 || !hasMinTwoLetters) {
      toast.error('Please enter a valid name with at least two alphanumeric characters and at least two words.');
      return false;
    }
  
    if (password.length < 5) {
      toast.error('Password must be at least 5 characters long.');
      return false;
    }
  
    if (email.trim().length === 0) {
      toast.error('Email cannot be empty.');
      return false;
    }
  
    return true;
  };
  
  // function to handle SignUp
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    setLoading(true);
    axios.post('http://localhost:8000/freelancer-signup', { name, email, password })
      .then(result => {
        console.log(result);
        toast.success('Signup successful! Check your email for confirmation.');
        navigate('/freelancer-dash');
      })
      .catch(err => console.log(err));
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-gray-100 transition-all duration-500 ${isSignUp ? "bg-blue-200" : "bg-gray-100"}`}
    >
      <ToastContainer />

      <div className="relative w-96 p-8 bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {isSignUp ? "Create Account" : "Sign In"}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            {isSignUp ? "Sign up to get started" : "Welcome back! Please login"}
          </p>
        </div>

        <form className="space-y-4">
          {isSignUp && (
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            onClick={(e) => (isSignUp ? handleSignUp(e) : handleSignIn(e))}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all cursor-pointer"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-blue-500 hover:underline cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}