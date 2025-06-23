import "./projects.css";
import { useState } from "react";
import { Image } from "@heroui/react";
import { NavLink } from "react-router-dom";
import { slugify } from "../../../../utils/slugify";
import { ArrowRightCircle as ArrowRightCircleIcon } from "lucide-react";
import PageHeader from "../../../../components/PageHeader.jsx";
import { projects } from "../../../../assets/data/projectsData";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 4;

  const filteredProjects = projects
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
          title="Projects"
          description="Explore our student's projects and initiatives that showcase our commitment to excellence and innovation."
          breadcrumbItems={[
            { label: "Home", to: "/" },
            { label: "Projects", to: "/projects", isCurrent: true },
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
            className="w-full md:w-[14em] p-3 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-full"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full md:w-[14em] p-3 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-full"
          >
            <option value="newest">Sort by Newest</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
          {currentProjects.map((project) => {
            const leader = project.team?.[0];
            return (
              <NavLink
                key={project.id}
                to={`${slugify(project.title)}/${project.id}`}
                className="rounded-xl border border-transparent hover:border-blue-500 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
              >
                <Image
                  className="object-cover aspect-video w-full"
                  src={project.image}
                  alt={project.title}
                  width={400}
                />

                <div className="p-4 flex flex-col gap-2">
                  <h2 className="font-semibold text-lg text-neutral-800 dark:text-white">
                    {project.title}
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {project.description.split(" ").slice(0, 15).join(" ")}...
                  </p>

                  {leader && (
                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 mt-auto text-sm">
                      <p className="font-medium text-neutral-800 dark:text-neutral-100">
                        {leader.name}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {leader.branch} | {leader.registrationNo}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 text-blue-500 hover:text-blue-600 font-medium text-sm inline-flex items-center">
                    Read More
                    <ArrowRightCircleIcon className="w-4 h-4 ml-1" />
                  </div>
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
              className="px-3 py-1 border rounded-full disabled:opacity-50 bg-neutral-200 dark:bg-neutral-700"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-4 py-2 border rounded-full transition-colors duration-200 ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-neutral-200 dark:bg-neutral-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-full disabled:opacity-50 bg-neutral-200 dark:bg-neutral-700"
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
