'use client';

import { useState, useEffect, useRef } from 'react';

type Phase = 'compile' | 'upload' | 'done' | 'verify';

/** Semi-random flickering sequence — not a smooth sweep */
const JUMP_SEQUENCE = [12, 47, 33, 81, 26, 94, 8, 61, 39, 88, 15, 72, 97, 4, 55, 68, 22, 91, 37, 76];

function getPhase(pct: number): Phase {
  if (pct >= 92) return 'done';
  if (pct >= 25) return 'upload';
  if (pct < 15) return 'compile';
  return 'verify';
}

function getLabel(pct: number, prevPct: number): string {
  if (pct >= 92) return 'Done uploading.';
  if (pct >= 25) return `Uploading... ${pct}%`;
  if (pct < 15 && prevPct >= 90) return 'Resetting...';
  if (pct < 25 && prevPct > pct) return `Verifying... ${pct}%`;
  return 'Compiling sketch...';
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
  const [progress, setProgress] = useState(JUMP_SEQUENCE[0]);
  const [prevProgress, setPrevProgress] = useState(JUMP_SEQUENCE[0]);
  const indexRef = useRef(0);
  const prevRef = useRef(JUMP_SEQUENCE[0]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const jump = () => {
      indexRef.current = (indexRef.current + 1) % JUMP_SEQUENCE.length;
      const next = JUMP_SEQUENCE[indexRef.current];
      setPrevProgress(prevRef.current);
      prevRef.current = next;
      setProgress(next);
      const pause = 380 + Math.floor(Math.random() * 520);
      timer = setTimeout(jump, pause);
    };

    timer = setTimeout(jump, 600);
    return () => clearTimeout(timer);
  }, []);

  const phase = getPhase(progress);
  const label = getLabel(progress, prevProgress);

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
