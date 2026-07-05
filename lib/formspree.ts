/** Formspree form endpoint — https://formspree.io/f/meoebdvd */
export const FORMSPREE_FORM_ID = 'meoebdvd';

export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

export function getFormspreeEndpoint(): string {
  const fromEnv = process.env.NEXT_PUBLIC_FORMSPREE_KEY;
  if (fromEnv) return `https://formspree.io/f/${fromEnv}`;
  return FORMSPREE_ENDPOINT;
}

export async function submitToFormspree(formData: FormData): Promise<Response> {
  return fetch(getFormspreeEndpoint(), {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  });
}
