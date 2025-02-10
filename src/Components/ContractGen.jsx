import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prompt } from "./prompt";

function GeminiInReact() {  
  const [inputValue, setInputValue] = useState("");
  const [promptResponses, setpromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDt0QfRE_1QooWm_LN3AE8R3YYzRGSQWrY"
    // Add your API key here
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt + inputValue);
      setInputValue("");
      const response = result.response;
      const text = response.text();
      console.log(text);
      setpromptResponses([...promptResponses, text]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      console.log("Something Went Wrong");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <h1 className="text-center text-3xl font-bold text-gray-800 mt-10">
        Contract Generator
      </h1>

      {/* Chat Display */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {promptResponses.map((promptResponse, index) => (
          <div
            key={index}
            className={`p-4 mb-4 rounded-lg ${
              index % 2 === 0
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: promptResponse.replace(/\n/g, "<br>"),
              }}
            />
          </div>
        ))}
        {loading && (
          <div className="text-center text-gray-500 mt-4">Generating...</div>
        )}
      </div>

      {/* Input and Send Button */}
      <div className="w-full flex items-center px-4 pb-6 bg-white">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Chats go here..."
          className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={getResponseForGivenPrompt}
          className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default GeminiInReact;
