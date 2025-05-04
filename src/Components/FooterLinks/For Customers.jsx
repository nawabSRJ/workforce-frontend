import { useEffect } from "react"; import { Link } from "react-router-dom";

const CustomersPage = () => { useEffect(() => { window.scrollTo(0, 0); }, []);

return ( <div className="min-h-screen bg-white text-gray-900"> {/* Header Section */} <header className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-12 text-center"> <h1 className="text-4xl font-bold">For Customers</h1> <p className="mt-2 text-lg">Find top-rated freelancers for your business needs</p> </header>

{/* Services Section */}
  <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8">
    <div className="p-6 border rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <h2 className="text-2xl font-semibold">Verified Experts</h2>
      <p className="mt-2">Only skilled professionals with verified experience.</p>
    </div>
    <div className="p-6 border rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <h2 className="text-2xl font-semibold">Flexible Pricing</h2>
      <p className="mt-2">Choose from different pricing tiers to match your budget.</p>
    </div>
    <div className="p-6 border rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <h2 className="text-2xl font-semibold">Secure Payments</h2>
      <p className="mt-2">All transactions are safe and protected.</p>
    </div>
  </section>
  
  {/* Call to Action */}
  <section className="bg-gray-100 py-12 text-center">
    <h2 className="text-3xl font-bold">Get Started Today</h2>
    <p className="mt-2">Hire the best freelancers for your projects</p>
    <Link to="/get-started" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition">
      Get Started
    </Link>
  </section>
  
  {/* Footer */}
  <footer className="bg-gray-900 text-white text-center py-6">
    <p>© 2025 Your Platform. All Rights Reserved.</p>
    <div className="flex justify-center space-x-6 mt-2">
      <Link to="/contact" className="hover:underline">Contact Us</Link>
      <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
      <Link to="/terms" className="hover:underline">Terms of Service</Link>
    </div>
  </footer>
</div>

); };

export default CustomersPage;