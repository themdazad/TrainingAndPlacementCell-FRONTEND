
import {} from "lucide-react";

const CourseHighlights = () => {
  return (
    <section className="max-w-[1980px] px-[5%] mx-auto text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="header flex flex-col  justify-center py-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase">
          Bachelor of Technology
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          Our institute's B.Tech curriculum is intended to generate engineers
          who are prepared for the workforce by providing them with solid
          fundamental knowledge and real-world expertise in their chosen
          subject.
        </p>
      </div>

      {/* available branch */}
      <div className="mt-4 border-t-3 border-t-sky-500 rounded-xl flex flex-col py-6 gap-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
          Available Branches
        </h2>
        <ul className="list-inside grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <li className="bg-sky-500/10 p-4 rounded-xl">
            Electrical Engineering
          </li>
          <li className="bg-sky-500/10 p-4 rounded-xl">
            Mechanical Engineering
          </li>
          <li className="bg-sky-500/10 p-4 rounded-xl">Civil Engineering</li>
          <li className="bg-sky-500/10 p-4 rounded-xl">
            Computer Science and Engineering
          </li>
          <li className="bg-sky-500/10 p-4 rounded-xl">
            Computer Science and Engineering (IoT)
          </li>
          <li className="bg-sky-500/10 p-4 rounded-xl">
            Electronics Engineering (VLSI)
          </li>
        </ul>
      </div>
     
    </section>
  );
};

export default CourseHighlights;
