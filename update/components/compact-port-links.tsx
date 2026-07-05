'use client';

import { Github, Linkedin, FileText, FileDown } from 'lucide-react';
import { profile } from '@/data/profile';
import PathLabel from '@/components/path-label';

const portLinks = [
  { id: 'dev0', label: 'github', href: profile.social.github, icon: Github },
  { id: 'dev1', label: 'linkedin', href: profile.social.linkedin, icon: Linkedin },
  { id: 'dev2', label: 'hashnode', href: profile.social.hashnode, icon: FileText },
  { id: 'dev3', label: 'resume', href: profile.social.resume, icon: FileDown },
];

export default function CompactPortLinks() {
  return (
    <div className="content-stack-section py-2 px-3">
      <PathLabel name="port_map" className="mb-2" />
      <div className="flex flex-wrap gap-1.5">
        {portLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="compact-port-link"
          >
            <link.icon className="w-3 h-3 shrink-0 text-text-muted" strokeWidth={1.5} />
            <span className="text-[9px] text-text-muted">{link.id}</span>
            <span className="text-[10px] text-text-primary">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
