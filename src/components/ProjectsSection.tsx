"use client";

import { useMemo, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Github, Link as LinkIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const projects = [
  {
    title: "Cinematic Streaming Hub",
    description:
      "A Netflix-inspired streaming UI with personalized shelves, previews, and buttery motion.",
    tech: ["Next.js", "Framer Motion", "GSAP"],
    image: "/window.svg",
    link: "#",
    source: "#",
  },
  {
    title: "Realtime Collab Suite",
    description:
      "Live collaboration dashboards with presence, comments, and animated micro-interactions.",
    tech: ["React", "WebSockets", "Tailwind"],
    image: "/globe.svg",
    link: "#",
    source: "#",
  },
  {
    title: "AI Storyboarder",
    description:
      "Storyboard ideation tool with cinematic scenes, smooth transitions, and rich media.",
    tech: ["Next.js", "AI APIs", "GSAP"],
    image: "/file.svg",
    link: "#",
    source: "#",
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const controls = useAnimation();
  const { t } = useLanguage();

  useMemo(() => {
    if (inView) controls.start("show");
  }, [controls, inView]);

  const scrollBy = (delta: number) => {
    const node = containerRef.current;
    if (!node) return;
    node.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section id="projects" className="relative z-10 mx-auto mt-20 max-w-6xl px-6">
      <div className="mb-6 flex items-center gap-3">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="h-1 w-10 rounded-full bg-[#e50914]"
        />
        <motion.h2
          initial={{ x: -16, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-2xl font-semibold md:text-3xl"
        >
          {t("projects.title")}
        </motion.h2>
      </div>

      <div className="relative">
        <div className="absolute right-0 top-[-64px] hidden gap-2 md:flex">
          <button
            onClick={() => scrollBy(-320)}
            className="glass grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy(320)}
            className="glass grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div
          ref={containerRef}
          className="scrollbar flex gap-5 overflow-x-auto pb-4 pt-2"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative min-w-[320px] max-w-[360px] flex-1 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.08, duration: 0.6 },
                },
              }}
              initial="hidden"
              animate={controls}
              whileHover={{ scale: 1.04, y: -6 }}
            >
              <div className="relative mb-4 h-44 overflow-hidden rounded-2xl bg-black/50">
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(229,9,20,0.2),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_45%)]"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 200, damping: 28 }}
                />
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-contain opacity-90"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-black/0 p-3 text-sm text-white transition group-hover:translate-y-0"
                  transition={{ duration: 0.35 }}
                >
                  {project.description}
                </motion.div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <div className="flex gap-2">
                    <a
                      href={project.source}
                      className="glass grid h-9 w-9 place-items-center rounded-full text-white hover:bg-white/10"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={project.link}
                      className="glass grid h-9 w-9 place-items-center rounded-full text-white hover:bg-white/10"
                    >
                      <LinkIcon size={16} />
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <motion.span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

