import { contact, footer, wordmark } from '../content/site.js';
import { useContactForm } from '../hooks/useContactForm.js';
import { submitContact } from '../lib/submitContact.js';

const field =
  'w-full border-b border-dark/25 bg-transparent py-3 text-dark placeholder:text-dark/35 focus:border-dark focus:outline-none';
const label = 'text-xs uppercase tracking-[0.2em] text-dark/60';
const link = 'border-b border-brass pb-px transition-colors hover:text-brass';

const rows = [
  ['Email', <a key="email" href={`mailto:${contact.email}`} className={link}>{contact.email}</a>],
  ['Phone', <a key="phone" href={`tel:${contact.phoneHref}`} className={link}>{contact.phone}</a>],
  ['Website', <a key="web" href={`https://${contact.website}`} className={link}>{contact.website}</a>],
  ['Offices', contact.locations],
];

export default function Contact() {
  const { values, status, error, handleChange, handleSubmit } = useContactForm({
    onSubmit: (data) => submitContact(data, { email: contact.email }),
  });
  const busy = status === 'submitting';

  return (
    <footer id="contact" className="border-t border-dark/15 bg-light/80 text-dark">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        {/* Details */}
        <div>
          <h2 className="max-w-[15ch] text-3xl font-light leading-[1.14] tracking-[-0.015em] md:text-4xl">
            {contact.heading}
          </h2>
          <dl className="mt-10 border-t border-dark/15">
            {rows.map(([term, value]) => (
              <div
                key={term}
                className="flex flex-wrap justify-between gap-6 border-b border-dark/15 py-4"
              >
                <dt className="text-sm text-dark/60">{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <div>
            <label htmlFor="name" className={label}>Name</label>
            <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={handleChange} className={field} />
          </div>
          <div>
            <label htmlFor="email" className={label}>Email</label>
            <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} className={field} />
          </div>
          <div>
            <label htmlFor="message" className={label}>Message</label>
            <textarea id="message" name="message" rows={4} value={values.message} onChange={handleChange} className={`${field} resize-y`} />
          </div>

          <div className="flex items-center gap-6">
            <button
              type="submit"
              disabled={busy}
              className="border border-dark px-6 py-3 text-sm tracking-wide transition-colors hover:bg-dark hover:text-light disabled:opacity-50"
            >
              {busy ? 'Sending…' : 'Send'}
            </button>
            <p role="status" aria-live="polite" className="text-sm">
              {status === 'success' && <span className="text-dark/70">Thank you — we will reply shortly.</span>}
              {status === 'error' && <span className="text-brass">{error}</span>}
            </p>
          </div>
        </form>
      </div>

      {/* Legal strip */}
      <div className="bg-dark/85 text-light/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12">
          <span className="font-display text-xl tracking-[0.18em] text-light">{wordmark}</span>
          <p className="max-w-[74ch] border-t border-light/20 pt-6 text-sm leading-[1.7]">
            {footer.legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
