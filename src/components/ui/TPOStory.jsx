import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {Button, Image} from "@heroui/react";

export default function TPOStory() {
  return (
    <div className="m-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-center px-[10%] py-12 gap-12">
      {/* Left Text Section */}
      <div className="max-w-xl mb-10 md:mb-0">
        <p className="text-sm tracking-widest uppercase text-gray-500 mb-2">
          About Us
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Training & Placement Cell at Government Engineering College, Siwan
        </h2>
        <p className="mt-4 text-justify text-gray-600 leading-relaxed">
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
        <Button as={NavLink} to="/contact-us" className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-400 text-white rounded-full transition">
          Know More
        </Button>
      </div>

      {/* Right Image with Framer Motion Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-md:hidden rounded-xl overflow-hidden max-w-[500px] w-full"
      >
        <Image
          className="w-full"
          src="/images/about-tpo-thumbnail.svg"
          alt="about-tpo-thumbnail"
        />
      </motion.div>
    </div>
  );
}
