import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";

import EducationSection from "@/components/EducationSection";

export default function Home() {
  return (
    <main className="relative pb-16">
      <NavBar />
      <Hero />
      <ProjectsSection />
      <SkillsSection />
    
      <EducationSection />
      <ContactSection />
    </main>
  );
}
