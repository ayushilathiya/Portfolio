'use client';

import { useState, useEffect, useCallback } from 'react';
import BootSequence from '@/components/boot-sequence';
import Navigation from '@/components/navigation';
import SectionPanel from '@/components/section-panel';
import ProcPanel from '@/components/proc-panel';
import Projects from '@/components/projects';
import DocsPanel from '@/components/docs-panel';
import Contact from '@/components/contact';
import HelpPanel from '@/components/help-panel';
import PageBackdropDecor from '@/components/page-backdrop-decor';
import WindowTitleBar from '@/components/window-title-bar';
import {
  SECTION_STORAGE_KEY,
  PROC_TAB_STORAGE_KEY,
  resolveSectionId,
  resolveProcTabId,
  type SectionId,
  type ProcTabId,
} from '@/lib/sections';

export default function AppShell() {
  const [activeSection, setActiveSection] = useState<SectionId>('proc');
  const [initialProcTab, setInitialProcTab] = useState<ProcTabId>('whoami');

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

  return (
    <div className="page-backdrop">
      <PageBackdropDecor />

      <div className="device-frame">
        <BootSequence />

        <WindowTitleBar />

        <div className="app-shell text-text-primary">
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

          <HelpPanel />
        </div>
      </div>
    </div>
  );
}
