"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const sections = ['About', 'Projects', 'Blog', 'Experience', 'Resume', 'Contact'];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-bold text-navy-600">Portfolio</span>
          <div className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                className={cn(
                  "text-navy-600 hover:text-navy-800 transition-colors",
                  activeSection === section.toLowerCase() && "font-bold"
                )}
              >
                {section}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}