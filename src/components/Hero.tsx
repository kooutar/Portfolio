"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";

const name = "Kaoutar Laajil";
const letters = name.split("");

const letterContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const letter: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 420, damping: 32 },
  },
};

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-10 px-6 pt-32 md:flex-row md:items-center"
    >
      <motion.div
        className="relative h-80 w-80 md:h-96 md:w-96 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.02, 1], y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <Image
            src="/images/profil-removebg-preview.png"
            alt="Kaoutar Laajil - Full Stack Developer"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-3xl border border-[#e50914]/40"
          animate={{ opacity: [0.35, 0.9, 0.35], scale: [0.98, 1.02, 0.98] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        />
        <div className="absolute -inset-6 rounded-3xl bg-[#e50914]/10 blur-3xl" />
      </motion.div>

      <div className="flex max-w-2xl flex-col gap-6 text-center md:text-left">
        <motion.div
          variants={letterContainer}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center justify-center gap-1 text-4xl font-bold leading-tight md:justify-start md:text-5xl"
        >
          {letters.map((char, index) => (
            <motion.span key={`${char}-${index}`} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-lg font-semibold uppercase tracking-[0.2em] text-[#e50914]"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="text-lg text-zinc-300 dark:text-zinc-300 light:text-zinc-600"
        >
          {t("hero.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 md:justify-start"
        >
          <motion.a
            href="#projects"
            className="gradient-border relative rounded-full bg-[#e50914] px-6 py-3 text-sm font-semibold uppercase tracking-tight text-white shadow-[0_12px_40px_rgba(229,9,20,0.5)] transition hover:scale-[1.02] ripple"
            whileTap={{ scale: 0.97 }}
          >
            {t("hero.explore")}
          </motion.a>
          <motion.a
            href="#contact"
            className="rounded-full border border-white/15 dark:border-white/15 light:border-black/15 bg-white/5 dark:bg-white/5 light:bg-black/5 px-6 py-3 text-sm font-semibold uppercase tracking-tight text-white dark:text-white light:text-[#0a0a0a] transition hover:border-white/30 dark:hover:border-white/30 light:hover:border-black/30 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {t("hero.contact")}
          </motion.a>
        </motion.div>

        {!prefersReducedMotion && (
          <motion.div
            className="mt-2 flex items-center justify-center gap-2 text-sm text-zinc-400 md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-[#e50914]"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            />
            {t("hero.crafting")}
          </motion.div>
        )}
      </div>
    </section>
  );
}

