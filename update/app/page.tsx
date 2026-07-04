'use client';

import { useState } from 'react';
import BootSequence from '@/components/boot-sequence';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Experience from '@/components/experience';
import Contact from '@/components/contact';
import ScrollProgress from '@/components/scroll-progress';
import Navigation from '@/components/navigation';

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <main className="min-h-screen bg-base grid-bg relative">
      {/* Boot sequence overlay */}
      <BootSequence onComplete={() => setBootComplete(true)} />

      {/* Scroll progress */}
      <ScrollProgress />

      {/* Floating navigation */}
      <Navigation />

      {/* Main content */}
      <div
        className={`transition-opacity duration-700 ${
          bootComplete ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Hero section */}
        <Hero />

        {/* Content sections */}
        <div className="relative">
          {/* Background trace decoration */}
          <svg
            className="fixed left-8 top-1/4 bottom-1/4 w-16 h-auto pointer-events-none opacity-10 hidden lg:block"
            viewBox="0 0 64 400"
            fill="none"
            preserveAspectRatio="none"
          >
            <line x1="32" y1="0" x2="32" y2="400" stroke="#ffb020" strokeWidth="0.5" />
            <circle cx="32" cy="100" r="4" stroke="#ffb020" strokeWidth="0.5" fill="none" />
            <circle cx="32" cy="200" r="4" stroke="#ffb020" strokeWidth="0.5" fill="none" />
            <circle cx="32" cy="300" r="4" stroke="#ffb020" strokeWidth="0.5" fill="none" />
          </svg>

          {/* Sections */}
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </div>
    </main>
  );
}
