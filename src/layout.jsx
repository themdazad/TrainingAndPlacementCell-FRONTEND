import { motion } from "framer-motion";
import { Button, Image} from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import {
  CircleArrowRight,
  ChevronDown,
  Mouse,
  CloudDownload,
} from "lucide-react";
import { useState } from "react";  
import { NavLink } from "react-router-dom";
import SelectedStudentSlider from "./components/ui/SelectedStudentSlider";
import AnimatedLogoCloud from "./components/ui/AnimatedLogoCloud";
import StaticLogoCloud from "./components/ui/StaticLogoCloud";
import Testimonials from "./components/ui/Testimonials";

export default function Layout() {
  return (
    <main className="overflow-hidden max-w-[1980px] m-auto min-h-screen">
      <section className="px-[5%] md:px-[10%] sm:py-16">
        <div className="grid items-center py-12 grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
              For career and growth
            </p>
            <h1 className="mt-2 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
              Campus Placement 2025
            </h1>
            <p className="mt-2 text-base text-black lg:mt-8 sm:text-xl">
              We focus on the holistic development of our students by offering
              regular workshops, technical training, and personality development
              sessions.
            </p>
            <a
              href="/files/GEC_Siwan_Official_Resume_Format.docx"
              title="Resume Template"
              className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-blue-300 rounded-full lg:mt-16 hover:bg-blue-400 focus:bg-blue-400"
              role="button"
            >
              Resume Template
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
            <Image
              className="w-full"
              src="/images/heroThumbnails/heroThumbnail07052025.svg"
              alt="tpo siwan hero image"
            />
            {/* Images carousel  */}
            {/* <SimpleSlider /> */}
          </div>
        </div>
      </section>

      <section className="py-6 m-auto ">
        <SelectedStudentSlider />
      </section>
{/* 
      <section className="py-6 m-auto ">
        <StaticLogoCloud />
      </section>
 */}
      <section className="py-6 m-auto ">
        <AnimatedLogoCloud />
      </section>

      <section className="py-6 m-auto ">
        <Testimonials />
      </section>

      {/* FAQ  */}
      <FAQ />
    </main>
  );
}

function HeroSection() {
  return (
    <header className="md:min-h-[50em] max-md:py-12 grid place-content-center m-auto text-center px-[5%]">
      <div className="flex flex-col place-content-center">
        <div className="grid justify-items-center max-sm:gap-[1em]">
          {/* Title and Subtitle */}
          <motion.div
            className="tracking-tight font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="block text-5xl md:text-6xl lg:text-8xl">
              Training and <br /> Placement Cell
            </p>
            <br />
            <p className="block text-xl mt-1 sm:text-3xl md:text-5xl">
              Government Engineering College, Siwan
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-lg lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We focus on the holistic development of our students by offering
            regular workshops, technical training, and personality development
            sessions.
          </motion.p>

          {/* Buttons */}
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="gap-2"
            >
              <Button
                as={NavLink}
                to="campus-placement-2025"
                endContent={<CircleArrowRight />}
                radius="full"
                size="lg"
                color="primary"
                variant="flat"
              >
                Campus Placement 2025
              </Button>

              <a
                href="/files/GEC_Siwan_Official_Resume_Format.docx"
                target="_blank"
              >
                <Button
                  endContent={<CloudDownload />}
                  radius="full"
                  size="lg"
                  color="warning"
                  variant="bord"
                >
                  Resume Template
                </Button>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicators */}
        <ChevronDown className="sm:hidden self-center mt-[2em]" />
        <Mouse className="max-md:hidden self-center mt-[6em]" />
      </div>
    </header>
  );
}


export function FAQ() {
  const faq_data = [
    {
      question:
        "1. What is the role of the Training and Placement Cell at GEC, Siwan?",
      answer:
        "The TPC bridges the gap between students and employers, offering career guidance, training programs, and managing campus recruitment to help students secure internships and job placements.",
    },
    {
      question: "2. Who is eligible for placement?",
      answer:
        "Eligibility generally depends on your academic performance, skills, branch-specific requirements, and sometimes internship experience.",
    },
    {
      question: "3. What types of companies visit for campus placements?",
      answer:
        "Companies from various sectors including IT (e.g., TCS, Infosys), Core Engineering (e.g., L&T, BHEL), Consulting (e.g., Deloitte), and PSUs (e.g., BHEL, ONGC) visit the campus.",
    },
    {
      question: "4. How should I prepare for the placement process?",
      answer:
        "Focus on enhancing your technical skills, preparing for aptitude tests, practicing soft skills, and updating your resume. Attend mock interviews and group discussion sessions organized by TPC.",
    },
    {
      question: "5. Are internships arranged by the TPC?",
      answer:
        "Yes, the TPC arranges internships, providing students with industry experience that enhances their skills and improves their chances of securing a job after graduation.",
    },
    {
      question: "6. How can I contact the TPC for assistance?",
      answer:
        "You can contact directly with Student Coordinator details mentioned in about us page, Or email us through the official placement email address.",
    },
    {
      question:
        "7. What is the role of the Training and Placement Cell (TPC) at Government Engineering College, Siwan?",
      answer:
        "The TPC bridges the gap between students and employers, offering career guidance, training programs, and managing campus recruitment to help students secure internships and job placements.",
    },
  ];

  const [accordionItems, setAccordionItems] = useState(faq_data);

  return (
    <section className="max-w-[1920px] my-[6em] m-auto px-[5%] ">
      <h2 className="text-lg sm:text-2xl md:text-3xl text-center my-6 font-semibold">
        Frequently Asked Questions !
      </h2>
      <div className="accordion max-w-[1440px] m-auto">
        <Accordion variant="light" className="md:text-lg">
          {accordionItems.map((item, index) => {
            return (
              <AccordionItem
                key={index}
                className="md:text-xl"
                aria-label={`Accordion ${index + 1}`}
                title={item.question}
              >
                <p className="text-[14px] text-gray-500">{item.answer}</p>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* coordinators image and contact details*/}
      <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.2 }} 
                className=" gap-6 bg-blue-50 rounded-xl p-12 my-12 text-center w-full mx-auto ">
        <div className="flex justify-center -space-x-4 mb-4">
          <img
            src="/images/coordinators/abhishek_profile.jpg"
            alt="Avatar 1"
            className="w-20 aspect-square rounded-full border-2 border-white"
          />
          <img
            src="/images/coordinators/azad_profile.jpg"
            alt="Avatar 2"
            className="w-20 aspect-square rounded-full border-2 border-white"
          />
          <img
            src="https://media.licdn.com/dms/image/v2/D4D35AQFmhBAYe3OPzg/profile-framedphoto-shrink_200_200/B4DZWvN989HAAc-/0/1742401429669?e=1747242000&v=beta&t=vRc-Y8WWjTQPKPmp-krBeoKO-bwK6Jzggi8LiseWh14"
            alt="Avatar 3"
            className="w-20 aspect-square rounded-full border-2 border-white"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          Still have doubts?
        </h2>
        <p className=" text-gray-600 mt-2">
          Can't find the answer you're looking for? Contact us
        </p>
        <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium">
          Our Coordinators
        </button>
      </motion.div>
    </section>
  );
  ` 1ptfby hnjm,`;
}
