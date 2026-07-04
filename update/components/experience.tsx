'use client';

import { experienceEntries } from '@/data/experience';

const typeConfig = {
  work: { tag: 'WORK', prefix: 'info', perm: '-rw-r--r--' },
  education: { tag: 'EDU', prefix: 'notice', perm: 'drwxr-xr-x' },
  project: { tag: 'R&D', prefix: 'debug', perm: '-rw-rw-r--' },
};

export default function Experience() {
  return (
    <div className="panel-content">
      <h2 className="section-header">/syslog</h2>

      <div className="flex-1 min-h-0 panel p-3 md:p-4 font-mono text-xs overflow-y-auto md:overflow-y-auto">
        <div className="text-text-muted mb-3 pb-2 border-b border-border text-[11px]">
          <span className="text-accent">total {experienceEntries.length}</span>
          {' · '}
          syslog buffer — permissions owner size name
        </div>

        <div className="relative pl-3">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border-strong" />

          <div className="space-y-0">
            {experienceEntries.map((entry, index) => {
              const cfg = typeConfig[entry.type];
              const titleContent = entry.link ? (
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary hover:text-accent transition-colors duration-200 ease-out"
                >
                  {entry.title.replace(/\s+/g, '_').toLowerCase()}.log
                </a>
              ) : (
                <span className="text-text-primary">
                  {entry.title.replace(/\s+/g, '_').toLowerCase()}.log
                </span>
              );

              return (
                <div key={index} className="relative group py-1.5 border-b border-border last:border-0">
                  <div className="absolute -left-3 top-2.5 w-1.5 h-1.5 rounded-full bg-accent-dim group-hover:bg-accent transition-colors duration-200" />

                  <div className="log-line">
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5 items-baseline text-[11px]">
                      <span className="text-text-muted">{cfg.perm}</span>
                      <span className="text-accent-dim">ayushi</span>
                      <span className="text-text-muted">4.0k</span>
                      <span className="text-text-muted">[{entry.timestamp}]</span>
                      <span className="text-accent-dim">&lt;{cfg.prefix}&gt;</span>
                      {titleContent}
                    </div>
                    <p className="text-text-muted text-[10px] mt-0.5 pl-0 md:pl-4 leading-relaxed">
                      {entry.organization} — {entry.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-border text-text-muted text-[10px]">
          <span className="text-accent">--</span> end of syslog
        </div>
      </div>
    </div>
  );
}
