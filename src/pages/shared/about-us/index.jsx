
import ReachUs from "./sections/ReachUs.jsx";
import TPCellMembers from "./sections/TPCellMembers.jsx";
import TPCellCoordinators from "./sections/TPCellCoordinators.jsx";


export default function AboutUs() {
  return (
    <main className="about-us max-w-[1980px] m-auto dark:bg-gray-900 grid gap-12">
      {/* Reach Us Heading */}
      <div className="header px-[5%] flex flex-col justify-center pt-12">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold">
          Reach Us
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          Reach out to the T&P Cell for career guidance and placement support
        </p>
      </div>
      <ReachUs/>
      {/* About us Heading*/}
      <div className="header px-[5%] flex flex-col justify-center mt-24">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
          Contact Us
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          Connect with Training and Placement Cell - Government Engineering
          College, Siwan
        </p>
      </div>

      <TPCellMembers />
      <TPCellCoordinators />
    </main>
  );
}


