'use client';

/** Animated amber trace lines on the outer page background — outside the device frame */
export default function PageBackdropDecor() {
  return (
    <svg
      className="page-backdrop-decor"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* top edge traces */}
      <line className="trace-pulse trace-flow" x1="0" y1="80" x2="280" y2="80" stroke="var(--accent-amber)" strokeWidth="1" />
      <line className="trace-pulse trace-flow trace-pulse-delay-1" x1="1160" y1="60" x2="1440" y2="60" stroke="var(--accent-amber)" strokeWidth="1" />
      <line className="trace-pulse trace-flow trace-pulse-delay-2" x1="520" y1="40" x2="920" y2="40" stroke="var(--accent-amber)" strokeWidth="0.75" />

      {/* bottom edge traces */}
      <line className="trace-pulse trace-flow trace-pulse-delay-1" x1="1120" y1="760" x2="1440" y2="760" stroke="var(--accent-amber)" strokeWidth="1" />
      <line className="trace-pulse trace-flow trace-pulse-delay-3" x1="0" y1="820" x2="240" y2="820" stroke="var(--accent-amber)" strokeWidth="0.85" />
      <line className="trace-pulse trace-flow trace-pulse-delay-2" x1="400" y1="880" x2="700" y2="880" stroke="var(--accent-amber)" strokeWidth="0.85" />
      <line className="trace-pulse trace-flow" x1="980" y1="840" x2="1240" y2="840" stroke="var(--accent-amber)" strokeWidth="0.75" />

      {/* left edge */}
      <line className="trace-pulse trace-flow trace-pulse-delay-2" x1="60" y1="0" x2="60" y2="180" stroke="var(--accent-amber)" strokeWidth="0.85" />
      <line className="trace-pulse trace-flow trace-pulse-delay-3" x1="28" y1="320" x2="28" y2="520" stroke="var(--accent-amber)" strokeWidth="0.75" />
      <line className="trace-pulse trace-flow trace-pulse-delay-1" x1="100" y1="640" x2="100" y2="860" stroke="var(--accent-amber)" strokeWidth="0.75" />

      {/* right edge */}
      <line className="trace-pulse trace-flow trace-pulse-delay-1" x1="1380" y1="720" x2="1380" y2="900" stroke="var(--accent-amber)" strokeWidth="0.85" />
      <line className="trace-pulse trace-flow trace-pulse-delay-2" x1="1410" y1="200" x2="1410" y2="420" stroke="var(--accent-amber)" strokeWidth="0.75" />
      <line className="trace-pulse trace-flow" x1="1340" y1="480" x2="1340" y2="660" stroke="var(--accent-amber)" strokeWidth="0.75" />

      {/* corner paths */}
      <path className="trace-pulse trace-flow trace-pulse-delay-2" d="M 180 48 L 180 168 L 300 168" fill="none" stroke="var(--accent-amber)" strokeWidth="0.85" />
      <path className="trace-pulse trace-flow trace-pulse-delay-3" d="M 1260 852 L 1260 732 L 1140 732" fill="none" stroke="var(--accent-amber)" strokeWidth="0.85" />
      <path className="trace-pulse trace-flow trace-pulse-delay-1" d="M 40 860 L 40 740 L 160 740" fill="none" stroke="var(--accent-amber)" strokeWidth="0.75" />
      <path className="trace-pulse trace-flow" d="M 1400 120 L 1280 120 L 1280 240" fill="none" stroke="var(--accent-amber)" strokeWidth="0.75" />

      {/* mid-field accents — sparse, outside frame feel */}
      <line className="trace-pulse trace-flow trace-pulse-delay-3" x1="200" y1="400" x2="340" y2="400" stroke="var(--accent-amber)" strokeWidth="0.6" />
      <line className="trace-pulse trace-flow trace-pulse-delay-2" x1="1100" y1="360" x2="1260" y2="360" stroke="var(--accent-amber)" strokeWidth="0.6" />
      <line className="trace-pulse trace-flow trace-pulse-delay-1" x1="180" y1="560" x2="320" y2="620" stroke="var(--accent-amber)" strokeWidth="0.55" />
      <line className="trace-pulse trace-flow" x1="1180" y1="580" x2="1320" y2="520" stroke="var(--accent-amber)" strokeWidth="0.55" />
    </svg>
  );
}
