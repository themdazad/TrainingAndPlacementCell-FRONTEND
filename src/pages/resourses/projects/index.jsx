import { useState } from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import "./projects.css";

const projectsData = [
  {
    id: 1,
    title: "AI-Based Fire Detection System",
    description:
      "A smart surveillance system that detects fire and smoke using AI image processing techniques in real-time CCTV feeds. Built using Python and TensorFlow.",
    image:
      "https://images.unsplash.com/photo-1617196038436-bd041ce2000e?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-10",
  },
  {
    id: 2,
    title: "Voice Controlled Wheelchair",
    description:
      "An assistive device that moves based on voice commands, designed for physically challenged individuals. Built using Arduino, Bluetooth module, and speech recognition module.",
    image:
      "https://images.unsplash.com/photo-1606813909357-6613c21a83aa?auto=format&fit=crop&w=800&q=80",
    date: "2024-04-25",
  },
  {
    id: 3,
    title: "Water Quality Monitoring System",
    description:
      "An IoT system that monitors pH, turbidity, and temperature of water in real time and sends alerts for abnormalities. Developed using NodeMCU and various sensors.",
    image:
      "https://images.unsplash.com/photo-1518551933037-241d176b1985?auto=format&fit=crop&w=800&q=80",
    date: "2023-12-12",
  },
  {
    id: 4,
    title: "Smart Blind Stick",
    description:
      "An ultrasonic sensor-based stick that detects nearby obstacles and alerts the visually impaired with vibrations and buzzer sounds.",
    image:
      "https://images.unsplash.com/photo-1582719478177-2f6b284d5439?auto=format&fit=crop&w=800&q=80",
    date: "2023-11-03",
  },
  {
    id: 5,
    title: "Smart Farming Using IoT",
    description:
      "An IoT-based farming system that monitors soil moisture, temperature, and humidity, and auto-activates irrigation based on thresholds. Mobile app integrated.",
    image:
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
    date: "2024-05-05",
  },
  {
    id: 6,
    title: "Automatic Room Light Controller with Visitor Counter",
    description:
      "An embedded system that automatically turns lights on/off and keeps track of the number of people entering/exiting a room using IR sensors and microcontrollers.",
    image:
      "https://images.unsplash.com/photo-1616627981734-67292f2f1093?auto=format&fit=crop&w=800&q=80",
    date: "2023-10-18",
  },
];



const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 4;

  // Filter and sort
  const filteredProjects = projectsData
    .filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <section className="max-w-[1980px] mx-auto">
      {/* Header */}
      <div className="header bg-slate-200- h-[370px] flex flex-col items-center justify-center">
        <p className="text-lg text-center mt-4 max-w-2xl">
        Our Student
        </p>
        <h1 className="text-3xl font-bold text-center">PROJECTS</h1>
        <p className="text-lg text-center mt-3 max-w-2xl">
          Explore our student's projects and initiatives that showcase our commitment to
          excellence and innovation.
        </p>
      </div>

      {/* Search and Sort */}
      <div className=" px-[5%] mt-4 gap-4 flex justify-between">
      <span></span>
        <div className="flex flex-col md:flex-row items-center justify-between ">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset page on search
            }}
            className="w-full md:w-[60%] p-2 px-4 border  rounded-[30px] "
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full md:w-[30%] p-2 border rounded-[30px]"
          >
            <option value="newest">Sort by Newest</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-8 px-[5%] py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {currentProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-gray-100/50 rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 flex flex-col"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-grow">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 ">{project.description}</p>
            </div>

            <button className="group-hover:text-gray-100 translate-y-full group-hover:translate-y-0 group-hover:bg-blue-600 px-4 py-2  w-full transition">
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mb-12">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
          >
            <CircleArrowLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-4 py-2 border rounded-full ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50"
          >
            <CircleArrowRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
