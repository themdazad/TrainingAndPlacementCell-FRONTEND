import { motion } from "framer-motion";

export default function TPOStory() {
  return (
    <div className="m-auto flex flex-col md:flex-row items-center justify-center px-[10%] py-12 gap-12">
      {/* Left Text Section */}
      <div className="max-w-xl mb-10 md:mb-0">
        <p className="text-sm tracking-widest uppercase text-gray-500 mb-2">
          About Us
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Training & Placement Cell at Government Engineering College, Siwan
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
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
        <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-400 text-white rounded-full transition">
          Know More
        </button>
      </div>

      {/* Right Image with Framer Motion Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="rounded-xl overflow-hidden hover:shadow-lg max-w-md w-full"
      >
        <video
        //   autoPlay
          loop
        //   muted
          playsInline
          poster="" // ✅ Add video thumbnail image here
          className="w-full h-full object-cover"
        >
          {/* <source src="/videos/sample-video.mp4" type="video/mp4" /> */}
          <source src="/videos/tpo_gd.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </div>
  );
}
