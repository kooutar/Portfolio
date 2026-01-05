"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { t } = useLanguage();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => setSent(false), 2500);
    }, 1200);
  };

  return (
    <section id="contact" className="relative z-10 mx-auto mt-24 max-w-6xl px-6 pb-24">
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
          {t("contact.title")}
        </motion.h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-zinc-300 dark:text-zinc-300 light:text-zinc-600">
            {t("contact.subtitle")}
          </p>
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <Mail size={16} className="text-[#e50914]" />
            <span>kaoutar.laajil@example.com</span>
          </div>
          <div className="flex gap-3 text-sm text-zinc-300">
            <span className="rounded-full bg-white/5 px-3 py-1">Available for freelance</span>
            <span className="rounded-full bg-white/5 px-3 py-1">Remote / Hybrid</span>
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(229,9,20,0.18),transparent_50%)]" />
          <div className="relative mb-4 space-y-3">
            <FloatingLabelInput label={t("contact.name")} id="name" required />
            <FloatingLabelInput label={t("contact.email")} id="email" type="email" required />
            <FloatingLabelInput
              label={t("contact.message")}
              id="message"
              as="textarea"
              required
            />
          </div>
          <motion.button
            type="submit"
            className="relative flex w-full items-center justify-center gap-2 rounded-full bg-[#e50914] px-5 py-3 font-semibold text-white shadow-[0_14px_40px_rgba(229,9,20,0.55)] transition hover:scale-[1.01]"
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? (
              <motion.span
                className="h-5 w-5 rounded-full border-2 border-white/60 border-t-white"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 0.8 }}
              />
            ) : (
              <Send size={16} />
            )}
            {sent ? t("contact.success") : loading ? t("contact.sending") : t("contact.send")}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

function FloatingLabelInput({
  label,
  id,
  type = "text",
  as = "input",
  required,
}: {
  label: string;
  id: string;
  type?: string;
  as?: "input" | "textarea";
  required?: boolean;
}) {
  const isTextArea = as === "textarea";
  return (
    <label className="relative block text-sm text-zinc-400">
      {isTextArea ? (
        <textarea
          id={id}
          name={id}
          required={required}
          placeholder=" "
          className="peer w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#e50914] focus:bg-white/8"
          rows={4}
        />
      ) : (
        <input
          id={id}
          name={id}
          required={required}
          placeholder=" "
          type={type}
          className="peer w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#e50914] focus:bg-white/8"
        />
      )}
      <span className="pointer-events-none absolute left-4 top-3 origin-left transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-white">
        {label}
      </span>
    </label>
  );
}

