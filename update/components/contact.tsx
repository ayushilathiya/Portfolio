'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PathLabel from '@/components/path-label';
import { submitToFormspree } from '@/lib/formspree';

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
      const response = await submitToFormspree(formData);

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
    <div className="panel-content uart-panel relative">
      <div className="uart-panel-inner">
        <div className="panel-box uart-form-box p-3 relative">
          <PathLabel name="tx" />
          <div className="font-mono text-[11px] mb-2 -mt-1 pb-2 border-b border-border-strong">
            <span className="text-text-muted">{'>'}</span>
            <span className="text-text-primary ml-2">tx --to ayushi</span>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <input type="hidden" name="_subject" value="Portfolio contact — portfolio.sys /tx" />
              <div>
                <label className="block font-mono text-[10px] text-text-muted mb-1">name</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="your name"
                  required
                  disabled={isSubmitting}
                  className="bg-base border-border text-text-primary placeholder:text-text-muted focus-visible:ring-accent-amber font-mono text-xs h-8"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] text-text-muted mb-1">email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                  className="bg-base border-border text-text-primary placeholder:text-text-muted focus-visible:ring-accent-amber font-mono text-xs h-8"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] text-text-muted mb-1">payload</label>
                <Textarea
                  name="message"
                  placeholder="your message"
                  className="min-h-[72px] bg-base border-border text-text-primary placeholder:text-text-muted focus-visible:ring-accent-amber font-mono text-xs resize-none"
                  required
                  disabled={isSubmitting}
                />
              </div>
              {error && <p className="font-mono text-[10px] text-text-secondary text-center">{error}</p>}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-transparent border border-border-strong text-text-primary hover:border-accent-amber hover:text-accent-amber font-mono text-xs h-8 transition-colors duration-200 ease-out"
              >
                {isSubmitting ? 'transmitting…' : 'transmit'}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-2 py-1 font-mono text-xs">
              <p className="text-text-primary">tx ack received</p>
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
