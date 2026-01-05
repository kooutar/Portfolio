"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.projects": "Projets",
    "nav.skills": "Compétences",
    "nav.stats": "Statistiques",
    "nav.contact": "Contact",
    "nav.letsTalk": "Discutons",
    
    // Hero
    "hero.title": "Kaoutar Laajil",
    "hero.subtitle": "Développeur Full Stack",
    "hero.description": "Création d'expériences web immersives avec des animations cinématiques, des systèmes performants et des interfaces pixel-perfect. Je conçois des produits dynamiques et réactifs qui prennent vie.",
    "hero.explore": "Découvrir",
    "hero.contact": "Me Contacter",
    "hero.crafting": "Toujours en train de créer des expériences fluides et cinématiques.",
    
    // Projects
    "projects.title": "Projets",
    "projects.subtitle": "Une sélection de mes réalisations récentes",
    "projects.view": "Voir",
    "projects.code": "Code",
    
    // Skills
    "skills.title": "Compétences",
    "skills.description": "Implémentation orientée motion avec une architecture robuste, accessibilité et performance intégrées.",
    
    // Stats
    "stats.title": "Statistiques",
    "stats.projects": "Projets",
    "stats.clients": "Clients",
    "stats.experience": "Années",
    "stats.awards": "Récompenses",
    
    // Education
    "education.title": "Timeline",
    "education.subtitle": "Infographics",
    "education.description": "Voici où ce modèle commence",
    
    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Partagez votre idée, produit ou vision de marque. Je créerai une expérience cinématique et performante qui prend vie à chaque interaction.",
    "contact.name": "Nom",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Envoyer",
    "contact.sending": "Envoi...",
    "contact.success": "Message envoyé avec succès!",
    "contact.error": "Erreur lors de l'envoi. Réessayez.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.stats": "Stats",
    "nav.contact": "Contact",
    "nav.letsTalk": "Let's Talk",
    
    // Hero
    "hero.title": "Kaoutar Laajil",
    "hero.subtitle": "Full Stack Developer",
    "hero.description": "Building immersive web experiences with cinematic motion, performant systems, and pixel-perfect interfaces. I craft dynamic, responsive products that feel alive.",
    "hero.explore": "Explore Work",
    "hero.contact": "Contact Me",
    "hero.crafting": "Always crafting smooth, cinematic experiences.",
    
    // Projects
    "projects.title": "Projects",
    "projects.subtitle": "A selection of my recent work",
    "projects.view": "View",
    "projects.code": "Code",
    
    // Skills
    "skills.title": "Skills Carousel",
    "skills.description": "Motion-forward implementation with robust architecture, accessibility, and performance baked in.",
    
    // Stats
    "stats.title": "Stats",
    "stats.projects": "Projects",
    "stats.clients": "Clients",
    "stats.experience": "Years",
    "stats.awards": "Awards",
    
    // Education
    "education.title": "Timeline",
    "education.subtitle": "Infographics",
    "education.description": "Here is where this template begins",
    
    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Share your idea, product, or brand vision. I'll craft a cinematic, performant experience that feels alive on every interaction.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully!",
    "contact.error": "Error sending message. Please try again.",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("language") as Language | null;
    const initialLang = saved || "en";
    if (typeof document !== "undefined") {
      document.documentElement.lang = initialLang;
    }
    return initialLang;
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Return default values during SSR or if provider is not mounted
    return {
      language: "en" as Language,
      setLanguage: () => {},
      t: (key: string) => key,
    };
  }
  return context;
}

