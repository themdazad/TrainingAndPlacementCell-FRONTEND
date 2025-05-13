import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Button, Image } from "@heroui/react";
import { ArrowRightCircle } from "lucide-react"; // ✅ Use correct Lucide imports

export default function TPOStory() {
  return (
    <div className="m-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-center px-[10%] py-12 gap-12 bg-gray-100 dark:bg-gray-800">
      {/* Left Text Section */}
      <div className="max-w-xl mb-10 md:mb-0">
        <p className="text-sm tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-2">
          About Us
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
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
        <NavLink to="/contact-us">
          <span className="text-blue-600 hover:text-blue-500 font-medium text-sm inline-flex items-center">
            know more
            <ArrowRightCircle className="w-4 h-4 ml-1" />
          </span>
        </NavLink>
      </div>

      {/* Right Image with Framer Motion Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-md:hidden rounded-xl overflow-hidden max-w-[500px] w-full"
      >
        <video width="640" height="360" controls loop>
          <source src="/videos/tpo_gd.webm" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <Image
          className="w-full"
          src="/images/about-tpo-thumbnail.svg"
          alt="about-tpo-thumbnail"
        /> */}
      </motion.div>
    </div>
  );
}
