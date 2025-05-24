import axios from "axios";
import Papa from "papaparse";
import { NavLink } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";
import { useState, useEffect } from "react";

// csv to json converter
const csvToJson = (csvString) => {
  const results = Papa.parse(csvString, {
    header: true, // Converts rows to objects using headers as keys
    dynamicTyping: true, // Automatically converts numbers and booleans
    skipEmptyLines: true, // Skips empty lines in the CSV
  });

  if (results.errors.length > 0) {
    console.error("Error parsing CSV:", results.errors);
    return null;
  }

  return results.data; // Returns an array of JSON objects
};

export default function Announcements() {
  const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
    
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQl8ryQvd4otEGN24fOy0eWNudgr1zPRJtLC1x5xw0CoIb_6dEBns5hPZzLX9YzAV166dEZz-bMWfGm/pub?gid=1871965751&single=true&output=csv",
            {
              withCredentials: false, // 🚫 Disable sending credentials (cookies, etc.)
            }
          );
          setResponse(csvToJson(response.data));
        } catch (err) {
          setError(err);
          console.error("Error fetching data:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  return (
    <section className="news-notice-container max-w-[1920px] m-auto px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-12 ">
      {/* Left Section */}
      <div className="hidden md:block">
        <p className="text-sm tracking-widest text-bold uppercase text-gray-100/50 dark:text-gray-400 mb-2">
          About Us
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white">
          Training & Placement Cell at Government Engineering College, Siwan
        </h2>
        <p className="my-4 text-justify text-gray-600 dark:text-gray-300 leading-relaxed">
          The Training and Placement Cell at Government Engineering College,
          Siwan, is dedicated to preparing students for successful careers in
          industry and academia. Under the esteemed leadership of our Principal,{" "}
          <strong>Dr. Suryakant Singh</strong>, and the guidance of our Training
          & Placement Officer, <strong>Mr. Navdeep Pandey</strong>, the cell
          actively fosters industry interaction, soft skills training,
          internship programs, and placement support. Our mission is to bridge
          the academic–industry gap and provide students with ample
          opportunities to realize their professional goals.
        </p>

        {/* Read More link */}
        <NavLink to="/about-us">
          <span className="text-blue-600 hover:text-blue-500 font-medium inline-flex items-center">
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
                  <span className="news-notice-card-tag text-[10px] backdrop-blur-lg bg-gray-100/50 rounded-3xl px-[0.8em] py-[0.5em] ">
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
  );
}
