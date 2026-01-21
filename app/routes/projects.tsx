import * as React from "react";
import type { Route } from "./+types/projects";
import { Link } from "react-router";
import { projects } from "./home";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects | Hafsa Rashid" },
    {
      name: "description",
      content: "View all projects by Hafsa Rashid - MERN stack developer.",
    },
  ];
}

const navLinks = [
  { href: "/#hero", label: "Home" },
  { href: "/#skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
] as const;

export default function Projects() {
  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 font-[Inter]">
      {/* Top nav */}
      <header className="fixed top-0 inset-x-0 z-30 bg-[#050816]/80 backdrop-blur border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-slate-100 font-semibold tracking-wide hover:text-cyan-400 transition-colors"
          >
            &lt;Hafsa_Rashid&gt;
          </Link>
          <nav className="hidden md:flex gap-8 text-sm">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-slate-300 text-xl">
            <a
              href="https://github.com/HFsa-RaShid"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-white transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/hafsarashid28"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <section className="mx-auto max-w-6xl px-4 space-y-8">
          <div className="text-center space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Projects
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-50">
              My Projects
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Here are all the projects I&apos;ve built. Each one represents a
              step in my journey as a developer, showcasing my skills in modern
              web development.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col rounded-2xl border border-slate-700/70 bg-slate-900/70 overflow-hidden hover:border-cyan-500/70 transition-colors"
              >
                <div className="h-32 relative">
                  {project.image ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-slate-900 to-emerald-500/30" />
                  )}
                  <div className="absolute inset-0 bg-cyan-600/20" />
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3 className="text-lg font-semibold text-slate-50">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400">{project.summary}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-800/80 border border-slate-600/60 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-cyan-500/60 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-200 hover:bg-cyan-500/20 transition-colors"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-white/5 bg-[#050816]">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; 2025 Hafsa Rashid. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/HFsa-RaShid"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hafsarashid28"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="hafsarashid028@gmail.com"
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Project detail view moved to a dedicated route: /projects/:id
