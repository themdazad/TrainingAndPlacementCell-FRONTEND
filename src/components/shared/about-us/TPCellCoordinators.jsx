
import { Linkedin, Github, Mail } from "lucide-react";

const coordinators = [
  {
    name: "Md. Azad",
    designation: "Electrical Engineering, 23103151965",
    mobile: "+91 9110172886",
    email: "collezian@gmail.com",
    linkedin: "https://www.linkedin.com/in/themdazad",
    github: "https://www.github.com/themdazad/",
  },
  {
    name: "Abhishek Kumar Singh",
    designation: "Mechanical Engineering, 22102151907",
    mobile: "+91 8804080749",
    email: "abhishek.gecs@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhishek-kumar-singh-8312a931b",
    github: "",
  },
  {
    name: "Abhinav Kumar",
    designation: "Electrical Engineering, 23103151945",
    mobile: "",
    email: "",
    linkedin: "#",
    github: "",
  },
  {
    name: "Anupam Kumar",
    designation: "Electrical Engineering, 23103151945",
    mobile: "",
    email: "",
    linkedin: "#",
    github: "",
  },
  {
    name: "Shahnoor Ishtiyaque",
    designation: "CSE (IoT)",
    mobile: "",
    email: "",
    linkedin: "#",
    github: "",
  },
];

export default function TPCellCoordinators() {
  return (
    <section className="m-auto px-[5%] grid grid-cols-1 gap-6">
      <div className="members p-4 rounded-3xl">
        {/* Section Title */}
        <div className="title  text-center py-12">
          <h1 className="text-xl md:text-3xl font-extrabold">
            T&P Student Coordinators
          </h1>
          <p>
            Have questions about placements or internships? We’re here to help!
          </p>
        </div>

        {/* Coordinator Details */}
        <div className="members-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {coordinators.map((coordinator, index) => (
            <CoordinatorCard
              key={index}
              name={coordinator.name}
              designation={coordinator.designation}
              mobile={coordinator.mobile}
              email={coordinator.email}
              linkedin={coordinator.linkedin}
              github={coordinator.linkedin}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CoordinatorCard({
  name,
  designation,
  mobile,
  email,
  linkedin,
  github,
}) {
  return (
    <div className="w-full max-w-4xl bg-zinc-100/50 dark:bg-zinc-800 rounded-3xl shadow-md grid grid-cols-2 p-6 gap-3 items-start md:items-center justify-between">
      <h3 className="col-span-2 text-lg font-bold dark:text-white">{name}</h3>
      {/* Middle Content */}
      <div className="flex-1 text-center md:text-left space-y-2">
        <p className="text-sm ">{designation}</p>
        <p className="text-sm">Mobile: {mobile}</p>
      </div>

      {/* Right-Aligned Bottom Section */}
      <div className="flex flex-col items-end justify-end h-full self-stretch gap-2">
        <div className="flex gap-4 ">
          {/* LinkedIn */}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          )}

          {Github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <Github className="w-6 h-6" />
            </a>
          )}
        </div>
        {/* Email */}
        <a
          href={`mailto:${email}`}
          className="text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <Mail className="w-4 h-4" />
          <span className="hidden md:inline">{email}</span>
        </a>
      </div>
    </div>
  );
}
