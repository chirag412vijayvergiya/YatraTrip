"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  BsChatHeartFill,
  BsFillSendFill,
  BsFillSendSlashFill,
  BsFillXCircleFill,
  BsPersonCircle,
  BsRobot,
} from "react-icons/bs"; // Importing close icon

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null); // Reference to scroll to the last message

  // Function to toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: inputMessage },
        { sender: "bot", text: "This is an automated response!" }, // Simulated bot reply
      ]);
      setInputMessage(""); // Clear input field
    }
  };

  // Scroll to the latest message
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-[1000]">
      {/* Chatbot Button */}
      <button
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-105"
        onClick={toggleChatbot}
      >
        {/* Change icon based on isOpen state */}
        {isOpen ? (
          <BsFillXCircleFill className="h-8 w-8 transition-all duration-300" />
        ) : (
          <BsChatHeartFill className="h-8 w-8 transition-all duration-300" />
        )}
      </button>

      {/* Chatbot Window */}
      <div
        className={`fixed bottom-20 right-4 w-96 rounded-2xl border h-[600px] border-gray-300 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between rounded-t-2xl bg-blue-600 p-3 text-white">
          <h3 className="text-lg font-semibold">Chatbot</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col space-y-4 h-[430px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`flex max-w-[70%] items-center space-x-3 ${
                    message.sender === "bot"
                      ? "flex-row"
                      : "flex-row-reverse gap-2"
                  }`}
                >
                  <div className="h-8 w-8 text-2xl text-gray-500">
                    {message.sender === "bot" ? (
                      <BsRobot />
                    ) : (
                      <BsPersonCircle />
                    )}
                  </div>
                  <div
                    className={`rounded-lg ${
                      message.sender === "bot" ? "bg-gray-100" : "bg-blue-100"
                    } p-2`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="absolute bottom-1 left-0 w-full border-t border-gray-300 bg-gray-100 rounded-b-lg p-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="rounded-full bg-blue-600 text-white p-2 hover:bg-blue-700 focus:outline-none"
            >
              <BsFillSendFill className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
