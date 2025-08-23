import { motion } from "framer-motion";

export default function AyushPayLoader() {
  const text = "ayush pay...";
  const letters = text.split("");

  return (
    <div className="flex justify-center items-center h-[20vh] border bg-gray-100 border-gray-300 rounded-2xl">
      <div className="flex text-2xl font-bold">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.1,
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: letters.length * 0.15 + 0.5,
            }}
            className={index < 6 ? "text-blue-950" : "text-blue-500"} // first 5 letters dark, rest light
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
