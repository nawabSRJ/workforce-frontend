import React, { useState } from "react";

const FAQ = () => {
  const faqs = [
    { question: "What is WorkForce?", answer: "WorkForce is a platform that connects businesses with skilled developers and professionals for gig-based projects." },
    { question: "How can I hire a developer?", answer: "Simply sign up as a user, post your project requirements, and developers will apply for the job." },
    { question: "How can developers find projects?", answer: "Developers can sign up, browse available projects, and submit proposals for jobs they are interested in." },
    { question: "Is WorkForce free to use?", answer: "Signing up and browsing projects is free. However, we charge a small service fee on completed projects." },
    { question: "How does payment work?", answer: "Users deposit the payment, which is held securely and released to the developer upon successful project completion." },
    { question: "Can I communicate with developers before hiring?", answer: "Yes, you can chat with developers, discuss requirements, and finalize project terms before hiring." },
    { question: "What happens if a project is not completed?", answer: "If a project is not completed as agreed, our dispute resolution team will step in to review and resolve the issue." },
    { question: "How do I manage my projects?", answer: "You can track project progress, communicate with developers, and make payments through your dashboard." },
    { question: "How do I contact customer support?", answer: "You can reach our support team via email or live chat available in your dashboard." }
  ];

  // ✅ Using an object to track open states separately for each FAQ
  const [openIndexes, setOpenIndexes] = useState({});

  const toggleFAQ = (index) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the specific FAQ item
    }));
  };

  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>

        {/* ✅ FIX: Separating FAQs into Two Independent Columns */}
        <div className="flex flex-wrap gap-4">
          {/* Left Column */}
          <div className="w-full md:w-[48%]">
            {faqs.filter((_, i) => i % 2 === 0).map((faq, index) => (
              <div 
                key={`left-${index}`} 
                className="bg-white shadow-md rounded-lg p-4 transition-all duration-300 mb-3"
              >
                <button
                  className="w-full flex justify-between items-center cursor-pointer text-gray-700 text-lg font-medium focus:outline-none"
                  onClick={() => toggleFAQ(`left-${index}`)}
                >
                  {faq.question}
                  <span className="cursor-pointer text-xl">{openIndexes[`left-${index}`] ? "−" : "+"}</span>
                </button>
                {openIndexes[`left-${index}`] && (
                  <p className="text-gray-600 mt-2">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="w-full md:w-[48%]">
            {faqs.filter((_, i) => i % 2 !== 0).map((faq, index) => (
              <div 
                key={`right-${index}`} 
                className="bg-white shadow-md rounded-lg p-4 transition-all duration-300 mb-3"
              >
                <button
                  className="w-full flex justify-between items-center text-gray-700 text-lg font-medium focus:outline-none"
                  onClick={() => toggleFAQ(`right-${index}`)}
                >
                  {faq.question}
                  <span className="text-xl">{openIndexes[`right-${index}`] ? "−" : "+"}</span>
                </button>
                {openIndexes[`right-${index}`] && (
                  <p className="text-gray-600 mt-2">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;