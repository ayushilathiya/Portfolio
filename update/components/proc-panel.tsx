'use client';

import { useState, useCallback } from 'react';
import { procTabs, type ProcTabId } from '@/lib/sections';
import { profile } from '@/data/profile';
import { education } from '@/data/education';
import { experienceEntries } from '@/data/experience';
import { responsibilities } from '@/data/responsibilities';
import SkillMesh from '@/components/skill-mesh';
import IdleBlock from '@/components/idle-block';
import PathLabel from '@/components/path-label';
import CompactPortLinks from '@/components/compact-port-links';
import ProcStatusBar from '@/components/proc-status-bar';
import SectionVisual, { DomainAccent } from '@/components/section-visual';
import { cn } from '@/lib/utils';

interface ProcPanelProps {
  initialTab?: ProcTabId;
}

function WhoamiHero() {
  return (
    <div className="content-stack-section proc-whoami-hero shrink-0 py-4 px-4 md:py-5 md:px-5 relative">
      <SectionVisual tab="whoami" />
      <h1 className="text-text-primary text-xl md:text-2xl lg:text-[1.65rem] font-medium leading-snug relative z-10">
        Hi, I&apos;m <span className="text-accent-amber">{profile.name}</span>
      </h1>
      <p className="text-text-primary text-sm md:text-base lg:text-lg mt-2 leading-relaxed relative z-10">
        {profile.intro}
      </p>
    </div>
  );
}

export default function ProcPanel({ initialTab = 'whoami' }: ProcPanelProps) {
  const [activeTab, setActiveTab] = useState<ProcTabId>(initialTab);

  const workEntries = experienceEntries.filter((e) => e.type === 'work');
  const achievementEntries = experienceEntries.filter((e) => e.type === 'project');
  const respTitles = new Set(responsibilities.map((r) => r.title));
  const uniqueWorkEntries = workEntries.filter((e) => !respTitles.has(e.title));

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 'whoami':
        return (
          <div className="content-stack h-full flex flex-col min-h-0">
            <WhoamiHero />
            <div className="content-stack-section proc-register-section shrink-0 py-2 px-4 md:px-5 relative">
              <PathLabel name="register_map" className="mb-1.5 text-xs" />
              <table className="w-full font-mono text-[10px] md:text-[11px]">
                <thead>
                  <tr className="text-text-muted text-left border-b border-border-strong">
                    <th className="pb-1 pr-2 font-normal">ADDR</th>
                    <th className="pb-1 pr-2 font-normal">FIELD</th>
                    <th className="pb-1 font-normal">VALUE</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.registers.map((reg) => (
                    <tr key={reg.addr} className="border-b border-border-strong last:border-0">
                      <td className="py-0.5 pr-2 text-accent-amber">{reg.addr}</td>
                      <td className="py-0.5 pr-2 text-text-muted">{reg.field}</td>
                      <td className="py-0.5 text-text-secondary">{reg.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <CompactPortLinks />
          </div>
        );

      case 'bootloader':
        return (
          <div className="content-stack h-full min-h-0 overflow-y-auto panel-inner-scroll">
            <DomainAccent domain="vlsi" />
            <div className="content-stack-section py-3 px-4 md:px-5 border-b border-border-strong">
              <PathLabel name="education_record" className="mb-2" />
              <p className="font-mono text-[10px] text-text-muted mb-3 pb-2 border-b border-border-strong">
                firmware image · curriculum map
              </p>
            </div>
            {education.map((edu) => (
              <div key={edu.institution} className="content-stack-section py-3 px-4 md:px-5">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <a
                    href={edu.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-text-primary hover:text-accent-amber transition-colors duration-200 ease-out"
                  >
                    {edu.institution}
                  </a>
                  <span className="font-mono text-[10px] text-text-muted shrink-0">{edu.period}</span>
                </div>
                <p className="font-mono text-xs text-text-secondary mb-3">{edu.degree}</p>
                <p className="font-mono text-[10px] text-text-muted mb-2 uppercase tracking-wide">course modules</p>
                <div className="flex flex-wrap gap-1.5">
                  {edu.skills.map((skill) => (
                    <span key={skill} className="proc-field-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'runtime':
        return (
          <div className="content-stack h-full min-h-0 overflow-y-auto panel-inner-scroll">
            <DomainAccent domain="embedded" />
            <div className="content-stack-section py-3 px-4 md:px-5 border-b border-border-strong">
              <PathLabel name="work_log" className="mb-2" />
              <p className="font-mono text-[10px] text-text-muted">
                tail -f /var/log/work.log · {uniqueWorkEntries.length + responsibilities.length} entries
              </p>
            </div>

            {responsibilities.map((pos) => (
              <div key={pos.title} className="content-stack-section py-3 px-4 md:px-5 log-line">
                <div className="flex flex-wrap gap-x-2 gap-y-1 mb-1.5 font-mono text-[10px]">
                  <span className="text-text-muted">[{pos.period}]</span>
                  <span className="text-accent-amber">&lt;contrib&gt;</span>
                </div>
                <a
                  href={pos.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-text-primary hover:text-accent-amber transition-colors duration-200 ease-out block mb-1"
                >
                  {pos.title}
                </a>
                <p className="font-mono text-[10px] text-text-muted mb-2">{pos.org}</p>
                <p className="font-mono text-[11px] text-text-secondary leading-relaxed mb-2">{pos.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {pos.skills.map((skill) => (
                    <span key={skill} className="proc-field-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {uniqueWorkEntries.map((entry) => (
              <div key={entry.title} className="content-stack-section py-3 px-4 md:px-5 log-line">
                <div className="flex flex-wrap gap-x-2 gap-y-1 mb-1.5 font-mono text-[10px]">
                  <span className="text-text-muted">[{entry.timestamp}]</span>
                  <span className="text-accent-amber">&lt;work&gt;</span>
                </div>
                {entry.link ? (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-text-primary hover:text-accent-amber transition-colors duration-200 ease-out block mb-1"
                  >
                    {entry.title}
                  </a>
                ) : (
                  <p className="font-mono text-sm text-text-primary mb-1">{entry.title}</p>
                )}
                <p className="font-mono text-[10px] text-text-muted mb-2">{entry.organization}</p>
                <p className="font-mono text-[11px] text-text-secondary leading-relaxed">{entry.description}</p>
              </div>
            ))}
          </div>
        );

      case 'beacon':
        return (
          <div className="content-stack h-full min-h-0 overflow-y-auto panel-inner-scroll relative">
            <DomainAccent domain="space" />
            <div className="content-stack-section py-3 px-4 md:px-5 border-b border-border-strong">
              <PathLabel name="beacon_tx" className="mb-2" />
              <p className="font-mono text-[10px] text-text-muted">
                signal broadcast · {achievementEntries.length} packets received
              </p>
            </div>
            {achievementEntries.map((entry) => (
              <div key={entry.title} className="content-stack-section py-3 px-4 md:px-5 log-line">
                <div className="flex flex-wrap gap-x-2 gap-y-1 mb-1.5 font-mono text-[10px]">
                  <span className="text-text-muted">[{entry.timestamp}]</span>
                  <span className="text-accent-amber">rx</span>
                  <span className="text-text-muted">snr: ok</span>
                </div>
                {entry.link ? (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-text-primary hover:text-accent-amber transition-colors duration-200 ease-out block mb-1"
                  >
                    {entry.title}
                  </a>
                ) : (
                  <p className="font-mono text-sm text-text-primary mb-1">{entry.title}</p>
                )}
                <p className="font-mono text-[10px] text-text-muted mb-2">{entry.organization}</p>
                <p className="font-mono text-[11px] text-text-secondary leading-relaxed">{entry.description}</p>
              </div>
            ))}
          </div>
        );

      case 'dev':
        return (
          <div className="h-full min-h-0 overflow-hidden proc-dev-tab">
            <SkillMesh compact />
          </div>
        );

      default:
        return null;
    }
  }, [activeTab, uniqueWorkEntries, achievementEntries]);

  return (
    <div className="panel-content proc-layout proc-no-scroll">
      <div className="proc-layout-grid flex-1 min-h-0">
        <aside className="proc-sidebar">
          <nav
            className="proc-nav flex md:flex-col gap-0 overflow-x-auto md:overflow-visible scrollbar-hide shrink-0"
            role="tablist"
            aria-label="/proc explorer"
          >
            {procTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'shrink-0 text-left px-3 py-2 md:py-2 font-mono text-[11px] md:text-xs leading-snug transition-all duration-200 ease-out',
                  'border-b-2 md:border-b-0 md:border-l-2 md:flex-1 md:flex md:items-center',
                  activeTab === tab.id
                    ? 'border-accent-amber text-text-primary'
                    : 'border-transparent text-text-muted hover:text-text-secondary'
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:block w-full border-t border-border-strong shrink-0" aria-hidden="true" />

          <div className="hidden md:flex idle-sidebar-slot">
            <IdleBlock />
          </div>
        </aside>

        <div className="md:hidden idle-mobile-slot">
          <IdleBlock />
        </div>

        <div className="proc-main" role="tabpanel">
          <div className="proc-main-body">{renderContent()}</div>
          <ProcStatusBar />
        </div>
      </div>
    </div>
  );
}
