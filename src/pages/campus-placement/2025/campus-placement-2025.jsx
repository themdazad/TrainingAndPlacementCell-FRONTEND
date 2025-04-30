import { motion } from "framer-motion";
import Slider from "react-slick";
import { Image } from "@heroui/react";

export default function CampusPlacements2025() {
  const settings = {    
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    ltr: true,
  };
  return (
    <section className="min-h-[100dvh] m-auto max-w-[1980px] px-[5%] space-y-12">
      {/* Heading  */}
      <motion.div
        className="tracking-tight font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="block text-3xl md:text-5xl lg:text-6xl">
          Campus <br /> Placement 2025
        </p>
      </motion.div>

      {/* Placement Students*/}
      <div className="placed-student bg-slate-400/40 p-3 rounded-xl ">
        {/* title  */}
        <div className="title text-xl font-bold ">
          <h2>
            Selected <span className="text-sky-600">2025</span>{" "}
          </h2>
          
          
        </div>
      </div>
    </section>
  );
}
