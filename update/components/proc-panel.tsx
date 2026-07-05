'use client';

import { useState, useCallback } from 'react';
import { procTabs, type ProcTabId } from '@/lib/sections';
import { profile } from '@/data/profile';
import { education } from '@/data/education';
import { experienceEntries } from '@/data/experience';
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
    <div className="content-stack-section py-2.5 px-3 relative overflow-hidden">
      <SectionVisual tab="whoami" />
      <h1 className="text-text-primary text-base md:text-lg font-medium leading-snug">
        Hi, I&apos;m <span className="text-accent-amber">{profile.name}</span>
      </h1>
      <p className="text-text-primary text-xs md:text-sm mt-1 leading-snug line-clamp-2">{profile.intro}</p>
    </div>
  );
}

export default function ProcPanel({ initialTab = 'whoami' }: ProcPanelProps) {
  const [activeTab, setActiveTab] = useState<ProcTabId>(initialTab);

  const workEntries = experienceEntries.filter((e) => e.type === 'work');
  const achievementEntries = experienceEntries.filter((e) => e.type === 'project');

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 'whoami':
        return (
          <div className="content-stack h-full">
            <WhoamiHero />
            <div className="content-stack-section py-2 px-3 relative">
              <PathLabel name="register_map" className="mb-1.5" />
              <table className="w-full font-mono text-[10px]">
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
                      <td className="py-0.5 text-text-secondary truncate max-w-[140px] lg:max-w-none">{reg.value}</td>
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
          <div className="content-stack h-full overflow-hidden">
            <DomainAccent domain="vlsi" />
            {education.map((edu) => (
              <div key={edu.institution} className="content-stack-section py-2 px-3">
                <a
                  href={edu.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-text-primary hover:text-accent-amber transition-colors duration-200 ease-out line-clamp-1"
                >
                  {edu.institution}
                </a>
                <p className="font-mono text-[10px] text-text-secondary mt-0.5 line-clamp-1">{edu.degree}</p>
                <p className="font-mono text-[10px] text-text-muted">{edu.period}</p>
              </div>
            ))}
          </div>
        );

      case 'runtime':
        return (
          <div className="content-stack h-full overflow-hidden">
            <DomainAccent domain="embedded" />
            <div className="content-stack-section py-1.5 px-3">
              <PathLabel name="work_log" className="mb-0" />
            </div>
            {workEntries.map((entry) => (
              <div key={entry.title} className="content-stack-section py-1.5 px-3 log-line">
                <div className="flex flex-wrap gap-x-2 text-[10px]">
                  <span className="text-text-muted">[{entry.timestamp}]</span>
                  <span className="text-text-primary line-clamp-1">{entry.title}</span>
                </div>
                <p className="text-text-muted text-[9px] mt-0.5 line-clamp-1">{entry.organization}</p>
              </div>
            ))}
          </div>
        );

      case 'beacon':
        return (
          <div className="content-stack h-full overflow-hidden">
            <DomainAccent domain="space" />
            <div className="content-stack-section py-1.5 px-3">
              <PathLabel name="beacon_tx" className="mb-0" />
            </div>
            {achievementEntries.map((entry) => (
              <div key={entry.title} className="content-stack-section py-1.5 px-3 log-line">
                <div className="text-[10px] text-text-primary line-clamp-1">{entry.title}</div>
                <p className="text-text-muted text-[9px] line-clamp-1">{entry.organization}</p>
              </div>
            ))}
          </div>
        );

      case 'dev':
        return (
          <div className="h-full overflow-hidden proc-dev-tab">
            <SkillMesh compact />
          </div>
        );

      default:
        return null;
    }
  }, [activeTab, workEntries, achievementEntries]);

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
                  'shrink-0 text-left px-3 py-1.5 md:py-1 font-mono text-[10px] leading-tight transition-all duration-200 ease-out',
                  'border-b-2 md:border-b-0 md:border-l-2',
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
