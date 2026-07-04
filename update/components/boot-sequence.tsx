'use client';

import { useState, useEffect, useRef } from 'react';

const bootLines = [
  { text: '[ 0.0021 ] portfolio.sys — power-on reset' },
  { text: '[ 0.0342 ] loading: embedded.ko vlsi.ko iot.ko' },
  { text: '[ 0.0589 ] mounting /proc/ayushi…' },
  { text: '[ 0.0842 ] probe: device tree — all nodes ok' },
  { text: '[ 0.1100 ] link up: github · linkedin enumerated' },
  { text: '[ 0.1300 ] shell ready — welcome' },
];

const BOOT_MS = 1800;
const FAILSAFE_MS = 3500;

export default function BootSequence({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [visibleCount, setVisibleCount] = useState(1);
  const [dismissed, setDismissed] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setDismissed(true);
    onComplete?.();
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((_, index) => {
      if (index === 0) return;
      timers.push(
        setTimeout(() => {
          setVisibleCount((c) => Math.max(c, index + 1));
        }, 280 * index)
      );
    });

    timers.push(setTimeout(finish, BOOT_MS));
    timers.push(setTimeout(finish, FAILSAFE_MS));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (dismissed) return null;

  return (
    <div
      className="absolute inset-0 z-50 bg-base flex items-center justify-center transition-opacity duration-300 ease-out"
      role="status"
      aria-live="polite"
      aria-label="System boot"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Skip boot"
        onClick={finish}
      />
      <div className="relative z-10 w-full max-w-2xl px-6 md:px-12 font-mono text-sm md:text-base pointer-events-none">
        {bootLines.slice(0, visibleCount).map((line, index) => {
          const bracketEnd = line.text.indexOf(']');
          const stamp = line.text.slice(0, bracketEnd + 1);
          const rest = line.text.slice(bracketEnd + 1);
          return (
            <div key={index} className="leading-relaxed">
              <span className="text-accent-amber">{stamp}</span>
              <span className="text-text-primary ml-1">{rest}</span>
            </div>
          );
        })}
        <div className="mt-4 text-accent-amber animate-blink">_</div>
        <p className="mt-6 text-[10px] text-text-muted pointer-events-auto">
          <button type="button" onClick={finish} className="hover:text-accent-amber underline-offset-2 hover:underline">
            skip →
          </button>
        </p>
      </div>
    </div>
  );
}
