// components/Chat.jsx
import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  LoaderCircle,
  SendHorizontal,
  ChevronDown,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      message: "Hi👋 I'm ChatFusion AI, how can I help you?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, loading]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { type: "user", message: userInput };
    setChatHistory((prev) => [...prev, userMessage]);
    setUserInput("");
    setLoading(true);

    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      const botMessage = {
        type: "bot",
        message:
          response.text() +
          "\n\nPowered by " +
          '<img src="../../public/logo.png" alt="ChatFusion Logo" class="inline h-4 align-middle" />',
      };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API Error:", error);
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", message: "⚠️ Something went wrong. Try again." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-gray-200 p-4 hidden md:flex flex-col">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">ChatFusion</h2>
        <button className="flex items-center gap-2 px-3 py-2 mb-4 text-sm font-medium text-gray-900 bg-white rounded-md hover:bg-gray-200">
          <Plus className="w-4 h-4" />
          New Chat
        </button>
        <div className="mb-2 text-sm font-medium text-gray-700">History</div>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="truncate cursor-pointer hover:text-black">History of the Roman nr...</li>
          <li className="truncate cursor-pointer hover:text-black">Basics of machine learnin...</li>
          <li className="truncate cursor-pointer hover:text-black">Travel recommendations</li>
          <li className="truncate cursor-pointer hover:text-black">Recipe for banana bread</li>
        </ul>
      </aside>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* TopBar */}
        <header className="flex items-center justify-between w-full px-6 py-4 bg-white border-b">
          <div className="text-sm text-green-600">● Online</div>
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <span className="font-medium text-gray-900">Profile</span>
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                <AvatarFallback>CF</AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4" />
            </div>
            {dropdownVisible && (
              <div className="absolute right-0 z-50 w-32 mt-2 bg-white border rounded shadow-md">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Chat Display */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-white border-gray-600">
          {chatHistory.map((chat, idx) => (
            <div
              key={idx}
              className={`flex gap-2 items-start ${chat.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {chat.type === "bot" && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="../../public/logo.png" alt="Bot" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap break-words inline-block ${
                  chat.type === "user"
                    ? "bg-purple-100 text-gray-800 text-right"
                    : "bg-white border text-gray-900 text-left"
                }`}
                dangerouslySetInnerHTML={{ __html: chat.message }}
              ></div>
              {chat.type === "user" && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              ChatFusion is typing...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Chat Input */}
        <div className="flex items-center gap-2 px-6 py-4 bg-white border-t">
          <input
            type="text"
            placeholder="Send a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring"
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-white border-gray-600 text-gray-700 rounded-full hover:bg-[#b2acc2]"
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </div>

        <p className="py-2 text-xs text-center text-gray-400">
          ChatAI may produce inaccurate information. Read our terms.
        </p>
      </div>
    </div>
  );
};

export default Chat;
