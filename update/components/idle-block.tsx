'use client';

import { idleEntries, type IdleEntry } from '@/data/idle';
import PathLabel from '@/components/path-label';

function IdleIcon({ type }: { type: IdleEntry['icon'] }) {
  const props = {
    className: 'w-3.5 h-3.5 shrink-0 text-text-muted',
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

export default function IdleBlock({ scrollable = true }: { scrollable?: boolean }) {
  return (
    <div className="idle-box font-mono text-[10px] md:text-[11px] p-2.5 h-full">
      <div className="shrink-0 mb-2 pb-2 border-b border-border">
        <PathLabel name="idle" className="mb-0" />
      </div>
      <div className={scrollable ? 'idle-box-scroll space-y-2 pr-0.5' : 'space-y-2'}>
        {idleEntries.map((entry) => (
          <div key={entry.timestamp + entry.message} className="flex gap-2 items-start">
            <IdleIcon type={entry.icon} />
            <div className="leading-snug min-w-0">
              <span className="text-text-muted">[{entry.timestamp}]</span>{' '}
              <span className="text-text-primary">{entry.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
