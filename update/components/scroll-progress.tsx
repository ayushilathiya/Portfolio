'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const progress = scrollTop / scrollHeight;
      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-base z-40">
      {/* Progress fill with waveform-like gradient */}
      <div
        className="h-full bg-gradient-to-r from-amber via-amber to-amber-dim transition-all duration-100"
        style={{ width: `${progress * 100}%` }}
      />

      {/* Signal indicators */}
      <div className="absolute right-4 top-0 h-1 flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-1 h-1 rounded-full bg-amber transition-opacity duration-200 ${
              progress >= (i + 1) / 4 ? 'opacity-100' : 'opacity-30'
            }`}
          />
        ))}
      </div>

      {/* Amber glow at progress point */}
      <div
        className="absolute top-0 h-full w-2 shadow-amber-glow bg-amber"
        style={{ left: `${progress * 100}%` }}
      />
    </div>
  );
}
