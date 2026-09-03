/**
 * Default transport for the contact form on a static host.
 *
 * If VITE_CONTACT_ENDPOINT is set (e.g. a Formspree or serverless URL), the
 * form POSTs JSON there. Otherwise it falls back to opening the visitor's mail
 * client with the message pre-filled — no backend required, so the form works
 * on GitHub Pages out of the box.
 */
export async function submitContact(values, { email }) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    });
    if (!response.ok) throw new Error('The message could not be sent.');
    return;
  }

  const subject = encodeURIComponent(`Enquiry from ${values.name}`);
  const body = encodeURIComponent(`${values.message}\n\n— ${values.name}\n${values.email}`);
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}
