import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, Book, Settings, FileCheck2, PanelRightClose, PanelRightOpen } from "lucide-react";
import { Button, Card, CardHeader, CardBody, CardFooter } from "@heroui/react";

const menuItems = [
  { name: "Dashboard", icon: Home },
  { name: "Profile", icon: User },
  { name: "Projects", icon: Book },
  { name: "Placements", icon: FileCheck2 },
  { name: "Settings", icon: Settings },
];

export default function StudentDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    fetch("/api/student")
      .then((response) => response.json())
      .then((data) => setStudentData(data))
      .catch((error) => console.error("Error fetching student data:", error));
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return studentData ? (
          <div>
            <p><strong>Name:</strong> {studentData.name}</p>
            <p><strong>Email:</strong> {studentData.email}</p>
            <p><strong>Courses:</strong> {studentData.courses.join(", ")}</p>
          </div>
        ) : (
          <p>Loading student data...</p>
        );
      case "Profile":
        return <p>Profile Section</p>;
      case "Projects":
        return <p>Projects Section</p>;
      case "Placements":
        return <p>Placements Section</p>;
      case "Settings":
        return <p>Settings Section</p>;
      default:
        return <p>Welcome to the Student Dashboard</p>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <motion.div
        animate={{ width: isOpen ? 250 : 80 }}
        className="border-r border-zinc-500/40 p-4 flex flex-col relative"
      >
        <Button 
          className="absolute top-4 right-1"
          variant="none" 
          onPress={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <PanelRightOpen/> : <PanelRightClose/>}
        </Button>
        <ul className="mt-12 space-y-4">
          {menuItems.map((item, index) => (
            <li 
              key={index} 
              className={`flex items-center gap-4 p-2 cursor-pointer hover:bg-zinc-500/40 rounded-lg ${activeTab === item.name ? "bg-zinc-500/40" : ""}`}
              onClick={() => setActiveTab(item.name)}
            >
              <item.icon size={24} />
              {isOpen && <span>{item.name}</span>}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold">{activeTab}</h1>
          </CardHeader>
          <CardBody>
            {renderContent()}
          </CardBody>
          <CardFooter>
            <Button>Refresh Data</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
