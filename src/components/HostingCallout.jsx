import { hosting } from '../content/site.js';

/** Full-bleed dark block. One paragraph. Nothing else, by design. */
export default function HostingCallout() {
  return (
    <section id="hosting" className="bg-dark/80 text-light">
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-36">
        <p className="font-display text-2xl font-light leading-[1.4] md:text-3xl">
          {hosting.paragraph}
        </p>
      </div>
    </section>
  );
}
