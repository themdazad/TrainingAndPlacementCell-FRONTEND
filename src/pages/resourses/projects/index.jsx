import { useState } from "react";
import "./projects.css";

const projectsData = [
  {
    id: 1,
    title: "AI-Based Fire Detection System",
    description:
      "A smart surveillance system that detects fire and smoke using AI image processing techniques in real-time CCTV feeds. Built using Python and TensorFlow.",
    image:
      "https://th.bing.com/th/id/OIP.ng5ENi7AqsCASwqhe08ncQHaEO?cb=iwp2&rs=1&pid=ImgDetMain",
    date: "2024-03-10",
  },
  {
    id: 2,
    title: "Voice Controlled Wheelchair",
    description:
      "An assistive device that moves based on voice commands, designed for physically challenged individuals. Built using Arduino, Bluetooth module, and speech recognition module.",
    image:
      "https://i0.wp.com/techacute.com/wp-content/uploads/2017/09/Panasonic-Haneda-Whill-Next-Airport-Mobility-Support-Wheelchair-Robotic-Autonomous-Self-Driving-Tandem-Single-File-Navigation-App-Smartphone-Staff-Help.jpg?fit=800%2C480&ssl=1",
    date: "2024-04-25",
  },
  {
    id: 3,
    title: "Water Quality Monitoring System",
    description:
      "An IoT system that monitors pH, turbidity, and temperature of water in real time and sends alerts for abnormalities. Developed using NodeMCU and various sensors.",
    image:
      "https://www.aquas.com.tw/files/Aquaculture%20Water%20Quality-e-1.jpg",
    date: "2023-12-12",
  },
  {
    id: 4,
    title: "Smart Blind Stick",
    description:
      "An ultrasonic sensor-based stick that detects nearby obstacles and alerts the visually impaired with vibrations and buzzer sounds.",
    image:
      "https://s.yimg.com/uu/api/res/1.2/fJolK2ywu8mzzytlMFMVbQ--~B/aD01NDA7dz05NjA7c209MTthcHBpZD15dGFjaHlvbg--/http://media.zenfs.com/en-US/video/video.reutersnews.com/2014-07-21T145950Z_1_LOVEA6K15NP8U_RTRMADP_BASEIMAGE-960X540_TECHNOLOGY-SMARTCANE-O.JPG",
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
      "https://th.bing.com/th/id/OIP.m7i7puC37Gy7jXSNO4LsygHaEK?cb=iwp2&rs=1&pid=ImgDetMain",
    date: "2023-10-18",
  },
];



const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 6;

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
        <p className="md:text-lg text-center mt-4 max-w-2xl">
        Our Student&apos;s
        </p>
        <h1 className="text-4xl lg:text-6xl font-bold text-center">PROJECTS</h1>
        <p className="text-center mt-3 max-w-2xl">
          Explore our student's projects and initiatives that showcase our commitment to
          excellence and innovation.
        </p>
      </div>

      {/* Search and Sort */}
      <div className=" px-[5%] mt-4  flex justify-between">
        <div className="flex gap-12 items-center justify-between ">
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
              className="w-full aspect-[16/9] object-cover"
            />
            <div className="p-4 flex-grow">
              <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
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
            Previous
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
           Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
