import { motion } from "framer-motion";
import {  ArrowRightCircle,} from "lucide-react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { useState, useEffect , useContext } from "react";
import { NavLink } from "react-router-dom";
import SelectedStudentSlider from "./sections/SelectedStudentSlider";
import PastRecruiters from "./sections/PastRecruiters";
import Testimonials from "./sections/Testimonials";
import GooglesheetContext from "../../../hooks/contexts/google-sheets/GooglesheetContext";
import NewsNoticeProvider from "../../../hooks/contexts/google-sheets/news-notice-provider";
import Hero from "./sections/Hero.jsx"
export default function Home() {
  return (
    <main className="overflow-hidden max-w-[1980px] m-auto min-h-screen bg-white dark:bg-gray-900">
      {/* Hero section  */}
      <Hero/>
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
        <PastRecruiters />
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
        "1. What kind of infrastructure does the TPC provide for placement drives?",
      answer:
        "The Training and Placement Cell typically offers a well-equipped infrastructure designed to facilitate a smooth and professional recruitment experience. This includes dedicated interview rooms, group discussion spaces, and seminar halls with projectors and audio systems for pre-placement talks (PPTs). The TPC is also equipped with computer labs featuring high-speed internet connectivity and LAN setups to support online assessments and virtual interviews.",
    },
    {
      question:
        "2. Is domain-oriented technical along with soft skills training offered?",
      answer:
        "Yes, The TPC curriculum integrates both domain-specific technical training and soft skills development.",
    },
    {
      question: "3. Do companies also hire through virtual drives?",
      answer:
        "Absolutely. Companies now a days conduct the entire recruitment cycle, from aptitude tests and technical interviews to HR rounds via platforms like Zoom, MS Teams, skype, etc. The TPC coordinates with students and recruiters to manage slots, troubleshoot tech issues, and ensure proper conduct throughout the virtual process.",
    },
    {
      question: "4. What is the annual student placement rate?",
      answer:
        "The annual placement rate varies however, TPC often reports placement rates above 50-60% for core branches.",
    },
    {
      question: "5. Does the TPC engage in workshops or career sessions?",
      answer:
        "Yes, the TPC often organizes industry-focused workshops, expert lectures, and career development sessions which help students to explore and achieve their goals.",
    },
    {
      question: "6. How are recruitment drives usually conducted?",
      answer:
        "Recruitment drives are executed in a phased manner. They begin with company registration and student eligibility screening, followed by pre-placement talks. Next are written aptitude/technical tests, group discussions, and technical/HR interviews. Drives may be held in physical mode or virtually. The TPC ensures scheduling, student preparedness, hospitality for visiting officials (in case of on-campus drives) and real-time coordination during the process.",
    },
    {
      question: "7. How can I reach out for more information on TPC?",
      answer:
        "For further information, you can contact the official college website, where contact emails, phone numbers and a dedicated portal for placement related queries is included. you can also explore our social media platforms or LinkedIn profiles for more exciting drives .",
    },
  ];

  const [accordionItems, setAccordionItems] = useState(faq_data);

  return (
    <section className="max-w-[1920px] my-[6em] m-auto px-[5%]">
      <h2 className="text-lg  sm:text-2xl md:text-3xl text-center my-6 font-extrabold text-gray-900 dark:text-white">
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
        className="gap-6 bg-blue-100 dark:bg-gray-800 rounded-3xl p-12 my-12 text-center w-full mx-auto"
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
    <div className="news-notice-container max-w-[1920px] m-auto px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-12 ">
     <div>
             <p className="text-sm tracking-widest text-bold uppercase text-gray-500 dark:text-gray-400 mb-2">
               About Us
             </p>
             <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white">
               Training & Placement Cell at Government Engineering College, Siwan
             </h2>
             <p className="my-4 text-justify text-gray-600 dark:text-gray-300 leading-relaxed">
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
     
             {/* Read More link */}
             <NavLink to="/contact-us">
               <span className="text-blue-600 hover:text-blue-500 font-medium text-sm inline-flex items-center">
                 know more
                 <ArrowRightCircle className="w-4 h-4 ml-1" />
               </span>
             </NavLink>
      </div>
      <div className="news-notice-area max-md:border-t-4 lg:border-l-4 border-blue-600 p-3 ">
        <h2 className="news-notice-heading text-lg text-blue-600 sm:text-xl md:text-2xl flex max-md:justify-center gap-x-4 items-center font-bold">
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
                  <span className="news-notice-card-tag text-[10px] backdrop-blur-lg border-1  border-zinc-500/50  rounded-3xl px-[0.6em] py-[0.5em] ">
                    Published: {data.date}
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
