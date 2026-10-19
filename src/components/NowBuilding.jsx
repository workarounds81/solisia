import { nowBuilding } from '../content/site.js';
import { requestDeck } from '../lib/requestDeck.js';
import Photo, { hasPhoto } from './Photo.jsx';

// All four or none: a row with one missing photo reads as broken.
const showVerticalPhotos = nowBuilding.verticals.every((v) => hasPhoto(v.photo));

export default function NowBuilding() {
  return (
    <section id="building" className="border-t border-dark/15 bg-light/80 text-dark">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-brass">
          {/* "Live" indicator: a solid dot with a slow ring pulsing out of it.
              Static for visitors who ask for reduced motion. */}
          <span aria-hidden="true" className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-brass opacity-75 motion-safe:animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <span className="relative inline-flex size-2 rounded-full bg-brass" />
          </span>
          {nowBuilding.kicker}
        </p>
        <h2 className="max-w-[20ch] text-4xl font-light leading-[1.1] tracking-[-0.02em] md:text-6xl">
          {nowBuilding.headline} <em className="italic">{nowBuilding.headlineEmphasis}</em>
        </h2>
        <p className="mt-8 max-w-[60ch] text-lg leading-[1.7] text-dark/80">{nowBuilding.lede}</p>

        <Photo
          name={nowBuilding.photo.name}
          alt={nowBuilding.photo.alt}
          sizes="(min-width: 1152px) 1104px, calc(100vw - 48px)"
          className="mt-12 aspect-[3/2] md:aspect-[21/9]"
          imgClassName="object-[center_30%]"
        />

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-10">
          {nowBuilding.verticals.map((vertical) => (
            <li key={vertical.label}>
              {showVerticalPhotos && (
                <Photo
                  name={vertical.photo}
                  alt={vertical.photoAlt}
                  sizes="(min-width: 1152px) 246px, (min-width: 768px) calc((100vw - 168px) / 4), (min-width: 640px) calc((100vw - 80px) / 2), calc(100vw - 48px)"
                  className="mb-5 aspect-[3/2] sm:aspect-[4/5]"
                  imgClassName="object-[center_60%]"
                />
              )}
              <div className="border-t border-dark/20 pt-4">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brass">{vertical.label}</p>
                <h3 className="text-xl leading-snug">{vertical.title}</h3>
                <p className="mt-2 text-[0.95rem] text-dark/75">{vertical.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16 border-l-2 border-brass py-1 pl-6 md:mt-20 md:pl-8">
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
