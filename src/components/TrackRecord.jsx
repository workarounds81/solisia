import { trackRecord } from '../content/site.js';

/**
 * Named where the deal itself is public record (a listed company's own
 * exchange filings), sector-only where the engagement isn't — see
 * site.js's trackRecord.items. Two-column, compact rows: with ~20
 * entries, one full-width row per deal read as an endless scroll.
 */
export default function TrackRecord() {
  return (
    <section id="record" className="border-t border-dark/15 bg-light/80 text-dark">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
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
              <p className="mt-2 max-w-[22ch] text-sm text-dark/60">{figure.label}</p>
            </div>
          ))}
        </div>

        {/* An open, active raise — kept visually distinct from the closed
            deals below (bigger type, brass accent, a CTA) rather than
            folded into the list as just another row, so it doesn't read
            as a completed engagement. */}
        <div className="mb-14 border-l-2 border-brass py-1 pl-6 md:pl-8">
          <p className="text-xs uppercase tracking-[0.2em] text-brass">
            {trackRecord.currentlyRaising.label}
          </p>
          <p className="mt-2 font-display text-2xl leading-tight md:text-3xl">
            {trackRecord.currentlyRaising.company}
            <span className="text-dark/60"> — {trackRecord.currentlyRaising.round}</span>
          </p>
          <a
            href="#contact"
            className="mt-3 inline-block border-b border-brass pb-px text-sm transition-colors hover:text-brass"
          >
            {trackRecord.currentlyRaising.cta} →
          </a>
        </div>

        <dl className="grid border-t border-dark/15 md:grid-cols-2 md:gap-x-12">
          {trackRecord.items.map((item) => (
            <div key={item.sector} className="border-b border-dark/15 py-4">
              <dt className="font-display text-sm">{item.sector}</dt>
              <dd className="mt-1 text-xs leading-[1.5] text-dark/60">{item.outcome}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
