'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const HELP_LINES = [
  { type: 'tip', text: '/proc sidebar: /whoami → /bootloader → /runtime → /beacon → /dev. idle box stays lit at the bottom.' },
  { type: 'tip', text: 'top nav: /modules (projects), /docs (hashnode man pages), /uart (/tx only — links live in /proc devicesandports)' },
  { type: 'joke', text: 'ECG looks fine. SpO₂: 98%. caffeine register: underflow detected. please refill.' },
  { type: 'joke', text: 'if your car only turns left, you probably forgot to release the gesture mutex. classic ESP-NOW.' },
  { type: 'joke', text: 'Houston, the UI is nominal. the bug is in low Earth orbit somewhere between line 42 and pin 42.' },
  { type: 'joke', text: 'silicon lottery: you won the wafer. the website is the bonus die that actually booted.' },
  { type: 'joke', text: 'watchdog timer armed. if you stare at /dev too long, it assumes you are debugging and leaves you alone.' },
  { type: 'joke', text: 'health tech tip: this portfolio cannot diagnose arrhythmia. your cardiologist can. probably.' },
];

export default function HelpPanel({ variant = 'floating' }: { variant?: 'floating' | 'titlebar' }) {
  const [open, setOpen] = useState(false);
  const [showBugForm, setShowBugForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleBugSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!email || !message) {
      setError('email and description required');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_KEY}`,
        {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      setError('uplink failed — retry or ping /uart instead');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
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
                <pre className="text-text-muted whitespace-pre-wrap leading-relaxed mb-4">
{`HELP(1)                    portfolio.sys                    HELP(1)

NAME
       help — navigation, domain humor, fault reporting

SYNOPSIS
       help [--fault]

DESCRIPTION`}
                </pre>

                <div className="space-y-2 mb-4 pl-2 border-l border-border-strong">
                  {HELP_LINES.map((line, i) => (
                    <p key={i} className="text-text-secondary leading-relaxed">
                      <span className="text-text-muted mr-2">{line.type === 'tip' ? '→' : '~'}</span>
                      {line.text}
                    </p>
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
                    FAULT: unexpected behavior on bus
                  </p>
                  <p className="text-text-muted mt-1 text-[10px]">
                    same uplink as /uart — describe what broke
                  </p>
                </div>

                <form onSubmit={handleBugSubmit} className="space-y-3">
                  <input type="hidden" name="_subject" value="Fault report — portfolio.sys" />

                  <div>
                    <label className="block text-[10px] text-text-muted mb-1">email</label>
                    <Input
                      type="email"
                      name="email"
                      required
                      disabled={isSubmitting}
                      className="bg-base border-border text-text-primary focus-visible:ring-accent-amber font-mono text-xs h-8"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-text-muted mb-1">what happened?</label>
                    <Textarea
                      name="message"
                      required
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                      className="flex-1 bg-transparent border border-border-strong hover:border-accent-amber hover:text-accent-amber font-mono text-xs h-8 transition-colors duration-200 ease-out"
                    >
                      {isSubmitting ? 'tx…' : 'submit log'}
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4 space-y-2">
                <p className="text-text-primary">log stored in non-volatile memory</p>
                <p className="text-text-muted text-[10px]">thanks — will probe on the bench</p>
                <Button
                  type="button"
                  onClick={close}
                  className="mt-2 bg-transparent border border-border-strong font-mono text-xs h-8"
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
