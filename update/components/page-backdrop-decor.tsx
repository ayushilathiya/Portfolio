'use client';

/** Animated amber trace lines on the plain outer page background */
export default function PageBackdropDecor() {
  return (
    <svg
      className="page-backdrop-decor"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <line
        className="trace-pulse"
        x1="0"
        y1="140"
        x2="320"
        y2="140"
        stroke="var(--accent-amber)"
        strokeWidth="0.75"
      />
      <line
        className="trace-pulse trace-pulse-delay-1"
        x1="1120"
        y1="760"
        x2="1440"
        y2="760"
        stroke="var(--accent-amber)"
        strokeWidth="0.75"
      />
      <path
        className="trace-pulse trace-pulse-delay-2"
        d="M 180 48 L 180 168 L 300 168"
        fill="none"
        stroke="var(--accent-amber)"
        strokeWidth="0.6"
      />
      <path
        className="trace-pulse trace-pulse-delay-3"
        d="M 1260 852 L 1260 732 L 1140 732"
        fill="none"
        stroke="var(--accent-amber)"
        strokeWidth="0.6"
      />
      <line
        className="trace-pulse trace-pulse-delay-2"
        x1="60"
        y1="0"
        x2="60"
        y2="180"
        stroke="var(--accent-amber)"
        strokeWidth="0.5"
      />
      <line
        className="trace-pulse trace-pulse-delay-1"
        x1="1380"
        y1="720"
        x2="1380"
        y2="900"
        stroke="var(--accent-amber)"
        strokeWidth="0.5"
      />
    </svg>
  );
}
