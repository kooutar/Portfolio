"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function AnimatedBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [viewport, setViewport] = useState({ w: 1, h: 1 }); // avoid zero to keep transforms defined
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 30, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 30, mass: 0.6 });
  const glowRef = useRef<HTMLDivElement | null>(null);

  const parallax1 = useTransform(
    smoothX,
    (v) => (v - viewport.w / 2) * 0.005
  );
  const parallax2 = useTransform(
    smoothY,
    (v) => (v - viewport.h / 2) * 0.008
  );
  const gradientX = useTransform(smoothX, [0, viewport.w], [15, -15]);
  const gradientY = useTransform(smoothY, [0, viewport.h], [12, -12]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const resize = () => {
      setViewport({ w: window.innerWidth || 1, h: window.innerHeight || 1 });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      document.documentElement.style.setProperty("--x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-55"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      />
      <div className="cursor-glow" ref={glowRef} />
      <motion.div
        className="animated-gradient absolute inset-0 opacity-50"
        style={{
          scale: 1.02,
          x: gradientX,
          y: gradientY,
        }}
      />
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="floating-shape left-[-6%] top-[8%] opacity-60" />
      <div className="floating-shape left-[70%] top-[18%] opacity-60" />
      <div className="floating-shape left-[12%] top-[65%] opacity-60" />

      <motion.div
        className="absolute inset-0 mix-blend-screen opacity-70"
        style={{
          x: parallax1,
          y: parallax2,
        }}
      >
        <div className="absolute left-10 top-16 h-48 w-48 rounded-full bg-[#e50914]/8 blur-3xl" />
        <div className="absolute right-10 top-40 h-40 w-40 rounded-full bg-white/4 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff3b3b]/6 blur-3xl" />
      </motion.div>
    </div>
  );
}

