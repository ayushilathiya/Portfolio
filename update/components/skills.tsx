'use client';

import { useState } from 'react';
import { skills, type SkillDomain } from '@/data/skills';

const domainOrder: SkillDomain[] = ['embedded', 'vlsi', 'iot', 'software'];

const domainLabels: Record<SkillDomain, string> = {
  embedded: 'embedded',
  vlsi: 'vlsi',
  iot: 'iot',
  software: 'software',
};

const nodeClass: Record<SkillDomain, string> = {
  embedded: 'dev-node-embedded',
  vlsi: 'dev-node-vlsi',
  iot: 'dev-node-iot',
  software: 'dev-node-software',
};

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const grouped = domainOrder.map((domain) => ({
    domain,
    items: skills.filter((s) => s.domain === domain),
  }));

  return (
    <section id="dev" className="py-24 px-6 md:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-header">/dev</h2>

        {/* Domain legend */}
        <div className="flex flex-wrap gap-4 mb-8 font-mono text-xs lowercase">
          {(
            [
              ['embedded', 'border-accent/60'],
              ['vlsi', 'border-accent-dim/80'],
              ['iot', 'border-border-strong'],
              ['software', 'border-text-muted/50'],
            ] as const
          ).map(([domain, borderClass]) => (
            <div key={domain} className="flex items-center gap-2">
              <div className={`w-3 h-3 border rounded-sm ${borderClass}`} />
              <span className="text-text-muted">{domain}</span>
            </div>
          ))}
        </div>

        {/* Device-tree node mesh — desktop */}
        <div className="hidden md:block relative panel p-8 overflow-hidden">
          {/* Horizontal bus trace connecting domain roots */}
          <svg
            className="absolute top-[4.5rem] left-[12%] right-[12%] h-8 pointer-events-none"
            viewBox="0 0 800 32"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="0" y1="16" x2="800" y2="16" stroke="var(--accent)" strokeWidth="0.5" opacity="0.35" />
            {[100, 300, 500, 700].map((x) => (
              <line key={x} x1={x} y1="16" x2={x} y2="32" stroke="var(--accent)" strokeWidth="0.5" opacity="0.35" />
            ))}
          </svg>

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {grouped.map(({ domain, items }) => (
              <div key={domain} className="flex flex-col items-center">
                <div
                  className={`dev-node ${nodeClass[domain]} mb-4 font-mono text-xs lowercase tracking-wider px-3`}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-current" />
                  {domainLabels[domain]}
                </div>

                {/* Vertical trace */}
                <div className="relative flex flex-col items-center gap-3 w-full">
                  <div className="absolute top-0 bottom-0 w-px bg-border-strong left-1/2 -translate-x-1/2" />

                  {items.map((skill) => (
                    <a
                      key={skill.name}
                      href={skill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`dev-node ${nodeClass[domain]} w-full text-center ${
                        hoveredSkill === skill.name ? 'shadow-amber-glow-sm bg-accent/5 scale-[1.02]' : ''
                      }`}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                      {skill.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile — stacked device list */}
        <div className="md:hidden space-y-6">
          {grouped.map(({ domain, items }) => (
            <div key={domain} className="panel p-4">
              <div className={`mono-label mb-3 lowercase text-accent`}>{domainLabels[domain]}</div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <a
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`dev-node ${nodeClass[domain]}`}
                  >
                    {skill.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
