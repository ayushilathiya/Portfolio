import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPaperPlane } from "react-icons/fa";

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Basic validation
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!email || !message) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_KEY}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setError('Failed to send message. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="section-box">
      <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4 sm:mb-8">
        Let's Connect!
      </h2>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <Input
              type="text"
              name="name"
              placeholder="Your name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Message
            </label>
            <Textarea
              name="message"
              placeholder="Your message"
              className="min-h-[150px]"
              required
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-navy hover:bg-navy-light text-white transition-all duration-300"
            disabled={isSubmitting}
          >
            <div className="flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane className="mr-2 h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </div>
          </Button>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center text-green-600">
            <svg
              className="h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-navy">Message Sent Successfully!</h3>
          <p className="text-gray-600">Thank you for your message! I'll get back to you soon.</p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 bg-navy hover:bg-navy-light text-white"
          >
            Send Another Message
          </Button>
        </div>
      )}
    </div>
  );
}
