import "./Boot.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const bootMessages = [
  "Initializing HELA...",
  "Loading Neural Core...",
  "Connecting Memory...",
  "Starting AI Agents...",
  "Loading Voice Engine...",
  "Preparing Interface...",
  "System Ready."
];

export default function Boot() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= bootMessages.length - 1) return;

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 900);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="boot-screen">
      <motion.h1
        className="boot-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        HELA
      </motion.h1>

      <motion.p
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="boot-text"
      >
        {bootMessages[index]}
      </motion.p>

      <div className="progress">
        <div
          className="progress-fill"
          style={{
            width: `${((index + 1) / bootMessages.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}