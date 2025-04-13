// src/components/Dashboard.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // For mobile menu toggle icons

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for Desktop */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block w-64 bg-blue-600 text-white p-4"
      >
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <ul>
          <li className="mb-2 hover:bg-blue-700 p-2 rounded">Home</li>
          <li className="mb-2 hover:bg-blue-700 p-2 rounded">Analytics</li>
          <li className="mb-2 hover:bg-blue-700 p-2 rounded">Settings</li>
        </ul>
      </motion.div>

      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 p-2 bg-blue-600 text-white rounded-lg z-50"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar (Overlay) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
          >
            <div
              className="w-64 h-full bg-blue-600 text-white p-4"
              onClick={toggleSidebar} // Close sidebar when clicking outside
            >
              <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
              <ul>
                <li className="mb-2 hover:bg-blue-700 p-2 rounded">Home</li>
                <li className="mb-2 hover:bg-blue-700 p-2 rounded">Analytics</li>
                <li className="mb-2 hover:bg-blue-700 p-2 rounded">Settings</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex-1 p-4 md:p-8"
      >
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-gray-700">
          This is a simple example of a responsive dashboard with animations
          using React, Tailwind CSS, and Framer Motion.
        </p>
      </motion.div>
    </div>
  );
};

export default Dashboard;