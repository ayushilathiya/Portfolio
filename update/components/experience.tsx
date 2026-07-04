'use client';

import { experienceEntries } from '@/data/experience';

const typeConfig = {
  work: { color: 'text-amber', label: 'WORK' },
  education: { color: 'text-blue-400', label: 'EDU' },
  project: { color: 'text-green-400', label: 'R&D' },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-header">0x03 // LOG</h2>

        <div className="relative">
          {/* Vertical trace line */}
          <div className="absolute left-16 md:left-20 top-0 bottom-0 w-px bg-border" />

          {/* Timeline entries */}
          <div className="space-y-8">
            {experienceEntries.map((entry, index) => (
              <div
                key={index}
                className="relative flex gap-4 md:gap-8 group"
              >
                {/* Timestamp and node */}
                <div className="flex flex-col items-center">
                  <span className="font-mono text-xs text-text-muted w-14 md:w-16 text-right">
                    {entry.timestamp}
                  </span>
                  {/* Node on trace line */}
                  <div
                    className={`absolute left-16 md:left-20 -translate-x-1/2 top-0 w-2 h-2 rounded-full ${
                      typeConfig[entry.type].color
                    } bg-current group-hover:shadow-amber-glow-sm transition-all duration-200`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 panel p-4 md:p-6 group-hover:border-amber/30 transition-colors duration-200">
                  {/* Type tag */}
                  <span
                    className={`mono-label text-[10px] ${typeConfig[entry.type].color} mb-2 block`}
                  >
                    [{typeConfig[entry.type].label}]
                  </span>

                  {entry.link ? (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group/link"
                    >
                      <h3 className="font-display text-lg font-semibold text-text-primary mb-1 group-hover/link:text-amber transition-colors duration-200">
                        {entry.title}
                      </h3>
                    </a>
                  ) : (
                    <h3 className="font-display text-lg font-semibold text-text-primary mb-1">
                      {entry.title}
                    </h3>
                  )}
                  <p className="font-mono text-sm text-amber mb-3">{entry.organization}</p>
                  <p className="font-mono text-sm text-text-muted leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
