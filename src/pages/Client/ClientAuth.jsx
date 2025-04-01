import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function ClientAuth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // handling submit
  async function handleSignIn(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendURL}/client-login`, { 
        email: formData.email, 
        password: formData.password 
      });
  
      if (res.data.status === "ok") {
        localStorage.setItem("token", res.data.cli);
        localStorage.setItem('clientData', JSON.stringify(res.data.user)); 
        localStorage.setItem("logged", JSON.stringify({ role: "client" }));

          // * navigate to dashboard after delay
      setTimeout(() => {
        navigate("/client-dash", { state: { user: res.data.user } });
      }, 1000);
      
      } else {
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  // Improved validation function
  const validateInputs = () => {
    // Name validation
    const trimmedName = formData.name.trim();
    const hasMinTwoLetters = trimmedName.replace(/\s+/g, '').length >= 2;
    const nameWords = trimmedName.split(/\s+/);
  
    if (nameWords.length < 2 || !hasMinTwoLetters) {
      toast.error('Please enter a valid full name with at least two words and two characters.');
      return false;
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error('Please enter a valid email address.');
      return false;
    }
  
    // Password validation
    if (formData.password.length < 5) {
      toast.error('Password must be at least 5 characters long.');
      return false;
    }
  
    // Gender validation
    if (!formData.gender) {
      toast.error('Please select your gender.');
      return false;
    }
  
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      toast.error('Please enter a valid phone number (10 digits).');
      return false;
    }
  
    return true;
  };

  // function to handle SignUp
  async function handleSignUp(e) {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/client-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status === 'ok') {
        toast.success('Account created successfully! Please login.');
        setIsSignUp(false);
      } else {
        toast.error(data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-gray-100 transition-all duration-500 ${isSignUp ? "bg-blue-200" : "bg-gray-100"}`}
    >
      <ToastContainer />

      <div className="relative w-full max-w-md p-8 bg-white shadow-lg rounded-xl overflow-hidden">
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
            <>
              <input
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === 'other'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Other
                </label>
              </div>
              <input
                name="phone"
                onChange={handleInputChange}
                value={formData.phone}
                type="tel"
                placeholder="Phone Number"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </>
          )}
          <input
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            onClick={(e) => (isSignUp ? handleSignUp(e) : handleSignIn(e))}
            disabled={loading}
            className={`w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all cursor-pointer ${loading ? 'opacity-70' : ''}`}
          >
            {loading ? 'Processing...' : (isSignUp ? "Sign Up" : "Sign In")}
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
  )
}