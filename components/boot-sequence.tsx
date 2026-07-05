'use client';

import { useState, useLayoutEffect, useRef } from 'react';

export const INTRO_SESSION_KEY = 'portfolio-intro-v3';

const introLines = [
  '[0.0001] power-on reset',
  '[0.0012] enumerating buses…',
  '[0.0024] device online — handshake ok',
];

const LINE_MS = 380;
const FINISH_MS = 1600;
const SAFETY_MS = 2200;

type IntroPhase = 'hidden' | 'playing' | 'fading';

interface BootSequenceProps {
  standalone?: boolean;
  onComplete?: () => void;
}

export default function BootSequence({ standalone = false, onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState<IntroPhase>('hidden');
  const [visibleCount, setVisibleCount] = useState(1);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {
      /* private mode */
    }
    setPhase('fading');
    setTimeout(() => {
      setPhase('hidden');
      onCompleteRef.current?.();
    }, 280);
  };

  useLayoutEffect(() => {
    if (!standalone) {
      let seen = false;
      try {
        seen = Boolean(sessionStorage.getItem(INTRO_SESSION_KEY));
      } catch {
        seen = false;
      }
      if (seen) return;
    }

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
  }, [standalone]);

  if (phase !== 'playing' && phase !== 'fading') return null;

  return (
    <div
      className={`intro-overlay flex items-center justify-center transition-opacity duration-300 ease-out pointer-events-none ${
        standalone ? 'fixed inset-0 z-[1]' : 'absolute inset-0 z-[70]'
      } ${phase === 'fading' ? 'opacity-0' : 'opacity-100'}`}
      role="status"
      aria-live="polite"
      aria-label="System intro"
    >
      {!standalone && (
        <div className="absolute inset-0 bg-base/92 pointer-events-none" aria-hidden="true" />
      )}

      <button
        type="button"
        className="absolute top-3 right-3 z-20 font-mono text-[10px] px-2 py-1 border border-border-strong text-text-muted hover:text-accent-amber pointer-events-auto"
        aria-label="Skip intro"
        onClick={finish}
      >
        skip
      </button>

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
