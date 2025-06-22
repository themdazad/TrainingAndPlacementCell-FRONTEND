import axios from "axios";
import Papa from "papaparse";
import { BellDot, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { easeIn, motion } from "framer-motion";
import { Input } from "@heroui/react";

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
  return (
    <section className="news-notice-container section  grid grid-cols-1 ">
      <Notice />
    </section>
  );
}
export function Notice() {
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
    <motion.section
      initial={{ width: 512, y: 10 }}
      whileInView={{ width: "100%", y: 0 }}
      transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="latest-updates-section max-w-screen-2xl m-auto px-[2.5%]"
    >
      <div className="min-w-full rounded-3xl max-md:border-y-4 md:border-x-4 border-blue-500 p-3 px-6 min-h-52 ">
        <div className="grid grid-cols-2 items-center justify-between">
          <h2 className="text-2xl text-nowrap font-semibold text-blue-500 flex items-center gap-2 ">
            <BellDot />
            Latest updates
          </h2>

          {/* 🔍 Search Input */}
          <Input
            endContent={<Search />}
            type="text"
            radius="full"
            label="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs max-md:hidden justify-self-end rounded-full"
          />
        </div>

        <div
          className="row-container box-border my-[1em] max-h-64 overflow-y-scroll scrollbar-hide overflow-x-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 0%, black 50%, transparent 100%)",
          }}
        >
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
            <p className="text-neutral-500 dark:text-neutral-400">
              No internet !
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
}
