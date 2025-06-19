import PageHeader from "../../../../../components/ui/PageHeader.jsx";
import BranchSection from "../../../components/academics/course-highlights/BranchSection.jsx";

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Academics" },
  { label: "Course Highlights", isCurrent: true }, // No `to` = current page
];

const branches = [
  {
    title: "Electrical Engineering",
    description:
      "The Electrical Engineering program at our institute is designed to equip students with a strong foundation in electrical systems, electronics, and power engineering. The curriculum emphasizes both theoretical knowledge and practical skills, preparing graduates for diverse careers in industries such as power generation, automation, and telecommunications.",
    stats: [
      { label: "Intake Capacity", value: "60" },
      { label: "Placed Students", value: "55+" },
      { label: "Average Package", value: "4 LPA" },
      { label: "Highest Package", value: "10 LPA+" },
    ],
  },
  {
    title: "Mechanical Engineering",
    description:
      "The Mechanical Engineering program provides a strong grounding in mechanics, thermodynamics, and materials science. Students graduate prepared for dynamic roles in automotive, aerospace, manufacturing, and energy sectors.",
    stats: [
      { label: "Intake Capacity", value: "60" },
      { label: "Placed Students", value: "52+" },
      { label: "Average Package", value: "3.8 LPA" },
      { label: "Highest Package", value: "9 LPA" },
    ],
  },
  {
    title: "Computer Science and Engineering",
    description:
      "The Computer Science and Engineering program focuses on software development, algorithms, and data structures. It prepares students for careers in software engineering, data science, and cybersecurity.",  
    stats: [
      { label: "Intake Capacity", value: "60" },
      { label: "Placed Students", value: "-" },
      { label: "Average Package", value: "-" },
      { label: "Highest Package", value: "-" },
    ],
  },
  // Add more branches similarly
];
const CourseHighlights = () => {
  return (
    <main className="course-highlights">

      <div className="max-w-screen-2xl px-[2.5%] m-auto grid py-6 gap-12">
        {/* Header */}
        <PageHeader
          title={" Course Highlights"}
          description={
            "Explore the academic strengths and career-driven curriculum of each B.Tech branch"
          }
          breadcrumbItems={breadcrumbItems}
        />

        {/* Main Content */}
        <section className="space-y-[120px]">
          {branches.map((branch, index) => (
            <BranchSection
              key={branch.title}
              title={branch.title}
              description={branch.description}
              stats={branch.stats}
              reverse={index % 2 !== 0}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default CourseHighlights;
