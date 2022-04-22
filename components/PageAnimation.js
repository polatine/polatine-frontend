import React from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { x: "-100%", y: 0, opacity: 0 },
  enter: { x: 0, y: 0, opacity: 1 },
  exit: { x: "100%", y: 0, opacity: 0 },
};

const PageAnimation = (props) => (
  <div>
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {props.children}
    </motion.main>
  </div>
);

export default PageAnimation;
