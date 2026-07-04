'use client';

import { profile } from '@/data/profile';

export default function Hero() {
  return (
    <div className="panel-content pcb-bg relative overflow-hidden">
      <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 font-mono text-xs">
        <div className="status-led status-led-online" aria-hidden="true" />
        <span className="text-text-muted tracking-wider">
          [<span className="text-accent">boot</span>] SYSTEM: ONLINE
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-3xl relative z-10">
        <p className="font-mono text-xs md:text-sm text-text-muted mb-3 tracking-wider lowercase">
          {profile.roleTag.toLowerCase()}
        </p>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-3">
          {profile.name}
        </h1>

        <p className="font-mono text-sm md:text-base text-accent mb-4 lowercase">
          {profile.title.toLowerCase()}
        </p>

        <p className="font-mono text-xs md:text-sm text-text-muted max-w-xl leading-relaxed">
          {profile.intro}
        </p>
      </div>

      <svg
        className="absolute bottom-4 left-4 w-20 h-20 text-accent opacity-10 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0,30 L30,30 L30,0" stroke="currentColor" strokeWidth="1" />
        <circle cx="30" cy="30" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}
