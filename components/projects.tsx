'use client';

import { Github, ExternalLink } from 'lucide-react';
import { projects, type ProjectStatus } from '@/data/projects';
import DomainIcon from '@/components/domain-icon';
import PathLabel from '@/components/path-label';
import ModuleDomainMotif from '@/components/module-domain-motif';

const statusLed: Record<ProjectStatus, string> = {
  live: 'status-led-live',
  deployed: 'status-led-deployed',
  active: 'status-led-active',
  built: 'status-led-built',
  archived: 'status-led-built',
};

const statusText: Record<ProjectStatus, string> = {
  live: 'status-text-live',
  deployed: 'status-text-deployed',
  active: 'status-text-active',
  built: 'status-text-built',
  archived: 'status-text-built',
};

export default function Projects() {
  return (
    <div className="panel-content relative">
      <div className="flex-1 min-h-0 overflow-y-auto panel-inner-scroll relative">
        <div className="flex items-baseline gap-2 relative z-10 px-0.5 mb-3">
          <PathLabel name="modules_index" className="mb-0" />
          <span className="font-mono text-[11px] text-text-muted">· {projects.length}</span>
        </div>

        <div className="modules-grid relative z-10">
          {projects.map((project) => (
            <article
              key={project.title}
              className="module-card panel-box group transition-colors duration-200 ease-out relative overflow-hidden"
            >
              <div className="module-card-body relative z-[2] flex flex-col h-full">
                <div className="module-card-motif" aria-hidden="true">
                  <ModuleDomainMotif domain={project.domain} />
                </div>

                <div className="flex items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`status-led ${statusLed[project.status]}`}
                      aria-label={project.statusLabel}
                    />
                    <span
                      className={`font-mono text-[11px] tracking-wide lowercase ${statusText[project.status]}`}
                    >
                      {project.statusLabel.toLowerCase()}
                    </span>
                  </div>
                  <span className="module-domain-badge">
                    <DomainIcon domain={project.domain} className="w-3 h-3 shrink-0" />
                    {project.domain}
                  </span>
                </div>

                <h3 className="font-mono text-sm text-text-primary mb-2 group-hover:text-accent-amber transition-colors duration-200 ease-out leading-snug">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-text-muted leading-relaxed mb-3 line-clamp-3 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3 mt-auto">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className="module-tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.links && (
                  <div className="module-card-links flex gap-3 pt-2 mt-auto border-t border-border-strong">
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
                        <span className="font-mono text-[11px] uppercase">{link.type}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
