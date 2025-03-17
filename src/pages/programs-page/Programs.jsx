import GooglesheetContext from "../../contexts/google-sheets/GooglesheetContext";
import { useContext, useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { Image } from "@heroui/react";

const Programs = () => {
  return (
    <section className="py-12 bg-gray-500/20 min-h-screen">
      <div className="max-w-[1920px] m-auto px-[5%]">
        <div className="tittle-bar flex items-center mb-[4em] gap-6">
          <h1 className="tittle-bar-heading text-xl sm:text-2xl md:text-3xl text-nowrap font-bold">
            Upcoming Programs
          </h1>
          <span className="bg-gray-500 h-[2px] w-full" />
        </div>
        <div className="cards-container snap snap-x snap-mandatory max-md:overflow-x-scroll  flex gap-[2em] md:flex-wrap ">
          {/* auto loop map function  */}
          <ProgramCards />
        </div>
      </div>
    </section>
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
    <div className="cards-container snap snap-x snap-mandatory max-md:overflow-x-scroll flex gap-[2em] md:flex-wrap ">
      {response.reverse().map((program, index) => {
        return (
          <div
            key={index}
            className="relative card bg-gray-500/10 border hover:border-1 border-gray-500/20  hover:border-sky-500/50 snap-center min-w-[20em] max-w-[24em] min-h-max transition-all duration-300 rounded-3xl overflow-hidden"
          >
            <Image
              className="card-image rounded-none object-cover aspect-video"
              src={program.image}
              alt="nature"
              width={400}
            />

            <div className="card-tag z-10 absolute top-[1em] right-[1em] rounded-3xl px-[0.5em] py-[0.2em] text-[14px]  bg-primary text-white">
              {program.tag}
            </div>
            <div className="card-content  p-[1em] ">
              <h2 className="card-title font-bold sm:text-lg">
                {program.tittle}
              </h2>
              <p className="card-description text-[14px] mb-[1em] text-gray-500">
                {program.description}
              </p>

              <div className="card_footer text-[14px] flex justify-between items-center">
                <div>
                  <span className="text-gray-500 text-[14px] flex items-center gap-1">
                    <FaClock />
                    {program.time}
                  </span>
                  <span className="text-gray-500  text-[14px] flex items-center  text-nowrap gap-1">
                    <FaLocationDot />
                    {program.location}
                  </span>
                </div>
                <a
                  href={program.google_form_link}
                  target="_blank"
                  className="text-primary text-[14px] font-bold flex items-center gap-2  mt-[1em]"
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
