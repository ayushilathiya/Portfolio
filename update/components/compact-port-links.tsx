'use client';

import { Github, Linkedin, FileText } from 'lucide-react';
import { profile } from '@/data/profile';
import PathLabel from '@/components/path-label';

const devices = [
  { id: 'dev0', label: 'github', href: profile.social.github, icon: Github },
  { id: 'dev1', label: 'linkedin', href: profile.social.linkedin, icon: Linkedin },
];

const ports = [
  { id: 'port0', label: 'hashnode', href: profile.social.hashnode, icon: FileText },
];

export default function CompactPortLinks() {
  return (
    <div className="content-stack-section proc-port-section shrink-0 py-2 px-4 md:px-5">
      <PathLabel name="devicesandports" className="mb-2 text-xs" />
      <div className="flex flex-wrap gap-1.5">
        {devices.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="device-port-card device-port-card-sm"
          >
            <link.icon className="w-3 h-3 shrink-0 text-text-muted" strokeWidth={1.5} />
            <div className="min-w-0">
              <span className="block font-mono text-[9px] text-text-muted">{link.id}</span>
              <span className="block font-mono text-[11px] text-text-primary truncate">{link.label}</span>
            </div>
          </a>
        ))}
        {ports.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="device-port-card device-port-card-sm"
          >
            <link.icon className="w-3 h-3 shrink-0 text-text-muted" strokeWidth={1.5} />
            <div className="min-w-0">
              <span className="block font-mono text-[9px] text-text-muted">{link.id}</span>
              <span className="block font-mono text-[11px] text-text-primary truncate">{link.label}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
