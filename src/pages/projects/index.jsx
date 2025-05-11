import { useState } from "react";
import { slugify } from "../../utils/slugify";
import "./projects.css";
import { projects } from "./projectsData"; // Your project data source
import { NavLink } from "react-router-dom";

export const projectsData = projects;

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 8; // Number of projects per page

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
      <div className="header bg-slate-200 h-[370px] flex flex-col items-center justify-center">
        <p className="md:text-lg text-center mt-4 max-w-2xl">
          Our Student&apos;s
        </p>
        <h1 className="text-4xl lg:text-6xl font-bold text-center">PROJECTS</h1>
        <p className="text-center mt-3 max-w-2xl">
          Explore our student's projects and initiatives that showcase our
          commitment to excellence and innovation.
        </p>
      </div>

      {/* Search and Sort */}
      <div className="px-[5%] mt-4 flex justify-between">
        <div className="flex gap-12 items-center justify-between">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset page on search
            }}
            className="w-full md:w-[60%] p-2 px-4 border rounded-[30px]"
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
        {currentProjects.map((project) => {
          // Assuming the project leader is the first member or can be identified
          const leader = project.team[0]; // Change this logic if the leader has a specific field like isLeader

          return (
            <NavLink to={`${slugify(project.title)}/${project.id}`}
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
                <p className="text-neutral-500">
                  {project.description.split(" ").length > 25
                    ? project.description.split(" ").slice(0, 25).join(" ") +
                      "..."
                    : project.description}

                    <span className="text-neutral-500 px-3 group-hover:underline underline-offset-4">Read more</span>
                </p>

                {/* Render Project Leader Details */}
                <div className="mt-4">
                  <h3 className="font-semibold">Project Leader:</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <img
                      src={leader.photo}
                      alt={leader.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{leader.name}</p>
                      <p className="text-xs text-gray-400">
                        {leader.branch} | {leader.registrationNo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
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
