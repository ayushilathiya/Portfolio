'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SectionVisual from '@/components/section-visual';
import PathLabel from '@/components/path-label';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!email || !message) {
      setError('Please fill in all required fields');
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
      setError('Failed to send message. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="panel-content relative">
      <SectionVisual tab="uart" />

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full min-h-0 overflow-y-auto panel-inner-scroll">
        <div className="panel-box p-4 md:p-5 relative">
          <PathLabel name="uart_form" />
          <div className="font-mono text-sm mb-4 -mt-1 pb-3 border-b border-border-strong">
            <span className="text-text-muted">{'>'}</span>
            <span className="text-text-primary ml-2">connect --with ayushi</span>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-mono text-[11px] text-text-muted mb-1">name</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="your name"
                  required
                  disabled={isSubmitting}
                  className="bg-base border-border text-text-primary placeholder:text-text-muted focus-visible:ring-accent-amber font-mono text-xs h-9"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] text-text-muted mb-1">email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                  className="bg-base border-border text-text-primary placeholder:text-text-muted focus-visible:ring-accent-amber font-mono text-xs h-9"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] text-text-muted mb-1">message</label>
                <Textarea
                  name="message"
                  placeholder="your message"
                  className="min-h-[100px] bg-base border-border text-text-primary placeholder:text-text-muted focus-visible:ring-accent-amber font-mono text-xs"
                  required
                  disabled={isSubmitting}
                />
              </div>
              {error && <p className="font-mono text-[11px] text-text-secondary text-center">{error}</p>}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-transparent border border-border-strong text-text-primary hover:border-accent-amber hover:text-accent-amber font-mono text-xs h-9 transition-colors duration-200 ease-out"
              >
                {isSubmitting ? 'transmitting…' : 'send signal'}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-3 py-2 font-mono text-xs">
              <p className="text-text-primary">signal received</p>
              <p className="text-text-muted">thank you — i&apos;ll get back to you soon.</p>
              <Button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="bg-transparent border border-border-strong text-text-secondary hover:text-accent-amber hover:border-accent-amber font-mono text-xs h-8"
              >
                send another
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
