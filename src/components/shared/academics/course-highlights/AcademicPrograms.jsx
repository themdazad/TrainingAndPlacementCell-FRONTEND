import { motion } from "framer-motion";
import { Hourglass, BookCheck, Backpack, Handshake } from "lucide-react";

const cards = [
  {
    icon: Hourglass,
    title: "Electrical Engineering",
    description:
      "Comprehensive study of electrical systems, circuits, and electronics.",
    intake: 60,
    totalPlaced: 45,

  },
  {
    icon: BookCheck,
    title: "Mechanical Engineering",
    description: "Focuses on mechanics, thermodynamics, and material science.",
    intake: 60,
    totalPlaced: 50,

  },
  {
    icon: Backpack,
    title: "Civil Engineering",
    description:
      "Emphasizes sustainable infrastructure and construction techniques.",
    intake: 60,
    totalPlaced: 40,

  },
  {
    icon: Handshake,
    title: "Computer Science and Engineering",
    description: "Focus on software, algorithms, and emerging technologies.",
    intake: 60,
    totalPlaced: 52,

  },
  {
    icon: Handshake,
    title: "CSE - Internet of Things (IoT)",
    description: "Focus on IoT devices, cloud computing, and smart automation.",
    intake: 60,
    totalPlaced: 48,

  },
  {
    icon: Handshake,
    title: "ECE (VLSI Design)",
    description: "Focus on IoT devices, cloud computing, and smart automation.",
    intake: 60,
    totalPlaced: 48,

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
    <section className="min-h-[100px] dark:bg-neutral-900 px-[2.5%] my-[100px] transition-colors duration-300">
      <div className="academic-program grid gap-16">
        <div className="academic-program__title text-center">
          <h1 className="font-extrabold text-lg md:text-3xl text-neutral-900 dark:text-white">
            Undergraduate Programs
          </h1>
          <p className="text-neutral-700 dark:text-neutral-300">
            Bachelor of Technology | Undergraduate Program
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
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
                className="academic-program__item flex flex-col items-center justify-center gap-3 text-center border-t-4 border-blue-500 p-6 bg-blue-100 dark:bg-neutral-800 rounded-3xl hover:shadow-lg transition-all duration-300"
              >
                <Icon className="h-16 w-16 text-blue-500 dark:text-blue-400" />

                <div className="academic-program__item-title font-bold text-lg text-neutral-900 dark:text-white">
                  {card.title}
                </div>

                <div className="w-full text-sm text-center mt-4 space-y-1 text-neutral-800 dark:text-neutral-200">
                  <p>
                    <span className="font-semibold">Intake Capacity:</span>{" "}
                    {card.intake} Students
                  </p>
                  <p>
                    <span className="font-semibold">Total Placed:</span>{" "}
                    {card.totalPlaced} Students
                  </p>
                  
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
