'use client';

import { useState, useCallback } from 'react';
import { procTabs, type ProcTabId } from '@/lib/sections';
import { profile } from '@/data/profile';
import { education } from '@/data/education';
import { responsibilities } from '@/data/responsibilities';
import { experienceEntries } from '@/data/experience';
import SkillMesh from '@/components/skill-mesh';
import IdleBlock from '@/components/idle-block';
import PathLabel from '@/components/path-label';
import SectionVisual, { DomainAccent } from '@/components/section-visual';
import { cn } from '@/lib/utils';

interface ProcPanelProps {
  initialTab?: ProcTabId;
}

function WhoamiHero() {
  return (
    <div className="content-stack-section relative overflow-hidden">
      <SectionVisual tab="whoami" />
      <h1 className="text-text-primary text-lg md:text-xl font-medium leading-snug">
        Hi, I&apos;m <span className="text-accent-amber">{profile.name}</span>
      </h1>
      <p className="text-text-primary text-sm md:text-base mt-2 leading-relaxed">{profile.intro}</p>
      <p className="text-text-secondary text-[11px] md:text-xs mt-2 leading-relaxed">{profile.bio[0]}</p>
    </div>
  );
}

function SystemStats() {
  return (
    <div className="content-stack-section relative">
      <PathLabel name="system_stats" />
      <table className="w-full font-mono text-[11px]">
        <tbody>
          {profile.stats.map((stat, i) => (
            <tr key={stat.label} className="border-b border-border-strong last:border-0">
              <td className="py-2 pr-4 text-text-muted">{stat.label}</td>
              <td className="py-2 text-right tabular-nums">
                <span className={i === 0 ? 'text-accent-amber' : 'text-text-secondary'}>
                  {stat.value}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ConnectedDevices() {
  return (
    <div className="content-stack-section relative">
      <PathLabel name="connected_devices" />
      <div className="flex flex-wrap gap-3">
        {profile.devices.map((dev) => (
          <a
            key={dev.id}
            href={dev.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mesh-node flex-col items-start gap-0.5 px-3 py-2 min-w-[140px] hover:text-accent-amber transition-colors duration-200 ease-out"
          >
            <span className="mesh-dot" />
            <span className="text-[10px] text-text-muted">{dev.id}</span>
            <span className="text-text-primary text-[11px]">{dev.label}</span>
            <span className="text-text-muted text-[10px] truncate max-w-[130px]">{dev.addr}</span>
            <span className="text-[9px] text-text-muted mt-0.5">linked</span>
          </a>
        ))}
      </div>
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
          <div className="content-stack">
            <WhoamiHero />
            <div className="content-stack-section relative">
              <SectionVisual tab="whoami" />
              <PathLabel name="register_map" />
              <table className="w-full font-mono text-[11px]">
                <thead>
                  <tr className="text-text-muted text-left border-b border-border-strong">
                    <th className="pb-2 pr-3 font-normal">ADDR</th>
                    <th className="pb-2 pr-3 font-normal">FIELD</th>
                    <th className="pb-2 font-normal">VALUE</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.registers.map((reg) => (
                    <tr key={reg.addr} className="border-b border-border-strong last:border-0">
                      <td className="py-2 pr-3 text-accent-amber">{reg.addr}</td>
                      <td className="py-2 pr-3 text-text-muted">{reg.field}</td>
                      <td className="py-2 text-text-secondary">{reg.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <SystemStats />
            <ConnectedDevices />
          </div>
        );

      case 'bootloader':
        return (
          <div className="content-stack relative">
            <SectionVisual tab="bootloader" />
            <DomainAccent domain="vlsi" />
            {education.map((edu) => (
              <div key={edu.institution} className="content-stack-section">
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
                <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border-strong">
                  {edu.skills.map((s) => (
                    <span key={s} className="mesh-node text-[10px]">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'runtime':
        return (
          <div className="content-stack relative">
            <SectionVisual tab="runtime" />
            <DomainAccent domain="embedded" />
            <div className="content-stack-section">
              <PathLabel name="work_log" />
            </div>
            {workEntries.map((entry) => (
              <div key={entry.title} className="content-stack-section log-line">
                <div className="flex flex-wrap gap-x-2 text-[11px]">
                  <span className="text-text-muted">[{entry.timestamp}]</span>
                  {entry.link ? (
                    <a href={entry.link} target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-accent-amber transition-colors duration-200 ease-out">
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

      case 'beacon':
        return (
          <div className="content-stack relative">
            <SectionVisual tab="beacon" />
            <DomainAccent domain="space" />
            <div className="content-stack-section">
              <PathLabel name="beacon_tx" />
            </div>
            {achievementEntries.map((entry) => (
              <div key={entry.title} className="content-stack-section log-line">
                <div className="flex flex-wrap gap-x-2 text-[11px]">
                  <span className="text-text-muted">[{entry.timestamp}]</span>
                  <span className="text-text-muted text-[10px]">tx</span>
                  {entry.link ? (
                    <a href={entry.link} target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-accent-amber transition-colors duration-200 ease-out">
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
            {responsibilities.map((pos) => (
              <div key={pos.title} className="content-stack-section">
                <a href={pos.link} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-text-primary hover:text-accent-amber transition-colors duration-200 ease-out">
                  {pos.title}
                </a>
                <p className="font-mono text-xs text-text-secondary mt-1">{pos.org} · {pos.period}</p>
                <p className="font-mono text-xs text-text-muted mt-2 leading-relaxed">{pos.desc}</p>
              </div>
            ))}
          </div>
        );

      case 'dev':
        return (
          <div className="relative">
            <SectionVisual tab="dev" />
            <DomainAccent domain="iot" />
            <SkillMesh />
          </div>
        );

      default:
        return null;
    }
  }, [activeTab, workEntries, achievementEntries]);

  return (
    <div className="panel-content proc-layout">
      <div className="flex-1 min-h-0 flex flex-col md:flex-row relative">
        <aside className="shrink-0 md:w-28 lg:w-36 flex flex-col md:border-r md:border-border min-h-0 md:h-full overflow-hidden">
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
                  'shrink-0 text-left px-2.5 md:px-2 py-1.5 md:py-1 font-mono text-[10px] md:text-[10px] leading-tight transition-all duration-200 ease-out',
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

          <div
            className="hidden md:block w-full border-t border-border-strong shrink-0"
            aria-hidden="true"
          />

          <div className="hidden md:block idle-sidebar-slot">
            <IdleBlock />
          </div>
        </aside>

        <div className="md:hidden idle-mobile-slot">
          <IdleBlock />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto panel-inner-scroll p-2 md:p-4 relative" role="tabpanel">
          <svg className="hidden md:block absolute left-0 top-4 bottom-4 w-3 pointer-events-none opacity-30" aria-hidden="true">
            <line x1="2" y1="0" x2="2" y2="100%" stroke="var(--border-strong)" strokeWidth="0.5" />
          </svg>
          <div className="md:pl-3 transition-opacity duration-200 ease-out">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
