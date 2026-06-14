"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** Direction of the entrance animation. Defaults to "up". */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distance in pixels to translate from. Defaults to 24. */
  distance?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 24,
}: RevealProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });

  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
