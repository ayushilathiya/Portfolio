'use client';

import { useState, useCallback, useEffect } from 'react';
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

const BOOT_STEPS = [
  '[0.0001] power-on reset',
  '[0.0012] enumerating buses…',
  '[0.0024] device online — handshake ok',
];

function DeviceOnlineIntro() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= BOOT_STEPS.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), 450);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="panel-box p-4 mb-4 font-mono text-xs space-y-2 relative overflow-hidden">
      <SectionVisual tab="whoami" />
      <div className="space-y-1 text-text-secondary">
        {BOOT_STEPS.slice(0, step).map((line) => (
          <div key={line} className="flex items-start gap-2">
            <span className="text-text-muted shrink-0">›</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
      {step >= BOOT_STEPS.length && (
        <>
          <p className="text-text-primary text-sm md:text-base pt-1">
            Hi, I&apos;m <span className="text-accent-amber">{profile.name}</span>
          </p>
          <p className="text-text-secondary leading-relaxed">{profile.intro}</p>
          <p className="text-text-muted text-[11px]">{profile.bio[0]}</p>
        </>
      )}
    </div>
  );
}

function SystemStats() {
  return (
    <div className="panel-box p-4 relative">
      <PathLabel name="system_stats" />
      <table className="w-full font-mono text-[11px]">
        <tbody>
          {profile.stats.map((stat, i) => (
            <tr key={stat.label} className="border-b border-border last:border-0">
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
    <div className="panel-box p-4 relative">
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
          <div className="space-y-4">
            <DeviceOnlineIntro />
            <div className="panel-box p-4 relative">
              <SectionVisual tab="whoami" />
              <PathLabel name="register_map" />
              <table className="w-full font-mono text-[11px]">
                <thead>
                  <tr className="text-text-muted text-left border-b border-border">
                    <th className="pb-2 pr-3 font-normal">ADDR</th>
                    <th className="pb-2 pr-3 font-normal">FIELD</th>
                    <th className="pb-2 font-normal">VALUE</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.registers.map((reg) => (
                    <tr key={reg.addr} className="border-b border-border last:border-0">
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
          <div className="space-y-3 relative">
            <SectionVisual tab="bootloader" />
            <DomainAccent domain="vlsi" />
            {education.map((edu) => (
              <div key={edu.institution} className="panel-box p-4">
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
                <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border">
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
          <div className="space-y-2 relative">
            <SectionVisual tab="runtime" />
            <DomainAccent domain="embedded" />
            <PathLabel name="work_log" />
            {workEntries.map((entry) => (
              <div key={entry.title} className="panel-box p-3 log-line">
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
          <div className="space-y-3 relative">
            <SectionVisual tab="beacon" />
            <DomainAccent domain="space" />
            <PathLabel name="beacon_tx" />
            {achievementEntries.map((entry) => (
              <div key={entry.title} className="panel-box p-3 log-line">
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
              <div key={pos.title} className="panel-box p-4">
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
        <aside className="shrink-0 md:w-28 lg:w-36 flex flex-col md:border-r md:border-border min-h-0 md:self-stretch">
          <nav
            className="flex md:flex-col gap-0 overflow-x-auto md:overflow-visible scrollbar-hide py-1 shrink-0"
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
                  'shrink-0 text-left px-3 py-2 font-mono text-[11px] transition-all duration-200 ease-out',
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

          <div className="hidden md:block mx-3 border-t border-border-strong shrink-0" aria-hidden="true" />

          <div className="hidden md:flex flex-1 min-h-0 p-2">
            <IdleBlock scrollable />
          </div>
        </aside>

        <div className="md:hidden p-2 shrink-0 border-b border-border max-h-32">
          <IdleBlock scrollable />
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
