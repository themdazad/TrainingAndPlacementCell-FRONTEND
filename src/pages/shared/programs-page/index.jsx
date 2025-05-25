import GooglesheetContext from "../../../hooks/contexts/google-sheets/GooglesheetContext";
import BreadCrumbs from "../../../components/ui/BreadCrumbs.jsx";
import { useContext, useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { Image } from "@heroui/react";

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Academics" },
  { label: "Programs", isCurrent: true }, // No `to` = current page
];
const Programs = () => {
  return (
    <main className="py-12 dark:bg-zinc-900 min-h-screen">
      <section className="header-section grid space-y-12">
              {/* Heading */}
              <div className="header px-[5%] flex flex-col justify-center">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold">
                  Programs
                </h1>
                <p className="mt-3 max-w-2xltext-zinc-600 dark:text-zinc-400">
                  Explore the academic strengths and career-driven curriculum of each
                  B.Tech branch.
                </p>
              </div>
      
              {/* breadcrumbs */}
              <div className="px-[5%]">
                <BreadCrumbs items={breadcrumbItems} />
              </div>
            </section>
      
      
      <section className="max-w-[1920px] m-auto px-[5%] py-24">
        <div className="cards-container snap snap-x snap-mandatory max-md:overflow-x-scroll  flex gap-[2em] md:flex-wrap ">
          {/* auto loop map function  */}
          <ProgramCards />
        </div>
      </section>
    </main>
  );
};

export default Programs;

export function ProgramCards() {
  const programData = useContext(GooglesheetContext);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    if (programData) {
      setResponse(programData);
    } else {
      setResponse([]);
    }
  }, [programData]);

  return (
    <div className="cards-container snap snap-x snap-mandatory max-md:overflow-x-scroll flex gap-[2em] md:flex-wrap">
      {response.reverse().map((program, index) => {
        return (
          <div
            key={index}
            className="relative card border hover:border-1  dark:bg-zinc-800/20 dark:border-zinc-900  snap-center min-w-[20em] max-w-[24em] min-h-max transition-all duration-300 rounded-3xl overflow-hidden"
          >
            <Image
              className="card-image rounded-none object-cover aspect-video"
              src={program.image}
              alt="nature"
              width={400}
            />

            <div className="card-tag z-10 absolute top-[1em] right-[1em] rounded-3xl px-[0.5em] py-[0.2em] text-[14px] bg-primary text-white dark:bg-primary-dark">
              {program.tag}
            </div>

            <div className="card-content p-[1em]">
              <h2 className="card-title font-bold sm:text-lg text-zinc-900 dark:text-white">
                {program.tittle}
              </h2>
              <p className="card-description text-[14px] mb-[1em] text-zinc-500 dark:text-zinc-300">
                {program.description}
              </p>

              <div className="card_footer text-[14px] flex justify-between items-center">
                <div>
                  <span className="text-zinc-500 text-[14px] flex items-center gap-1 dark:text-zinc-400">
                    <FaClock />
                    {program.time}
                  </span>
                  <span className="text-zinc-500 text-[14px] flex items-center text-nowrap gap-1 dark:text-zinc-400">
                    <FaLocationDot />
                    {program.location}
                  </span>
                </div>

                <a
                  href={program.google_form_link}
                  target="_blank"
                  className="text-primary text-[14px] font-bold flex items-center gap-2 mt-[1em] hover:text-sky-500 dark:hover:text-sky-400"
                >
                  {!program.link ? "Know More" : "Date Over"}
                  <CirclePlus />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
