'use client';

import { Github, Linkedin, ExternalLink, FileText } from 'lucide-react';
import { profile } from '@/data/profile';

export default function Contact() {
  const channels = [
    {
      icon: Github,
      label: 'github',
      display: 'github.com/ayushilathiya',
      href: profile.social.github,
    },
    {
      icon: Linkedin,
      label: 'linkedin',
      display: 'linkedin.com/in/ayushilathiya',
      href: profile.social.linkedin,
    },
    {
      icon: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className ?? 'w-4 h-4'} fill="currentColor">
          <path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z" />
        </svg>
      ),
      label: 'hashnode',
      display: 'ayushilathiya.hashnode.dev',
      href: profile.social.hashnode,
    },
    {
      icon: FileText,
      label: 'resume',
      display: 'Ayushi_Lathiya_CV.pdf',
      href: profile.social.resume,
    },
  ];

  return (
    <section id="uart" className="py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-header">/uart</h2>

        <div className="panel p-6 md:p-8">
          <div className="font-mono mb-6 text-sm">
            <span className="text-accent">{'>'}</span>
            <span className="text-text-primary ml-2">connect --with ayushi</span>
          </div>

          <div className="font-mono text-sm space-y-4">
            <div className="border-l-2 border-accent/50 pl-4">
              <span className="text-text-muted">/* uart handshake — available channels */</span>
            </div>

            <div className="space-y-2 pl-4">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.label === 'resume' ? undefined : '_blank'}
                  rel={channel.label === 'resume' ? undefined : 'noopener noreferrer'}
                  download={channel.label === 'resume' ? true : undefined}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 text-text-muted hover:text-accent transition-colors duration-200 ease-out group py-1"
                >
                  <channel.icon className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-text-primary">{channel.label}</span>
                  <span className="text-accent">=</span>
                  <span className="text-accent break-all">{channel.display}</span>
                  {channel.label !== 'resume' && (
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  )}
                </a>
              ))}
            </div>

            <div className="border-l-2 border-accent/50 pl-4 mt-6">
              <span className="text-text-muted">/* {profile.footerNote} */</span>
            </div>
          </div>

          <div className="font-mono mt-6 flex items-center gap-2">
            <span className="text-accent">{'>'}</span>
            <span className="w-2 h-4 bg-accent animate-blink" />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="font-mono text-xs text-text-muted lowercase">
            [ trace // kernel v1.0 ] — © {new Date().getFullYear()} ayushi lathiya
          </p>
        </div>
      </div>
    </section>
  );
}
