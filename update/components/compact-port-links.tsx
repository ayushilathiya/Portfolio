'use client';

import { Github, Linkedin, FileText, FileDown } from 'lucide-react';
import { profile } from '@/data/profile';
import PathLabel from '@/components/path-label';

const devices = [
  { id: 'dev0', label: 'github', href: profile.social.github, icon: Github },
  { id: 'dev1', label: 'linkedin', href: profile.social.linkedin, icon: Linkedin },
  { id: 'dev2', label: 'resume', href: profile.social.resume, icon: FileDown },
];

const port = {
  id: 'port0',
  label: 'hashnode',
  href: profile.social.hashnode,
  icon: FileText,
};

export default function CompactPortLinks() {
  return (
    <div className="content-stack-section proc-port-section shrink-0 py-4 px-4 md:py-5 md:px-5">
      <PathLabel name="devicesandports" className="mb-3 text-sm" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 md:gap-3 mb-3">
        {devices.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="device-port-card"
          >
            <link.icon className="w-4 h-4 shrink-0 text-text-muted" strokeWidth={1.5} />
            <div className="min-w-0">
              <span className="block font-mono text-[10px] text-text-muted">{link.id}</span>
              <span className="block font-mono text-sm text-text-primary truncate">{link.label}</span>
            </div>
          </a>
        ))}
      </div>
      <a
        href={port.href}
        target="_blank"
        rel="noopener noreferrer"
        className="device-port-card device-port-card-wide"
      >
        <port.icon className="w-4 h-4 shrink-0 text-text-muted" strokeWidth={1.5} />
        <div className="min-w-0">
          <span className="block font-mono text-[10px] text-text-muted">{port.id}</span>
          <span className="block font-mono text-sm text-text-primary truncate">{port.label}</span>
        </div>
      </a>
    </div>
  );
}
