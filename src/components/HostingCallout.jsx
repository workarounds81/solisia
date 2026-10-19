import { hosting } from '../content/site.js';
import Photo from './Photo.jsx';

/**
 * Full-bleed dark block, one paragraph. The dinner photo sits behind a dark
 * scrim as texture rather than content, so the "nothing else" rule holds
 * for what the reader actually reads.
 */
export default function HostingCallout() {
  return (
    <section id="hosting" className="relative overflow-hidden bg-dark text-light">
      <Photo
        name={hosting.photo.name}
        alt={hosting.photo.alt}
        sizes="100vw"
        className="absolute inset-0"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-dark/75" />
      <div className="relative mx-auto max-w-4xl px-6 min-[96rem]:max-w-5xl py-24 md:py-36">
        <p className="font-display text-2xl font-light leading-[1.4] md:text-3xl">
          {hosting.paragraph}
        </p>
      </div>
    </section>
  );
}
