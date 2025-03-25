import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function FreelancerLogin({ switchToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handling sign in
  const handleSignIn = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/freelancer-login', {
        email,
        password
      });
      
      console.log('Login response:', response.data); // For debugging
      
      if (response.data.status === "ok") {
        toast.success('Login successful!');
        
        // Store user data in localStorage
        localStorage.setItem('freelancerToken', response.data.freelancer);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        localStorage.setItem("logged", JSON.stringify({ role: "freelancer" }));

        
        // Navigate to dashboard
        setTimeout(() => {
          navigate('/freelancer-dash', { state: { user: response.data.user } });
        }, 1000);
      } else {
        toast.error(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Login failed');
      } else {
        toast.error('Server error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md p-6 md:p-8 bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Freelancer Sign In</h2>
        <p className="text-sm text-gray-500 mb-6">
          Welcome back! Please login to your account
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSignIn}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="example@email.com"
            value={email}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Your password"
            value={password}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? <span>Loading...</span> : <span>Sign In</span>}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?
          <button
            type="button"
            onClick={switchToSignUp}
            className="ml-2 text-blue-500 hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}