"use client";

import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import {
  BsChatHeartFill,
  BsFillSendFill,
  BsFillSendSlashFill,
  BsFillXCircleFill,
  BsPersonCircle,
  BsRobot,
} from "react-icons/bs"; // Importing close icon
import { IoIosArrowDown } from "react-icons/io";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null); // Reference to scroll to the last message

  // Function to toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      // Add user message to state
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: inputMessage },
      ]);

      setIsLoading(true);
      try {
        // Send message to backend

        const response = await axios.post("/api/chatbot", {
          message: inputMessage,
        });

        console.log("Response:", response.data);
        // Add bot's response to state
        const botMessage = {
          sender: "bot",
          text: response.data.answer || "Sorry, I didn't understand that.",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error communicating with chatbot:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: "There was an error. Please try again later.",
          },
        ]);
      } finally {
        setIsLoading(false);
        setInputMessage("");
        // Clear input field
      }
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

      <div
        className={`fixed bottom-20 right-4 md:w-96 w-80 rounded-2xl border h-[600px] border-gray-300 bg-white shadow-lg transition-transform duration-300 ease-in-out bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-90 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between rounded-t-2xl bg-blue-600 p-3 text-white">
          <h3 className="text-lg font-semibold">💬 Chat with us</h3>
          <button
            onClick={toggleChatbot}
            className="rounded-full bg-blue-500 text-white p-2 hover:bg-blue-700 focus:outline-none"
          >
            <IoIosArrowDown className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col space-y-4 h-[430px] overflow-x-hidden">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`flex max-w-[70%] items-start ${
                    message.sender === "bot"
                      ? "flex-row"
                      : "flex-row-reverse gap-2"
                  } space-x-2`}
                >
                  <div className="shrink-0">
                    <div
                      className={`flex items-center justify-center h-8 w-8 rounded-full text-white ${
                        message.sender === "bot" ? "bg-gray-400" : "bg-blue-500"
                      }`}
                    >
                      {message.sender === "bot" ? (
                        <BsRobot className="text-xl" />
                      ) : (
                        <BsPersonCircle className="text-xl" />
                      )}
                    </div>
                  </div>

                  <div
                    className={`rounded-lg break-words ${
                      message.sender === "bot" ? "bg-gray-100" : "bg-blue-100"
                    } p-2 max-w-full`}
                  >
                    <p className="text-gray-800 break-words">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Show loading dots if the bot is thinking */}
            {isLoading && (
              <div className="flex justify-start space-x-2">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full text-white bg-gray-400">
                    <BsRobot className="text-xl" />
                  </div>
                </div>
                <div className="rounded-lg  p-2 max-w-full">
                  <div class="flex gap-2">
                    <div class="w-3 h-3 rounded-full bg-blue-500 animate-bounce"></div>
                    <div class="w-3 h-3 rounded-full bg-blue-500 animate-bounce [animation-delay:-.3s]"></div>
                    <div class="w-3 h-3 rounded-full bg-blue-500 animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full border-t border-gray-300 bg-gray-100 rounded-b-2xl p-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputMessage.trim() !== "") {
                  handleSendMessage();
                }
              }}
              className="flex-1 rounded-lg border text-gray-800 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {inputMessage.trim() && (
              <button
                onClick={handleSendMessage}
                className="rounded-full bg-blue-600 text-white p-2 hover:bg-blue-700 focus:outline-none"
              >
                <BsFillSendFill className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
