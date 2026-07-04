'use client';

import { useState, useEffect } from 'react';

const sections = [
  { id: 'about', label: 'ABOUT', hex: '0x00' },
  { id: 'skills', label: 'STACK', hex: '0x01' },
  { id: 'projects', label: 'PROJECTS', hex: '0x02' },
  { id: 'experience', label: 'LOG', hex: '0x03' },
  { id: 'contact', label: 'CONNECT', hex: '0x04' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);

      // Determine active section
      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
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
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="panel px-1 py-1 flex items-center gap-0.5">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`px-3 py-1.5 font-mono text-xs tracking-wider transition-all duration-200 rounded-sm ${
              activeSection === section.id
                ? 'bg-amber/20 text-amber'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {section.hex} // {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
