import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const quotes = [
  "Education is the most powerful weapon which you can use to change the world. – Nelson Mandela",
  "The beautiful thing about learning is that nobody can take it away from you. – B.B. King",
  "The expert in anything was once a beginner. – Helen Hayes",
  "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
  "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
  "Don’t let what you cannot do interfere with what you can do. – John Wooden",
  "Strive for progress, not perfection.",
  "Push yourself, because no one else is going to do it for you.",
];

function ComingSoon() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-gray-900 bg-white relative text-center">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold mb-6"
      >
        Coming Soon
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg md:text-xl max-w-2xl mb-10"
      >
        We're building something amazing for students like you. Stay inspired!
      </motion.p>

      <motion.blockquote
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="italic text-xl md:text-2xl max-w-3xl text-indigo-700 font-medium"
      >
        “{quote}”
      </motion.blockquote>

    </div>
  );
}

export default ComingSoon;
