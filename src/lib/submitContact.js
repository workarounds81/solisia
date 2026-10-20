/**
 * Default transport for the contact form on a static host.
 *
 * If VITE_CONTACT_ENDPOINT is set (e.g. a Formspree or serverless URL), the
 * form POSTs JSON there. Otherwise it falls back to opening the visitor's mail
 * client with the message pre-filled — no backend required, so the form works
 * on GitHub Pages out of the box.
 *
 * `values.mode` ('investor' | 'holdco') picks the subject/body shape so the
 * two form variants land as distinguishable emails in the same inbox, rather
 * than needing a second endpoint or mailbox.
 */
export async function submitContact(values, { email }) {
  const { mode, ...fields } = values;
  const subject = {
    investor: `Investor registration from ${fields.name}`,
    holdco: `HoldCo deck request from ${fields.name}`,
  }[mode];

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...fields, _subject: subject }),
    });
    if (!response.ok) throw new Error('The message could not be sent.');
    return;
  }

  const signature = `— ${fields.name}\n${fields.email}`;
  const body = {
    investor: `Ticket size: ${fields.ticketSize || '—'}\nSectors / stage: ${fields.sectors || '—'}\n\n${signature}`,
    holdco: `Firm: ${fields.firm || '—'}\n\n${fields.message || ''}\n\n${signature}`,
  }[mode];
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
