import { useEffect } from "react"; import { useNavigate } from "react-router-dom";

const PricingStructure = () => { const navigate = useNavigate();

useEffect(() => { window.scrollTo(0, 0); }, []);

return ( <div className="min-h-screen flex flex-col items-center bg-white text-gray-900"> {/* Header */} <header className="w-full bg-blue-600 text-white text-center py-10"> <h1 className="text-4xl font-bold">Our Pricing Structure</h1> <p className="text-lg mt-2">Choose a plan that suits your needs</p> </header>

{/* Pricing Section */}
  <div className="max-w-7xl w-full px-6 py-12 grid md:grid-cols-3 gap-8">
    {/* Basic Plan */}
    <div className="border border-gray-300 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all">
      <h2 className="text-2xl font-bold mb-4">Basic</h2>
      <p className="text-gray-700">For freelancers starting out</p>
      <p className="text-4xl font-bold text-blue-600 mt-4">$5 - $50</p>
      <ul className="mt-4 space-y-2 text-gray-700">
        <li>✔ Access to small projects</li>
        <li>✔ Limited service categories</li>
        <li>✔ Basic customer support</li>
      </ul>
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Get Started</button>
    </div>

    {/* Standard Plan */}
    <div className="border border-gray-300 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all">
      <h2 className="text-2xl font-bold mb-4">Standard</h2>
      <p className="text-gray-700">For growing freelancers</p>
      <p className="text-4xl font-bold text-green-600 mt-4">$50 - $500</p>
      <ul className="mt-4 space-y-2 text-gray-700">
        <li>✔ Access to medium & large projects</li>
        <li>✔ More service categories</li>
        <li>✔ Priority support</li>
      </ul>
      <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">Upgrade</button>
    </div>

    {/* Premium Plan */}
    <div className="border border-gray-300 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all">
      <h2 className="text-2xl font-bold mb-4">Premium</h2>
      <p className="text-gray-700">For top-tier freelancers</p>
      <p className="text-4xl font-bold text-blue-600 mt-4">$500+</p>
      <ul className="mt-4 space-y-2 text-gray-700">
        <li>✔ Access to all project types</li>
        <li>✔ Premium visibility</li>
        <li>✔ Dedicated account manager</li>
      </ul>
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Go Premium</button>
    </div>
  </div>

  {/* Footer */}
  <footer className="w-full bg-gray-900 text-white text-center py-6 mt-12">
    <p>&copy; 2025 Freelancer Platform. All rights reserved.</p>
    <div className="mt-4 space-x-4">
      <a href="/privacy" className="hover:underline">Privacy Policy</a>
      <a href="/terms" className="hover:underline">Terms of Service</a>
      <a href="/contact" className="hover:underline">Contact Us</a>
    </div>
  </footer>
</div>

); };

export default PricingStructure;