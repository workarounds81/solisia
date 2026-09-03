import { hero } from '../content/site.js';

export default function Hero() {
  return (
    <section id="top" className="bg-light text-dark">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-16 md:pt-14">
        <p className="text-sm tracking-wide">{hero.wordmark}</p>

        <div className="mt-28 max-w-3xl md:mt-40">
          <h1 className="text-5xl leading-[1.05] md:text-7xl">{hero.headline}</h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-dark/70">{hero.lede}</p>
        </div>

        {/* Reserved mount for the scroll-bound particle globe (Three.js).
            Intentionally empty: no markup, no styling beyond size. */}
        <div id="canvas-container" className="relative w-full h-[500px]" />
      </div>
    </section>
  );
}
