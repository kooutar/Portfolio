"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type Skill = { name: string; level: number; icon: string; color: string };

const skills: Skill[] = [
  { name: "React / Next.js", level: 92, icon: "⚛️", color: "#61dafb" },
  { name: "TypeScript", level: 90, icon: "TS", color: "#3178c6" },
  { name: "Node.js / APIs", level: 86, icon: "🟢", color: "#3c873a" },
  { name: "GSAP / Motion", level: 88, icon: "🎞️", color: "#00ff9c" },
  { name: "Design Systems", level: 84, icon: "💎", color: "#c084fc" },
  { name: "Cloud / CI", level: 80, icon: "☁️", color: "#60a5fa" },
];

export default function SkillsSection() {
  const [index, setIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % skills.length),
      2600
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="skills" className="relative z-10 mx-auto mt-24 max-w-6xl px-6">
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
          {t("skills.title")}
        </motion.h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.98, rotateX: -6 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111111] via-[#0c0c0c] to-[#111] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(229,9,20,0.18),transparent_50%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="relative flex items-center gap-3 text-lg font-semibold">
            <div
              className="grid h-12 w-12 place-items-center rounded-2xl text-base font-bold text-black shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              style={{ background: skills[index].color }}
            >
              {skills[index].icon}
            </div>
            <span>{skills[index].name}</span>
          </div>
          <p className="relative mt-3 text-sm text-zinc-300 dark:text-zinc-300 light:text-zinc-600">
            {t("skills.description")}
          </p>
          <div className="relative mt-6 h-3 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skills[index].level}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="h-full rounded-full bg-gradient-to-r from-[#e50914] to-[#ff3b3b]"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  index,
}: {
  skill: Skill;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, rotateY: -12, y: 24 }}
      animate={isInView ? { opacity: 1, rotateY: 0, y: 0 } : undefined}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 200, damping: 22 }}
      className="shimmer relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur"
    >
      <div className="relative flex items-center justify-between gap-3">
        <div
          className="grid h-10 w-10 place-items-center rounded-xl text-xs font-bold text-black shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
          style={{ background: skill.color }}
        >
          {skill.icon}
        </div>
        <div className="flex-1">
          <span className="block text-sm font-semibold text-white">{skill.name}</span>
          <span className="text-[11px] uppercase tracking-[0.14em] text-zinc-400">
            {skill.level}% mastery
          </span>
        </div>
      </div>
      <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#e50914] to-[#ff3b3b]"
        />
      </div>
    </motion.div>
  );
}

