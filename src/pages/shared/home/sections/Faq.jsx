
import { motion } from "framer-motion";
import {  ArrowRightCircle,} from "lucide-react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Faq() {
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
        className="gap-6  hover:shadow-md dark:bg-gray-800 rounded-3xl p-12 my-12 text-center w-full mx-auto"
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
