'use client';

import { useState, useEffect, useRef } from 'react';

type Phase = 'compile' | 'upload' | 'done' | 'verify';

const FILL_MS = 5200;
const EMPTY_MS = 4800;
const CYCLE_MS = FILL_MS + EMPTY_MS;

function getPhase(progress: number, filling: boolean): Phase {
  if (filling) {
    if (progress < 18) return 'compile';
    if (progress >= 99.5) return 'done';
    return 'upload';
  }
  return 'verify';
}

function getLabel(progress: number, filling: boolean): string {
  const pct = Math.round(progress);
  if (filling) {
    if (progress < 18) return 'Compiling sketch...';
    if (progress >= 99.5) return 'Done uploading.';
    return `Uploading... ${pct}%`;
  }
  return progress > 50 ? `Verifying... ${pct}%` : `Resetting... ${pct}%`;
}

const phaseClass: Record<Phase, string> = {
  compile: 'proc-status-neutral',
  upload: 'proc-status-amber',
  done: 'proc-status-green',
  verify: 'proc-status-neutral',
};

const fillClass: Record<Phase, string> = {
  compile: 'proc-progress-fill-neutral',
  upload: 'proc-progress-fill-amber',
  done: 'proc-progress-fill-green',
  verify: 'proc-progress-fill-neutral',
};

export default function ProcStatusBar() {
  const [progress, setProgress] = useState(0);
  const [filling, setFilling] = useState(true);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = (now - startRef.current) % CYCLE_MS;
      const isFilling = elapsed < FILL_MS;

      if (isFilling) {
        const t = elapsed / FILL_MS;
        setProgress(t * 100);
        setFilling(true);
      } else {
        const t = (elapsed - FILL_MS) / EMPTY_MS;
        setProgress(100 - t * 100);
        setFilling(false);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const phase = getPhase(progress, filling);
  const label = getLabel(progress, filling);

  return (
    <div className="proc-status-bar shrink-0" aria-live="off">
      <span className={`proc-status-text ${phaseClass[phase]}`}>{label}</span>
      <div className="proc-progress-track" aria-hidden="true">
        <div
          className={`proc-progress-fill ${fillClass[phase]}`}
          style={{ width: `${Math.max(2, progress)}%` }}
        />
      </div>
    </div>
  );
}
