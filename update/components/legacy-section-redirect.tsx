'use client';

import { useEffect } from 'react';
import type { SectionId } from '@/lib/sections';

export default function LegacySectionRedirect({ target }: { target: SectionId }) {
  useEffect(() => {
    window.location.replace(`/#${target}`);
  }, [target]);

  return (
    <div className="min-h-screen bg-base flex items-center justify-center font-mono text-sm text-text-muted">
      <span className="text-accent">&gt;</span>
      <span className="ml-2">redirecting to /{target === 'dmesg' ? 'dmesg' : target}...</span>
    </div>
  );
}
