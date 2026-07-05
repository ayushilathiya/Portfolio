'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const HELP_COMMANDS = [
  { cmd: '/proc', desc: 'main process panel — profile, education, work, achievements, skills' },
  { cmd: '/whoami', desc: 'identity, register map, devices & ports' },
  { cmd: '/bootloader', desc: 'education record & curriculum modules' },
  { cmd: '/runtime', desc: 'work log & positions of responsibility' },
  { cmd: '/beacon', desc: 'achievements & project broadcasts' },
  { cmd: '/dev', desc: 'skill pin map — embedded, vlsi, iot, software' },
  { cmd: '/modules', desc: 'project module index' },
  { cmd: '/docs', desc: 'local blog man pages (hashnode posts)' },
  { cmd: '/uart', desc: 'contact transmit form (/tx)' },
  { cmd: '/tx', desc: 'send a message via formspree uplink' },
  { cmd: 'help', desc: 'this reference — navigation & fault reporting' },
];

const HELP_LINES = [
  { type: 'joke', text: 'ECG looks fine. SpO₂: 98%. caffeine register: underflow detected. please refill.' },
  { type: 'joke', text: 'if your car only turns left, you probably forgot to release the gesture mutex. classic ESP-NOW.' },
  { type: 'joke', text: 'Houston, the UI is nominal. the bug is in low Earth orbit somewhere between line 42 and pin 42.' },
  { type: 'joke', text: 'silicon lottery: you won the wafer. the website is the bonus die that actually booted.' },
  { type: 'joke', text: 'watchdog timer armed. if you stare at /dev too long, it assumes you are debugging and leaves you alone.' },
  { type: 'joke', text: 'health tech tip: this portfolio cannot diagnose arrhythmia. your cardiologist can. probably.' },
  { type: 'joke', text: 'have you tried turning the portfolio off and on again? ctrl+shift+r is the new power cycle.' },
  { type: 'joke', text: 'bootloader tip: if education_record fails checksum, blame the curriculum compiler — not the student.' },
  { type: 'joke', text: 'tapeout rumor: this site missed the shuttle by one revision. next spin will fix the hold timing. probably.' },
  { type: 'joke', text: 'satellite latency: your click reached the server in 12 ms. the ACK is still propagating through LEO.' },
  { type: 'joke', text: 'vitals check: portfolio heartbeat 60 Hz nominal. arrhythmia detected only in the progress bar — ignore it.' },
  { type: 'joke', text: 'firmware update available: changelog says "fixed nothing, improved vibes." recommended install: never.' },
  { type: 'joke', text: 'VLSI wisdom: if the layout passes DRC, the bug is in the analog domain. always the analog domain.' },
  { type: 'joke', text: 'uptime: 99.9% — the 0.1% was when avrdude held the upload hostage. we negotiated.' },
  { type: 'joke', text: 'ECG pun: this UI has good R-R intervals. unlike my sleep schedule during tapeout week.' },
];

const FAULT_CONFIRMATIONS = [
  "FAULT LOGGED: ticket #0x1337 filed under 'known cosmic ray interference.' no further action will be taken.",
  'FAULT LOGGED: entry archived to /dev/null with read-only permissions. thank you for your concern.',
  'FAULT LOGGED: classified as PEBKAC (Problem Exists Between Keyboard And Chair). closing ticket.',
  'FAULT LOGGED: routed to the same queue as the progress bar — expect infinite retry, zero resolution.',
  'FAULT LOGGED: severity LOW (humor HIGH). the watchdog ate your report and asked for seconds.',
];

export default function HelpPanel({ variant = 'floating' }: { variant?: 'floating' | 'titlebar' }) {
  const [open, setOpen] = useState(false);
  const [showBugForm, setShowBugForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [faultMessage, setFaultMessage] = useState('');
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

    const confirmation =
      FAULT_CONFIRMATIONS[Math.floor(Math.random() * FAULT_CONFIRMATIONS.length)];
    setFaultMessage(confirmation);
    setIsSubmitted(true);
    form.reset();
  }

  function close() {
    setOpen(false);
    setShowBugForm(false);
    setIsSubmitted(false);
    setFaultMessage('');
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

                <div className="space-y-2 mb-4 pl-2 border-l border-border-strong">
                  <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1 -ml-2 pl-2">notes</p>
                  {HELP_LINES.map((line, i) => (
                    <p key={i} className="text-text-secondary leading-relaxed">
                      <span className="text-text-muted mr-2">~</span>
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
                    describe what broke — report goes to the bit bucket, not an inbox
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
                <p className="text-text-primary text-[11px] leading-relaxed">{faultMessage}</p>
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
