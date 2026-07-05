'use client';

import type { ProjectDomain } from '@/data/projects';

const STROKE = 'var(--border-strong)';
const FILL = 'var(--text-muted)';

/** Background domain motif — larger, visible accent on every module card */
export default function ModuleDomainMotif({ domain }: { domain: ProjectDomain }) {
  const cls = 'module-domain-motif pointer-events-none select-none';

  switch (domain) {
    case 'IoT':
      return (
        <svg className={cls} viewBox="0 0 140 140" aria-hidden="true" preserveAspectRatio="xMaxYMid slice">
          <circle cx="28" cy="70" r="5" fill={FILL} opacity="0.55" />
          <circle cx="70" cy="38" r="4.5" fill={FILL} opacity="0.45" />
          <circle cx="70" cy="102" r="4.5" fill={FILL} opacity="0.45" />
          <circle cx="108" cy="58" r="5" fill={FILL} opacity="0.55" />
          <circle cx="108" cy="88" r="4" fill={FILL} opacity="0.4" />
          <line x1="32" y1="68" x2="66" y2="42" stroke={STROKE} strokeWidth="1.25" opacity="0.7" />
          <line x1="32" y1="72" x2="66" y2="98" stroke={STROKE} strokeWidth="1.25" opacity="0.7" />
          <line x1="74" y1="40" x2="104" y2="56" stroke={STROKE} strokeWidth="1.25" opacity="0.7" />
          <line x1="74" y1="100" x2="104" y2="86" stroke={STROKE} strokeWidth="1.25" opacity="0.7" />
          <line x1="74" y1="70" x2="104" y2="72" stroke={STROKE} strokeWidth="1" opacity="0.5" strokeDasharray="3 4" />
        </svg>
      );
    case 'EMBEDDED':
      return (
        <svg className={cls} viewBox="0 0 140 140" aria-hidden="true" preserveAspectRatio="xMaxYMid slice">
          <path
            d="M8 70 H32 L32 44 H56 L56 96 H80 L80 52 H104 L104 88 H132"
            fill="none"
            stroke={STROKE}
            strokeWidth="1.5"
            opacity="0.75"
          />
          <path
            d="M32 70 V96 M56 44 V70 M80 70 V96"
            fill="none"
            stroke={STROKE}
            strokeWidth="1"
            opacity="0.45"
            strokeDasharray="2 3"
          />
          <circle cx="32" cy="70" r="3.5" fill={FILL} opacity="0.5" />
          <circle cx="56" cy="44" r="3" fill={FILL} opacity="0.45" />
          <circle cx="80" cy="96" r="3.5" fill={FILL} opacity="0.5" />
          <circle cx="104" cy="52" r="3" fill={FILL} opacity="0.45" />
          <circle cx="132" cy="88" r="3.5" fill={FILL} opacity="0.5" />
          <rect x="118" y="62" width="14" height="10" fill="none" stroke={STROKE} strokeWidth="1" opacity="0.55" />
        </svg>
      );
    case 'HEALTH':
      return (
        <svg className={cls} viewBox="0 0 140 140" aria-hidden="true" preserveAspectRatio="xMaxYMid slice">
          <path
            d="M0 70 H18 L24 70 L30 52 L38 88 L46 58 L52 70 H68 L72 70 L78 38 L86 102 L94 48 L100 70 H116 L120 70 H140"
            fill="none"
            stroke={STROKE}
            strokeWidth="2"
            opacity="0.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M0 70 H18 L24 70 L30 52 L38 88 L46 58 L52 70 H68"
            fill="none"
            stroke={FILL}
            strokeWidth="1.25"
            opacity="0.35"
            strokeLinejoin="round"
          />
          <line x1="0" y1="70" x2="140" y2="70" stroke={STROKE} strokeWidth="0.75" opacity="0.25" strokeDasharray="4 6" />
        </svg>
      );
    case 'VLSI':
      return (
        <svg className={cls} viewBox="0 0 140 140" aria-hidden="true" preserveAspectRatio="xMaxYMid slice">
          <rect x="36" y="36" width="68" height="68" fill="none" stroke={STROKE} strokeWidth="1.5" opacity="0.75" rx="2" />
          <rect x="48" y="48" width="14" height="14" fill={FILL} opacity="0.35" />
          <rect x="66" y="48" width="14" height="14" fill={FILL} opacity="0.35" />
          <rect x="84" y="48" width="14" height="14" fill={FILL} opacity="0.35" />
          <rect x="48" y="66" width="14" height="14" fill={FILL} opacity="0.3" />
          <rect x="66" y="66" width="14" height="14" fill={FILL} opacity="0.4" />
          <rect x="84" y="66" width="14" height="14" fill={FILL} opacity="0.3" />
          <rect x="48" y="84" width="14" height="14" fill={FILL} opacity="0.35" />
          <rect x="66" y="84" width="14" height="14" fill={FILL} opacity="0.35" />
          <rect x="84" y="84" width="14" height="14" fill={FILL} opacity="0.35" />
          <line x1="36" y1="52" x2="24" y2="52" stroke={STROKE} strokeWidth="1" opacity="0.55" />
          <line x1="36" y1="70" x2="24" y2="70" stroke={STROKE} strokeWidth="1" opacity="0.55" />
          <line x1="36" y1="88" x2="24" y2="88" stroke={STROKE} strokeWidth="1" opacity="0.55" />
          <line x1="104" y1="52" x2="120" y2="52" stroke={STROKE} strokeWidth="1" opacity="0.55" />
          <line x1="104" y1="88" x2="120" y2="88" stroke={STROKE} strokeWidth="1" opacity="0.55" />
        </svg>
      );
    case 'SPACE':
      return (
        <svg className={cls} viewBox="0 0 140 140" aria-hidden="true" preserveAspectRatio="xMaxYMid slice">
          <path
            d="M12 98 A56 56 0 0 1 128 98"
            fill="none"
            stroke={STROKE}
            strokeWidth="1.5"
            opacity="0.7"
            strokeDasharray="4 5"
          />
          <ellipse cx="98" cy="58" rx="28" ry="10" fill="none" stroke={STROKE} strokeWidth="1" opacity="0.45" transform="rotate(-24 98 58)" />
          <circle cx="108" cy="48" r="4" fill={FILL} opacity="0.5" />
          <circle cx="118" cy="72" r="2.5" fill={FILL} opacity="0.35" />
        </svg>
      );
  }
}
