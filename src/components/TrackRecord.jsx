import { trackRecord } from '../content/site.js';

/** Anonymised by agreement: sector and outcome only, never a client name. */
export default function TrackRecord() {
  return (
    <section id="track-record" className="bg-light text-dark">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <h2 className="text-4xl md:text-5xl">{trackRecord.heading}</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-dark/50">{trackRecord.note}</p>

        <ul className="mt-16 divide-y divide-dark/15 border-y border-dark/15">
          {trackRecord.items.map((item) => (
            <li key={item.sector} className="grid gap-3 py-8 md:grid-cols-[16rem_1fr] md:gap-12">
              <p className="text-sm tracking-wide text-dark/60">{item.sector}</p>
              <p className="leading-relaxed">{item.outcome}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
