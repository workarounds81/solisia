import { nowBuilding } from '../content/site.js';
import { requestDeck } from '../lib/requestDeck.js';

const { architecture } = nowBuilding;

function OpcoBox({ opco }) {
  return (
    <div className="border border-dark/20 bg-light px-6 py-6 md:px-7 md:py-7">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-dark">{opco.label}</p>
      <p className="mt-3 text-[1.05rem] leading-[1.6] text-dark/80">
        {opco.lines[0]}
        <br />
        {opco.lines[1]}
      </p>
    </div>
  );
}

function CentreBox({ className = '' }) {
  return (
    <div className={`bg-dark px-8 py-7 text-center text-light ${className}`}>
      <p className="font-display text-3xl font-light leading-tight">{architecture.centre.title}</p>
      <p className="mt-3 text-xs uppercase tracking-[0.3em] text-light/70">{architecture.centre.caption}</p>
    </div>
  );
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

        <div className="mt-20 md:mt-28">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-dark">
            {architecture.kicker}
          </p>
          <h3 className="max-w-[22ch] text-3xl font-light leading-[1.12] tracking-[-0.015em] md:text-5xl">
            {architecture.headline} <em className="italic">{architecture.headlineEmphasis}</em>
          </h3>
          <p className="mt-6 max-w-[56ch] text-dark/80">{architecture.lede}</p>

          {/* Desktop: four OpCos at the corners, Central in the middle. The
              two brass lines are the container's diagonals drawn behind
              solid boxes, so they only show in the gaps — from each box's
              inner corner to the centre. Column and row gaps are kept at a
              similar share of width/height so the diagonals exit near the
              corners rather than mid-edge. */}
          <div className="relative mt-12 hidden lg:block">
            <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-brass">
              <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1.75" />
              <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1.75" />
            </svg>
            <div className="relative grid grid-cols-2 gap-x-[40%] gap-y-48">
              {architecture.opcos.map((opco) => (
                <OpcoBox key={opco.label} opco={opco} />
              ))}
            </div>
            <CentreBox className="absolute top-1/2 left-1/2 w-[22%] -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Below lg: Central first, OpCos hanging off one brass spine. */}
          <div className="mt-10 lg:hidden">
            <CentreBox />
            <ul className="ml-6 space-y-4 border-l-2 border-brass pt-4 pl-4">
              {architecture.opcos.map((opco) => (
                <li key={opco.label}>
                  <OpcoBox opco={opco} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 border-l-2 border-brass py-1 pl-6 md:pl-8">
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
