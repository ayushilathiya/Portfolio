'use client';

import { Github, Linkedin, FileText, FileDown } from 'lucide-react';
import { profile } from '@/data/profile';

const socialLinks = [
  { href: profile.social.github, label: 'GitHub', icon: Github },
  { href: profile.social.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: profile.social.hashnode, label: 'Hashnode', icon: FileText },
  { href: profile.social.resume, label: 'Resume', icon: FileDown },
];

export default function WindowTitleBar() {
  return (
    <div className="window-title-bar shrink-0 flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 border-b border-border-strong bg-panel">
      <div className="window-controls shrink-0 flex items-center gap-1" aria-hidden="true">
        <span className="window-control-dot" />
        <span className="window-control-dot" />
        <span className="window-control-dot" />
      </div>

      <div className="flex-1 min-w-0 font-mono text-[10px] md:text-[11px] text-text-muted truncate">
        <span className="text-text-secondary">portfolio.sys</span>
        <span className="mx-1.5 text-border-strong">·</span>
        <span>shell active</span>
      </div>

      <div className="shrink-0 flex items-center gap-1 md:gap-1.5">
        {socialLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="social-chrome-link p-1 text-text-muted hover:text-accent-amber transition-colors duration-200 ease-out"
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
          </a>
        ))}
      </div>
    </div>
  );
}
