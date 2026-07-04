'use client';

import type { ProcTabId } from '@/lib/sections';

export default function SectionVisual({ tab }: { tab: ProcTabId | 'modules' | 'docs' | 'uart' }) {
  const props = {
    className: 'absolute pointer-events-none opacity-25',
    fill: 'none',
    'aria-hidden': true as const,
  };

  switch (tab) {
    case 'whoami':
      return (
        <svg {...props} className={`${props.className} top-2 right-2 w-24 h-16`} viewBox="0 0 96 64">
          <path d="M8,32 L24,32 L24,16 L40,16" stroke="var(--accent-amber)" strokeWidth="0.75" />
          <circle cx="40" cy="16" r="2" fill="var(--status-verified)" />
          <text x="8" y="12" fill="var(--text-muted)" fontSize="6" fontFamily="monospace">ONLINE</text>
        </svg>
      );
    case 'bootloader':
      return (
        <svg {...props} className={`${props.className} top-2 right-2 w-20 h-20`} viewBox="0 0 80 80">
          <rect x="20" y="20" width="40" height="40" stroke="var(--accent-amber)" strokeWidth="0.5" />
          <path d="M28,28 h24 M28,36 h16 M28,44 h20" stroke="var(--border-strong)" strokeWidth="0.5" />
        </svg>
      );
    case 'runtime':
      return (
        <svg {...props} className={`${props.className} top-2 right-2 w-28 h-12`} viewBox="0 0 112 48">
          <path d="M0,24 L20,24 L20,8 L40,8 L40,40 L60,40 L60,24 L80,24" stroke="var(--accent-amber)" strokeWidth="0.75" />
        </svg>
      );
    case 'beacon':
      return (
        <svg {...props} className={`${props.className} top-2 right-2 w-20 h-20`} viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="24" stroke="var(--accent-amber)" strokeWidth="0.5" strokeDasharray="2 4" />
          <path d="M40,16 L40,8 M56,24 L62,18" stroke="var(--accent-amber)" strokeWidth="0.5" />
          <circle cx="40" cy="40" r="3" fill="var(--accent-amber)" opacity="0.6" />
        </svg>
      );
    case 'dev':
      return (
        <svg {...props} className={`${props.className} top-2 right-2 w-24 h-24`} viewBox="0 0 96 96">
          <circle cx="20" cy="48" r="3" fill="var(--accent-amber)" />
          <circle cx="48" cy="24" r="3" fill="var(--border-strong)" />
          <circle cx="76" cy="48" r="3" fill="var(--border-strong)" />
          <circle cx="48" cy="72" r="3" fill="var(--border-strong)" />
          <line x1="20" y1="48" x2="48" y2="24" stroke="var(--accent-amber)" strokeWidth="0.5" />
          <line x1="48" y1="24" x2="76" y2="48" stroke="var(--border-strong)" strokeWidth="0.5" />
          <line x1="48" y1="24" x2="48" y2="72" stroke="var(--border-strong)" strokeWidth="0.5" />
        </svg>
      );
    case 'modules':
      return (
        <svg {...props} className={`${props.className} bottom-4 left-4 w-32 h-16`} viewBox="0 0 128 64">
          <path d="M0,32 L32,32 L32,8 L64,8 L64,56 L96,56 L96,32 L128,32" stroke="var(--accent-amber)" strokeWidth="0.75" opacity="0.5" />
        </svg>
      );
    case 'docs':
      return (
        <svg {...props} className={`${props.className} top-4 right-4 w-16 h-20`} viewBox="0 0 64 80">
          <rect x="12" y="8" width="40" height="64" stroke="var(--border-strong)" strokeWidth="0.5" />
          <line x1="20" y1="24" x2="44" y2="24" stroke="var(--text-muted)" strokeWidth="0.5" />
          <line x1="20" y1="32" x2="40" y2="32" stroke="var(--text-muted)" strokeWidth="0.5" />
          <line x1="20" y1="40" x2="44" y2="40" stroke="var(--text-muted)" strokeWidth="0.5" />
        </svg>
      );
    case 'uart':
      return (
        <svg {...props} className={`${props.className} top-4 right-4 w-24 h-24`} viewBox="0 0 96 96">
          <path d="M8,80 Q48,20 88,16" stroke="var(--accent-amber)" strokeWidth="0.75" strokeDasharray="3 5" className="uplink-line" />
          <circle cx="88" cy="16" r="2" fill="var(--accent-amber)" />
        </svg>
      );
    default:
      return null;
  }
}

/** Domain accent SVG for health (ECG), space (orbit), vlsi (die), embedded (trace) */
export function DomainAccent({ domain }: { domain: 'health' | 'space' | 'vlsi' | 'embedded' | 'iot' }) {
  const cls = 'w-full h-8 opacity-30 mb-2';
  switch (domain) {
    case 'health':
      return (
        <svg className={cls} viewBox="0 0 120 24" aria-hidden="true">
          <path d="M0,12 L20,12 L26,4 L32,20 L38,8 L44,12 L120,12" fill="none" stroke="var(--accent-amber)" strokeWidth="0.75" />
        </svg>
      );
    case 'space':
      return (
        <svg className={cls} viewBox="0 0 120 24" aria-hidden="true">
          <path d="M10,18 a40,40 0 0 1 100,0" fill="none" stroke="var(--accent-amber)" strokeWidth="0.5" strokeDasharray="2 3" />
          <circle cx="100" cy="10" r="1.5" fill="var(--accent-amber)" />
        </svg>
      );
    case 'vlsi':
      return (
        <svg className={cls} viewBox="0 0 120 24" aria-hidden="true">
          <rect x="40" y="4" width="40" height="16" stroke="var(--accent-amber)" strokeWidth="0.5" fill="none" />
          <rect x="52" y="8" width="6" height="6" fill="var(--border-strong)" />
          <rect x="62" y="8" width="6" height="6" fill="var(--border-strong)" />
        </svg>
      );
    case 'embedded':
      return (
        <svg className={cls} viewBox="0 0 120 24" aria-hidden="true">
          <path d="M0,12 L30,12 L30,6 L60,6 L60,18 L90,18 L90,12 L120,12" fill="none" stroke="var(--accent-amber)" strokeWidth="0.75" />
        </svg>
      );
    case 'iot':
      return (
        <svg className={cls} viewBox="0 0 120 24" aria-hidden="true">
          <circle cx="20" cy="12" r="3" fill="var(--accent-amber)" opacity="0.7" />
          <circle cx="60" cy="6" r="2" fill="var(--border-strong)" />
          <circle cx="100" cy="12" r="3" fill="var(--border-strong)" />
          <line x1="23" y1="12" x2="57" y2="6" stroke="var(--accent-amber)" strokeWidth="0.5" />
          <line x1="62" y1="6" x2="97" y2="12" stroke="var(--border-strong)" strokeWidth="0.5" />
        </svg>
      );
  }
}
