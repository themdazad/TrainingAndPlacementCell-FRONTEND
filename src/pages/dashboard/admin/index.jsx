import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Book,
  FileUser,
  Settings,
  LogOut,
  PanelRightClose,
  PanelRightOpen,
  CircleHelp,
} from "lucide-react";
import Profile from "../../../components/dashboard/student/dashboard-tab/Profile";

const menuItems = [
  { name: "Dashboard", icon: Home },
  { name: "Projects", icon: Book },
  { name: "Quiz Maker", icon: CircleHelp },
  { name: "Post a Job", icon: FileUser },
  { name: "Settings", icon: Settings },
  { name: "Logout", icon: LogOut },
];

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3000//test/admin/login")
      .then((res) => res.json())
      .then((data) => setStudentData(data))
      .catch((err) => console.error("Error fetching student data:", err));
  }, []);

  const handleTabClick = (tabName) => {
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
        case "Quiz Maker":
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
        <motion.div
          animate={{ width: isOpen ? 250 : 80 }}
          className="border-r border-zinc-500/40 p-4 flex flex-col relative"
        >
          <div className="sticky top-0">
            <span
              className="absolute cursor-pointer -top-[10px] right-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <PanelRightOpen /> : <PanelRightClose />}
            </span>

            <ul className="mt-12 space-y-4">
              {menuItems.map(({ name, icon: Icon }, idx) => (
                <li
                  key={idx}
                  className={`flex items-center gap-4 p-2 cursor-pointer hover:bg-zinc-500/40 rounded-lg ${
                    activeTab === name ? "bg-zinc-500/40" : ""
                  }`}
                  onClick={() => handleTabClick(name)}
                >
                  <Icon size={24} />
                  {isOpen && <span>{name}</span>}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-6 h-[120vh]">
          <h1 className="text-2xl font-bold mb-4">{activeTab}</h1>
          {renderContent()}
        </div>
      </div>
    );
  };
}
