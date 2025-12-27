import { Divider } from "@heroui/react";
import { Link } from "react-router-dom";
import { JobsInternships } from "../../../modules/web/views/careers/placement-drives/placement-drives.jsx";
import usePlacementDrivesData from "../../../api/web/placement-drives-api.js";

export default function PlacementDrives() {
  const { data, loading, error } = usePlacementDrivesData();

  return (
    <section className="max-w-screen-2xl mx-auto w-full px-[2%] space-y-6">
      {/* Section title */}
      <h2 className="text-xl md:text-3xl font-semibold">Latest Updates</h2>
      <Divider />

      {/* Scrollable job cards */}
      <div className="flex snap-x snap-mandatory gap-x-4 py-2 overflow-x-auto overflow-y-hidden ">
        <JobsInternships data={data} loading={loading} error={error} />
      </div>

      {/* View more link */}
      <div className="flex justify-center">
        <Link
          to="/careers/placement-drives"
          className=" font-medium"
        >
          See more
        </Link>
      </div>
    </section>
  );
}
