import axios from "axios";
import Papa from "papaparse";
import { useState, useEffect } from "react";
import About from "../about-us/About";

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
    <section className="news-notice-container max-w-[1920px] m-auto px-[2.5%] grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left Section */}
      <div className="hidden md:block">
        <About />
      </div>

      {/* Right Section */}
      <div className="news-notice-area max-md:border-t-4 lg:border-l-4 border-blue-500 p-3">
        <div className="grid grid-cols-2 items-center">
          <h2 className="text-2xl md:text-3xl w-full font-extrabold text-blue-500 flex max-md:justify-center gap-x-4 items-center">
            Announcements
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
              No updates found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
