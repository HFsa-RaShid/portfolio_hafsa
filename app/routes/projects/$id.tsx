import * as React from "react";
import { Link, useParams } from "react-router";
import { projects } from "../home";

export function meta({ params }: any) {
  const id = params?.id;
  const p = projects.find((x) => x.id === id);
  return [
    { title: `${p?.title ?? "Project"} | Hafsa Rashid` },
    { name: "description", content: p?.summary ?? "Project details." },
  ];
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050816] text-slate-100 font-[Inter]">
        <div className="mx-auto max-w-4xl px-4 py-24 text-center">
          <h1 className="text-3xl font-bold">Project not found</h1>
          <p className="mt-4 text-slate-400">
            The project you requested does not exist.
          </p>
          <div className="mt-6">
            <Link to="/projects" className="text-cyan-400 hover:underline">
              Back to projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 font-[Inter]">
      <header className="fixed top-0 inset-x-0 z-30 bg-[#050816]/80 backdrop-blur border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-slate-100 font-semibold tracking-wide hover:text-cyan-400 transition-colors"
          >
            &lt;Hafsa / Rashid&gt;
          </Link>
          <div />
        </div>
      </header>

      <main className="pt-24 pb-16">
        <section className="mx-auto max-w-3xl px-4 p-8 rounded-2xl border border-slate-700/70 bg-slate-900/80">
          <h1 className="text-3xl font-bold text-slate-50 mb-3">
            {project.title}
          </h1>
          <p className="text-base text-slate-300 mb-4">
            {project.fullDescription}
          </p>

          <h3 className="text-lg font-semibold text-slate-50 mb-2">
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-slate-600/60 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200"
              >
                {t}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-slate-50 mb-2">
            Key Features
          </h3>
          <ul className="list-inside list-disc text-slate-300 mb-4 space-y-2">
            {project.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <div className="flex gap-3 mt-4 flex-wrap">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 justify-center rounded-lg border border-cyan-500/60 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-500/20 transition-colors"
              >
                Live Demo
              </a>
            ) : null}

            {project.clientGithub ? (
              <a
                href={project.clientGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 justify-center rounded-lg border border-slate-600/60 bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700/80 transition-colors"
              >
                Client Repo
              </a>
            ) : null}

            {project.serverGithub ? (
              <a
                href={project.serverGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 justify-center rounded-lg border border-slate-600/60 bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700/80 transition-colors"
              >
                Server Repo
              </a>
            ) : null}

            {!project.clientGithub &&
            !project.serverGithub &&
            project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 justify-center rounded-lg border border-slate-600/60 bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700/80 transition-colors"
              >
                GitHub
              </a>
            ) : null}

            <Link
              to="/projects"
              className="ml-auto text-slate-300 hover:text-white"
            >
              ← Back to Projects
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
