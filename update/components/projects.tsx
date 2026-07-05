'use client';

import { Github, ExternalLink } from 'lucide-react';
import { projects, type ProjectStatus } from '@/data/projects';
import DomainIcon from '@/components/domain-icon';
import SectionVisual from '@/components/section-visual';
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
      <SectionVisual tab="modules" />

      <div className="flex-1 min-h-0 overflow-y-auto panel-inner-scroll relative">
        <PathLabel name="modules_index" className="relative z-10 px-0.5" />

        <div className="grid sm:grid-cols-2 gap-3 relative z-10">
          {projects.map((project) => (
            <div
              key={project.title}
              className="panel-box p-3 md:p-4 group transition-colors duration-200 ease-out relative overflow-hidden min-h-[140px]"
            >
              <ModuleDomainMotif domain={project.domain} />

              <div className="flex items-center justify-between mb-2 gap-2 relative z-[2]">
                <div className="flex items-center gap-2">
                  <div
                    className={`status-led ${statusLed[project.status]}`}
                    aria-label={project.statusLabel}
                  />
                  <span
                    className={`font-mono text-[10px] tracking-wide lowercase ${statusText[project.status]}`}
                  >
                    {project.statusLabel.toLowerCase()}
                  </span>
                </div>
                <span className="mesh-node text-[10px] uppercase flex items-center gap-1 py-0.5">
                  <DomainIcon domain={project.domain} className="w-3 h-3" />
                  {project.domain}
                </span>
              </div>

              <h3 className="font-mono text-sm text-text-primary mb-1 group-hover:text-accent-amber transition-colors duration-200 ease-out relative z-[2]">
                {project.title}
              </h3>
              <p className="font-mono text-[11px] text-text-muted leading-relaxed mb-2 line-clamp-3 relative z-[2]">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-2 relative z-[2]">
                {project.tech.slice(0, 4).map((tech) => (
                  <span key={tech} className="mesh-node text-[10px]">
                    {tech}
                  </span>
                ))}
              </div>

              {project.links && (
                <div className="flex gap-2 relative z-[2]">
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
