import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "./projectsData";
import { FaLinkedin } from "react-icons/fa";
import { Divider } from "@heroui/react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Project not found.
      </div>
    );
  }

  const leader =
    project.team?.find((member) =>
      member.role.toLowerCase().includes("lead")
    ) || project.team?.[0];

  return (
    <motion.div
      className="p-6 md:p-10 max-w-6xl mx-auto text-gray-800 dark:text-gray-100"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      {/* Title & Description */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-2 text-center text-blue-700 dark:text-blue-400"
        variants={fadeInUp}
      >
        {project.title}
      </motion.h1>
      <motion.p
        className="text-center text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
        variants={fadeInUp}
      >
        {project.description}
      </motion.p>

      {/* Project Image */}
      <motion.div className="mb-10" variants={fadeInUp}>
        <img
          src={project.image}
          alt={`${project.title} visual`}
          className="w-full rounded-xl shadow-md object-cover"
        />
      </motion.div>

      {/* Objectives & Benefits */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 mb-10"
        variants={fadeInUp}
      >
        <div>
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
            Objectives
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            {project.objectives.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
            Benefits
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            {project.benefits.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Challenges */}
      <motion.div className="mb-10" variants={fadeInUp}>
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
          Challenges
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          {project.challenges.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </motion.div>

      {/* Technologies and Future Goals */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 mb-10"
        variants={fadeInUp}
      >
        <div>
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologyStack.map((tech, i) => (
              <span
                key={i}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
            Future Goal
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {project.futureGoal}
          </p>
        </div>
      </motion.div>

      <Divider className="my-10 border-gray-300 dark:border-gray-700" />

      {/* Project Leader */}
      <motion.div className="mb-10" variants={fadeInUp}>
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
          Project Leader
        </h2>
        {leader && (
          <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <img
              src={leader.photo}
              alt={leader.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{leader.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {leader.branch} • {leader.session}
              </p>
              <p className="text-sm text-gray-500">
                Reg. No: {leader.registrationNo}
              </p>
              <a
                href={leader.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-1 text-blue-600 dark:text-blue-300 hover:underline text-sm"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </div>
        )}
      </motion.div>

      {/* Team Members */}
      {project.team.length > 1 && (
        <motion.div className="mb-10" variants={fadeInUp}>
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            Team Members
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.team
              .filter((member) => member.name !== leader.name)
              .map((member, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md flex items-center gap-4"
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-base">{member.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-500">
                      {member.branch} • {member.session}
                    </p>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 dark:text-blue-300 hover:underline inline-flex items-center gap-1 text-sm mt-1"
                    >
                      <FaLinkedin className="text-base" /> LinkedIn
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}

      {/* Download Button */}
      <motion.div className="text-center mt-10" variants={fadeInUp}>
        <a
          href={project.pptLink}
          download
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
        >
          Download Project PPT
        </a>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetailsPage;
