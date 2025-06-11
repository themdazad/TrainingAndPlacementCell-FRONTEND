
import { motion } from "framer-motion";
import { useState } from "react";

const admin = {
  name: "tpoAdmin",
  email: "tpogecsiwan@gmail.com",
  department: "Training and Placement Cell",
  registerNo: "N/A",
  cgpa: "N/A",
  placementStatus: "Eligible",
  profilePic: "https://avatars.githubusercontent.com/u/81636077?v=4",
  phone: "+91 123456789",
  linkedIn: "https://linkedin.com/in/",
  resume: "#",
  projects: [
    { title: "AI Chatbot", link: "#" },
    { title: "E-commerce Website", link: "#" },
  ],
};

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-6"
    >
      <div className="shadow-lg w-full rounded-2xl p-6  dark:bg-neutral-800">
      {/* Profile Header */}
      <div className="flex items-center gap-4 border-b border-neutral-500/50 pb-4">
        <div className="w-16 h-16">
          <img
            src={admin.profilePic}
            alt={admin.name}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{admin.name}</h2>
          <p className="text-neutral-400 text-sm">{admin.email}</p>
        </div>
        <button
          className="ml-auto p-2 rounded-full hover:bg-neutral-200"
          onClick={() => setIsEditing(!isEditing)}
        >
          ✏️
        </button>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
        <div>
          <p className="text-neutral-400">Department</p>
          <p className="font-medium">{admin.department}</p>
        </div>
        <div>
          <p className="text-neutral-400">register No.</p>
          <p className="font-medium">BEU-{admin.registerNo}</p>
        </div>
        <div>
          <p className="text-neutral-400">CGPA</p>
          <p className="font-medium">{admin.cgpa}</p>
        </div>
        <div>
          <p className="text-neutral-400">Placement Status</p>
          <p
            className={`font-medium ${
              admin.placementStatus === "Eligible"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {admin.placementStatus}
          </p>
        </div>
        <div>
          <p className="text-neutral-400">Phone</p>
          <p className="font-medium">{admin.phone}</p>
        </div>
        
      </div>

      {/* Projects Section */}
      {admin.projects.length > 0 && (
        <div className="mt-6 border-t border-neutral-500/50 pt-4">
          <h3 className="text-lg font-semibold mb-2">Projects</h3>
          <ul className="list-disc pl-5 space-y-1">
            {admin.projects.map((project, index) => (
              <li key={index}>
                <a
                  href={project.link}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </motion.div>
  );
};

export default Dashboard;
