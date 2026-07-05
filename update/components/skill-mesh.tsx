'use client';

import { skills, type SkillDomain } from '@/data/skills';
import PathLabel from '@/components/path-label';

const domainOrder: SkillDomain[] = ['embedded', 'vlsi', 'iot', 'software'];

export default function SkillMesh({ compact = false }: { compact?: boolean }) {
  const grouped = domainOrder.map((domain) => ({
    domain,
    items: skills.filter((s) => s.domain === domain),
  }));

  return (
    <div className={compact ? 'relative panel p-2 h-full overflow-hidden' : 'relative panel p-4 min-h-[200px]'}>
      <PathLabel name="skill_mesh" className={compact ? 'mb-1' : undefined} />

      <div className={`relative z-10 grid ${compact ? 'grid-cols-4 gap-1.5' : 'grid-cols-2 lg:grid-cols-4 gap-4'}`}>
        {grouped.map(({ domain, items }) => (
          <div key={domain} className="flex flex-col items-center gap-1">
            <div className={`mesh-node mesh-node-hub lowercase ${compact ? 'text-[9px] px-1 py-0.5' : ''}`}>
              {domain}
            </div>
            {!compact && <div className="w-px h-3 bg-border-strong" />}
            <div className={`flex flex-col items-center w-full ${compact ? 'gap-0.5' : 'gap-1.5'}`}>
              {items.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mesh-node w-full text-center hover:text-accent-amber transition-colors duration-200 ease-out ${
                    compact ? 'text-[8px] px-1 py-0.5' : ''
                  }`}
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
