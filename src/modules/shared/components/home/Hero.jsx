import { motion } from "framer-motion";
import { useState } from "react";
import PLACEMENT_BROCHURE from "../../../../assets/downloads/GEC_SIWAN_PLACEMENT_BROCHURE.pdf";
import SimpleSlider from "../../../../components/SimpleSlider.jsx";
import HeroSliderImages from "../../../../assets/data/hero-slider-images.js";

const sliderImages = HeroSliderImages;
export default function Hero(){
  const [year, setYear] = useState(Date().split(" ")[3]);
  return (
    <section className=" section grid items-center grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <h1 className="mt-2 lg:mt-8 dm-serif-text-bold text-6xl text-neutral-900 dark:text-white">
          PLACEMENT DRIVES-{year}
          {/* Training & Placement Cell */}
        </h1>
        <p className="text-xl md:text-3xl font-semibold  text-blue-500 dark:text-blue-400 pt-4">
          Government Engineering College, Siwan
        </p>
        <p className="mt-4 leading-relaxed text-neutral-800 dark:text-neutral-300 lg:mt-8">
          We strive to organize mock sessions, and provide real-world exposure
          through internships and project showcases, ensuring each student steps
          confidently into the professional world.
        </p>
        <a
          href={PLACEMENT_BROCHURE}
          target="_blank"
          title="Placement Brochure"
          className="inline-flex items-center px-6 py-4 mt-16 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-3xl lg:mt-16 hover:bg-blue-500 focus:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
          role="button"
        >
          Placement 2024
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

      <div className="max-md:hidden">
        <SimpleSlider slider_data={sliderImages} />
      </div>
    </section>
  );
}
