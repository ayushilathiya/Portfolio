'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/data/profile';

export default function Hero() {
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffset((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const wavePath = `M0,20 Q${25 + waveOffset},5 50,20 T100,20`;
  const extendedPath = `${wavePath} T150,20 T200,20 T250,20 T300,20`;

  return (
    <section
      id="boot"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 md:px-12 pcb-bg"
    >
      {/* Status LED strip — boot log line */}
      <div className="absolute top-6 right-6 md:right-12 flex items-center gap-3 font-mono text-xs md:text-sm">
        <div className="status-led status-led-online" aria-hidden="true" />
        <span className="text-text-muted tracking-wider">
          [<span className="text-accent">boot</span>] SYSTEM: ONLINE
        </span>
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="font-mono text-sm md:text-base text-text-muted mb-4 tracking-wider lowercase">
          {profile.roleTag.toLowerCase()}
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-4">
          {profile.name}
        </h1>

        <div className="font-mono text-base md:text-lg text-accent mb-8 lowercase">
          {profile.title.toLowerCase()}
        </div>

        <p className="font-mono text-sm md:text-base text-text-muted max-w-2xl leading-relaxed">
          {profile.intro}
        </p>
      </div>

      {/* Faint ECG waveform — health-tech accent at section boundary */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden opacity-25 pointer-events-none">
        <svg
          viewBox="0 0 300 40"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ transform: 'translateX(-50%)' }}
          aria-hidden="true"
        >
          <path
            d={extendedPath}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Corner PCB trace decorations */}
      <svg
        className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 text-accent opacity-15 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0,30 L30,30 L30,0" stroke="currentColor" strokeWidth="1" />
        <circle cx="30" cy="30" r="3" fill="currentColor" />
      </svg>

      <svg
        className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 text-accent opacity-15 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path d="M100,70 L70,70 L70,100" stroke="currentColor" strokeWidth="1" />
        <circle cx="70" cy="70" r="3" fill="currentColor" />
      </svg>
    </section>
  );
}
