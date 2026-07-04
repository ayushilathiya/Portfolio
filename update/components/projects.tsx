'use client';

import { Github, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';

const statusConfig = {
  active: { led: 'status-led-active', label: 'ACTIVE' },
  verified: { led: 'status-led-verified', label: 'VERIFIED' },
  archived: { led: 'status-led-dim', label: 'ARCHIVED' },
};

const domainColors = {
  EMBEDDED: 'text-amber border-amber',
  VLSI: 'text-blue-400 border-blue-400',
  IoT: 'text-green-400 border-green-400',
  SPACE: 'text-cyan-400 border-cyan-400',
  HEALTH: 'text-rose-400 border-rose-400',
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-header">0x02 // PROJECTS</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group panel p-6 relative hover:border-amber/30 transition-colors duration-200"
            >
              {/* Top strip with status LED and domain */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`status-led ${statusConfig[project.status].led}`} />
                  <span className="mono-label text-[10px]">{statusConfig[project.status].label}</span>
                </div>
                <span
                  className={`mono-label text-[10px] px-2 py-0.5 border rounded-sm ${
                    domainColors[project.domain]
                  }`}
                >
                  {project.domain}
                </span>
              </div>

              {/* Project info */}
              <h3 className="font-display text-xl font-semibold text-text-primary mb-2 group-hover:text-amber transition-colors duration-200">
                {project.title}
              </h3>
              <p className="font-mono text-sm text-text-muted leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech stack */}
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

              {/* Links */}
              {project.links && (
                <div className="flex gap-3">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      className="flex items-center gap-1.5 text-text-muted hover:text-amber transition-colors duration-200"
                    >
                      {link.type === 'github' ? (
                        <Github className="w-4 h-4" />
                      ) : (
                        <ExternalLink className="w-4 h-4" />
                      )}
                      <span className="font-mono text-xs uppercase">
                        {link.type}
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {/* Corner schematic decoration */}
              <svg
                className="absolute bottom-0 right-0 w-12 h-12 text-amber opacity-10 group-hover:opacity-30 transition-opacity duration-200"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path d="M48,16 L48,48 L16,48" stroke="currentColor" strokeWidth="1" />
                <circle cx="48" cy="16" r="2" fill="currentColor" />
                <circle cx="16" cy="48" r="2" fill="currentColor" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
