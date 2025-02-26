"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPaperPlane } from "react-icons/fa";

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Basic validation
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!email || !message) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_KEY}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      setError("Failed to send message. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="section-box">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy mb-4 sm:mb-6 md:mb-8">
        Let's Connect!
      </h2>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Name</label>
            <Input
              type="text"
              name="name"
              placeholder="Your name"
              required
              disabled={isSubmitting}
              className="text-sm sm:text-base py-1.5 sm:py-2"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              required
              disabled={isSubmitting}
              className="text-sm sm:text-base py-1.5 sm:py-2"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Message</label>
            <Textarea
              name="message"
              placeholder="Your message"
              className="min-h-[100px] sm:min-h-[150px] text-sm sm:text-base"
              required
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="text-red-500 text-xs sm:text-sm text-center">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-navy hover:bg-navy/80 text-white text-sm sm:text-base py-1.5 sm:py-2 transition-all duration-300 h-auto"
            disabled={isSubmitting}>
            <div className="flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Send Message</span>
                </>
              )}
            </div>
          </Button>
        </form>
      ) : (
        <div className="text-center space-y-3 sm:space-y-4 py-4">
          <div className="flex items-center justify-center text-green-600">
            <svg
              className="h-8 w-8 sm:h-12 sm:w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-navy">
            Message Sent Successfully!
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Thank you for your message! I'll get back to you soon.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="mt-2 sm:mt-4 bg-navy hover:bg-navy/80 text-white text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 h-auto">
            Send Another Message
          </Button>
        </div>
      )}
    </div>
  );
}
