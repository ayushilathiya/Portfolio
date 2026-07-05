'use client';

import { useState, useEffect, useRef } from 'react';

type Phase = 'compile' | 'upload' | 'error' | 'verify';

interface StatusStep {
  label: string;
  phase: Phase;
  progress: number;
}

/** Realistic avrdude upload loop — never completes */
const UPLOAD_SCRIPT: StatusStep[] = [
  { label: 'Compiling sketch...', phase: 'compile', progress: 6 },
  { label: 'Sketch uses 89% of program storage space', phase: 'compile', progress: 11 },
  { label: 'Sketch uses 42% of dynamic memory', phase: 'compile', progress: 14 },
  { label: 'Uploading...', phase: 'upload', progress: 22 },
  { label: 'Uploading... 34%', phase: 'upload', progress: 34 },
  { label: 'avrdude: stk500_recv(): programmer is not responding', phase: 'error', progress: 39 },
  { label: 'Retrying...', phase: 'upload', progress: 31 },
  { label: 'Uploading... 52%', phase: 'upload', progress: 52 },
  { label: 'Uploading... 67%', phase: 'upload', progress: 67 },
  { label: 'avrdude: verification error, first mismatch at byte 0x02', phase: 'error', progress: 71 },
  { label: 'Retrying upload...', phase: 'upload', progress: 48 },
  { label: 'Compiling sketch...', phase: 'compile', progress: 9 },
  { label: 'Global variables use 91% of dynamic memory', phase: 'compile', progress: 13 },
  { label: 'Uploading... 41%', phase: 'upload', progress: 41 },
  { label: 'avrdude: ser_open(): can\'t open device', phase: 'error', progress: 44 },
  { label: 'Retrying...', phase: 'upload', progress: 36 },
  { label: 'Uploading... 78%', phase: 'upload', progress: 78 },
  { label: 'avrdude: stk500_getsync(): not in sync', phase: 'error', progress: 82 },
  { label: 'Retrying upload...', phase: 'upload', progress: 55 },
  { label: 'Verifying... 61%', phase: 'verify', progress: 61 },
  { label: 'avrdude: verification error, first mismatch at byte 0x4A', phase: 'error', progress: 64 },
];

const phaseClass: Record<Phase, string> = {
  compile: 'proc-status-neutral',
  upload: 'proc-status-amber',
  error: 'proc-status-error',
  verify: 'proc-status-neutral',
};

const fillClass: Record<Phase, string> = {
  compile: 'proc-progress-fill-neutral',
  upload: 'proc-progress-fill-amber',
  error: 'proc-progress-fill-amber',
  verify: 'proc-progress-fill-neutral',
};

export default function ProcStatusBar() {
  const [stepIndex, setStepIndex] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const advance = () => {
      indexRef.current = (indexRef.current + 1) % UPLOAD_SCRIPT.length;
      setStepIndex(indexRef.current);
      const step = UPLOAD_SCRIPT[indexRef.current];
      const pause =
        step.phase === 'error'
          ? 900 + Math.floor(Math.random() * 400)
          : 420 + Math.floor(Math.random() * 480);
      timer = setTimeout(advance, pause);
    };

    timer = setTimeout(advance, 700);
    return () => clearTimeout(timer);
  }, []);

  const step = UPLOAD_SCRIPT[stepIndex];

  return (
    <div className="proc-status-bar shrink-0" aria-live="off">
      <span className={`proc-status-text ${phaseClass[step.phase]}`}>{step.label}</span>
      <div className="proc-progress-track" aria-hidden="true">
        <div
          className={`proc-progress-fill ${fillClass[step.phase]}`}
          style={{ width: `${Math.max(2, step.progress)}%` }}
        />
      </div>
    </div>
  );
}
