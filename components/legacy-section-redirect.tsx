'use client';

import { useEffect } from 'react';
import type { SectionId, ProcTabId } from '@/lib/sections';
import { SECTION_STORAGE_KEY, PROC_TAB_STORAGE_KEY, resolveProcTabId } from '@/lib/sections';

interface LegacyRedirectProps {
  target: SectionId;
  procTab?: ProcTabId | string;
}

export default function LegacySectionRedirect({ target, procTab }: LegacyRedirectProps) {
  useEffect(() => {
    sessionStorage.setItem(SECTION_STORAGE_KEY, target);
    if (procTab) {
      const resolved = resolveProcTabId(procTab) ?? (procTab as ProcTabId);
      sessionStorage.setItem(PROC_TAB_STORAGE_KEY, resolved);
    }
    window.location.replace('/');
  }, [target, procTab]);

  return (
    <div className="h-[100dvh] bg-base flex items-center justify-center font-mono text-sm text-text-muted">
      <span className="text-accent-amber">&gt;</span>
      <span className="ml-2">redirecting…</span>
    </div>
  );
}
