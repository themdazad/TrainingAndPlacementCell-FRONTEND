import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

const testimonials = [
  {
    text: "The T&P Cell helped me crack my interview with mock tests and technical guidance. I got placed at Infosys with confidence.",
    name: "Laxmi Kumari",
    title: "Electrical Engineering, 2025",
    companyName: "Prithvi Pratap Buildcon",
    companyLogo: "",
    avatar: "/images/students2025/laxmi22103151953.jpg",
    rotate: "-rotate-2",
  },
  {
    text: "We were truly impressed by the students' readiness and communication. The placement team's professionalism was commendable.",
    name: "Vikram Nair",
    title: "Senior Talent Acquisition Manager",
    companyName: "Prithvi Pratap Buildcon",
    companyLogo: "🏢",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rotate: "rotate-1",
  },
  {
    text: "The placement bootcamp boosted my confidence. The aptitude practice and mock interviews really helped me shine.",
    name: "Abhishek Kumar",
    title: "Mechanical Engineering, 2025",
    companyName: "HIGH-TECHNEXT ENGINEERING & TELECOM PVT LTD",
    companyLogo: "",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rotate: "-rotate-1",
  },
];

const Testimonials = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
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
    <section className="py-16 px-4 bg-blue-100 text-center">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 max-w-2xl mx-auto mb-10">
        Hear from our students and recruiters.{" "}
        <span className="text-blue-600">500+ success stories</span> and
        counting.
      </h2>

      <div className="relative max-w-7xl mx-auto">
        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }} // 👈 animate every time 20% of it is visible
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleTestimonials.map((t, index) => (
            <div
              key={index}
              className={` bg-white p-6 rounded-xl text-left shadow-sm flex flex-col justify-between transform ${t.rotate} transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}
            >
              <p className="text-gray-900 text-sm transition-all duration-300 mb-4">
                "{t.text}"
              </p>
              <div>
                <p className="font-semibold text-gray-800">{t.name}</p>
                <p className="text-gray-600 text-sm mb-2">{t.title}</p>
                <div className="flex items-center justify-between border-t pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{t.companyLogo}</span>
                    <span className="text-sm font-medium">{t.companyName}</span>
                  </div>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full hidden md:flex justify-between">
          <button
            onClick={prevSlide}
            className="text-3xl absolute -left-20 text-gray-600 hover:text-blue-600 transition"
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="text-3xl absolute -right-20 text-gray-600 hover:text-blue-600 transition"
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
