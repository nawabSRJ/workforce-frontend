import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { X, ChevronDown } from "lucide-react";

export default function FreelancerSignUp({ switchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    gender: ''
  });
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const backendURL = import.meta.env.VITE_REACT_BACKEND_URL;
  // Gender options
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' }
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle gender selection
  const handleGenderSelect = (gender) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
    setGenderDropdownOpen(false);
  };

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    // Allow only numbers
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  // Handle phone input change
  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      phone: formattedPhone
    }));
  };

  // Add a tag when Enter is pressed
  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault(); // Prevent form submission
      addTag(tagInput.trim());
    }
  };

  // Add a tag
  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle tag input button click
  const handleAddTagClick = () => {
    if (tagInput.trim()) {
      addTag(tagInput.trim());
    }
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone format
  const isValidPhone = (phone) => {
    // Allow formats like (123) 456-7890 or just the digits
    return phone.replace(/\D/g, '').length === 10;
  };

  // Function to validate inputs
  const validateInputs = () => {
    const { name, email, username, password, phone, gender } = formData;
    
    const trimmedName = name.trim();
    const hasMinTwoLetters = trimmedName.replace(/\s+/g, '').length >= 2;
    const nameWords = trimmedName.split(/\s+/).filter(word => word.length > 0);
  
    if (nameWords.length < 2 || !hasMinTwoLetters) {
      toast.error('Please enter a valid name with at least two alphanumeric characters and at least two words.');
      return false;
    }
  
    if (password.length < 5) {
      toast.error('Password must be at least 5 characters long.');
      return false;
    }
  
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }

    if (!username.trim()) {
      toast.error('Username cannot be empty.');
      return false;
    }

    if (!isValidPhone(phone)) {
      toast.error('Please enter a valid 10-digit phone number.');
      return false;
    }

    if (!gender) {
      toast.error('Please select your gender.');
      return false;
    }

    if (tags.length === 0) {
      toast.error('Please add at least one skill tag.');
      return false;
    }
  
    return true;
  };
  
  // Function to handle SignUp
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return;
    }
    
    setLoading(true);
    
    const { name, email, username, password, phone, gender } = formData;
    
    // Prepare payload
    const userData = {
      name,
      email,
      password,
      username,
      phone,
      gender,
      tags,
      services: [] // Empty array for services
    };

    console.log('Sending signup data:', userData);
    
    try {
      const response = await axios.post(`${backendURL}/freelancer-signup`, userData);
      console.log('Signup response:', response.data);
      
      if (response.data.status === 'ok') {
        toast.success(response.data.message || 'Signup successful!');
        
        // Switch to login view after successful signup
        setTimeout(() => {
          switchToLogin();
        }, 2000);
      } else {
        toast.error(response.data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Signup failed');
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
        <h2 className="text-2xl font-bold mb-4">Create Freelancer Account</h2>
        <p className="text-sm text-gray-500 mb-6">
          Sign up to showcase your skills and get hired
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSignUp}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            id="name"
            onChange={handleChange}
            type="text"
            placeholder="John Doe"
            value={formData.name}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            onChange={handleChange}
            type="email"
            placeholder="example@email.com"
            value={formData.email}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            id="username"
            onChange={handleChange}
            type="text"
            placeholder="johnDoe123"
            value={formData.username}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        {/* Gender Combobox */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <div className="relative">
            <button
              type="button"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white flex justify-between items-center"
              onClick={() => setGenderDropdownOpen(!genderDropdownOpen)}
            >
              <span className={formData.gender ? "text-gray-900" : "text-gray-400"}>
                {formData.gender || "Select your gender"}
              </span>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </button>
            
            {genderDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {genderOptions.map((option) => (
                  <div
                    key={option.value}
                    className="p-2 hover:bg-blue-50 cursor-pointer"
                    onClick={() => handleGenderSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            id="phone"
            onChange={handlePhoneChange}
            type="tel"
            placeholder="(123) 456-7890"
            value={formData.phone}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            onChange={handleChange}
            type="password"
            placeholder="Minimum 5 characters"
            value={formData.password}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Skills/Tags</label>
          <div className="flex">
            <input
              id="tags"
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              type="text"
              placeholder="Add skills (e.g., Web Design)"
              value={tagInput}
              className="w-full p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={handleAddTagClick}
              className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 transition-all"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Press Enter to add a tag or click the Add button</p>
          
          {/* Display tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <div 
                key={index} 
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
              >
                <span className="mr-1">{tag}</span>
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? <span>Loading...</span> : <span>Sign Up</span>}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?
          <button
            type="button"
            onClick={switchToLogin}
            className="ml-2 text-blue-500 hover:underline cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}