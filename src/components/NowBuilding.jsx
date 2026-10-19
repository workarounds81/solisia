import { nowBuilding } from '../content/site.js';

// Clicking while the hash is already #deck fires no hashchange, so Contact
// would not switch modes; re-dispatch it so the form always lands on holdco.
function requestDeck() {
  if (window.location.hash === '#deck') window.dispatchEvent(new HashChangeEvent('hashchange'));
}

export default function NowBuilding() {
  return (
    <section id="building" className="border-t border-dark/15 bg-light/80 text-dark">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-brass">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-brass" />
          {nowBuilding.kicker}
        </p>
        <h2 className="max-w-[20ch] text-4xl font-light leading-[1.1] tracking-[-0.02em] md:text-6xl">
          {nowBuilding.headline} <em className="italic">{nowBuilding.headlineEmphasis}</em>
        </h2>
        <p className="mt-8 max-w-[60ch] text-lg leading-[1.7] text-dark/80">{nowBuilding.lede}</p>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-10">
          {nowBuilding.verticals.map((vertical) => (
            <li key={vertical.label} className="border-t border-dark/20 pt-4">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brass">{vertical.label}</p>
              <h3 className="text-xl leading-snug">{vertical.title}</h3>
              <p className="mt-2 text-[0.95rem] text-dark/75">{vertical.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 border-l-2 border-brass py-1 pl-6 md:pl-8">
          <p className="max-w-[40ch] font-display text-2xl font-light leading-[1.35] md:text-3xl">
            {nowBuilding.closing}
          </p>
          <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <a
              href="#deck"
              onClick={requestDeck}
              className="inline-block border-b border-brass pb-px text-sm font-medium transition-colors hover:text-brass"
            >
              {nowBuilding.cta} →
            </a>
            <p className="text-sm text-dark/60">{nowBuilding.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
