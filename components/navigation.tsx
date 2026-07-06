'use client';

import { sections, type SectionId } from '@/lib/sections';
import { cn } from '@/lib/utils';

interface NavigationProps {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}

export default function Navigation({ active, onSelect }: NavigationProps) {
  return (
    <header className="shrink-0 z-20 bg-base/95 backdrop-blur-sm border-b border-border">
      <nav
        className="flex flex-wrap items-center justify-center sm:justify-start gap-x-0.5 px-2 md:px-3 py-1"
        aria-label="Main navigation"
      >
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            role="tab"
            aria-selected={active === section.id}
            onClick={() => onSelect(section.id)}
            className={cn(
              'main-nav-tab px-2.5 md:px-3 py-1.5 font-mono text-[11px] transition-all duration-200 ease-out border-b-2 -mb-px',
              active === section.id
                ? 'border-accent-amber text-text-primary'
                : 'border-transparent text-text-muted hover:text-text-secondary'
            )}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
