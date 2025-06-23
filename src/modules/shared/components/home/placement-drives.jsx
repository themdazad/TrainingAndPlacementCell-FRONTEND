import { Divider } from "@heroui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { JobsInternships } from "../../pages/careers/placement-drives/placement-drives.jsx";
import usePlacementDrivesData  from "../../../../api/shared/placement-drives-api.js";

export default function PlacementDrives() {
 
  const { data, loading, error, searchTerm, setSearchTerm } =usePlacementDrivesData();
  const [jobsInternships, setJobInternshipData] = useState(data.slice(0, 3));
  
  return (
    <section className="max-w-screen-2xl m-auto px-[2.5%] space-y-6 w-full">
      {/* page title  */}
      <span className="text-xl md:text-3xl font-semibold inline-flex rounded-full text-nowrap">
        Latest updates
      </span>
      <Divider />
      <div className="py-2 snap-mandatory snap-x overflow-x-scroll scrollbar-hide flex items-stretch gap-x-4 gap-y-6 overflow-y-auto">
        {loading && "Loading..."}
        <JobsInternships data={jobsInternships} />
      </div>
      <Link to="/careers/placement-drives" className="flex justify-center">
        See more
      </Link>
    </section>
  );
}
