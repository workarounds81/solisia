import { contact } from '../content/site.js';
import { useContactForm } from '../hooks/useContactForm.js';
import { submitContact } from '../lib/submitContact.js';

const field =
  'w-full border-b border-dark/25 bg-transparent py-3 text-dark placeholder:text-dark/35 focus:border-dark focus:outline-none';

export default function Contact() {
  const { values, status, error, handleChange, handleSubmit } = useContactForm({
    onSubmit: (data) => submitContact(data, { email: contact.email }),
  });
  const busy = status === 'submitting';

  return (
    <footer id="contact" className="bg-light text-dark">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2 md:py-32">
        {/* Details */}
        <div>
          <h2 className="text-4xl md:text-5xl">{contact.heading}</h2>
          <address className="mt-10 space-y-3 not-italic leading-relaxed">
            <p>
              <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:text-brass">
                {contact.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className="hover:text-brass">
                {contact.email}
              </a>
            </p>
            <p>
              <a href={`https://${contact.website}`} className="hover:text-brass">
                {contact.website}
              </a>
            </p>
            <p className="text-dark/60">{contact.locations}</p>
          </address>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <div>
            <label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-dark/60">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={handleChange}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-dark/60">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-dark/60">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={values.message}
              onChange={handleChange}
              className={`${field} resize-y`}
            />
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

      <div className="border-t border-dark/10">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-6 py-6 text-xs text-dark/50">
          <p>
            &copy; {new Date().getFullYear()} {contact.legal}
          </p>
          <p>{contact.locations}</p>
        </div>
      </div>
    </footer>
  );
}
