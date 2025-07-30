/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@heroui/react";
import usePlacementDrivesData from "../../../../../api/web/placement-drives-api.js";
import { Link, NavLink } from "react-router-dom";

export default function PlacementDrivesPage() {
  const { data, loading, error } = usePlacementDrivesData();
  const [res, setRes] = useState([]);

  useEffect(() => {
    setRes(data);
  }, [data]);

  return (
    <main className="">
      {/* Header/ */}
      <div className="top-banner shadow-md">
        <div className="banner-container max-w-screen-2xl m-auto space-y-6 px-[2%] py-6 md:py-12 text-center">
          <div className="inline-flex uppercase items-center px-4 py-2 bg-blue-500/20 text-blue-800 dark:text-blue-100   rounded-full text-sm font-medium">
            <span className="blinking-dot w-2 h-2  bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            new
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
            Job opportunities and Internships
            <span className="block font-forum text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-500">
              {Date().split(" ")[3]}
            </span>
          </h1>
        </div>
      </div>
      <section>
        <div className="max-w-screen-2xl m-auto px-[2%] py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 items-center gap-y-6 overflow-y-auto">
          <JobsInternships error={error} loading={loading} data={res} />
        </div>
      </section>
    </main>
  );
}

export function JobsInternships({ data, error, loading }) {
  const getCategoryColor = (category) => {
    switch (category) {
      case "Placement":
        return "bg-slate-100 text-slate-800";
      case "Internship":
        return "bg-red-100 text-red-800";
      case "Hackathon":
        return "bg-sky-100 text-sky-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  if (error) return <p>Something went wrong!</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      {data
        .slice()
        .reverse()
        .map((post, index) => (
          <div
            key={post._id || post.title + post.post_date || `post-${index}`}
            className="min-w-[320px] snap-center bg-neutral-100 dark:bg-sky-900/10 rounded-3xl p-4 border-t-4 border-transparent hover:border-blue-500 hover:shadow transition duration-200"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-1">
                  {post.title || "Untitled Post"}
                </h4>
                <div className="flex items-center gap-2 text-xs mb-2">
                  <span
                    className={`px-2 py-1 rounded-full font-medium ${
                      getCategoryColor(post.category) || "bg-gray-300"
                    }`}
                  >
                    {post.category || "No Category"}
                  </span>
                  {post.deadline && (
                    <span className="px-2 py-1 rounded-full text-danger font-medium">
                      {post.deadline}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-sm">
                {post.post_date || "Date not available"}
              </span>
            </div>

            {/* Description */}
            {post.description && (
              <p className="mb-3 text-sm">{post.description}</p>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center text-sm">
              {post.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {post.location}
                </div>
              )}
              <div className="flex gap-2">
                {post.apply && (
                  <Button
                    as={Link}
                    to={post.apply}
                    variant="outline"
                    size="sm"
                    className="text-blue-500"
                    target="_blank"
                    aria-label="Apply for this post"
                  >
                    Apply
                  </Button>
                )}
                {post.external_link && (
                  <Button
                    as={Link}
                    to={post.external_link}
                    variant="outline"
                    size="sm"
                    className="text-blue-500"
                    target="_blank"
                    aria-label="View post details"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
