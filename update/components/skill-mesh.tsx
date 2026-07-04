'use client';

import { skills, type SkillDomain } from '@/data/skills';
import PathLabel from '@/components/path-label';

const domainOrder: SkillDomain[] = ['embedded', 'vlsi', 'iot', 'software'];

export default function SkillMesh() {
  const grouped = domainOrder.map((domain) => ({
    domain,
    items: skills.filter((s) => s.domain === domain),
  }));

  return (
    <div className="relative panel p-4 min-h-[200px]">
      <PathLabel name="skill_mesh" />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        viewBox="0 0 400 280"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <line x1="50" y1="40" x2="200" y2="40" stroke="var(--border-strong)" strokeWidth="0.5" />
        <line x1="200" y1="40" x2="350" y2="40" stroke="var(--border-strong)" strokeWidth="0.5" />
        <line x1="50" y1="40" x2="50" y2="140" stroke="var(--border-strong)" strokeWidth="0.5" />
        <line x1="200" y1="40" x2="200" y2="140" stroke="var(--border-strong)" strokeWidth="0.5" />
        <line x1="350" y1="40" x2="350" y2="140" stroke="var(--border-strong)" strokeWidth="0.5" />
        <line x1="50" y1="140" x2="350" y2="140" stroke="var(--border-strong)" strokeWidth="0.5" />
        <line x1="125" y1="140" x2="125" y2="240" stroke="var(--border-strong)" strokeWidth="0.5" />
        <line x1="275" y1="140" x2="275" y2="240" stroke="var(--border-strong)" strokeWidth="0.5" />
      </svg>

      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {grouped.map(({ domain, items }) => (
          <div key={domain} className="flex flex-col items-center gap-2">
            <div className="mesh-node mesh-node-hub lowercase">{domain}</div>
            <div className="w-px h-3 bg-border-strong" />
            <div className="flex flex-col items-center gap-1.5 w-full">
              {items.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mesh-node w-full text-center hover:text-accent-amber transition-colors duration-200 ease-out"
                >
                  <span className="mesh-dot" aria-hidden="true" />
                  {skill.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
