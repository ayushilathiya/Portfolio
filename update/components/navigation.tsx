'use client';

import { sections, type SectionId } from '@/lib/sections';
import { cn } from '@/lib/utils';

interface NavigationProps {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}

export default function Navigation({ active, onSelect }: NavigationProps) {
  return (
    <header className="shrink-0 z-20 bg-base/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 px-3 md:px-5 py-2 border-b border-border">
        <div className="shrink-0 font-mono text-[10px] text-text-muted hidden sm:block">
          <span className="text-text-secondary">portfolio.sys</span>
          <span className="mx-1.5 text-border-strong">·</span>
          <span>shell active</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-x-0.5 flex-1" aria-label="Main navigation">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              role="tab"
              aria-selected={active === section.id}
              onClick={() => onSelect(section.id)}
              className={cn(
                'px-2.5 md:px-3 py-1.5 font-mono text-[11px] md:text-xs transition-all duration-200 ease-out border-b-2 -mb-px',
                active === section.id
                  ? 'border-accent-amber text-text-primary'
                  : 'border-transparent text-text-muted hover:text-text-secondary'
              )}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
