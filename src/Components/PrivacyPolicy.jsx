import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Ensures the page loads at the top
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-5xl w-full overflow-auto h-auto border border-gray-300">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Privacy Policy</h1>

        <div className="space-y-10 text-gray-800">
          {/* Company Policy */}
          <section className="p-6 rounded-lg bg-gray-100 shadow-md border border-gray-300">
            <h2 className="text-2xl font-semibold mb-3">Company Policy</h2>
            <p>
              Our company is committed to protecting user data, ensuring transparency, and maintaining high ethical standards in all business operations.
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700">
              <li>We do not share user data with third parties without explicit consent.</li>
              <li>All transactions are securely encrypted and monitored for safety.</li>
              <li>We reserve the right to update policies without prior notice.</li>
            </ul>
          </section>

          {/* User Privacy */}
          <section className="p-6 rounded-lg bg-gray-100 shadow-md border border-gray-300">
            <h2 className="text-2xl font-semibold mb-3">User Privacy</h2>
            <p>
              Protecting user privacy is our top priority. We collect only the data necessary for account management and service improvement.
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700">
              <li>Personal information is securely stored and never sold.</li>
              <li>Users can request data deletion at any time.</li>
              <li>Cookies enhance the user experience but can be disabled.</li>
            </ul>
          </section>

          {/* Freelancer Policies */}
          <section className="p-6 rounded-lg bg-gray-100 shadow-md border border-gray-300">
            <h2 className="text-2xl font-semibold mb-3">Freelancer Policies</h2>
            <p>
              Our platform ensures fair work distribution, transparent pay norms, and professional conduct between clients and freelancers.
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700">
              <li>All contracts are legally binding and must be honored.</li>
              <li>Disputes are resolved through a structured mediation process.</li>
              <li>Payments are securely processed via verified gateways.</li>
            </ul>
          </section>

          {/* Contract & Payment Policies */}
          <section className="p-6 rounded-lg bg-gray-100 shadow-md border border-gray-300">
            <h2 className="text-2xl font-semibold mb-3">Contract & Payment Policies</h2>
            <p>
              Every contract must be thoroughly reviewed before acceptance. Payment security is our priority.
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700">
              <li>Clients must fund projects upfront before freelancers start work.</li>
              <li>Refunds and cancellations follow a strict review process.</li>
              <li>Violation of terms may result in account suspension.</li>
            </ul>
          </section>
        </div>

        {/* OK Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;