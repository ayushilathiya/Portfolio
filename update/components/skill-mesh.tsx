'use client';

import { skills, type SkillDomain } from '@/data/skills';
import PathLabel from '@/components/path-label';

const domainOrder: SkillDomain[] = ['embedded', 'vlsi', 'iot', 'software'];

const domainPins: Record<SkillDomain, string> = {
  embedded: 'pin_a0',
  vlsi: 'pin_b1',
  iot: 'pin_c2',
  software: 'pin_d3',
};

export default function SkillMesh({ compact = false }: { compact?: boolean }) {
  const grouped = domainOrder.map((domain) => ({
    domain,
    pin: domainPins[domain],
    items: skills.filter((s) => s.domain === domain),
  }));

  return (
    <div
      className={
        compact
          ? 'relative content-stack h-full min-h-0 overflow-y-auto panel-inner-scroll'
          : 'relative panel p-4 min-h-[200px]'
      }
    >
      {compact ? (
        <div className="content-stack-section border-b border-border-strong">
          <PathLabel name="dev_pin_map" className="mb-2 relative z-10" />
          <p className="font-mono text-[10px] text-text-muted relative z-10">
            gpio map · {skills.length} pins mapped
          </p>
        </div>
      ) : (
        <>
          <PathLabel name="skill_mesh" className="mb-2 relative z-10" />
          <p className="font-mono text-[10px] text-text-muted mb-4 relative z-10">
            device skill bus · 4 domains · {skills.length} nodes
          </p>
        </>
      )}

      <div className={compact ? 'content-stack-section' : ''}>
        <div
          className={`relative z-10 grid ${
            compact ? 'grid-cols-2 lg:grid-cols-4 gap-2' : 'grid-cols-2 lg:grid-cols-4 gap-4'
          }`}
        >
          {grouped.map(({ domain, pin, items }) => (
            <div
              key={domain}
              className={`dev-pin-block border border-border-strong rounded bg-base/50 ${
                compact ? 'p-2' : 'p-3'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-border">
                <span className="dev-pin-led" aria-hidden="true" />
                <span className="font-mono text-[9px] text-accent-amber">{pin}</span>
                <span className="font-mono text-[10px] text-text-primary lowercase ml-auto">{domain}</span>
              </div>
              <div className={`flex flex-col ${compact ? 'gap-1' : 'gap-1.5'}`}>
                {items.map((skill) => (
                  <a
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`dev-skill-node font-mono hover:text-accent-amber transition-colors duration-200 ease-out ${
                      compact ? 'text-[9px]' : 'text-[10px]'
                    }`}
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
