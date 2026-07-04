'use client';

import { idleEntries, type IdleEntry } from '@/data/idle';

function IdleIcon({ type }: { type: IdleEntry['icon'] }) {
  const props = {
    className: 'w-4 h-4 shrink-0 text-accent',
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
          <circle cx="18" cy="6" r="2" />
        </svg>
      );
    case 'plant':
      return (
        <svg {...props}>
          <path d="M12 22V12" />
          <path d="M12 12C12 6 6 4 4 8c4-1 6 2 8 4" strokeLinecap="round" />
          <path d="M12 12c0-6 6-8 8-4-4-1-6 2-8 4" strokeLinecap="round" />
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
          <path d="M10 22V12l-2 4M14 22V12l2 4M8 12h8" strokeLinecap="round" />
        </svg>
      );
  }
}

export default function Idle() {
  return (
    <div className="panel-content">
      <h2 className="section-header">idle</h2>

      <div className="panel p-4 md:p-5 font-mono text-xs md:text-sm">
        <div className="text-text-muted mb-3 pb-2 border-b border-border">
          <span className="text-accent">[idle]</span> cpu task — no runnable processes. weekend log:
        </div>

        {/* ls -la inspired listing */}
        <div className="text-[10px] md:text-xs text-text-muted mb-2 hidden sm:grid grid-cols-[auto_auto_auto_1fr] gap-x-3 gap-y-0">
          <span>permissions</span>
          <span>owner</span>
          <span>size</span>
          <span>name</span>
        </div>

        <div className="space-y-0.5">
          {idleEntries.map((entry, index) => (
            <div
              key={index}
              className="group py-2 border-b border-border last:border-0 hover:bg-panel transition-colors duration-200 ease-out rounded-sm px-1 -mx-1"
            >
              <div className="flex flex-wrap sm:grid sm:grid-cols-[auto_auto_auto_1fr] gap-x-3 gap-y-1 items-start">
                <span className="text-text-muted shrink-0">{entry.perm}</span>
                <span className="text-accent-dim shrink-0">ayushi</span>
                <span className="text-text-muted shrink-0">{entry.size.padStart(6)}</span>
                <div className="flex items-start gap-2 min-w-0">
                  <IdleIcon type={entry.icon} />
                  <div className="min-w-0">
                    <span className="text-text-muted">[{entry.timestamp}]</span>{' '}
                    <span className="text-text-primary group-hover:text-accent transition-colors duration-200 ease-out">
                      {entry.message}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-2 border-t border-border text-text-muted text-[10px] md:text-xs">
          <span className="text-accent">--</span> {idleEntries.length} entries · scheduler idle since last deploy
        </div>
      </div>
    </div>
  );
}
