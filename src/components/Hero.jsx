import { hero } from '../content/site.js';

export default function Hero() {
  return (
    <section className="border-b border-dark/15 bg-light/80 text-dark">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-36 md:pb-40">
        <p className="reveal mb-6 text-xs uppercase tracking-[0.25em] text-brass">{hero.kicker}</p>
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
      </div>
    </section>
  );
}
