'use client';

import { useState, useEffect } from 'react';

const STATUS_CYCLE = [
  'Compiling sketch...',
  'Uploading... 42%',
  'Uploading... 87%',
  'Done uploading.',
];

const STEP_MS = 2200;

export default function ProcStatusBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % STATUS_CYCLE.length);
    }, STEP_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="proc-status-bar shrink-0" aria-live="polite" aria-atomic="true">
      <span className="text-text-muted mr-2">›</span>
      <span className="text-text-secondary">{STATUS_CYCLE[index]}</span>
    </div>
  );
}
