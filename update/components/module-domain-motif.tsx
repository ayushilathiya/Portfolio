'use client';

import type { ProjectDomain } from '@/data/projects';

const STROKE = 'var(--border-strong)';
const FILL = 'var(--text-muted)';

/** Domain motif confined to the card's visual strip (right column) */
export default function ModuleDomainMotif({ domain }: { domain: ProjectDomain }) {
  switch (domain) {
    case 'IoT':
      return (
        <svg className="module-motif-svg" viewBox="0 0 100 120" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <circle cx="22" cy="60" r="4" fill={FILL} opacity="0.6" />
          <circle cx="50" cy="28" r="3.5" fill={FILL} opacity="0.5" />
          <circle cx="50" cy="92" r="3.5" fill={FILL} opacity="0.5" />
          <circle cx="78" cy="44" r="4" fill={FILL} opacity="0.6" />
          <circle cx="78" cy="76" r="3" fill={FILL} opacity="0.45" />
          <line x1="25" y1="58" x2="47" y2="30" stroke={STROKE} strokeWidth="1.25" opacity="0.75" />
          <line x1="25" y1="62" x2="47" y2="90" stroke={STROKE} strokeWidth="1.25" opacity="0.75" />
          <line x1="53" y1="30" x2="75" y2="46" stroke={STROKE} strokeWidth="1.25" opacity="0.75" />
          <line x1="53" y1="90" x2="75" y2="74" stroke={STROKE} strokeWidth="1.25" opacity="0.75" />
        </svg>
      );
    case 'EMBEDDED':
      return (
        <svg className="module-motif-svg" viewBox="0 0 100 120" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <path
            d="M6 60 H28 L28 32 H50 L50 88 H72 L72 40 H94"
            fill="none"
            stroke={STROKE}
            strokeWidth="1.5"
            opacity="0.8"
          />
          <circle cx="28" cy="60" r="2.5" fill={FILL} opacity="0.55" />
          <circle cx="50" cy="32" r="2" fill={FILL} opacity="0.5" />
          <circle cx="72" cy="88" r="2.5" fill={FILL} opacity="0.55" />
          <rect x="80" y="48" width="12" height="24" fill="none" stroke={STROKE} strokeWidth="1" opacity="0.6" rx="1" />
        </svg>
      );
    case 'HEALTH':
      return (
        <svg className="module-motif-svg" viewBox="0 0 100 120" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <line x1="0" y1="60" x2="100" y2="60" stroke={STROKE} strokeWidth="0.5" opacity="0.3" strokeDasharray="3 5" />
          <path
            d="M0 60 H14 L20 60 L26 38 L34 82 L42 48 L48 60 H62 L66 60 L72 28 L80 92 L88 42 L94 60 H100"
            fill="none"
            stroke={STROKE}
            strokeWidth="2"
            opacity="0.85"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'VLSI':
      return (
        <svg className="module-motif-svg" viewBox="0 0 100 120" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <rect x="24" y="30" width="52" height="60" fill="none" stroke={STROKE} strokeWidth="1.5" opacity="0.75" rx="2" />
          <rect x="34" y="42" width="10" height="10" fill={FILL} opacity="0.4" />
          <rect x="48" y="42" width="10" height="10" fill={FILL} opacity="0.4" />
          <rect x="62" y="42" width="10" height="10" fill={FILL} opacity="0.4" />
          <rect x="34" y="56" width="10" height="10" fill={FILL} opacity="0.35" />
          <rect x="48" y="56" width="10" height="10" fill={FILL} opacity="0.45" />
          <rect x="62" y="56" width="10" height="10" fill={FILL} opacity="0.35" />
          <rect x="34" y="70" width="10" height="10" fill={FILL} opacity="0.4" />
          <rect x="48" y="70" width="10" height="10" fill={FILL} opacity="0.4" />
          <rect x="62" y="70" width="10" height="10" fill={FILL} opacity="0.4" />
        </svg>
      );
    case 'SPACE':
      return (
        <svg className="module-motif-svg" viewBox="0 0 100 120" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <path d="M8 88 A42 42 0 0 1 92 88" fill="none" stroke={STROKE} strokeWidth="1.5" opacity="0.7" strokeDasharray="4 5" />
          <ellipse cx="68" cy="48" rx="22" ry="8" fill="none" stroke={STROKE} strokeWidth="1" opacity="0.5" transform="rotate(-20 68 48)" />
          <circle cx="76" cy="40" r="3" fill={FILL} opacity="0.55" />
        </svg>
      );
  }
}

export function moduleCardTint(domain: ProjectDomain): string {
  const map: Record<ProjectDomain, string> = {
    IoT: 'module-card-tint-iot',
    EMBEDDED: 'module-card-tint-embedded',
    HEALTH: 'module-card-tint-health',
    VLSI: 'module-card-tint-vlsi',
    SPACE: 'module-card-tint-space',
  };
  return map[domain];
}
