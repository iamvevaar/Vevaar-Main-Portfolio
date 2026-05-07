"use client";
import { motion, useScroll, useSpring } from "motion/react";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
    />
  );
}
