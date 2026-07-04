'use client';

import { useState, useEffect } from 'react';

const bootLines = [
  { text: '[ 0.0021 ] initializing kernel...', delay: 0 },
  { text: '[ 0.0342 ] loading modules: embedded.ko vlsi.ko', delay: 400 },
  { text: '[ 0.0589 ] mounting /ayushi...', delay: 700 },
  { text: '[ 0.0842 ] probe: silicon.status = VERIFIED', delay: 1000 },
  { text: '[ 0.1100 ] trace: signal locked', delay: 1300 },
  { text: '[ 0.1300 ] system: ONLINE // ready', delay: 1600 },
];

export default function BootSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    bootLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
      }, line.delay);
    });

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 500);
    }, 2200);

    return () => clearTimeout(completeTimer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-base grid-bg flex items-center justify-center transition-opacity duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-2xl px-6 md:px-12 font-mono text-sm md:text-base">
        {bootLines.map((line, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ${
              visibleLines.includes(index)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <span className="text-amber">{line.text.split(']')[0]}]</span>
            <span className="text-text-primary ml-1">
              {line.text.split(']')[1]}
            </span>
          </div>
        ))}
        {visibleLines.length === bootLines.length && (
          <div className="mt-4 text-amber animate-blink">
            _
          </div>
        )}
      </div>
    </div>
  );
}
