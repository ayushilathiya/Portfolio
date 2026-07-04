'use client';

import { Github, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';
import DomainIcon from '@/components/domain-icon';

const statusConfig = {
  active: { led: 'status-led-active', label: 'ACTIVE' },
  verified: { led: 'status-led-verified', label: 'SHIPPED' },
  archived: { led: 'status-led-dim', label: 'ARCHIVED' },
};

export default function Projects() {
  return (
    <div className="panel-content">
      <h2 className="section-header">/modules</h2>

      <div className="flex-1 min-h-0 overflow-y-auto panel-inner-scroll">
        <div className="grid sm:grid-cols-2 gap-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="panel p-3 md:p-4 group hover:border-border-strong transition-colors duration-200 ease-out"
            >
              <div className="flex items-center justify-between mb-2 gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`status-led ${statusConfig[project.status].led}`}
                    aria-label={statusConfig[project.status].label}
                  />
                  <span className="mono-label text-[10px]">{statusConfig[project.status].label}</span>
                </div>
                <span className="flex items-center gap-1 font-mono text-[10px] text-text-muted uppercase">
                  <DomainIcon domain={project.domain} className="w-3 h-3" />
                  {project.domain}
                </span>
              </div>

              <h3 className="font-mono text-sm text-text-primary mb-1 group-hover:text-accent-amber transition-colors duration-200 ease-out">
                {project.title}
              </h3>
              <p className="font-mono text-[11px] text-text-muted leading-relaxed mb-2 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-2">
                {project.tech.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] px-1.5 py-0.5 border border-border text-text-muted rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.links && (
                <div className="flex gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.type}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-text-muted hover:text-accent-amber transition-colors duration-200 ease-out"
                    >
                      {link.type === 'github' ? (
                        <Github className="w-3.5 h-3.5" />
                      ) : (
                        <ExternalLink className="w-3.5 h-3.5" />
                      )}
                      <span className="font-mono text-[10px] uppercase">{link.type}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
