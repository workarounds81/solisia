import { services } from '../content/site.js';
import Photo from './Photo.jsx';

export default function Services() {
  return (
    <section id="work" className="border-t border-dark/15 bg-light/80 text-dark">
      <div className="mx-auto max-w-site px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-end md:gap-14">
          <div>
            <h2 className="mb-6 max-w-[24ch] text-3xl leading-[1.15] tracking-[-0.01em] md:text-4xl">
              {services.heading}
            </h2>
            <p className="max-w-[56ch] text-lg text-dark/80">{services.lede}</p>
          </div>
          <Photo
            name={services.photo.name}
            alt={services.photo.alt}
            sizes="(min-width: 1920px) 733px, (min-width: 1536px) 652px, (min-width: 1152px) 525px, (min-width: 768px) calc((100vw - 104px) / 2), calc(100vw - 48px)"
            className="aspect-[3/2]"
          />
        </div>
      </div>
    </section>
  );
}
