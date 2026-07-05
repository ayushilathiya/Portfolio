'use client';

import { useState, useLayoutEffect, useRef } from 'react';

/** Bump version to replay intro after boot/interaction fixes */
export const INTRO_SESSION_KEY = 'portfolio-intro-v2';

const introLines = [
  '[0.0001] power-on reset',
  '[0.0012] enumerating buses…',
  '[0.0024] device online — handshake ok',
];

const LINE_MS = 380;
const FINISH_MS = 1600;
const SAFETY_MS = 2600;

type IntroPhase = 'hidden' | 'playing' | 'fading';

export default function BootSequence() {
  const [phase, setPhase] = useState<IntroPhase>('hidden');
  const [visibleCount, setVisibleCount] = useState(1);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {
      /* private mode — still dismiss overlay */
    }
    setPhase('fading');
    setTimeout(() => setPhase('hidden'), 320);
  };

  useLayoutEffect(() => {
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem(INTRO_SESSION_KEY));
    } catch {
      seen = false;
    }
    if (seen) return;

    doneRef.current = false;
    setPhase('playing');
    setVisibleCount(1);

    const timers: Array<ReturnType<typeof setTimeout>> = [];

    introLines.forEach((_, index) => {
      if (index === 0) return;
      timers.push(
        setTimeout(() => setVisibleCount((c) => Math.max(c, index + 1)), LINE_MS * index)
      );
    });

    timers.push(setTimeout(finish, FINISH_MS));
    timers.push(setTimeout(finish, SAFETY_MS));

    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase !== 'playing' && phase !== 'fading') return null;

  return (
    <div
      className={`intro-overlay absolute inset-0 z-[70] bg-base flex items-center justify-center transition-opacity duration-300 ease-out ${
        phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-label="System intro"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default z-0"
        aria-label="Skip intro"
        onClick={finish}
      />
      <div className="relative z-10 w-full max-w-xl px-6 md:px-10 font-mono text-sm md:text-base pointer-events-none">
        {introLines.slice(0, visibleCount).map((line) => (
          <div key={line} className="leading-relaxed">
            <span className="text-text-muted shrink-0 mr-2">›</span>
            <span className="text-text-primary">{line}</span>
          </div>
        ))}
        <div className="mt-3 text-accent-amber animate-blink text-sm">_</div>
      </div>
    </div>
  );
}
