import { useState } from "react";

const branchesData = {
  "Electrical Engineering": {
    description:
      "Electrical Engineering focuses on the study and application of electricity, electronics, and electromagnetism. Students learn about power generation, transmission, and electrical machines.",
    courses: [
      "Circuit Analysis",
      "Power Systems",
      "Control Systems",
      "Electrical Machines",
      "Renewable Energy",
    ],
    careerOptions: [
      "Power Engineer",
      "Electrical Design Engineer",
      "Control Systems Engineer",
      "Energy Consultant",
    ],
  },
  "Mechanical Engineering": {
    description:
      "Mechanical Engineering involves the design, analysis, manufacturing, and maintenance of mechanical systems. It is one of the broadest engineering disciplines.",
    courses: [
      "Thermodynamics",
      "Fluid Mechanics",
      "Machine Design",
      "Heat Transfer",
      "Manufacturing Processes",
    ],
    careerOptions: [
      "Mechanical Design Engineer",
      "Automotive Engineer",
      "Project Manager",
      "Maintenance Engineer",
    ],
  },
  "Civil Engineering": {
    description:
      "Civil Engineering focuses on the design, construction, and maintenance of infrastructure such as roads, bridges, buildings, and water supply systems.",
    courses: [
      "Structural Analysis",
      "Geotechnical Engineering",
      "Transportation Engineering",
      "Environmental Engineering",
      "Construction Management",
    ],
    careerOptions: [
      "Structural Engineer",
      "Site Engineer",
      "Urban Planner",
      "Project Engineer",
    ],
  },
  "Computer Science and Engineering": {
    description:
      "This branch covers the fundamentals of computer science, including software development, algorithms, data structures, and systems programming.",
    courses: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Database Systems",
      "Software Engineering",
      "Artificial Intelligence",
    ],
    careerOptions: [
      "Software Developer",
      "System Analyst",
      "Data Scientist",
      "AI Engineer",
    ],
  },
  "Computer Science and Engineering (IoT)": {
    description:
      "This specialization focuses on Internet of Things (IoT) technologies, combining hardware and software skills to develop connected devices.",
    courses: [
      "Embedded Systems",
      "IoT Protocols",
      "Wireless Networks",
      "Sensor Networks",
      "Cloud Computing",
    ],
    careerOptions: [
      "IoT Developer",
      "Embedded Systems Engineer",
      "Network Engineer",
      "IoT Solution Architect",
    ],
  },
  "Electronics Engineering (VLSI)": {
    description:
      "Electronics Engineering with a focus on VLSI involves the design and fabrication of integrated circuits and microchips.",
    courses: [
      "Digital Electronics",
      "Analog Circuits",
      "VLSI Design",
      "Microprocessors",
      "Signal Processing",
    ],
    careerOptions: [
      "VLSI Design Engineer",
      "Chip Designer",
      "Embedded Systems Engineer",
      "Signal Processing Engineer",
    ],
  },
};

const syllabusLinks = {
  1: "https://example.com/syllabus-sem1.pdf",
  2: "https://example.com/syllabus-sem2.pdf",
  3: "https://example.com/syllabus-sem3.pdf",
  4: "https://example.com/syllabus-sem4.pdf",
  5: "https://example.com/syllabus-sem5.pdf",
  6: "https://example.com/syllabus-sem6.pdf",
  7: "https://example.com/syllabus-sem7.pdf",
  8: "https://example.com/syllabus-sem8.pdf",
};

const CourseHighlights = () => {
  const [openBranch, setOpenBranch] = useState(null);

  const toggleBranch = (branch) => {
    setOpenBranch(openBranch === branch ? null : branch);
  };

  return (
    <section className="max-w-[1980px] px-[5%] mx-auto min-h-screen text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="header flex flex-col justify-center py-12">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold">
          Bachelor of Technology
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          Our B.Tech curriculum is designed to give students a strong foundation
          in engineering along with the practical skills they need to succeed in
          their chosen field.
        </p>
      </div>

      {/* Available Branches Accordion */}
      <div className="mt-4 border-t-3 border-t-blue-500 py-6 max-w-4xl mx-auto">
        <h2 className="text-lg sm:text-lg lg:text-2xl font-bold mb-4">
          Available Branches
        </h2>
        <div className="divide-y divide-gray-300 dark:divide-gray-700">
          {Object.entries(branchesData).map(([branch, details]) => (
            <div key={branch}>
              <button
                onClick={() => toggleBranch(branch)}
                className={`w-full text-left p-4 rounded-3xl mb-2 flex justify-between items-center
                  ${
                    openBranch === branch
                      ? "bg-blue-500 text-white"
                      : "bg-blue-500/10 text-gray-900 dark:text-gray-100 hover:bg-blue-500/20"
                  }`}
                aria-expanded={openBranch === branch}
              >
                <span className="font-semibold text-lg">{branch}</span>
                <span className="text-2xl font-bold select-none">
                  {openBranch === branch ? "−" : "+"}
                </span>
              </button>

              {openBranch === branch && (
                <div className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 mb-8">
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    {details.description}
                  </p>

                  <h4 className="font-bold text-lg mb-2">Core Courses:</h4>
                  <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
                    {details.courses.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>

                  <h4 className="font-bold text-lg mb-2">
                    Career Opportunities:
                  </h4>
                  <ul className="list-disc l  ist-inside text-gray-700 dark:text-gray-300">
                    {details.careerOptions.map((career) => (
                      <li key={career}>{career}</li>
                    ))}
                  </ul>

                  {/* Syllabus Download Section */}
                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold mb-4">
                      Download Syllabus
                    </h3>
                    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {Object.entries(syllabusLinks).map(([sem, link]) => (
                        <li key={sem}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
                            download
                          >
                            Semester {sem}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseHighlights;
