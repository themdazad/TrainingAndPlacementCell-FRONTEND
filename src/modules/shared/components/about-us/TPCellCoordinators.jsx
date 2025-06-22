
import { Linkedin, Github, Mail } from "lucide-react";

const coordinators = [
  {
    name: "Md. Azad",
    designation: "Electrical Engineering",
    mobile: "+91 9110172886",
    email: "collezian@gmail.com",
    linkedin: "https://www.linkedin.com/in/themdazad",
  },
  {
    name: "Abhishek Kumar Singh",
    designation: "Mechanical Engineering",
    mobile: "+91 8804080749",
    email: "abhishek.gecs@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhishek-kumar-singh-8312a931b",
  },
  {
    name: "Abhinav Kumar",
    designation: "Electrical Engineering",
    mobile: "",
    email: "",
    linkedin: "#",
  },
  {
    name: "Anupam Kumar",
    designation: "Electrical Engineering",
    mobile: "",
    email: "",
    linkedin: "#",
  },
  {
    name: "Shahnoor Ishtiyaque",
    designation: "CSE (IoT)",
    mobile: "",
    email: "",
    linkedin: "#",
  },
];

export default function TPCellCoordinators() {
  return (
    <section className="m-auto grid grid-cols-1 gap-6">
      <div className="members p-4 rounded-3xl">
        {/* Section Title */}
        <div className="title  text-center py-12">
          <h1 className="text-xl md:text-3xl font-extrabold">
            T&P Coordinators
          </h1>
          <p>
            Have questions about placements or internships? We’re here to help!
          </p>
        </div>

        {/* Coordinator Details */}
        <div className="members-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {coordinators.map((coordinator, index) => (
            <Card
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

export function Card({
  name,
  designation,
  mobile,
  email,
  linkedin,
  github,
}) {
  return (
    <div className="w-full max-w-4xl bg-neutral-100/50 dark:bg-neutral-800 rounded-3xl shadow-md  space-y-2 p-6 gap-3 ">
      <h3 className="text-center text-lg font-bold">{name}</h3>
      <p className="text-center">{designation}</p>

      <div className="social-media-links flex items-center justify-center gap-4">
       {mobile && <p className="text-sm flex text-nowrap">Contact: {mobile}</p>}
        <div className="flex items-center gap-4 ">
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
          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <Mail className="w-6 h-6" />
            <span className="hidden md:inline">{email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
