import { Button, Image} from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import {
  CircleArrowRight,
  Download,
  ChevronDown,
  Mouse,
  CloudDownload,
  Bell,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import GradientTracking from "./components/ui/GradientTracking";
import SimpleSlider from "./components/ui/SimpleSlider";
import { AnimatedBackground } from "./components/ui/AnimatedBackground";
import GooglesheetContext from "./contexts/google-sheets/GooglesheetContext";
import NewsNoticeProvider from "./contexts/google-sheets/news-notice-provider";
import { NavLink } from "react-router-dom";
import AnimatedLogoCloud from "./components/ui/AnimatedLogoCloud";

export default function Layout() {
  return (
    <>
      <section className="max-w-[1980px] px-[5%] md:px-[10%] m-auto py sm:py-16 lg:py-24">
        <div className="grid items-center py-12 grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
              For career and growth
            </p>
            <h1 className="mt-2 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-6xl">
              Launch Your Career with Expert-Guided Training
            </h1>
            <p className="mt-2 text-base text-black lg:mt-8 sm:text-xl">
              Grow your career fast with right training.
            </p>

            <a
              href="#"
              title=""
              className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
              role="button"
            >
              Apply for Campus Placement 2025
              <svg
                className="w-6 h-6 ml-4 -mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>

            <p className="mt-5 flex  ">
              <a
                href="/files/GEC_Siwan_Official_Resume_Format.docx"
                title="Resume Template"
                className="text-black transition-all duration-200 hover:underline"
                >
                Resume Template{" "}
              </a>
            </p>
          </div>

          <div>
            {/* <img
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                alt="tpo siwan hero image"
              /> */}
            <Image
              className="w-full"
              src="/images/hero_image2.svg"
              alt="tpo siwan hero image"
            />
          </div>
        </div>
      </section>


      <section>
        <h2 className="text-center text-4xl font-semibold">
          {" "}
          Placement Companies{" "}
        </h2>
        <AnimatedLogoCloud />
      </section>
      <main className="hidden overflow-hidden min-h-screen">
        {/* Hero Section */}
        <AnimatedBackground />
        <HeroSection />
        {/* News/Notice Area */}
        {/* <NewsNoticeProvider>
        <NewsNoticeArea />
      </NewsNoticeProvider> */}

        {/* Features  */}
        <section className="feature-card max-md:hidden my-[4em] ">
          <div className="max-w-[1920px] m-auto rounded-3xl overflow-hidden px-[5%]">
            <GradientTracking>
              <div className="features-container  bg-gray-500/10 py-[6em] px-[2em] rounded-3xl border hover:border-1 border-gray-500/20  hover:border-sky-500/50  transition-all duration-300  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="feature-card flex flex-col items-center gap-2 text-center">
                  <div className="feature-card-icon  ">
                    <svg
                      xmlns="https://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-calendar-check-2"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
                      <path d="M3 10h18" />
                      <path d="m16 20 2 2 4-4" />
                    </svg>
                  </div>
                  <h2 className="feature-card-heading text-xl font-bold">
                    Regular Workshops
                  </h2>
                  <p className="feature-card-description max-sm:text-[14px] text-gray-500">
                    We conduct regular workshops on various topics to enhance
                    the skills of our students.
                  </p>
                </div>
                <div className="feature-card flex flex-col items-center gap-2 text-center">
                  <div className="feature-card-icon ">
                    <svg
                      xmlns="https://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-monitor-cog"
                    >
                      <path d="M12 17v4" />
                      <path d="m15.2 4.9-.9-.4" />
                      <path d="m15.2 7.1-.9.4" />
                      <path d="m16.9 3.2-.4-.9" />
                      <path d="m16.9 8.8-.4.9" />
                      <path d="m19.5 2.3-.4.9" />
                      <path d="m19.5 9.7-.4-.9" />
                      <path d="m21.7 4.5-.9.4" />
                      <path d="m21.7 7.5-.9-.4" />
                      <path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                      <path d="M8 21h8" />
                      <circle cx="18" cy="6" r="3" />
                    </svg>
                  </div>
                  <h2 className="feature-card-heading text-xl font-bold">
                    Technical Training
                  </h2>
                  <p className="feature-card-description max-sm:text-[14px] text-gray-500">
                    We provide technical training to our students to make them
                    industry-ready.
                  </p>
                </div>
                <div className="feature-card flex flex-col items-center gap-2 text-center">
                  <div className="feature-card-icon ">
                    <svg
                      xmlns="https://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-signature"
                    >
                      <path d="m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284" />
                      <path d="M3 21h18" />
                    </svg>
                  </div>
                  <h2 className="feature-card-heading text-xl font-bold">
                    Personality Development
                  </h2>
                  <p className="feature-card-description max-sm:text-[14px] text-gray-500">
                    We focus on the overall development of our students by
                    conducting personality development sessions.
                  </p>
                </div>
              </div>
            </GradientTracking>
          </div>
        </section>

        {/* FAQ  */}
        <FAQ />
      </main>
    </>
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
      <div className="news-notice-area  border hover:border-1 border-gray-500/20 rounded-xl  p-3 md:p-6 ">
        <h2 className="news-notice-heading text-xl sm:text-2xl md:text-3xl mt-2 flex max-md:justify-center gap-x-2 items-center font-bold">
          Notifications <Bell />
        </h2>

        {/* Mapping for upcoming data for latest news and notice   */}
        <div className="row-container  box-border my-[1em] max-h-[20rem] overflow-y-scroll overflow-x-hidden ">
          {response.reverse().map((data, index) => {
            return (
              <a
                key={index}
                href={data.pdf_link}
                target="_blank"
                className="news-notice-row transition-all duration-300 flex flex-col items-start py-1 "
              >
                <div className="tags space-x-2 ">
                  <span className="news-notice-card-tag text-[12px] bg-zinc-500/20 backdrop-blur-lg border-1  border-zinc-500/50  rounded-3xl px-[0.6em] py-[0.2em] ">
                    {data.date}
                  </span>
                  <span className="news-notice-card-tag text-[12px] backdrop-blur-lg border-1  border-sky-500/50  rounded-3xl px-[0.6em] py-[0.2em] ">
                    {data.tag}
                  </span>
                </div>

                <p className="news-notice-card-content max-sm:text-[14px] p-[0.5em] w-full overflow-ellipsis ">
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
    </section>
  );
  ` 1ptfby hnjm,`;
}
