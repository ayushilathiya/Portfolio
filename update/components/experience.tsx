'use client';

import { experienceEntries } from '@/data/experience';

const typeConfig = {
  work: { tag: 'WORK', prefix: 'info' },
  education: { tag: 'EDU', prefix: 'notice' },
  project: { tag: 'R&D', prefix: 'debug' },
};

export default function Experience() {
  return (
    <section id="dmesg" className="py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-header">dmesg</h2>

        <div className="panel p-4 md:p-6 font-mono text-xs md:text-sm overflow-x-auto">
          {/* Ring buffer header */}
          <div className="text-text-muted mb-4 pb-3 border-b border-border">
            <span className="text-accent">[</span> 0.000000<span className="text-accent"> ]</span>{' '}
            dmesg: kernel log buffer — {experienceEntries.length} entries
          </div>

          <div className="relative pl-4 md:pl-6">
            {/* Vertical trace — kernel ring buffer spine */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border-strong" />

            <div className="space-y-1">
              {experienceEntries.map((entry, index) => {
                const cfg = typeConfig[entry.type];
                const titleContent = entry.link ? (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary hover:text-accent transition-colors duration-200 ease-out"
                  >
                    {entry.title}
                  </a>
                ) : (
                  <span className="text-text-primary">{entry.title}</span>
                );

                return (
                  <div key={index} className="relative group">
                    {/* Node on trace */}
                    <div className="absolute -left-[1.0625rem] md:-left-[1.5625rem] top-2 w-1.5 h-1.5 rounded-full bg-accent/70 group-hover:bg-accent transition-colors duration-200" />

                    {/* Log line — ls -la / dmesg style */}
                    <div className="log-line py-2 border-b border-border/40 last:border-0 hover:bg-base/40 transition-colors duration-200 ease-out px-2 -mx-2 rounded-sm">
                      <div className="flex flex-wrap gap-x-2 gap-y-0.5 items-baseline">
                        <span className="text-text-muted shrink-0">[{entry.timestamp}]</span>
                        <span className="text-accent-dim shrink-0">&lt;{cfg.prefix}&gt;</span>
                        <span className="text-accent/70 shrink-0">[{cfg.tag}]</span>
                        {titleContent}
                        <span className="text-text-muted">@</span>
                        <span className="text-accent-dim">{entry.organization}</span>
                      </div>
                      <p className="text-text-muted mt-1 pl-0 md:pl-[8.5rem] text-[11px] md:text-xs leading-relaxed">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border text-text-muted text-[11px]">
            <span className="text-accent">--</span> end of log buffer
          </div>
        </div>
      </div>
    </section>
  );
}
