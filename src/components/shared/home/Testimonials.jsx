  import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    text: "The process was competitive, but I liked that mock interview pushed me to go beyond my comfort zone.",
    name: "Laxmi Kumari",
    title: "Electrical Engineering, 2025",
    companyName: "Prithvi Pratap Buildcon",
    companyLogo: "",
    avatar: "/images/students2025/laxmi22103151953.jpg",
    rotate: "-rotate-2",
  },
  
  {
    text: "Happy to be placed through this college.The company's work aligned with my interest areas, which made the placement even more exciting. ",
    name: "Abhishek Kumar",
    title: "Mechanical Engineering, 2025",
    companyName: "HIGH-TECHNEXT ENGINEERING & TELECOM PVT LTD",
    companyLogo: "",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rotate: "-rotate-1",
  },
  {
    text: "Joining a company in my own field is a huge confidence booster. Feeling motivated and grateful.",
    name: "Nidhi Kumari",
    title: "Electrical Engineering, 2026",
    companyName: "HIGH-TECHNEXT ENGINEERING & TELECOM PVT LTD",
    companyLogo: "",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rotate: "-rotate-1",
  },
];

const Testimonials = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);1
  };

  const prevSlide = () => {
    setStartIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Autoplay (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Get 3 testimonials in a circular fashion
  const visibleTestimonials = [
    testimonials[startIndex],
    testimonials[(startIndex + 1) % testimonials.length],
    testimonials[(startIndex + 2) % testimonials.length],
  ];

  return (
    <section className="section text-center">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white max-w-2xl mx-auto mb-20 leading-snug">
        Hear from our students and recruiters.{" "}
        <span className="text-blue-500 dark:text-blue-400">
          100+ success stories
        </span>{" "}
        and counting.
      </h2>

      <div className="relative mx-auto">
        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          className="snap-mandatory snap-x overflow-x-scroll scrollbar-hide p-4 flex gap-8"
        >
          {/* card */}
          {visibleTestimonials.map((t, index) => (
            <div
              key={index}
              className={`snap-start min-w-[320px] bg-sky-500/10 border-t-4 border-blue-500  p-6 text-left rounded-3xl flex flex-col justify-between transition-all duration-100 ${
                t.rotate ?? ""
              } transition duration-300 ease-in-out hover:scale-105 hover:shadow-md`}
            >
              <p className="text-neutral-800 dark:text-neutral-100 mb-4 leading-relaxed">
                "{t.text}"
              </p>
              <div>
                <p className="font-semibold text-neutral-900 text-sm dark:text-white">
                  {t.name}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                  {t.title}
                </p>
                <div className="flex items-center justify-between border-t border-neutral-500/50 dark:border-neutral-700 pt-2 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {t.companyName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full hidden md:flex justify-between pointer-events-none">
          <button
            onClick={prevSlide}
            className="text-3xl absolute -left-20 text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition pointer-events-auto"
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="text-3xl absolute -right-20 text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition pointer-events-auto"
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
