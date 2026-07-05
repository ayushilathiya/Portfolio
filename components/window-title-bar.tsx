'use client';

import HelpPanel from '@/components/help-panel';

export default function WindowTitleBar() {
  return (
    <div className="window-title-bar shrink-0 flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 border-b border-border-strong bg-panel">
      <div className="window-controls shrink-0 flex items-center gap-1" aria-hidden="true">
        <span className="window-control-dot" />
        <span className="window-control-dot" />
        <span className="window-control-dot" />
      </div>

      <div className="min-w-0 flex-1 font-mono text-[10px] md:text-[11px] text-text-muted truncate">
        <span className="text-text-secondary">portfolio.sys</span>
        <span className="mx-1.5 text-border-strong">·</span>
        <span>shell active</span>
      </div>

      <HelpPanel variant="titlebar" />
    </div>
  );
}
