'use client';

import { useState, useEffect, useCallback } from 'react';
import BootSequence from '@/components/boot-sequence';
import Navigation from '@/components/navigation';
import SectionPanel from '@/components/section-panel';
import ProcPanel from '@/components/proc-panel';
import Projects from '@/components/projects';
import DocsPanel from '@/components/docs-panel';
import Contact from '@/components/contact';
import {
  SECTION_STORAGE_KEY,
  PROC_TAB_STORAGE_KEY,
  resolveSectionId,
  resolveProcTabId,
  type SectionId,
  type ProcTabId,
} from '@/lib/sections';

export default function AppShell() {
  const [bootComplete, setBootComplete] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('proc');
  const [initialProcTab, setInitialProcTab] = useState<ProcTabId>('about');

  useEffect(() => {
    const storedSection = sessionStorage.getItem(SECTION_STORAGE_KEY);
    const storedProcTab = sessionStorage.getItem(PROC_TAB_STORAGE_KEY);

    if (storedSection) {
      const resolved = resolveSectionId(storedSection);
      if (resolved) setActiveSection(resolved);
      sessionStorage.removeItem(SECTION_STORAGE_KEY);
    }

    if (storedProcTab) {
      const resolvedTab = resolveProcTabId(storedProcTab);
      if (resolvedTab) setInitialProcTab(resolvedTab);
      sessionStorage.removeItem(PROC_TAB_STORAGE_KEY);
    }
  }, []);

  const selectSection = useCallback((id: SectionId) => {
    setActiveSection(id);
  }, []);

  const handleBootComplete = useCallback(() => setBootComplete(true), []);

  return (
    <div className="app-shell bg-base text-text-primary">
      <BootSequence onComplete={handleBootComplete} />

      <div
        className={`h-full flex flex-col transition-opacity duration-200 ease-out ${
          bootComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Navigation active={activeSection} onSelect={selectSection} />

        <main className="flex-1 relative min-h-0 min-w-0">
          <SectionPanel isActive={activeSection === 'proc'}>
            <ProcPanel initialTab={initialProcTab} />
          </SectionPanel>
          <SectionPanel isActive={activeSection === 'modules'}>
            <Projects />
          </SectionPanel>
          <SectionPanel isActive={activeSection === 'docs'}>
            <DocsPanel />
          </SectionPanel>
          <SectionPanel isActive={activeSection === 'uart'}>
            <Contact />
          </SectionPanel>
        </main>
      </div>
    </div>
  );
}
