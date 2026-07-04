'use client';

import { sections, type SectionId } from '@/lib/sections';
import { cn } from '@/lib/utils';

interface NavigationProps {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}

export default function Navigation({ active, onSelect }: NavigationProps) {
  return (
    <header className="shrink-0 border-b border-border bg-panel">
      <div className="flex items-center justify-between gap-4 px-3 md:px-5 py-2 md:py-3">
        <div className="shrink-0 hidden sm:block">
          <p className="font-mono text-[10px] text-text-muted tracking-widest">trace // kernel</p>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center sm:justify-end gap-x-1 gap-y-1 flex-1"
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
                'px-2.5 md:px-3 py-1.5 font-mono text-[11px] md:text-xs text-text-muted transition-all duration-200 ease-out border-b-2',
                active === section.id
                  ? 'border-accent-amber text-text-primary'
                  : 'border-transparent hover:text-text-secondary'
              )}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className="shrink-0 hidden md:flex items-center gap-1.5 font-mono text-[10px] text-text-muted">
          <div className="status-led status-led-online" aria-hidden="true" />
          <span>online</span>
        </div>
      </div>
    </header>
  );
}
