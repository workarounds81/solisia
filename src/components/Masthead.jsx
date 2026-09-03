import { nav, wordmark } from '../content/site.js';

/**
 * Sticky, 4rem tall, permanently dark ("green" #132220) — the one fixed
 * point of contrast against the light sections and the globe behind them.
 * Deliberately not tone-reactive: it used to switch to match whichever
 * section was in view, which read as flickering rather than ambient.
 */
export default function Masthead() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-light/15 bg-dark/92 text-light backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-8 px-6">
        <a href="#top" className="font-display text-2xl leading-none tracking-[0.18em]">
          {wordmark}
        </a>
        <nav aria-label="Primary" className="hidden gap-8 text-sm text-light/65 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b border-transparent py-1 transition-colors hover:border-brass hover:text-light"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
