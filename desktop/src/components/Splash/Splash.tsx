import "./Splash.css";
import { motion } from "framer-motion";

export default function Splash() {
  return (
    <div className="splash-screen">
      <div className="background-grid"></div>

      <motion.div
        className="splash-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h1
          className="logo"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          HELA
        </motion.h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Artificial General Intelligence Operating System
        </motion.p>

        <motion.div
          className="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span></span>

          <span>Initializing Neural Core...</span>
        </motion.div>
      </motion.div>
    </div>
  );
}