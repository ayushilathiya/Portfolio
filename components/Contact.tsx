import { useState } from 'react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/meoebdvd', { // Replace YOUR_FORM_ID with your Formspree form ID
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
      console.error('Error:', error);
    }
  }

  return (
    <section id="contact" className="contact-section">
      <form onSubmit={handleSubmit}>
        // ...existing form fields...
      </form>
      
      {isSubmitted && (
        <div className="mt-4 text-green-500 text-center">
          Thank you for your message! I'll get back to you soon.
        </div>
      )}
    </section>
  );
}
