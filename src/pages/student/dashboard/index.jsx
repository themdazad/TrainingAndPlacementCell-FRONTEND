import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Home,
  Book,
  FileUser,
  Settings,
  PanelRightClose,
  PanelRightOpen,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import Profile from "../../../components/student/dashboard/dashboard-tab/Profile";
import { useAuth } from "../../../hooks/contexts/auth/AuthContext"; // Adjust path as needed

const menuItems = [
  { name: "Dashboard", icon: Home },
  { name: "Projects", icon: Book },
  { name: "Resume Builder", icon: FileUser },
  { name: "Settings", icon: Settings },
];

export default function StudentDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [studentData, setStudentData] = useState(null);

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
        console.log("Logout response:", res);
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
        return (
          <section>
            <Profile />
          </section>
        );

      case "Projects":
        return <p>Projects Section</p>;
      case "Placements":
        return <p>Placements Section</p>;
      case "Resume Builder":
        return <p>Coming Soon...</p>;
      case "Settings":
        return <p>Settings Section</p>;
      default:
        return <p>Welcome to the Student Dashboard</p>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {isOpen && (
        <motion.div className="border-r border-zinc-500/40 p-4 flex flex-col relative space-y-3">
          <div className="sticky top-0">
            <ul className="mt-12 space-y-4">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-4 p-2 cursor-pointer dark:hover:bg-zinc-800 hover:bg-blue-100 rounded-lg ${
                    activeTab === item.name ? "bg-zinc-500/40" : ""
                  }`}
                  onClick={() => setActiveTab(item.name)}
                >
                  <item.icon size={24} />
                  {isOpen && <span>{item.name}</span>}
                </li>
              ))}
            </ul>
            {(isLogedIn?.admin || isLogedIn?.student) && (
              <div className="flex items-center">
                <Button
                  onPress={handleLogout}
                  className=" py-1.5 mt-4 rounded-xl font-medium transition"
                >
                  {isOpen && "Logout"}
                  <LogOut />
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 px-[5%]">
        {/* Heading */}
        <div className="header flex flex-col justify-center">
          <span
            className=" cursor-pointer  "
            variant="none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <PanelRightOpen /> : <PanelRightClose />}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold">
            {activeTab}
          </h1>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
