'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const HELP_COMMANDS = [
  { cmd: '/proc', desc: 'main process page: profile, education, work, contributions, skills' },
  { cmd: '/whoami', desc: 'would love to know actually, who even am I?' },
  { cmd: '/bootloader', desc: 'education record & curriculum modules' },
  { cmd: '/runtime', desc: 'work log and roles held' },
  { cmd: '/beacon', desc: 'achievements and roles held' },
  { cmd: '/dev', desc: 'skill pin map across embedded, vlsi, iot, software' },
  { cmd: '/modules', desc: 'project modules (more to come hopefully)' },
  { cmd: '/docs', desc: 'blogs I (claude, mostly) wrote for my projects (hashnode posts)' },
  { cmd: '/uart', desc: 'csend a message via formspree uplink (contact me)' },
  { cmd: 'help', desc: 'you found it already, so.' },
];

const FAULT_CONFIRMATION =
  "Signal analysis complete: Oh no no, that's a feature, not a bug! Terminating thread, thanks bye!";

export default function HelpPanel({ variant = 'floating' }: { variant?: 'floating' | 'titlebar' }) {
  const [open, setOpen] = useState(false);
  const [showBugForm, setShowBugForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleBugSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!email || !message) {
      setError('email and description required');
      return;
    }

    setIsSubmitted(true);
    form.reset();
  }

  function close() {
    setOpen(false);
    setShowBugForm(false);
    setIsSubmitted(false);
    setError('');
  }

  const triggerClass =
    variant === 'titlebar'
      ? 'shrink-0 font-mono text-[10px] md:text-[11px] px-2 py-1 border border-border-strong bg-base text-text-muted hover:text-accent-amber hover:border-accent-amber transition-colors duration-200 ease-out rounded-sm'
      : 'absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 font-mono text-xs px-2.5 py-1.5 border border-border-strong bg-panel text-text-muted hover:text-accent-amber hover:border-accent-amber transition-colors duration-200 ease-out rounded-sm';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClass}
        aria-label="Open help"
      >
        [?] help
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70"
          role="dialog"
          aria-modal="true"
          aria-label="Help"
          onClick={close}
        >
          <div
            className="panel-box w-full max-w-md max-h-[85vh] overflow-y-auto p-4 md:p-5 font-mono text-xs relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-3 right-3 text-text-muted hover:text-accent-amber transition-colors duration-200"
              aria-label="Close"
            >
              ✕
            </button>

            {!showBugForm ? (
              <>
                <div className="space-y-1.5 mb-4">
                  <p className="text-[10px] text-text-muted uppercase tracking-wide mb-2">commands</p>
                  {HELP_COMMANDS.map((item) => (
                    <div
                      key={item.cmd}
                      className="flex gap-3 py-1 border-b border-border-strong last:border-0 font-mono text-[11px] leading-snug"
                    >
                      <span className="text-accent-amber shrink-0 min-w-[5.5rem]">{item.cmd}</span>
                      <span className="text-text-secondary">{item.desc}</span>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  onClick={() => setShowBugForm(true)}
                  className="w-full bg-transparent border border-border-strong text-text-primary hover:border-accent-amber hover:text-accent-amber font-mono text-xs h-9 transition-colors duration-200 ease-out"
                >
                  file fault report (soft panic)
                </Button>
              </>
            ) : !isSubmitted ? (
              <>
                <div className="mb-4 pb-3 border-b border-border-strong">
                  <p className="text-text-primary font-mono text-[11px] tracking-wide">
                    Signal analysis
                  </p>
                  <p className="text-text-muted mt-1 text-[10px]">
                    describe the anomaly — report goes to the bit bucket, not an inbox
                  </p>
                </div>

                <form onSubmit={handleBugSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-text-muted mb-1">email</label>
                    <Input
                      type="email"
                      name="email"
                      required
                      className="bg-base border-border text-text-primary focus-visible:ring-accent-amber font-mono text-xs h-8"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-text-muted mb-1">what happened?</label>
                    <Textarea
                      name="message"
                      required
                      placeholder="expected: amber underline. actual: existential dread."
                      className="min-h-[80px] bg-base border-border text-text-primary focus-visible:ring-accent-amber font-mono text-xs"
                    />
                  </div>

                  {error && <p className="text-[10px] text-text-secondary text-center">{error}</p>}

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={() => setShowBugForm(false)}
                      className="flex-1 bg-transparent border border-border text-text-muted font-mono text-xs h-8"
                    >
                      back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-accent-amber/15 border border-accent-amber text-accent-amber hover:bg-accent-amber/25 font-mono text-xs h-8 transition-colors duration-200 ease-out"
                    >
                      submit log
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4 space-y-3">
                <p className="text-text-primary text-[11px] leading-relaxed">{FAULT_CONFIRMATION}</p>
                <Button
                  type="button"
                  onClick={close}
                  className="mt-2 bg-transparent border border-border-strong text-text-secondary hover:border-accent-amber hover:text-accent-amber font-mono text-xs h-8"
                >
                  close
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
