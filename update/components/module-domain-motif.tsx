'use client';

import type { ProjectDomain } from '@/data/projects';

const STROKE = 'var(--border-strong)';
const FILL = 'var(--text-muted)';

/** Horizontal domain motif for top of module cards */
export default function ModuleDomainMotif({ domain }: { domain: ProjectDomain }) {
  switch (domain) {
    case 'IoT':
      return (
        <svg className="module-motif-svg" viewBox="0 0 240 56" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <circle cx="36" cy="28" r="3.5" fill={FILL} opacity="0.55" />
          <circle cx="96" cy="14" r="3" fill={FILL} opacity="0.45" />
          <circle cx="96" cy="42" r="3" fill={FILL} opacity="0.45" />
          <circle cx="156" cy="22" r="3.5" fill={FILL} opacity="0.55" />
          <circle cx="156" cy="34" r="2.5" fill={FILL} opacity="0.4" />
          <circle cx="204" cy="28" r="3" fill={FILL} opacity="0.45" />
          <line x1="39" y1="27" x2="93" y2="15" stroke={STROKE} strokeWidth="1.1" opacity="0.7" />
          <line x1="39" y1="29" x2="93" y2="41" stroke={STROKE} strokeWidth="1.1" opacity="0.7" />
          <line x1="99" y1="15" x2="153" y2="23" stroke={STROKE} strokeWidth="1.1" opacity="0.7" />
          <line x1="99" y1="41" x2="153" y2="33" stroke={STROKE} strokeWidth="1.1" opacity="0.7" />
          <line x1="159" y1="28" x2="201" y2="28" stroke={STROKE} strokeWidth="0.9" opacity="0.5" strokeDasharray="3 4" />
        </svg>
      );
    case 'EMBEDDED':
      return (
        <svg className="module-motif-svg" viewBox="0 0 240 56" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <path
            d="M8 28 H48 L48 12 H88 L88 44 H128 L128 16 H168 L168 40 H208 L208 28 H232"
            fill="none"
            stroke={STROKE}
            strokeWidth="1.4"
            opacity="0.75"
          />
          <circle cx="48" cy="28" r="2.5" fill={FILL} opacity="0.5" />
          <circle cx="88" cy="12" r="2" fill={FILL} opacity="0.45" />
          <circle cx="128" cy="44" r="2.5" fill={FILL} opacity="0.5" />
          <circle cx="168" cy="16" r="2" fill={FILL} opacity="0.45" />
          <circle cx="208" cy="28" r="2.5" fill={FILL} opacity="0.5" />
        </svg>
      );
    case 'HEALTH':
      return (
        <svg className="module-motif-svg" viewBox="0 0 240 56" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="28" x2="240" y2="28" stroke={STROKE} strokeWidth="0.5" opacity="0.25" strokeDasharray="4 6" />
          <path
            d="M0 28 H24 L32 28 L38 14 L48 42 L58 18 L66 28 H96 L102 28 L110 8 L120 48 L130 12 L138 28 H168 L174 28 L182 20 L192 36 L202 28 H240"
            fill="none"
            stroke={STROKE}
            strokeWidth="1.75"
            opacity="0.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'VLSI':
      return (
        <svg className="module-motif-svg" viewBox="0 0 240 56" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <rect x="88" y="10" width="64" height="36" fill="none" stroke={STROKE} strokeWidth="1.3" opacity="0.75" rx="2" />
          <rect x="98" y="18" width="10" height="10" fill={FILL} opacity="0.35" />
          <rect x="112" y="18" width="10" height="10" fill={FILL} opacity="0.35" />
          <rect x="126" y="18" width="10" height="10" fill={FILL} opacity="0.35" />
          <rect x="98" y="32" width="10" height="10" fill={FILL} opacity="0.3" />
          <rect x="112" y="32" width="10" height="10" fill={FILL} opacity="0.4" />
          <rect x="126" y="32" width="10" height="10" fill={FILL} opacity="0.3" />
          <line x1="88" y1="22" x2="72" y2="22" stroke={STROKE} strokeWidth="0.9" opacity="0.55" />
          <line x1="88" y1="34" x2="72" y2="34" stroke={STROKE} strokeWidth="0.9" opacity="0.55" />
          <line x1="152" y1="22" x2="168" y2="22" stroke={STROKE} strokeWidth="0.9" opacity="0.55" />
          <line x1="152" y1="34" x2="168" y2="34" stroke={STROKE} strokeWidth="0.9" opacity="0.55" />
        </svg>
      );
    case 'SPACE':
      return (
        <svg className="module-motif-svg" viewBox="0 0 240 56" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <path d="M16 40 A104 104 0 0 1 224 40" fill="none" stroke={STROKE} strokeWidth="1.3" opacity="0.7" strokeDasharray="4 5" />
          <ellipse cx="176" cy="22" rx="36" ry="10" fill="none" stroke={STROKE} strokeWidth="0.9" opacity="0.45" transform="rotate(-18 176 22)" />
          <circle cx="188" cy="16" r="2.5" fill={FILL} opacity="0.5" />
        </svg>
      );
  }
}
