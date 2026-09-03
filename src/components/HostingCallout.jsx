import { hosting } from '../content/site.js';

/** Full-bleed dark block. One paragraph. Nothing else, by design. */
export default function HostingCallout() {
  return (
    <section id="hosting" className="bg-dark text-light">
      <div className="mx-auto max-w-3xl px-6 py-28 md:py-40">
        <p className="font-display text-3xl font-light leading-snug md:text-4xl">
          {hosting.paragraph}
        </p>
      </div>
    </section>
  );
}
