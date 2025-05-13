import { useState } from "react";
import { slugify } from "../../utils/slugify";
import "./projects.css";
import { projects } from "./projectsData";
import { NavLink } from "react-router-dom";
import { Image } from "@heroui/react";
import {
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  ArrowRightCircle as ArrowRightCircleIcon,
} from "lucide-react"; // ✅ Use correct Lucide imports

export const projectsData = projects;

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 6;

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
    <section className="max-w-[1980px] mx-auto text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="header bg-slate-200 dark:bg-gray-800 h-[370px] flex flex-col items-center justify-center text-center px-4">
        <p className="md:text-lg mt-4 max-w-2xl text-gray-700 dark:text-gray-300">
          Our Student&apos;s
        </p>
        <h1 className="text-4xl lg:text-6xl font-bold">PROJECTS</h1>
        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          Explore our student's projects and initiatives that showcase our
          commitment to excellence and innovation.
        </p>
      </div>

      {/* Search and Sort */}
      <div className="px-[5%] mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-[60%] p-2 px-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-[30px]"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full md:w-[30%] p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-[30px]"
        >
          <option value="newest">Sort by Newest</option>
          <option value="oldest">Sort by Oldest</option>
        </select>
      </div>

      {/* Cards */}
      <div className="cards-container snap snap-x snap-mandatory max-md:overflow-x-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 px-[5%] py-8">
        {currentProjects.map((project) => {
          const leader = project.team?.[0];
          return (
            <NavLink
              key={project.id}
              to={`${slugify(project.title)}/${project.id}`}
              className="relative card border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 snap-center min-w-[20em] max-w-[24em] transition-all duration-300 rounded-3xl overflow-hidden flex-shrink-0 shadow-sm hover:shadow-md"
            >
              <Image
                className="object-cover aspect-video w-full"
                src={project.image}
                alt={project.title}
                width={400}
              />

              <div className="p-4 flex flex-col">
                {/* Title */}
                <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-1">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                  {project.description.split(" ").slice(0, 25).join(" ")}...
                </p>

                {/* Team Leader Info */}
                {leader && (
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 pt-2">
                      <img
                        src={leader.photo}
                        alt={leader.name}
                        className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                          {leader.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {leader.branch} | {leader.registrationNo}
                        </p>
                      </div>
                    </div>

                    {/* Read More link */}
                    <div className="pt-2">
                      <span className="text-blue-600 hover:text-blue-500 font-medium text-sm inline-flex items-center">
                        Read More
                        <ArrowRightCircleIcon className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </NavLink>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 py-12 text-sm">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-full disabled:opacity-50 bg-gray-200 dark:bg-gray-700"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-4 py-2 border rounded-full ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-full disabled:opacity-50 bg-gray-200 dark:bg-gray-700"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
