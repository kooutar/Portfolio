"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { animate, motion, useAnimation, useInView, useMotionValue } from "framer-motion";
import { Award, Code, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StatsSection() {
  const { t } = useLanguage();
  
  const stats = [
    { label: t("stats.projects"), value: 48, icon: <Code size={18} /> },
    { label: t("stats.clients"), value: 22, icon: <Users size={18} /> },
    { label: t("stats.awards"), value: 6, icon: <Award size={18} /> },
  ];
  return (
    <section id="stats" className="relative z-10 mx-auto mt-20 max-w-6xl px-6">
      <div className="mb-6 flex items-center gap-3">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h-1 w-10 rounded-full bg-[#e50914]"
        />
        <motion.h2
          initial={{ x: -16, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-2xl font-semibold md:text-3xl"
        >
          {t("stats.title")}
        </motion.h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: { label: string; value: number; icon: ReactNode };
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();
  const count = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;
    controls.start({ opacity: 1, y: 0, transition: { delay: index * 0.1 } });
    const controlsCount = animate(count, stat.value, { duration: 1.6, ease: "easeOut" });
    return () => controlsCount.stop();
  }, [controls, count, index, isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(229,9,20,0.12),transparent_60%)]" />
      <div className="relative flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e50914]/15 text-[#e50914]">
          {stat.icon}
        </div>
        <div>
          <div className="text-2xl font-semibold text-white">
            {Math.round(count.get())}+
          </div>
          <div className="text-xs uppercase tracking-[0.18em] text-zinc-400">
            {stat.label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

