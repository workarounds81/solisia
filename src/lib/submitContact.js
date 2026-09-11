/**
 * Default transport for the contact form on a static host.
 *
 * If VITE_CONTACT_ENDPOINT is set (e.g. a Formspree or serverless URL), the
 * form POSTs JSON there. Otherwise it falls back to opening the visitor's mail
 * client with the message pre-filled — no backend required, so the form works
 * on GitHub Pages out of the box.
 *
 * `values.mode` ('raising' | 'investor') picks the subject/body shape so the
 * two form variants land as distinguishable emails in the same inbox, rather
 * than needing a second endpoint or mailbox.
 */
export async function submitContact(values, { email }) {
  const { mode, ...fields } = values;
  const isInvestor = mode === 'investor';
  const subject = isInvestor
    ? `Investor registration from ${fields.name}`
    : `Enquiry from ${fields.name}`;

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

  const body = isInvestor
    ? `Ticket size: ${fields.ticketSize || '—'}\nSectors / stage: ${fields.sectors || '—'}\nAccredited / institutional: ${fields.accredited ? 'Yes' : 'No'}\n\n— ${fields.name}\n${fields.email}`
    : `${fields.message}\n\n— ${fields.name}\n${fields.email}`;
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
