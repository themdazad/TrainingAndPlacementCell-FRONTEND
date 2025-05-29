import axios from "axios";
import Papa from "papaparse";
import { NavLink } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";
import { useState, useEffect } from "react";

// csv to json converter
const csvToJson = (csvString) => {
  const results = Papa.parse(csvString, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  if (results.errors.length > 0) {
    console.error("Error parsing CSV:", results.errors);
    return null;
  }

  return results.data;
};

export default function Announcements() {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vQl8ryQvd4otEGN24fOy0eWNudgr1zPRJtLC1x5xw0CoIb_6dEBns5hPZzLX9YzAV166dEZz-bMWfGm/pub?gid=1871965751&single=true&output=csv",
          { withCredentials: false }
        );
        setResponse(csvToJson(res.data));
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter notices by searchTerm
  const filteredNotices = response
    .slice() // Clone to prevent mutating original
    .reverse()
    .filter((item) =>
      (item.content + item.date)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  return (
    <section className="news-notice-container max-w-[1920px] m-auto px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left Section */}
      <div className="hidden md:block">
        <p className="text-sm tracking-widest text-bold uppercase dark:text-zinc-400 mb-2">
          About Us
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-800 dark:text-white">
          Training & Placement Cell at Government Engineering College, Siwan
        </h2>
        <p className="my-4 text-justify text-zinc-600 dark:text-zinc-300 leading-relaxed">
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

        <NavLink to="/about-us">
          <span className="text-blue-500 hover:text-blue-500 font-medium inline-flex items-center">
            know more
            <ArrowRightCircle className="w-4 h-4 ml-1" />
          </span>
        </NavLink>
      </div>

      {/* Right Section */}
      <div className="news-notice-area max-md:border-t-4 lg:border-l-4 border-blue-500 p-3">
        <div className="grid grid-cols-2 items-center">
        <h2 className="text-2xl md:text-3xl w-full font-extrabold text-blue-500 flex max-md:justify-center gap-x-4 items-center">
          Latest Updates
        </h2>

        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Finding? Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mt-4 mb-2 px-3 p-2 border border-zinc-300 dark:border-zinc-700 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-zinc-800 dark:text-white"
        />
        </div>

        <div className="row-container box-border my-[1em] max-h-[20rem] overflow-y-scroll overflow-x-hidden">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((data, index) => (
              <a
                key={index}
                href={data.pdf_link}
                target="_blank"
                rel="noopener noreferrer"
                className="group news-notice-row transition-all duration-300 flex items-center space-x-2"
              >
                <span className="news-notice-card-tag text-[10px] backdrop-blur-lg bg-blue-500/10 rounded-3xl px-[1em] py-[0.5em] ">
                  {data.date}
                </span>
                <p className="group-hover:text-blue-500 news-notice-card-content max-sm:text-[14px] text-justify py-[1em] w-full overflow-ellipsis">
                  {data.content}
                </p>
              </a>
            ))
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400">
              No notices found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
