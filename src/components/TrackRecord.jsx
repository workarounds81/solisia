import { trackRecord } from '../content/site.js';
import { requestDeck } from '../lib/requestDeck.js';

/**
 * Named where the deal itself is public record (a listed company's own
 * exchange filings), sector-only where the engagement isn't — see
 * site.js's trackRecord.items. Two-column, compact rows: with ~20
 * entries, one full-width row per deal read as an endless scroll.
 */
export default function TrackRecord() {
  return (
    <section id="record" className="border-t border-dark/15 bg-light/80 text-dark">
      <div className="mx-auto max-w-site px-6 py-16 md:py-24">
        <h2 className="mb-10 max-w-[24ch] text-3xl leading-[1.15] tracking-[-0.01em] md:text-4xl">
          {trackRecord.heading}
        </h2>
        <p className="mb-11 max-w-[56ch] text-dark/80">{trackRecord.lede}</p>

        <div className="mb-14 grid gap-7 md:grid-cols-3 md:gap-10">
          {trackRecord.figures.map((figure) => (
            <div key={figure.label}>
              <p
                className={`font-display font-light tracking-[-0.02em] ${
                  figure.isText ? 'text-2xl leading-[1.3]' : 'text-5xl leading-none'
                }`}
              >
                {figure.value}
              </p>
              <p className="mt-2 max-w-[30ch] text-sm text-dark/60">{figure.label}</p>
            </div>
          ))}
        </div>

        {/* An open, active raise — kept visually distinct from the closed
            deals below (bigger type, brass accent, a CTA) rather than
            folded into the list as just another row, so it doesn't read
            as a completed engagement. */}
        <div className="panel mb-14 border-l-2 border-l-brass px-6 py-6 md:px-8 md:py-7">
          <p className="text-xs uppercase tracking-[0.2em] text-brass">
            {trackRecord.currentlyRaising.label}
          </p>
          <ul className="mt-2 space-y-6">
            {trackRecord.currentlyRaising.items.map((item) => (
              <li key={item.company}>
                <p className="font-display text-2xl leading-tight md:text-3xl">
                  {item.company}
                  <span className="text-dark/60"> — {item.round}</span>
                </p>
                <a
                  href={item.href}
                  onClick={item.href === '#deck' ? requestDeck : undefined}
                  className="mt-3 inline-block border-b border-brass pb-px text-sm transition-colors hover:text-brass"
                >
                  {item.cta} →
                </a>
              </li>
            ))}
          </ul>
        </div>

        <dl className="grid gap-3 md:grid-cols-2 md:gap-4">
          {trackRecord.items.map((item) => (
            <div key={item.sector} className="panel px-5 py-4">
              <dt className="font-display text-sm">{item.sector}</dt>
              <dd className="mt-1 text-xs leading-[1.5] text-dark/70">{item.outcome}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
