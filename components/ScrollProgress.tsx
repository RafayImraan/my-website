"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-[2px] origin-left bg-accent shadow-[0_0_8px_rgba(0,229,255,0.5)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
