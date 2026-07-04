'use client';

import { useState } from 'react';
import { skills, type SkillDomain } from '@/data/skills';

const domainOrder: SkillDomain[] = ['embedded', 'vlsi', 'iot', 'software'];

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
    <div className="panel-content">
      <h2 className="section-header">/dev</h2>

      <div className="flex-1 min-h-0 panel p-3 md:p-4 overflow-y-auto md:overflow-hidden">
        <div className="hidden md:grid md:grid-cols-4 gap-3 h-full relative">
          <svg
            className="absolute top-8 left-[10%] right-[10%] h-6 pointer-events-none"
            viewBox="0 0 800 24"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="0" y1="12" x2="800" y2="12" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />
            {[100, 300, 500, 700].map((x) => (
              <line key={x} x1={x} y1="12" x2={x} y2="24" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />
            ))}
          </svg>

          {grouped.map(({ domain, items }) => (
            <div key={domain} className="flex flex-col items-center min-h-0">
              <div className={`dev-node ${nodeClass[domain]} mb-2 text-[10px] lowercase px-2`}>
                {domain}
              </div>
              <div className="relative flex flex-col items-center gap-1.5 w-full flex-1 overflow-y-auto">
                <div className="absolute top-0 bottom-0 w-px bg-border-strong left-1/2 -translate-x-1/2" />
                {items.map((skill) => (
                  <a
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`dev-node ${nodeClass[domain]} w-full text-center text-[10px] ${
                      hoveredSkill === skill.name ? 'shadow-amber-glow-sm' : ''
                    }`}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {skill.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden space-y-3">
          {grouped.map(({ domain, items }) => (
            <div key={domain}>
              <div className="mono-label mb-2 lowercase text-accent">{domain}</div>
              <div className="flex flex-wrap gap-1.5">
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
    </div>
  );
}
