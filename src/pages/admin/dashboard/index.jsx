import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Home,
  Book,
  Settings,
  PanelRightClose,
  PanelRightOpen,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import Dashboard from "../../../components/admin/dashboard/dashboard-tab/Dashboard.jsx";
import { useAuth } from "../../../hooks/contexts/auth/AuthContext"; // Adjust path as needed
import BlogEditor from "../../../components/shared/blog-editor/BlogEditor.jsx";

const menuItems = [
  { name: "Dashboard", icon: Home },
  { name: "Write a blog", icon: Book },
  { name: "Settings", icon: Settings },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [adminData, setAdminData] = useState(null);

  // Access auth context
  const { isLogedIn, setIsLogedIn } = useAuth();
  // Handling login/logout Features
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status === 200) {
        setIsLogedIn({ admin: false, student: false }); // Reset state
        toast.error("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Write a blog":
        return <BlogEditor />;
      case "Verify Students":
        return <p>Verify Students</p>;
      case "Settings":
        return <p>Settings Section</p>;
      default:
        return <p>Welcome to the Admin Dashboard</p>;
    }
  };

  return (
    <main className="min-h-screen max-w-screen-2xl m-auto">
      {/* Sidebar */}
      {/* {isOpen && ( */}
      {1 && (
        <motion.div className="border-r border-neutral-500/40 p-6 px-12 flex  space-y-3 sticky top-0">
          <ul className="flex mt-12 space-y-4">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`flex items-center gap-4 p-2 cursor-pointer dark:hover:bg-neutral-800 hover:bg-blue-100 rounded-lg ${
                  activeTab === item.name ? "bg-neutral-500/40" : ""
                }`}
                onClick={() => setActiveTab(item.name)}
              >
                <item.icon size={24} />
                {isOpen && <span>{item.name}</span>}
              </li>
            ))}
          </ul>
          
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 px-[2.5%]">
        <Button
          className=" cursor-pointer py-4 "
          variant="none"
          onPress={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <PanelRightOpen /> : <PanelRightClose />}
        </Button>

        {/* main content */}
        {renderContent()}
      </div>
    </main>
  );
}
