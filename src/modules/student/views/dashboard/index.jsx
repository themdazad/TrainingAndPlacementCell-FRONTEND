import { useState } from "react";
import { Home, Book, Settings, UploadCloud, Image } from "lucide-react";
import { Button } from "@heroui/react";
import { useAuth } from "../../../../hooks/contexts/auth/AuthContext.jsx";
const Tabs = [
  { name: "Dashboard", icon: Home },
  { name: "Application Status", icon: UploadCloud },
  { name: "Projects", icon: UploadCloud },
  { name: "Blogs", icon: Book },
  { name: "Settings", icon: Settings },
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const { handleLogout } = useAuth(); // Global auth context

  function renderContent() {
    switch (activeTab) {
      case "Dashboard":
        return <>Student Dashboard</>;
      case "Application Status":
        return<> You can check realtime application status | Applied jobs | </>
      case "Projects":
        return <>Upload semester projects | Project Mode: Public, Private, Delete | Likes, Comments, Share </>;
      case "Blogs":
        return <>Write a Blogs and Publish | Post Mode: Public, Private, Delete | Likes, Comments, Share</>;
      case "Settings":
        return <p>Settings Section</p>;
      default:
        return <p>Welcome to the Student Dashboard</p>;
    }
  }
  return (
    <main className="min-h-screen">
      <div className="p-4 max-w-screen-2xl m-auto flex sticky top-10 space-x-2 w-full max-md:overflow-x-scroll">
        <ul className="flex space-x-2">
          {Tabs.map((tab) => (
            <li
              key={tab}
              className={`flex items-center gap-2 p-2 text-nowrap cursor-pointer dark:hover:bg-slate-800 rounded-xl ${
                activeTab === tab.name ? "bg-slate-500/40" : ""
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
