import { motion } from "framer-motion";

export default function BranchSection({ title, description, stats, reverse = false }) {
  return (
    <section className="min-h-[100px] dark:bg-zinc-900 px-[5%] my-[100px] transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        } gap-8 items-center justify-between`}
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-zinc-800 dark:text-zinc-100 md:w-1/2 text-center md:text-left">
          {title}
        </h2>

        <div className="md:w-1/2 space-y-6">
          <p className="md:text-xl text-zinc-600 dark:text-zinc-400">
            {description}
          </p>

          <div className="card flex flex-wrap gap-6 justify-center md:justify-start">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                className="dm-serif-text-regular py-6 font-bold text-lg text-zinc-900 dark:text-white text-center min-w-[120px]"
              >
                <div className="text-4xl">{item.value}</div>
                <p>{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
