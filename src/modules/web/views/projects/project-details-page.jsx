import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../../data/projectsData.js";
import PageHeader from "../../../../components/PageHeader.jsx";

// Fade-in animation configuration
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
// Main Content Component
const MainContent = ({ project, leader }) => {
  return (
     
    <motion.article
      className="prose dark:prose-invert flex-1 max-w-none"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.h1 className="text-3xl font-semibold mb-2" variants={fadeIn}>
        {project.title}
      </motion.h1>


      <motion.img
        src={project.image || "/default-project.png"}
        alt={project.title}
        className="rounded-xl w-full my-6 shadow-md"
        variants={fadeIn}
      />

      <motion.p className="leading-relaxed" variants={fadeIn}>
        {project.description}
      </motion.p>

      <motion.h2
        className="text-2xl font-semibold pt-6 pb-3 border-b dark:border-slate-700"
        id="objectives"
        variants={fadeIn}
      >
        Why This Project?
      </motion.h2>
      <motion.ul
        className="list-disc pl-5 mt-2 leading-relaxed"
        variants={fadeIn}
      >
        {project.objectives.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </motion.ul>

      <motion.h2
        className="text-2xl font-semibold pt-6 pb-3 border-b dark:border-slate-700"
        id="challenges"
        variants={fadeIn}
      >
        The Journey
      </motion.h2>
      <motion.ul
        className="list-disc pl-5 mt-2 leading-relaxed"
        variants={fadeIn}
      >
        {project.challenges.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </motion.ul>

      <motion.h2
        className="text-2xl font-semibold pt-6 pb-3 border-b dark:border-slate-700"
        id="benefits"
        variants={fadeIn}
      >
        Outcomes & Benefits
      </motion.h2>
      <motion.ul
        className="list-disc pl-5 mt-2 leading-relaxed"
        variants={fadeIn}
      >
        {project.benefits.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </motion.ul>

      <motion.h2
        className="text-2xl font-semibold pt-6 pb-3 border-b dark:border-slate-700"
        id="tech"
        variants={fadeIn}
      >
        Technologies Used
      </motion.h2>
      <motion.div className="flex flex-wrap gap-3 mt-2" variants={fadeIn}>
        {project.technologyStack.map((tech, i) => (
          <span
            key={i}
            className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
          >
            {tech}
          </span>
        ))}
      </motion.div>

      <motion.h2
        className="text-2xl font-semibold pt-6 pb-3 border-b dark:border-slate-700"
        id="future"
        variants={fadeIn}
      >
        What’s Next?
      </motion.h2>
      <motion.p className="leading-relaxed mt-2" variants={fadeIn}>
        {project.futureGoal}
      </motion.p>

      {project.pptLink && (
        <motion.div className="mt-8 text-center" variants={fadeIn}>
          <a
            href={project.pptLink}
            download
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-md"
          >
            Download Presentation
          </a>
        </motion.div>
      )}
    </motion.article>
  
  );
};

// Sidebar Component
const Sidebar = ({ project, leader }) => {
  return (
    <aside className="hidden lg:block sticky top-28 h-max">
      <div className="bg-slate-50 dark:bg-slate-800 border-t-4  border-blue-500 p-6 rounded-xl">
        <div className="mt-8 border-t dark:border-slate-700 pt-6">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Project Leader
          </h4>
          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
            {leader.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {leader.branch}, {leader.session}
          </p>
        </div>

        <div className="mt-6 border-t dark:border-slate-700 pt-6">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Team Members
          </h4>
          <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
            {project.team.map((member, idx) => (
              <li key={idx}>
                <p className="font-medium">{member.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {member.role} ({member.branch})
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          {project.team.length} team member{project.team.length > 1 ? "s" : ""}
        </div>
      </div>
    </aside>
  );
};

// Main Page Component
const ProjectDetailsPage = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl font-semibold">
        Project not found.
      </div>
    );
  }

  const leader =
    project.team?.find((m) => m.role?.toLowerCase().includes("lead")) ||
    project.team?.[0];

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen py-6">
         <div className="max-w-screen-2xl m-auto px-[2%]">
        <PageHeader
          breadcrumbItems={[
            { label: "Home", to: "/" },
            { label: "Projects", to: "/projects", isCurrent: true }, // No `to` = current page
          ]}
        />
        <div className="w-full mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar on the right */}
            <Sidebar project={project} leader={leader} />
            {/* Main Content */}
            <MainContent project={project} leader={leader} />

          </div>
        </div>
        </div>
    </div>
  );
};

export default ProjectDetailsPage;
