// components/ChatActionMenu.jsx
import React, { useState, useRef } from 'react';
import { Paperclip } from 'lucide-react';

const ChatActionMenu = ({ 
  onFileUpload, 
  onAskAI,
  onInitiateOrder,
  onInitiatePrivateOrder,
  isFreelancer
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleToggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleToggleMenu}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
      >
        <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      {isMenuOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 z-50">
          <div className="p-2 space-y-1">
            <button
              onClick={() => {
                onFileUpload();
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              File Upload
            </button>
            
            <button
              onClick={() => {
                onAskAI();
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              Ask AI
            </button>
            
            {!isFreelancer && (
              <>
                <button
                  onClick={() => {
                    onInitiateOrder();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  Initiate Public Order
                </button>
                
                <button
                  onClick={() => {
                    onInitiatePrivateOrder();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  Initiate Private Order
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatActionMenu;