import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BusinessSolutions = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-6 py-12">
      <div className="max-w-6xl w-full text-center">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">For Business</h1>
        <p className="text-lg text-gray-700 mb-10">
          Empower your business with top-tier freelancers and get work done faster, smarter, and more cost-effectively.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full text-center">
        <div className="p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 bg-indigo-50">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-3">Vetted Experts</h2>
          <p className="text-gray-600">Work with top-rated professionals across various fields.</p>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 bg-indigo-50">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-3">Flexible Hiring</h2>
          <p className="text-gray-600">Scale your workforce as needed, with no long-term commitments.</p>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 bg-indigo-50">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-3">Secure Payments</h2>
          <p className="text-gray-600">Pay only when you're satisfied with the work delivered.</p>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 bg-indigo-50">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-3">Custom Project Management</h2>
          <p className="text-gray-600">Track progress and manage projects with our intuitive dashboard.</p>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 bg-indigo-50">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-3">Priority Support</h2>
          <p className="text-gray-600">Get 24/7 assistance for all project-related queries.</p>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 bg-indigo-50">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-3">Exclusive Business Dashboard</h2>
          <p className="text-gray-600">Manage teams, payments, and reports seamlessly.</p>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="mt-12">
        <button
          onClick={() => navigate("/contact")}
          className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default BusinessSolutions;