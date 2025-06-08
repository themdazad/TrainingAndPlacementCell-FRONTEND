import { motion } from "framer-motion";
import PLACEMENT_BROCHURE from "../../../assets/downloads/GEC_SIWAN_PLACEMENT_BROCHURE.pdf";
import SimpleSlider from "../../ui/SimpleSlider.jsx";
import SliderData from "../../../assets/data/SliderData.js";

export default function Hero() {
  return (
      <section className="grid items-center py-12 grid-cols-1 gap-12 px-[2.5%] lg:grid-cols-2 h-[100dvh]">
        <div>
          <h1 className="mt-2 lg:mt-8 text-4xl lg:text-6xl dm-serif-text-regular text-zinc-900 dark:text-white">
            {/* Campus Placement 2025 */}
            Training & Placement Cell
          </h1>
          <p className="text-lg md:text-3xl font-semibold tracking-wider text-blue-500 dark:text-blue-400 pt-4">
            Government Engineering College, Siwan
          </p>
          <p className="mt-2 text-zinc-800 dark:text-zinc-300 lg:mt-8">
            We strive to organize mock sessions, and provide real-world exposure
            through internships and project showcases, ensuring each student
            steps confidently into the professional world.
          </p>
          <a
            href={PLACEMENT_BROCHURE}
            target="_blank"
            title="Placement Brochure"
            className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-3xl lg:mt-16 hover:bg-blue-500 focus:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
            role="button"
          >
            Placement Brochure 2024
            <motion.svg
              className="w-6 h-6 ml-4 -mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ x: 0 }}
              animate={{ x: [-2, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </motion.svg>
          </a>
        </div>

        <div>
          <SimpleSlider slider_data={SliderData} />
        </div>
      </section>
  );
}
