'use client';

import type { ProjectDomain } from '@/data/projects';

/** Small corner motif per project domain */
export default function ModuleDomainMotif({ domain }: { domain: ProjectDomain }) {
  const cls = 'module-domain-motif pointer-events-none';

  switch (domain) {
    case 'IoT':
      return (
        <svg className={cls} viewBox="0 0 64 48" aria-hidden="true">
          <circle cx="12" cy="24" r="2.5" fill="var(--text-muted)" opacity="0.5" />
          <circle cx="32" cy="12" r="2" fill="var(--text-muted)" opacity="0.35" />
          <circle cx="52" cy="28" r="2.5" fill="var(--text-muted)" opacity="0.5" />
          <line x1="14" y1="23" x2="30" y2="13" stroke="var(--border-strong)" strokeWidth="0.75" />
          <line x1="34" y1="13" x2="50" y2="27" stroke="var(--border-strong)" strokeWidth="0.75" />
        </svg>
      );
    case 'EMBEDDED':
      return (
        <svg className={cls} viewBox="0 0 64 48" aria-hidden="true">
          <path
            d="M4 24 H20 L20 14 H36 L36 34 H52 L52 24 H64"
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth="0.75"
          />
          <circle cx="20" cy="24" r="1.5" fill="var(--text-muted)" opacity="0.45" />
          <circle cx="52" cy="24" r="1.5" fill="var(--text-muted)" opacity="0.45" />
        </svg>
      );
    case 'HEALTH':
      return (
        <svg className={cls} viewBox="0 0 64 48" aria-hidden="true">
          <path
            d="M0 24 L12 24 L18 10 L26 38 L32 18 L38 24 L64 24"
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth="0.75"
          />
        </svg>
      );
    case 'VLSI':
      return (
        <svg className={cls} viewBox="0 0 64 48" aria-hidden="true">
          <rect x="18" y="10" width="28" height="28" fill="none" stroke="var(--border-strong)" strokeWidth="0.75" />
          <rect x="26" y="18" width="5" height="5" fill="var(--text-muted)" opacity="0.35" />
          <rect x="34" y="18" width="5" height="5" fill="var(--text-muted)" opacity="0.35" />
          <rect x="26" y="26" width="5" height="5" fill="var(--text-muted)" opacity="0.35" />
        </svg>
      );
    case 'SPACE':
      return (
        <svg className={cls} viewBox="0 0 64 48" aria-hidden="true">
          <path
            d="M8 36 A40 40 0 0 1 56 36"
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth="0.75"
            strokeDasharray="2 3"
          />
          <circle cx="52" cy="22" r="2" fill="var(--text-muted)" opacity="0.4" />
        </svg>
      );
  }
}
