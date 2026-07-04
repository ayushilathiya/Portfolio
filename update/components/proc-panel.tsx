'use client';

import { useState, useCallback } from 'react';
import { procTabs, type ProcTabId } from '@/lib/sections';
import { profile } from '@/data/profile';
import { education } from '@/data/education';
import { responsibilities } from '@/data/responsibilities';
import { experienceEntries } from '@/data/experience';
import { skills, type SkillDomain } from '@/data/skills';
import { idleEntries, type IdleEntry } from '@/data/idle';
import { cn } from '@/lib/utils';

const domainOrder: SkillDomain[] = ['embedded', 'vlsi', 'iot', 'software'];
const nodeClass: Record<SkillDomain, string> = {
  embedded: 'dev-node-embedded',
  vlsi: 'dev-node-vlsi',
  iot: 'dev-node-iot',
  software: 'dev-node-software',
};

function IdleIcon({ type }: { type: IdleEntry['icon'] }) {
  const props = {
    className: 'w-3.5 h-3.5 shrink-0 text-text-secondary',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.25,
    'aria-hidden': true as const,
  };

  switch (type) {
    case 'crochet':
      return (
        <svg {...props}>
          <path d="M8 4c0 4 4 6 8 6" strokeLinecap="round" />
          <path d="M6 20c2-6 6-10 12-10" strokeLinecap="round" />
        </svg>
      );
    case 'plant':
      return (
        <svg {...props}>
          <path d="M12 22V12" />
          <path d="M12 12C12 6 6 4 4 8c4-1 6 2 8 4" strokeLinecap="round" />
        </svg>
      );
    case 'book':
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case 'coffee':
      return (
        <svg {...props}>
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        </svg>
      );
    case 'walk':
      return (
        <svg {...props}>
          <circle cx="12" cy="4" r="2" />
          <path d="M10 22V12l-2 4M14 22V12l2 4" strokeLinecap="round" />
        </svg>
      );
  }
}

interface ProcPanelProps {
  initialTab?: ProcTabId;
}

export default function ProcPanel({ initialTab = 'about' }: ProcPanelProps) {
  const [activeTab, setActiveTab] = useState<ProcTabId>(initialTab);

  const workEntries = experienceEntries.filter((e) => e.type === 'work');
  const achievementEntries = experienceEntries.filter((e) => e.type === 'project');

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-xl text-text-primary mb-1">{profile.name}</h3>
              <p className="font-mono text-xs text-text-secondary lowercase">{profile.title.toLowerCase()}</p>
              <p className="font-mono text-xs text-text-muted mt-3 leading-relaxed">{profile.intro}</p>
            </div>
            <div className="panel p-4">
              <p className="mono-label mb-3">register map</p>
              {profile.specs.map((spec) => (
                <div key={spec.field} className="register-row last:border-0">
                  <span className="register-key">{spec.field}</span>
                  <span className="register-val">{spec.value}</span>
                </div>
              ))}
              <div className="register-row border-0">
                <span className="register-key">DESCRIPTION</span>
                <span className="text-text-secondary text-xs leading-relaxed">{profile.bio.join(' ')}</span>
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.institution} className="panel p-4">
                <a
                  href={edu.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-text-primary hover:text-accent-amber transition-colors duration-200 ease-out"
                >
                  {edu.institution}
                </a>
                <p className="font-mono text-xs text-text-secondary mt-1">{edu.degree}</p>
                <p className="font-mono text-xs text-text-muted mt-1">{edu.period}</p>
              </div>
            ))}
          </div>
        );

      case 'study':
        return (
          <div className="panel p-4">
            <p className="mono-label mb-3">coursework & focus areas</p>
            <div className="flex flex-wrap gap-1.5">
              {education[0].skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[11px] px-2 py-1 border border-border rounded-sm text-text-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-2">
            {workEntries.map((entry) => (
              <div key={entry.title} className="panel p-3 log-line">
                <div className="flex flex-wrap gap-x-2 text-[11px]">
                  <span className="text-text-muted">[{entry.timestamp}]</span>
                  {entry.link ? (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-primary hover:text-accent-amber transition-colors duration-200 ease-out"
                    >
                      {entry.title}
                    </a>
                  ) : (
                    <span className="text-text-primary">{entry.title}</span>
                  )}
                  <span className="text-text-muted">@</span>
                  <span className="text-text-secondary">{entry.organization}</span>
                </div>
                <p className="text-text-muted text-[10px] mt-1 leading-relaxed">{entry.description}</p>
              </div>
            ))}
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-2">
            {achievementEntries.map((entry) => (
              <div key={entry.title} className="panel p-3 log-line">
                <div className="flex flex-wrap gap-x-2 text-[11px]">
                  <span className="text-text-muted">[{entry.timestamp}]</span>
                  {entry.link ? (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-primary hover:text-accent-amber transition-colors duration-200 ease-out"
                    >
                      {entry.title}
                    </a>
                  ) : (
                    <span className="text-text-primary">{entry.title}</span>
                  )}
                </div>
                <p className="text-text-secondary text-[10px] mt-0.5">{entry.organization}</p>
                <p className="text-text-muted text-[10px] mt-1 leading-relaxed">{entry.description}</p>
              </div>
            ))}
          </div>
        );

      case 'contributions':
        return (
          <div className="space-y-3">
            {responsibilities.map((pos) => (
              <div key={pos.title} className="panel p-4">
                <a
                  href={pos.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-text-primary hover:text-accent-amber transition-colors duration-200 ease-out"
                >
                  {pos.title}
                </a>
                <p className="font-mono text-xs text-text-secondary mt-1">
                  {pos.org} · {pos.period}
                </p>
                <p className="font-mono text-xs text-text-muted mt-2 leading-relaxed">{pos.desc}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {pos.skills.map((s) => (
                    <span key={s} className="font-mono text-[10px] px-1.5 py-0.5 border border-border text-text-muted rounded-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'skills': {
        const grouped = domainOrder.map((domain) => ({
          domain,
          items: skills.filter((s) => s.domain === domain),
        }));
        return (
          <div className="panel p-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {grouped.map(({ domain, items }) => (
                <div key={domain}>
                  <p className="mono-label mb-2 lowercase">{domain}</p>
                  <div className="flex flex-wrap gap-1">
                    {items.map((skill) => (
                      <a
                        key={skill.name}
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn('dev-node text-[10px]', nodeClass[domain])}
                      >
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

      case 'idle':
        return (
          <div className="panel p-3 font-mono text-xs">
            <p className="text-text-muted mb-2 text-[11px]">
              <span className="text-text-secondary">[idle]</span> cpu task — off-duty log
            </p>
            <div className="space-y-1">
              {idleEntries.map((entry) => (
                <div key={entry.timestamp + entry.message} className="flex gap-2 py-1.5 border-b border-border last:border-0">
                  <IdleIcon type={entry.icon} />
                  <div>
                    <span className="text-text-muted">[{entry.timestamp}]</span>{' '}
                    <span className="text-text-secondary">{entry.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  }, [activeTab, workEntries, achievementEntries]);

  return (
    <div className="panel-content">
      <h2 className="section-header">/proc</h2>

      {/* Secondary sub-nav — always visible, horizontal scroll on mobile */}
      <div
        className="shrink-0 flex gap-1 overflow-x-auto scrollbar-hide border-b border-border pb-0 mb-4 -mx-1 px-1"
        role="tablist"
        aria-label="Process sub-sections"
      >
        {procTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'shrink-0 px-2.5 py-1.5 font-mono text-[10px] md:text-xs text-text-muted transition-all duration-200 ease-out border-b-2 -mb-px',
              activeTab === tab.id
                ? 'border-accent-amber text-text-primary'
                : 'border-transparent hover:text-text-secondary'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto panel-inner-scroll" role="tabpanel">
        <div className="transition-opacity duration-200 ease-out">{renderContent()}</div>
      </div>
    </div>
  );
}
