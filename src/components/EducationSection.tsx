"use client";

import { motion, Variants } from "framer-motion";
import { GraduationCap, BookOpen, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const education = [
  {
    title: "Baccalauréat Sciences Mathématiques B",
    place: "Lycée",
    period: "2020",
    detail: "Fondations fortes en mathématiques, logique et résolution de problèmes.",
    icon: GraduationCap,
    color: "from-pink-400 to-pink-600",
    borderColor: "border-pink-400/50",
  },
  {
    title: "Licence en Sciences Mathématiques et Informatique",
    place: "Université",
    period: "2020 – 2023",
    detail:
      "Algorithmique, structures de données, développement logiciel et bases scientifiques.",
    icon: BookOpen,
    color: "from-purple-500 to-purple-700",
    borderColor: "border-purple-500/50",
  },
  {
    title: "Certificat YOUCODE - UM6P",
    place: "YOUCODE / UM6P",
    period: "2024 – 2026",
    detail:
      "Ingénierie web full stack, pratiques produit, animations et expérience utilisateur avancée.",
    icon: Award,
    color: "from-red-400 to-red-600",
    borderColor: "border-red-400/50",
  },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, type: "spring" as const, stiffness: 180, damping: 22 },
  }),
};

export default function EducationSection() {
  const { t } = useLanguage();
  return (
    <section id="education" className="relative z-10 mx-auto mt-20 max-w-7xl px-6">
      <div className="grid gap-12 md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr]">
        {/* Title Section - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <h2 className="text-4xl font-bold leading-tight md:text-5xl text-white dark:text-white light:text-[#0a0a0a]">
            {t("education.title")}
            <br />
            <span className="text-[#e50914]">{t("education.subtitle")}</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400 dark:text-zinc-400 light:text-zinc-600">
            {t("education.description")}
          </p>
        </motion.div>

        {/* Timeline Section - Right Side */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-pink-400/30 via-purple-500/30 to-red-400/30" />

          <div className="flex flex-col gap-16">
            {education.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex items-center gap-6 ${
                    isEven ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div
                    className={`flex-1 ${
                      isEven ? "text-right pr-8" : "text-left pl-8"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="inline-block rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                    >
                      <div className="text-sm font-semibold text-white">
                        {item.title}
                      </div>
                      <div className="mt-1 text-xs text-zinc-400">{item.place}</div>
                      <div className="mt-2 text-xs text-zinc-300">{item.detail}</div>
                    </motion.div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.1 + 0.3,
                        type: "spring" as const,
                        stiffness: 200,
                        damping: 15,
                      }}
                      className={`relative h-16 w-16 rounded-full border-2 ${item.borderColor} bg-gradient-to-br ${item.color} shadow-lg flex items-center justify-center`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>

                    {/* Year Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      className={`absolute top-20 ${
                        isEven ? "right-0" : "left-0"
                      } whitespace-nowrap text-sm font-semibold text-white`}
                    >
                      {item.period}
                    </motion.div>

                    {/* Chevron Down */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className={`absolute top-24 ${
                        isEven ? "right-2" : "left-2"
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 ${
                          index === 0
                            ? "text-pink-500"
                            : index === 1
                              ? "text-purple-500"
                              : "text-red-500"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

