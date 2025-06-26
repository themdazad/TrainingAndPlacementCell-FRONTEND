import { Accordion, AccordionItem } from "@heroui/accordion";
import { useState } from "react";

export default function FaqFeedbackForm() {
  return (
    <section className=" max-w-screen-2xl m-auto px-[2%] grid lg:grid-cols-2 gap-6">
      <FAQAccordion />
      <FeedbackForm />
    </section>
  );
}

function FAQAccordion() {
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
    <div className="asked-questions-section  ">
      <h2 className="text-2xl text-center my-6 font-extrabold text-neutral-900 dark:text-white">
        Asked Questions!
      </h2>
      <Accordion variant="light" className="md:text-lg">
        {accordionItems.map((item, index) => (
          <AccordionItem
            key={index}
            className="md:text-xl"
            aria-label={`Accordion ${index + 1}`}
            title={item.question}
          >
            <p className=" text-neutral-800 dark:text-neutral-200">
              {item.answer}
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
function FeedbackForm() {
  return (
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSfyQXY42QLLCvrRDSTnUAYMdL-AN6TsCW8VAlBjRu-ntDA62g/viewform?embedded=true"
      className="min-w-full min-h-[538px]"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
    >
      Loading…
    </iframe>
  );
}
