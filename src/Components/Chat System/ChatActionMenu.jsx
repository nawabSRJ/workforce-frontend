import React, { useState } from 'react';
import { Paperclip } from 'lucide-react';

const ChatActionMenu = ({ 
  onFileUpload, 
  onAskAI, 
  onInitiateOrder,
  isFreelancer
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
      >
        <Paperclip className="h-5 w-5" />
      </button>
      
      {isMenuOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              onFileUpload();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            File Upload
          </button>
          <button
            onClick={() => {
              onAskAI();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Ask AI
          </button>
          {isFreelancer && (
            <button
              onClick={() => {
                onInitiateOrder();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Initiate Order
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatActionMenu;