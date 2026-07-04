'use client';

import { Github, ExternalLink } from 'lucide-react';
import { projects, type ProjectDomain } from '@/data/projects';

const statusConfig = {
  active: { led: 'status-led-active', label: 'ACTIVE' },
  verified: { led: 'status-led-verified', label: 'VERIFIED' },
  archived: { led: 'status-led-dim', label: 'ARCHIVED' },
};

const domainStyles: Record<ProjectDomain, string> = {
  EMBEDDED: 'text-accent border-accent/60',
  VLSI: 'text-accent-dim border-accent-dim/70',
  IoT: 'text-text-primary border-border-strong',
  SPACE: 'text-accent/80 border-accent/40',
  HEALTH: 'text-accent-dim border-accent-dim/50',
};

export default function Projects() {
  return (
    <section id="modules" className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-header">/modules</h2>

        <div className="relative">
          {/* Copper trace connecting cards — desktop grid only */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block opacity-25"
            viewBox="0 0 800 900"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 380 180 L 420 180 L 420 420 L 380 420 L 380 640 L 420 640"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1"
            />
            <path
              d="M 400 360 L 400 380 M 400 560 L 400 580"
              fill="none"
              stroke="var(--accent-dim)"
              strokeWidth="0.75"
            />
          </svg>

          <div className="grid md:grid-cols-2 gap-6 relative z-10">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group panel p-6 relative hover:border-accent/30 transition-colors duration-200 ease-out"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`status-led ${statusConfig[project.status].led}`}
                      aria-label={statusConfig[project.status].label}
                    />
                    <span className="mono-label text-[10px]">{statusConfig[project.status].label}</span>
                  </div>
                  <span
                    className={`mono-label text-[10px] px-2 py-0.5 border rounded-sm ${domainStyles[project.domain]}`}
                  >
                    {project.domain}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-200 ease-out">
                  {project.title}
                </h3>
                <p className="font-mono text-sm text-text-muted leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs px-2 py-1 bg-base/50 border border-border rounded-sm text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.links && (
                  <div className="flex gap-3">
                    {project.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors duration-200 ease-out"
                      >
                        {link.type === 'github' ? (
                          <Github className="w-4 h-4" />
                        ) : (
                          <ExternalLink className="w-4 h-4" />
                        )}
                        <span className="font-mono text-xs uppercase">{link.type}</span>
                      </a>
                    ))}
                  </div>
                )}

                <svg
                  className="absolute bottom-0 right-0 w-12 h-12 text-accent opacity-10 group-hover:opacity-25 transition-opacity duration-200 ease-out pointer-events-none"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M48,16 L48,48 L16,48" stroke="currentColor" strokeWidth="1" />
                  <circle cx="48" cy="16" r="2" fill="currentColor" />
                  <circle cx="16" cy="48" r="2" fill="currentColor" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
