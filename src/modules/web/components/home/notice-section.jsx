
import { BellDot, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@heroui/react";
import useNoticeAnnouncements from "../../../../api/web/notice-announcements-api.js"

export default function Announcements() {
  return (
    <section className="news-notice-container section  grid grid-cols-1 ">
      <Notice />
    </section>
  );
}
export function Notice() {
const {data, loading, error} = useNoticeAnnouncements();
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 search
  // Filter notices by searchTerm
  const filteredNotices = data
    .slice() // Clone to prevent mutating original
    .reverse()
    .filter((item) =>
      (item.content + item.date)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  return (
    <motion.section
      initial={{ width: "70%", y: 10 }}
      whileInView={{ width: "100%", y: 0 }}
      transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="latest-updates-section max-w-screen-2xl overflow-hidden m-auto px-[2%]"
    >
      <div className="min-w-full rounded-3xl max-md:border-y-4 md:border-x-4 border-blue-500 p-3 px-6 min-h-52 ">
        <div className="flex items-center max-md:justify-center justify-between">
          <h2 className="text-2xl text-nowrap font-semibold text-blue-500 flex flex-wrap justify-center items-center gap-2 ">
            <BellDot />
            Notices/Announcements
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
          className="row-container box-border my-[1em] max-h-96 overflow-y-scroll  overflow-x-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 0%, black 50%, transparent 100%)",
          }}
        >
          {filteredNotices ? (
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
                <p className="group-hover:text-blue-500 news-notice-card-content text-justify py-[1em] w-full overflow-ellipsis">
                  {data.content}
                </p>
              </a>
            ))
          ) : (
            <p className="text-neutral-500 dark:text-neutral-400">
            
              {loading && <p className="animate-pulse">Loading...</p>}
              {error && { error }}
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
}
