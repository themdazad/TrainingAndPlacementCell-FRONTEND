import { motion } from "framer-motion";
import { Image } from "@heroui/react";
import PLACEMENT_BROCHURE from "../../../../assets/downloads/GEC_SIWAN_PLACEMENT_BROCHURE.pdf";
import SimpleSlider from "../../../../components/common/SimpleSlider.jsx";
import HeroSliderImages from "../../data/hero-slider-images.js";
import { ArrowDownCircle, ArrowRightCircle, Download } from "lucide-react";

import { Link } from "react-router-dom";

const sliderImages = HeroSliderImages;
export default function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  return (
    
    <section className="max-w-screen-2xl m-auto min-h-[50dvh] pt-[40px] px-[2%]  grid items-center grid-cols-1 gap-6 lg:grid-cols-2 ">
      {/* CTA Section - Left Half */}
      <motion.div
        className="space-y-6 text-center items-center sm:text-left sm:items-start flex flex-col"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="space-y-6" variants={fadeUp}>
          <motion.div
            className="flex sm:hidden justify-center"
            variants={fadeUp}
          >
            <Image
              className="dark:hidden h-[100px] aspect-square"
              src="/images/logos/gecsiwan-logo.png"
              alt="gec-siwan-logo"
            />
            <Image
              className="hidden dark:inline h-[100px] aspect-square"
              src="/images/gecsiwan-logo-light.png"
              alt="gec-siwan-logo"
            />
          </motion.div>
          <motion.div
            className="inline-flex items-center justify-center sm:justify-start px-4 py-2 bg-blue-500/20 text-blue-800 dark:text-blue-100 rounded-full text-sm font-medium"
            variants={fadeUp}
          >
            <span className="blinking-dot w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            New
          </motion.div>

          <motion.h1
            className="font-serif text-5xl lg:text-6xl "
            variants={fadeUp}
          >
            Training and <br/>Placement Cell
            <span className="block text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
              Government Engineering College, Siwan
            </span>
          </motion.h1>

            <motion.p
              className="text-slate-600 dark:text-slate-300 max-w-lg mx-auto sm:mx-0"
              variants={fadeUp}
            >
              We strive to organize mock sessions, and provide real-world
              exposure through internships and project showcases, ensuring each
              student steps confidently into the professional world.
            </motion.p>
          </motion.div>

        <motion.div
          className="flex max-sm:items-center justify-center sm:justify-start gap-4"
          variants={fadeUp}
        >
          <Link
            to="/careers/placement-drives"
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-3xl font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg group"
          >
            Apply Now
            <ArrowRightCircle className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href={PLACEMENT_BROCHURE}
            target="_blank"
            className="flex items-center justify-center border-2 border-slate-300 hover:border-blue-600 hover:text-blue-600 px-6 py-4 rounded-3xl font-semibold transition-all duration-200 transform hover:scale-105 group"
          >
            <Download className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" />
            Brochure
          </a>
        </motion.div>
      </motion.div>

        <div className="max-sm:hidden">
          <SimpleSlider slider_data={sliderImages} />
        </div>

      </section>
      </>
  );
}
