'use client';

import { useState, useEffect, useCallback } from 'react';

type StatusPhase = 'compile' | 'upload' | 'done';

interface StatusStep {
  text: string;
  phase: StatusPhase;
  durationMs: number;
}

const STATUS_CYCLE: StatusStep[] = [
  { text: 'Compiling sketch...', phase: 'compile', durationMs: 2200 },
  { text: 'Uploading... 23%', phase: 'upload', durationMs: 1800 },
  { text: 'Uploading... 67%', phase: 'upload', durationMs: 1800 },
  { text: 'Uploading... 100%', phase: 'upload', durationMs: 1800 },
  { text: 'Done uploading.', phase: 'done', durationMs: 1400 },
];

const phaseClass: Record<StatusPhase, string> = {
  compile: 'proc-status-neutral',
  upload: 'proc-status-amber',
  done: 'proc-status-green',
};

export default function ProcStatusBar() {
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % STATUS_CYCLE.length);
  }, []);

  useEffect(() => {
    const step = STATUS_CYCLE[index];
    const timer = setTimeout(advance, step.durationMs);
    return () => clearTimeout(timer);
  }, [index, advance]);

  const step = STATUS_CYCLE[index];

  return (
    <div className="proc-status-bar shrink-0" aria-live="polite" aria-atomic="true">
      <span className={`proc-status-led ${phaseClass[step.phase]}`} aria-hidden="true" />
      <span className={`${phaseClass[step.phase]} transition-colors duration-300`}>{step.text}</span>
    </div>
  );
}
