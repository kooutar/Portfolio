"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function CustomCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const cursorX = useSpring(x, { stiffness: 250, damping: 30, mass: 0.6 });
  const cursorY = useSpring(y, { stiffness: 250, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX - 12);
      y.set(event.clientY - 12);
    };
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", show);
    window.addEventListener("pointerup", show);
    window.addEventListener("mouseout", hide);
    window.addEventListener("mouseover", show);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", show);
      window.removeEventListener("pointerup", show);
      window.removeEventListener("mouseout", hide);
      window.removeEventListener("mouseover", show);
    };
  }, [prefersReducedMotion, x, y]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-6 w-6 rounded-full border border-[#e50914]/70 shadow-[0_0_24px_rgba(229,9,20,0.45)] mix-blend-screen backdrop-blur"
      style={{ x: cursorX, y: cursorY, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="absolute inset-[-12px] rounded-full bg-[#e50914]/25 blur-2xl"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

