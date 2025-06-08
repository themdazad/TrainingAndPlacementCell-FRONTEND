import { useState } from "react";
import { slugify } from "../../../utils/slugify";
import "./projects.css";
import { projects } from "./projectsData";
import { NavLink } from "react-router-dom";
import { Image } from "@heroui/react";
import {
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  ArrowRightCircle as ArrowRightCircleIcon,
} from "lucide-react"; // ✅ Use correct Lucide imports
import PageHeader from "../../../components/ui/PageHeader.jsx";

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
    <main>
      <section className="max-w-screen-2xl px-[2.5%] mx-auto">
        <PageHeader
          title={"Projects"}
          description={
            "  Explore our student's projects and initiatives that showcase our commitment to excellence and innovation."
          }
          breadcrumbItems={[
            { label: "Home", to: "/" },
            { label: "Projects", to: "/projects", isCurrent: true }, // No `to` = current page
          ]}
        />

        {/* Search and Sort */}
        <div className="mt-4 flex flex-col sm:flex-row justify-end items-center gap-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-[14em] p-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-[30px]"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full md:w-[14em] p-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-[30px]"
          >
            <option value="newest">Sort by Newest</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
        </div>

        {/* Cards Container */}
        <div className="cards-container snap snap-x snap-mandatory max-md:overflow-x-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
          {currentProjects.map((project) => {
            const leader = project.team?.[0];
            return (
              <NavLink
                key={project.id}
                to={`${slugify(project.title)}/${project.id}`}
                className="relative rounded-xl card hover:border-t-4  border-blue-500 dark:border-zinc-800 bg-white dark:bg-zinc-900 snap-center min-w-[16em] max-w-[24em] transition-all duration-100 overflow-hidden flex-shrink-0 shadow-sm hover:shadow-md"
              >
                <Image
                  className="object-cover rounded-none aspect-video w-full"
                  src={project.image}
                  alt={project.title}
                  width={400}
                />

                <div className="p-4 flex flex-col">
                  {/* Title */}
                  <h2 className="font-semibold text-lg text-zinc-800 dark:text-white mb-1">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                    {project.description.split(" ").slice(0, 15).join(" ")}...
                  </p>

                  {/* Team Leader Info */}
                  {leader && (
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-400 dark:border-zinc-700">
                      <div className="flex items-center gap-2 pt-2">
                        <div>
                          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                            {leader.name}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {leader.branch} | {leader.registrationNo}
                          </p>
                        </div>
                      </div>

                      {/* Read More link */}
                      <div className="pt-2">
                        <span className="text-blue-500 hover:text-blue-500 font-medium text-sm inline-flex items-center">
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
              className="px-3 py-1 border rounded-full disabled:opacity-50 bg-zinc-200 dark:bg-zinc-700"
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
                    : "bg-zinc-200 dark:bg-zinc-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-full disabled:opacity-50 bg-zinc-200 dark:bg-zinc-700"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Projects;
