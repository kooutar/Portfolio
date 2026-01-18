"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Github, ExternalLink, Star, GitFork } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  stars: number;
  forks: number;
  homepage: string | null;
  html_url: string;
  updated_at: string;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/kooutar/repos?sort=updated&per_page=6');
        const data = await response.json();

        const formattedProjects: Project[] = data.map((repo: any) => ({
          title: repo.name,
          description: repo.description || "Projet développé avec passion",
          tech: repo.language ? [repo.language] : ["Code"],
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          homepage: repo.homepage,
          html_url: repo.html_url,
          updated_at: new Date(repo.updated_at).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short'
          })
        }));

        setProjects(formattedProjects);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  const scrollBy = (delta: number) => {
    const node = containerRef.current;
    if (!node) return;
    node.scrollBy({ left: delta, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section id="projects" className="relative z-10 mx-auto mt-20 max-w-6xl px-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-1 w-10 rounded-full bg-[#e50914]" />
          <h2 className="text-2xl font-semibold md:text-3xl text-white">Mes Projets</h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 pt-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[320px] max-w-[360px] flex-1 rounded-3xl border border-white/10 bg-white/5 p-4 animate-pulse"
            >
              <div className="h-44 rounded-2xl bg-white/10 mb-4" />
              <div className="h-6 bg-white/10 rounded mb-2 w-3/4" />
              <div className="h-4 bg-white/10 rounded w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative z-50 mx-auto mt-20 max-w-6xl px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-1 w-10 rounded-full bg-[#e50914]" />
        <h2 className="text-2xl font-semibold md:text-3xl text-white">
          Mes Projets GitHub ({projects.length})
        </h2>
      </div>

      <div className="relative">
        <div className="absolute right-0 top-[-64px] hidden gap-2 md:flex z-10">
          <button
            onClick={() => scrollBy(-320)}
            className="glass grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 transition-all"
            aria-label="Projet précédent"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy(320)}
            className="glass grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 transition-all"
            aria-label="Projet suivant"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto pb-4 pt-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative min-w-[320px] max-w-[360px] flex-1 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur hover:scale-105 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative mb-4 h-44 overflow-hidden rounded-2xl bg-gradient-to-br from-[#e50914]/20 via-black/50 to-black/80">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Github size={64} className="text-white/40" />
                </div>
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-t from-black/90 to-black/0 p-3 text-sm text-white transition-transform duration-300">
                  {project.description}
                </div>
                <div className="absolute top-3 right-3 flex gap-2 text-xs text-white">
                  <span className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-full backdrop-blur">
                    <Star size={12} />
                    {project.stars}
                  </span>
                  <span className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-full backdrop-blur">
                    <GitFork size={12} />
                    {project.forks}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold capitalize text-white">{project.title}</h3>
                  <div className="flex gap-2">
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass grid h-9 w-9 place-items-center rounded-full text-white hover:bg-white/10 transition-all"
                      aria-label="Voir le code source"
                    >
                      <Github size={16} />
                    </a>
                    {project.homepage && (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass grid h-9 w-9 place-items-center rounded-full text-white hover:bg-white/10 transition-all"
                        aria-label="Voir le site web"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200"
                    >
                      {item}
                    </span>
                  ))}
                  <span className="text-xs text-white/50 ml-auto">
                    {project.updated_at}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}