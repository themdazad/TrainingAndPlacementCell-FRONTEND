/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { MapPin, ExternalLink, Search } from "lucide-react";
import { Button } from "@heroui/react";
import JobsInternshipsData from "../../../../../assets/data/jobs-internships-data.js"; // Local static dummy data
// import JobsInternshipsData from "../../../../../api/shared/placement-drives-api.js"

export default function PlacementDrives() {
  return (
    <main className="">
      {/* Header/ */}
      <div className="top-banner">
        <div className="banner-container max-w-screen-2xl m-auto space-y-6 px-[2%] py-6 md:py-12 text-center">
          <div className="inline-flex uppercase items-center px-4 py-2 bg-blue-500/20 text-blue-800 dark:text-blue-100   rounded-full text-sm font-medium">
            <span className="blinking-dot w-2 h-2  bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            new
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
            Job opportunities and Internships
            <span className="block dm-serif-text-bold-italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-500">
               {Date().split(" ")[3]}
            </span>
          </h1>
        </div>
      </div>
      <hr />
      <section>
        <div className="max-w-screen-2xl m-auto px-[2%] py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 items-center gap-y-6 overflow-y-auto">
          <JobsInternships data={JobsInternshipsData} />
        </div>
      </section>
    </main>
  );
}

export function JobsInternships({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredNotices, setFilteredNotices] = useState(data);

  // Filter based on search term and category
  useEffect(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (post) => post.category === selectedCategory
      );
    }

    setFilteredNotices(filtered);
  }, [searchTerm, selectedCategory]);

  const getCategoryColor = (category) => {
    switch (category) {
      case "Placement":
        return "bg-green-100 text-green-800";
      case "Internship":
        return "bg-red-100 text-red-800";
      case "Hackathon":
        return "bg-sky-100 text-sky-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
     
      {filteredNotices.length > 0 ? (
        filteredNotices.map((post) => (
          <div
            key={post._id}
            className="snap-center min-w-[320px] bg-sky-500/10 hover:border-t-4 border-t-blue-500 rounded-3xl p-4 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-1">{post.title}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      post.category
                    )}`}
                  >
                    {post.category}
                  </span>
                  {post.deadline && (
                    <span className="px-2 text-danger py-1 rounded-full text-xs font-medium">
                      {post.deadline}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-sm">{post.post_date}</div>
            </div>

            {post.description && <p className="mb-3">{post.description}</p>}

            <div className="flex items-center justify-between">
              {post.location && (
                <div className="flex text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {post.location}
                </div>
              )}
              <div className="flex items-center gap-2">
                {post.apply && (
                  <a href={post.apply} target="_blank">
                    <Button variant="outline" color="primary" size="sm">
                      Apply
                    </Button>
                  </a>
                )}
                {post.external_link && (
                  <a href={post.external_link} target="_blank">
                    <Button variant="outline" size="sm" className="text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No notices found matching your search criteria.</p>
        </div>
      )}
    </>
  );
}
