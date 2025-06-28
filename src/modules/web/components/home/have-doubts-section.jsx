import { motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function HaveDoubts() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
      className="max-w-screen-2xl m-auto px-[2%] space-y-3 text-center  pb-10"
    >
      {/* Coordinator Images */}
      <div className="flex justify-center -space-x-4">
        <img
          src="/images/coordinators/abhishek_profile.jpg"
          alt="Abhishek"
          className="w-20 aspect-square rounded-full border-2 dark:border-slate-700 border-white"
        />
        <img
          src="/images/coordinators/anupam_profile.jpg"
          alt="Anupam"
          className="w-20 aspect-square rounded-full border-2 dark:border-slate-700 border-white"
        />
        <img
          src="/images/coordinators/azad_profile.jpg"
          alt="Azad"
          className="w-20 aspect-square rounded-full border-2 dark:border-slate-700 border-white"
        />
        <img
          src="https://avatars.githubusercontent.com/u/156394664?v=4"
          alt="Coordinator 3"
          className="w-20 aspect-square rounded-full border-2 dark:border-slate-700 border-white"
        />
      </div>

      {/* Contact Section */}
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Still have doubts?
      </h2>
      <p className="text-slate-700 dark:text-slate-300 my-2">
        Can&apos;t find the answer you&apos;re looking for? Contact us!
      </p>

      <NavLink
        className="text-blue-500 dark:text-blue-400 hover:text-blue-500 font-medium inline-flex items-center"
        to="/about-us"
      >
        Contact us
        <ArrowRightCircle className="w-4 h-4 ml-1" />
      </NavLink>
    </motion.section>
  );
}
