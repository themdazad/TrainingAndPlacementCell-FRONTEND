import { motion } from "framer-motion";
import { Button, Image } from "@heroui/react";
import {
  ArrowRightCircle,
  CircleArrowRight,
  Mouse,
  CloudDownload,
  ChevronDown,
  Bell,
} from "lucide-react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { useState, useEffect , useContext } from "react";
import { NavLink } from "react-router-dom";
import TPOStory from "./components/ui/TPOStory";
import SelectedStudentSlider from "./components/ui/SelectedStudentSlider";
import AnimatedLogoCloud from "./components/ui/AnimatedLogoCloud";
import Testimonials from "./components/ui/Testimonials";
import GooglesheetContext from "./contexts/google-sheets/GooglesheetContext";
import NewsNoticeProvider from "./contexts/google-sheets/news-notice-provider";
import SimpleSlider from "./components/ui/SimpleSlider";

export default function Layout() {
  return (
    <main className="overflow-hidden max-w-[1980px] m-auto min-h-screen bg-white dark:bg-gray-900">
      {/* Hero section  */}
      <section className="px-[5%] md:px-[10%] sm:py-16">
        <div className="grid items-center py-12 grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
              For career and growth
            </p>
            <h1 className="dm-serif-text-bold mt-2 text-4xl font-bold text-gray-900 dark:text-white lg:mt-8 sm:text-6xl xl:text-8xl">
              Campus Placement 2025
            </h1>
            <p className="mt-2 text-base text-gray-800 dark:text-gray-300 lg:mt-8 sm:text-xl">
              We strive to organize mock sessions, and provide real-world
              exposure through internships and project showcases, ensuring each
              student steps confidently into the professional world.
            </p>
            <a
              href="/files/GEC_Siwan_Official_Resume_Format.docx"
              title="Resume Template"
              className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full lg:mt-16 hover:bg-blue-500 focus:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
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

          <div className="max-sm:hidden">
            <Image
              className="w-full"
              src="/images/heroThumbnails/heroThumbnail07052025.svg"
              alt="tpo siwan hero image"
            />
          </div>
        </div>
      </section>

      <section className="py-6 m-auto">
        {/* News/Notice Area */}
        <NewsNoticeProvider>
          <NewsNoticeArea />
        </NewsNoticeProvider>
      </section>

      <section className="py-6 m-auto">
        <SelectedStudentSlider />
      </section>

      <section className="py-6 m-auto">
        <TPOStory />
      </section>

      <section className="py-6 m-auto">
        <AnimatedLogoCloud />
      </section>

      <section className="py-6 m-auto">
        <Testimonials />
      </section>

      <section className="py-6 m-auto">
        <FAQ />
      </section>
    </main>
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
    <section className="max-w-[1920px] my-[6em] m-auto px-[5%]">
      <h2 className="text-lg sm:text-2xl md:text-3xl text-center my-6 font-semibold text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h2>

      {/* Accordion Section */}
      <div className="accordion max-w-[1440px] m-auto">
        <Accordion variant="light" className="md:text-lg">
          {accordionItems.map((item, index) => (
            <AccordionItem
              key={index}
              className="md:text-xl"
              aria-label={`Accordion ${index + 1}`}
              title={item.question}
            >
              <p className="text-[14px] text-gray-800 dark:text-gray-200">
                {item.answer}
              </p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Coordinators Image and Contact Details */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
        className="gap-6 bg-blue-50 dark:bg-gray-800 rounded-xl p-12 my-12 text-center w-full mx-auto"
      >
        {/* Coordinator Images */}
        <div className="flex justify-center -space-x-4 mb-4">
          <img
            src="/images/coordinators/abhishek_profile.jpg"
            alt="Abhishek"
            className="w-20 aspect-square rounded-full border-2 dark:border-gray-700 border-white"
          />
          <img
            src="/images/coordinators/azad_profile.jpg"
            alt="Azad"
            className="w-20 aspect-square rounded-full border-2 dark:border-gray-700 border-white"
          />
          <img
            src="https://avatars.githubusercontent.com/u/156394664?v=4"
            alt="Coordinator 3"
            className="w-20 aspect-square rounded-full border-2 dark:border-gray-700 border-white"
          />
        </div>

        {/* Contact Section */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Still have doubts?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 my-2">
          Can't find the answer you're looking for? Contact us!
        </p>

        <NavLink
          className="text-blue-600 dark:text-blue-400 hover:text-blue-600 font-medium text-sm inline-flex items-center"
          to="/contact-us"
        >
          {" "}
          Contact us
          <ArrowRightCircle className="w-4 h-4 ml-1" />
        </NavLink>
      </motion.div>
    </section>
  );
}

function NewsNoticeArea() {
  const programData = useContext(GooglesheetContext);
  const [response, setresponse] = useState([]);

  useEffect(() => {
    if (programData) {
      setresponse(programData);
    } else {
      setresponse([]);
    }
  }, [programData]);
  return (
    <div className="news-notice-container max-w-[1920px] m-auto px-[5%] grid md:grid-cols-2 gap-12 ">
      {/* Images carousel  */}
      <SimpleSlider />
      <div className="news-notice-area border-t-4 border-y-blue-500 rounded-xl p-3 md:p-6 ">
        <h2 className="news-notice-heading text-lg text-blue-500 sm:text-xl md:text-2xl mt-2 flex max-md:justify-center gap-x-4 items-center font-bold">
          Announcements
        </h2>

        {/* Mapping for upcoming data for latest news and notice   */}
        <div className="row-container box-border my-[1em] max-h-[20rem] overflow-y-scroll overflow-x-hidden ">
          {response.reverse().map((data, index) => {
            return (
              <a
                key={index}
                href={data.pdf_link}
                target="_blank"
                className="group news-notice-row transition-all duration-300 flex flex-col items-start py-1 "
              >
                <div className="tags space-x-2 ">
                  <span className="news-notice-card-tag text-[10px] bg-zinc-500/20 backdrop-blur-lg border-1  border-zinc-500/50  rounded-3xl px-[0.6em] py-[0.2em] ">
                    {data.date}
                  </span>
                </div>

                <p className="group-hover:text-blue-500 news-notice-card-content max-sm:text-[14px] text-justify p-[0.5em] w-full overflow-ellipsis ">
                  {data.content}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
