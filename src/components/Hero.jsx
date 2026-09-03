import { hero } from '../content/site.js';
import ParticleGlobe from './ParticleGlobe.jsx';

export default function Hero() {
  return (
    <section data-tone="light" className="bg-light text-dark">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-14 md:pt-36 md:pb-24">
        <h1 className="reveal max-w-[17ch] text-5xl font-light leading-[1.06] tracking-[-0.02em] md:text-7xl">
          {hero.headline} <em className="italic">{hero.headlineEmphasis}</em>
        </h1>
        <p className="reveal mt-10 max-w-[46ch] text-lg leading-[1.7] text-dark/80">{hero.lede}</p>
        <ul className="reveal mt-10 flex flex-wrap gap-x-9 gap-y-2 text-sm text-dark/60">
          {hero.meta.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1 rounded-full bg-brass" />
              {item}
            </li>
          ))}
        </ul>

        {/* Scroll-bound particle globe, sits below the copy in normal flow —
            not overlapping it, so there is nothing to click through. */}
        <div id="canvas-container" className="relative w-full h-[500px]">
          <ParticleGlobe />
        </div>
      </div>
    </section>
  );
}
