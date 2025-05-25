import { motion } from "framer-motion";
import { Hourglass, BookCheck, Backpack, Handshake } from "lucide-react";

const cards = [
  {
    icon: Hourglass,
    title: "Duration 4 Years",
    description:
      "The Bachelor of Technology (B.Tech) is an 8-semester, full-time undergraduate program, regulated by AICTE and structured as per BEU guidelines. Students undergo continuous internal evaluation, hands-on labs, and real-world internships.",
  },
  {
    icon: BookCheck,
    title: "6 Accredited Specializations",
    description:
      "We offer streams: Computer Science and Engineering, CSE IoT, VLSI, Mechanical, Civil, and Electrical Engineering. Each is aligned with current industry and research trends.",
  },
  {
    icon: Backpack,
    title: "1400+ Enrolled Students",
    description:
      "Over 1,400 students are currently pursuing their B.Tech degrees across six specializations. Our academic environment emphasizes mentorship, peer collaboration, and continuous support through faculty advisors and career guidance cells.",
  },
  {
    icon: Handshake,
    title: "32+ Verified Industry Tie-ups",
    description:
      "Our partnerships with companies offer students real-world exposure through internships, workshops, and capstone project collaborations — verified annually by our T&P Cell.",
  },
];
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AcademicPrograms() {
  return (
    <section className="min-h-[100px] dark:bg-stone-900 px-[5%] my-[100px] transition-colors duration-300">
      <div className="academic-program grid gap-16">
        <div className="academic-program__title text-center">
          <h1 className="font-extrabold text-lg md:text-3xl text-stone-900 dark:text-white">
            Academic Programs
          </h1>
          <p className="text-stone-700 dark:text-stone-300">
            Bachelor of Technology | Undergraduate Program
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className="academic-program__item flex flex-col items-center justify-center gap-4 text-center border-t-4 border-blue-500 p-6 bg-blue-100 dark:bg-stone-800 rounded-3xl hover:shadow-lg transition-all duration-300"
              >
                <Icon className="h-16 w-16 text-blue-500 dark:text-blue-400" />
                <div className="academic-program__item-title font-bold text-lg text-stone-900 dark:text-white">
                  {card.title}
                </div>
                <div className="academic-program__item-description text-sm text-stone-700 dark:text-stone-300">
                  {card.description}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
