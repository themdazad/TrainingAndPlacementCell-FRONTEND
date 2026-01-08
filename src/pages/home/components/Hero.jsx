import { motion } from 'framer-motion';
import PLACEMENT_BROCHURE from '../../../assets/downloads/GEC_SIWAN_PLACEMENT_BROCHURE.pdf';
import SimpleSlider from './SimpleSlider.jsx';
import HeroSliderImages from '../../../data/hero-slider-images.js';
import { Download } from 'lucide-react';

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
    <section className="relative z-10">
      {/* Main Content */}
      <div className="max-w-screen-2xl m-auto min-h-[500px] px-[2%] grid items-end grid-cols-1 gap-6 lg:grid-cols-2 ">
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
              className="inline-flex items-center justify-center sm:justify-start px-4 py-2 bg-blue-500/20 text-blue-800 dark:text-blue-100 rounded-full"
              variants={fadeUp}
            >
              <span className="blinking-dot w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse" />
              Placement Season 2025-26 is Live!
            </motion.div>

            <motion.h1 className="font-bold text-5xl lg:text-6xl" variants={fadeUp}>
              Training and <br />
              Placement Cell
              <span className="block text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
                Government Engineering College, Siwan
              </span>
            </motion.h1>

            <motion.p
              className="text-slate-600 dark:text-slate-300 max-w-lg mx-auto sm:mx-0"
              variants={fadeUp}
            >
              Empowering engineers with industry-ready skills through comprehensive training
              programs, mock interviews, internship opportunities, and direct placement assistance
              from leading global organizations.
            </motion.p>
          </motion.div>

          <motion.div className="flex max-sm:flex-col gap-4 w-full sm:w-auto" variants={fadeUp}>
            <a
              href={PLACEMENT_BROCHURE}
              download
              className="flex items-center justify-center border-1 border-slate-300 hover:border-blue-600 hover:text-blue-600 px-6 py-3 rounded-3xl transition-all duration-200 transform hover:scale-105 group"
              rel="noreferrer"
            >
              <Download className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" />
              Download Brochure
            </a>
            <button className="flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-3xl transition-all duration-200 transform hover:scale-105">
              Explore Opportunities
            </button>
          </motion.div>
        </motion.div>

        <div className="max-sm:hidden">
          <SimpleSlider slider_data={sliderImages} />
        </div>
      </div>
    </section>
  );
}
