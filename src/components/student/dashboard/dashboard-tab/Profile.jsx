
import { motion } from "framer-motion";
import { useState } from "react";

const student = {
  name: "Azad",
  email: "azad@example.com",
  department: "Electrical Engineering",
  registerNo: "22103151001",
  cgpa: "8.7",
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

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-6"
    >
      <div className="shadow-lg w-full rounded-2xl p-6  dark:bg-zinc-800">
      {/* Profile Header */}
      <div className="flex items-center gap-4 border-b border-zinc-500/50 pb-4">
        <div className="w-16 h-16">
          <img
            src={student.profilePic}
            alt={student.name}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{student.name}</h2>
          <p className="text-zinc-400 text-sm">{student.email}</p>
        </div>
        <button
          className="ml-auto p-2 rounded-full hover:bg-zinc-200"
          onClick={() => setIsEditing(!isEditing)}
        >
          ✏️
        </button>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
        <div>
          <p className="text-zinc-400">Department</p>
          <p className="font-medium">{student.department}</p>
        </div>
        <div>
          <p className="text-zinc-400">register No.</p>
          <p className="font-medium">BEU-{student.registerNo}</p>
        </div>
        <div>
          <p className="text-zinc-400">CGPA</p>
          <p className="font-medium">{student.cgpa}</p>
        </div>
        <div>
          <p className="text-zinc-400">Placement Status</p>
          <p
            className={`font-medium ${
              student.placementStatus === "Eligible"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {student.placementStatus}
          </p>
        </div>
        <div>
          <p className="text-zinc-400">Phone</p>
          <p className="font-medium">{student.phone}</p>
        </div>
        
      </div>

      {/* Projects Section */}
      {student.projects.length > 0 && (
        <div className="mt-6 border-t border-zinc-500/50 pt-4">
          <h3 className="text-lg font-semibold mb-2">Projects</h3>
          <ul className="list-disc pl-5 space-y-1">
            {student.projects.map((project, index) => (
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

export default Profile;
