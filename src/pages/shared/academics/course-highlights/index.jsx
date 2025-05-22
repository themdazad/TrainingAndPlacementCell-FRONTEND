
const CourseHighlights = () => {
  return (
    <section className="max-w-[1980px] px-[5%] mx-auto text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
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

      {/* available branch */}
      <div className="mt-4 border-t-3 border-t-blue-500 flex flex-col py-6 gap-4">
        <h2 className="text-lg sm:text-lg lg:text-2xl font-bold">
          Available Branches
        </h2>
        <ul className="list-inside grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <li className="bg-blue-500/10 p-4 rounded-3xl">
            Electrical Engineering
          </li>
          <li className="bg-blue-500/10 p-4 rounded-3xl">
            Mechanical Engineering
          </li>
          <li className="bg-blue-500/10 p-4 rounded-3xl">Civil Engineering</li>
          <li className="bg-blue-500/10 p-4 rounded-3xl">
            Computer Science and Engineering
          </li>
          <li className="bg-blue-500/10 p-4 rounded-3xl">
            Computer Science and Engineering (IoT)
          </li>
          <li className="bg-blue-500/10 p-4 rounded-3xl">
            Electronics Engineering (VLSI)
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CourseHighlights;
