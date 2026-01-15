import { Image } from '@heroui/react';
import AI_LOGO from '../..//assets/images/logos/gecsiwanlogo.svg';

const AI_Assistant_Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8">
      {/* Top Image : LOGO */}
      <div className="mb-8 w-full max-w-2xl flex justify-center">
        <Image src={AI_LOGO} alt="AI Assistant Logo" width={120} height={120} />
        {/* <div className="w-20 h-20 rounded-full bg-gradient-to-t from-blue-300 to-blue-500 flex items-center justify-center shadow-lg relative">
          <div className="w-12 h-12 rounded-full bg-blue-300 bg-opacity-80 blur-md absolute" />
          <div className="w-12 h-12 rounded-full bg-blue-400 opacity-70" />
        </div> */}
      </div>

      {/* Greeting */}
      <div className="text-center mb-8 w-full max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">Good Afternoon,</h1>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-700">
          What's on <span className="text-blue-500">your mind?</span>
        </h2>
      </div>

      {/* Chat Conversation Simulation */}
      <div className="w-full max-w-2xl flex flex-col gap-4 mb-8 mx-auto">
        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-blue-100 text-blue-900 rounded-2xl px-4 py-3 max-w-[80%] shadow-md">
            How can I improve my resume for campus placements?
          </div>
        </div>
        {/* Bot Response */}
        <div className="flex justify-start">
          <div className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-3 max-w-[80%] shadow-md flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-500 text-white rounded-full font-bold text-sm">
              AI
            </span>
            Thank you for your question! Here is a sample response from the AI assistant. (This is a
            dummy response.)
          </div>
        </div>
      </div>

      {/* ChatBot Input Box */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-md p-6 mb-4 flex items-center gap-6 mx-auto">
        <input
          type="text"
          placeholder="Ask AI a question or make a request..."
          className="flex-1 px-4 py-3 rounded-3xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-gray-50"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-md transition">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* AI Disclaimer Note */}
      <div className="w-full text-center max-w-2xl mb-6 mx-auto">
        <p className="text-xs text-gray-500 mt-1">AI can make mistakes, so double-check it.</p>
      </div>
    </div>
  );
};

export default AI_Assistant_Home;
