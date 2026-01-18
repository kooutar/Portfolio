"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

const navItemsKeys = [
  { key: "nav.home", href: "#top" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.skills", href: "#skills" },
  { key: "nav.stats", href: "#stats" },
  { key: "nav.contact", href: "#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("nav.home");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const offsets = navItemsKeys.map((item) => {
        const target = document.querySelector(item.href);
        if (!target) return { key: item.key, top: Infinity };
        return { key: item.key, top: Math.abs(target.getBoundingClientRect().top) };
      });
      const nearest = offsets.sort((a, b) => a.top - b.top)[0];
      if (nearest) setActive(nearest.key);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      className="fixed left-0 right-0 top-0 z-40 px-6 py-4"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-3 transition-all ${scrolled ? "glass backdrop-blur-xl" : "bg-transparent"
          }`}
      >
        <motion.div
          className="text-lg font-semibold tracking-tight"
          whileHover={{ scale: 1.03 }}
        >
          <span className="text-white">Kaoutar</span>{" "}
          <span className="text-[#e50914]">Laajil</span>
        </motion.div>
        <nav className="hidden items-center gap-3 text-sm font-medium md:flex">
          {navItemsKeys.map((item) => (
            <motion.a
              key={item.key}
              href={item.href}
              className="relative rounded-full px-3 py-2 text-zinc-200 transition-colors hover:text-white"
              whileHover={{ y: -2 }}
            >
              {t(item.key)}
              {active === item.key && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                />
              )}
            </motion.a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="relative">
            <motion.button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="rounded-full p-2 text-zinc-200 transition-colors hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Languages size={18} />
            </motion.button>
            {showLangMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-12 rounded-xl border border-white/10 bg-[#1a1a1a] backdrop-blur-xl p-2 shadow-lg"
              >
                <button
                  onClick={() => {
                    setLanguage("en");
                    setShowLangMenu(false);
                  }}
                  className={`block w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${language === "en"
                      ? "bg-[#e50914] text-white"
                      : "text-zinc-300 hover:bg-white/10"
                    }`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    setLanguage("fr");
                    setShowLangMenu(false);
                  }}
                  className={`block w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${language === "fr"
                      ? "bg-[#e50914] text-white"
                      : "text-zinc-300 hover:bg-white/10"
                    }`}
                >
                  Français
                </button>
              </motion.div>
            )}
          </div>


          <motion.a
            className="hidden rounded-full bg-[#e50914] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(229,9,20,0.45)] transition hover:scale-[1.02] hover:shadow-[0_14px_36px_rgba(229,9,20,0.6)] md:inline-flex"
            href="#contact"
          >
            {t("nav.letsTalk")}
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}

