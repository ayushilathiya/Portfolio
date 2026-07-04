'use client';

import { useState, useEffect } from 'react';
import { sections } from '@/lib/sections';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-200 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="panel px-1 py-1 flex items-center gap-0.5 overflow-x-auto scrollbar-hide max-w-[95vw]">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`px-2 md:px-3 py-1.5 font-mono text-[10px] md:text-xs tracking-wider transition-all duration-200 ease-out rounded-sm whitespace-nowrap ${
              activeSection === section.id
                ? 'bg-accent/20 text-accent'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
