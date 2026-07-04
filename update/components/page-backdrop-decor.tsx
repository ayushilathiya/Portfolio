'use client';

/** Decorative trace lines and IoT nodes on the outer page background */
export default function PageBackdropDecor() {
  return (
    <svg
      className="page-backdrop-decor"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Horizontal traces */}
      <line x1="0" y1="120" x2="280" y2="120" stroke="var(--border-strong)" strokeWidth="0.75" opacity="0.6" />
      <line x1="1160" y1="780" x2="1440" y2="780" stroke="var(--border-strong)" strokeWidth="0.75" opacity="0.6" />
      <line x1="80" y1="0" x2="80" y2="200" stroke="var(--border-strong)" strokeWidth="0.5" opacity="0.4" />
      <line x1="1360" y1="700" x2="1360" y2="900" stroke="var(--border-strong)" strokeWidth="0.5" opacity="0.4" />

      {/* L-shaped trace segments */}
      <path d="M 200 60 L 200 160 L 320 160" fill="none" stroke="var(--border-strong)" strokeWidth="0.75" opacity="0.5" />
      <path d="M 1240 840 L 1240 740 L 1120 740" fill="none" stroke="var(--border-strong)" strokeWidth="0.75" opacity="0.5" />
      <path d="M 520 40 L 620 40 L 620 100" fill="none" stroke="var(--border-strong)" strokeWidth="0.5" opacity="0.35" />
      <path d="M 920 860 L 820 860 L 820 800" fill="none" stroke="var(--border-strong)" strokeWidth="0.5" opacity="0.35" />

      {/* IoT / mesh nodes */}
      <circle cx="200" cy="60" r="2.5" fill="var(--text-muted)" opacity="0.5" />
      <circle cx="320" cy="160" r="2" fill="var(--text-muted)" opacity="0.4" />
      <circle cx="1240" cy="840" r="2.5" fill="var(--text-muted)" opacity="0.5" />
      <circle cx="1120" cy="740" r="2" fill="var(--text-muted)" opacity="0.4" />
      <circle cx="80" cy="200" r="1.5" fill="var(--text-muted)" opacity="0.35" />
      <circle cx="1360" cy="700" r="1.5" fill="var(--text-muted)" opacity="0.35" />
      <circle cx="620" cy="100" r="1.5" fill="var(--text-muted)" opacity="0.3" />
      <circle cx="820" cy="800" r="1.5" fill="var(--text-muted)" opacity="0.3" />

      {/* VLSI die outline hints */}
      <rect x="40" y="720" width="48" height="48" fill="none" stroke="var(--border-strong)" strokeWidth="0.5" opacity="0.25" />
      <rect x="52" y="732" width="8" height="8" fill="var(--border)" opacity="0.4" />
      <rect x="64" y="732" width="8" height="8" fill="var(--border)" opacity="0.4" />
      <rect x="1352" y="132" width="48" height="48" fill="none" stroke="var(--border-strong)" strokeWidth="0.5" opacity="0.25" />
    </svg>
  );
}
