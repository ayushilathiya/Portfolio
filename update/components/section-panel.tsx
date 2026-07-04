'use client';

import { cn } from '@/lib/utils';

interface SectionPanelProps {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function SectionPanel({ isActive, children, className }: SectionPanelProps) {
  return (
    <div
      role="tabpanel"
      aria-hidden={!isActive}
      className={cn(
        'absolute inset-0 transition-all duration-200 ease-out',
        isActive
          ? 'opacity-100 translate-x-0 pointer-events-auto z-10'
          : 'opacity-0 translate-x-1 pointer-events-none z-0',
        className
      )}
    >
      <div className="panel-viewport h-full">{children}</div>
    </div>
  );
}
