import { useState } from "react";
import { Home, Book, Settings, UploadCloud, Image } from "lucide-react";
import { Button } from "@heroui/react";
import Dashboard from "../../../components/admin/Dashboard.jsx";
import { useAuth } from "../../../hooks/contexts/auth/AuthContext"; // Adjust path as needed
import BlogEditor from "../../../components/shared/blog-editor/BlogEditor.jsx";
import AddNotice from "../../../components/admin/AddNotice.jsx";

const Tabs = [
  { name: "Dashboard", icon: Home },
  { name: "Publish", icon: UploadCloud },
  { name: "Add Photos", icon: Image },
  { name: "Write a blog", icon: Book },
  { name: "Settings", icon: Settings },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [adminData, setAdminData] = useState(null);

  const { handleLogout } = useAuth(); // Global auth context

  function renderContent() {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Publish":
        return <AddNotice />;
      case "Add Photos":
        return (
          <>
            {" "}
            Add Gallery Photos | Add Photo to Home Slider | Add Past Recruiter
          </>
        );
      case "Write a blog":
        return <BlogEditor />;
      case "Settings":
        return <p>Settings Section</p>;
      default:
        return <p>Welcome to the Admin Dashboard</p>;
    }
  }
  return (
    <main className="min-h-screen">
      <div className="p-4 max-w-screen-2xl m-auto flex sticky top-10 space-x-2 w-full max-md:overflow-x-scroll">
        <ul className="flex space-x-2">
          {Tabs.map((tab) => (
            <li
              key={tab}
              className={`flex items-center gap-2 p-2 text-nowrap cursor-pointer dark:hover:bg-neutral-800 rounded-xl ${
                activeTab === tab.name ? "bg-stone-500/40" : ""
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              <tab.icon size={16} />
              <span>{tab.name}</span>
            </li>
          ))}
        </ul>
        <Button
          color="danger"
          varient="outlined"
          onPress={() => handleLogout()}
        >
          Logout
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-screen-2xl m-auto">
        {renderContent()}
      </div>
    </main>
  );
}
