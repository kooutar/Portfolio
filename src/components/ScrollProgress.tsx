"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.6,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-[#1f1f1f]"
      style={{ scaleX }}
    >
      <div className="h-full w-full bg-[linear-gradient(90deg,#e50914,#ff3b3b)]" />
    </motion.div>
  );
}

