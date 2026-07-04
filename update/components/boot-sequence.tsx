'use client';

import { useState, useEffect, useRef } from 'react';

export const INTRO_SESSION_KEY = 'portfolio-intro-seen';

const introLines = [
  '[0.0001] power-on reset',
  '[0.0012] enumerating buses…',
  '[0.0024] device online — handshake ok',
];

const LINE_MS = 380;
const FINISH_MS = 1400;

export default function BootSequence() {
  const [active, setActive] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [fading, setFading] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    setFading(true);
    setTimeout(() => setActive(false), 320);
  };

  useEffect(() => {
    if (sessionStorage.getItem(INTRO_SESSION_KEY)) return;

    setActive(true);
    setVisibleCount(1);

    const timers: ReturnType<typeof setTimeout>[] = [];

    introLines.forEach((_, index) => {
      if (index === 0) return;
      timers.push(
        setTimeout(() => setVisibleCount((c) => Math.max(c, index + 1)), LINE_MS * index)
      );
    });

    timers.push(setTimeout(finish, FINISH_MS));
    timers.push(setTimeout(finish, 2800));

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!active) return null;

  return (
    <div
      className={`intro-overlay absolute inset-0 z-[70] bg-base flex items-center justify-center transition-opacity duration-300 ease-out ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-label="System intro"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Skip intro"
        onClick={finish}
      />
      <div className="relative z-10 w-full max-w-xl px-6 md:px-10 font-mono text-sm md:text-base pointer-events-none">
        {introLines.slice(0, visibleCount).map((line, index) => (
          <div
            key={line}
            className="leading-relaxed"
          >
            <span className="text-text-muted shrink-0 mr-2">›</span>
            <span className="text-text-primary">{line}</span>
          </div>
        ))}
        {visibleCount > 0 && (
          <div className="mt-3 text-accent-amber animate-blink text-sm">_</div>
        )}
      </div>
    </div>
  );
}
