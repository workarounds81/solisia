import { nav, wordmark } from '../content/site.js';

/** Sticky, 4rem tall. Services' filter bar sticks directly beneath (top-16). */
export default function Masthead() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-dark/15 bg-light/90 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-8 px-6">
        <a href="#top" className="font-display text-2xl leading-none tracking-[0.18em]">
          {wordmark}
        </a>
        <nav aria-label="Primary" className="hidden gap-8 text-sm text-dark/60 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b border-transparent py-1 transition-colors hover:border-brass hover:text-dark"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
