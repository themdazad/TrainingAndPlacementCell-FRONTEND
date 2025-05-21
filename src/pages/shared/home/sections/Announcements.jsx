
import { NavLink } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import GooglesheetContext from "../../../../hooks/contexts/google-sheets/GooglesheetContext";
import NewsNoticeProvider from "../../../../hooks/contexts/google-sheets/news-notice-provider";

export default function Announcements() {
  const programData = useContext(GooglesheetContext);
  const [response, setresponse] = useState([]);

  useEffect(() => {
    if (programData) {
      setresponse(programData);
    } else {
      setresponse([]);
    }
  }, [programData]);
  return (
    <NewsNoticeProvider>
      <section className="news-notice-container max-w-[1920px] m-auto px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-12 ">
        {/* Left Section */}
        <div>
          <p className="text-sm tracking-widest text-bold uppercase text-gray-500 dark:text-gray-400 mb-2">
            About Us
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white">
            Training & Placement Cell at Government Engineering College, Siwan
          </h2>
          <p className="my-4 text-justify text-gray-600 dark:text-gray-300 leading-relaxed">
            The Training and Placement Cell at Government Engineering College,
            Siwan, is dedicated to preparing students for successful careers in
            industry and academia. Under the esteemed leadership of our
            Principal, <strong>Dr. Suryakant Singh</strong>, and the guidance of
            our Training & Placement Officer,{" "}
            <strong>Mr. Navdeep Pandey</strong>, the cell actively fosters
            industry interaction, soft skills training, internship programs, and
            placement support. Our mission is to bridge the academic–industry
            gap and provide students with ample opportunities to realize their
            professional goals.
          </p>

          {/* Read More link */}
          <NavLink to="/contact-us">
            <span className="text-blue-600 hover:text-blue-500 font-medium text-sm inline-flex items-center">
              know more
              <ArrowRightCircle className="w-4 h-4 ml-1" />
            </span>
          </NavLink>
        </div>

        {/* Right Section  */}
        <div className="news-notice-area max-md:border-t-4 lg:border-l-4 border-blue-600 p-3 ">
          <h2 className="news-notice-heading text-lg text-blue-600 sm:text-xl md:text-2xl flex max-md:justify-center gap-x-4 items-center font-extrabold">
            Announcements
          </h2>

            <div className="row-container box-border my-[1em] max-h-[20rem] overflow-y-scroll overflow-x-hidden ">
              {response.reverse().map((data, index) => {
                return (
                  <a
                    key={index}
                    href={data.pdf_link}
                    target="_blank"
                    className="group news-notice-row transition-all duration-300 flex flex-col items-start py-1 "
                  >
                    <div className="tags space-x-2 ">
                      <span className="news-notice-card-tag text-[10px] backdrop-blur-lg border-1  border-zinc-500/50  rounded-3xl px-[0.6em] py-[0.5em] ">
                        Published: {data.date}
                      </span>
                    </div>

                    <p className="group-hover:text-blue-500 news-notice-card-content max-sm:text-[14px] text-justify p-[0.5em] w-full overflow-ellipsis ">
                      {data.content}
                    </p>
                  </a>
                );
              })}
            </div>
         
        </div>
      </section>
    </NewsNoticeProvider>
  );
}
