import PLACEMENT_BROCHURE from "../../../../assets/downloads/GEC_SIWAN_PLACEMENT_BROCHURE.pdf";
import SimpleSlider from "../../../../components/SimpleSlider.jsx";
import HeroSliderImages from "../../../../assets/data/hero-slider-images.js";
import { ArrowRightCircle, Download } from "lucide-react";

import { Link } from "react-router-dom";

const sliderImages = HeroSliderImages;
export default function Hero(){
  return (
    <section className="max-w-screen-2xl pt-[100px] px-[2.5%] m-auto grid items-center grid-cols-1 gap-6 lg:grid-cols-2 ">
      {/* CTA Section - Left Half */}
      <div className="space-y-6">
        <div className="space-y-6">
          <div className="inline-flex uppercase items-center px-4 py-2 bg-blue-500/20 text-blue-800 dark:text-blue-100   rounded-full text-sm font-medium">
            <span className="blinking-dot w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            New For Students
          </div>
          <h1 className=" dm-serif-text-bold md:text-5xl text-6xl lg:text-7xl font-bold space-y-4">
            Campus Placement
            <span className="block dm-serif-text-bold-italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
              Drives {Date().split(" ")[3]}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-lg">
            We strive to organize mock sessions, and provide real-world exposure
            through internships and project showcases, ensuring each student
            steps confidently into the professional world.
          </p>
        </div>

        <div className="flex max-md:items-center gap-4">
          <Link
            to="/careers/placement-drives"
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-3xl font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg group"
          >
            Apply Now
            <ArrowRightCircle className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href={PLACEMENT_BROCHURE}
            target="_blank"
            className="flex items-center border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 px-4 py-2 rounded-3xl font-semibold transition-all duration-200 transform hover:scale-105 group"
          >
            <Download className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" />
            Brochure
          </a>
        </div>

        <div className=" pt-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
          *Provide feedbacks for better experience.
        </div>
      </div>

      <div>
        <SimpleSlider slider_data={sliderImages} />
      </div>
    </section>
  );
}
