import { trackRecord } from '../content/site.js';

/** Anonymised as a matter of course: sector and outcome only, never a client name. */
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

        <dl className="border-t border-dark/15">
          {trackRecord.items.map((item) => (
            <div
              key={item.sector}
              className="grid gap-1 border-b border-dark/15 py-6 md:grid-cols-[1fr_1.15fr] md:gap-14"
            >
              <dt className="font-display text-lg">{item.sector}</dt>
              <dd className="text-[0.95rem] text-dark/60">{item.outcome}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
