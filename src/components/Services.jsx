import { useState } from 'react';
import { services, serviceCategories } from '../content/site.js';

const ALL = { id: 'all', label: 'All' };

export default function Services() {
  const [active, setActive] = useState(ALL.id);
  const filters = [ALL, ...serviceCategories];
  const labelFor = (id) => serviceCategories.find((c) => c.id === id)?.label ?? '';
  const visible =
    active === ALL.id ? services.items : services.items.filter((s) => s.category === active);

  return (
    <section id="work" data-tone="light" className="border-t border-dark/15 bg-light/85 text-dark backdrop-blur-sm">
      {/* Sticky category filter sub-header, flush beneath the masthead */}
      <div className="sticky top-16 z-30 border-b border-dark/15 bg-light/70 backdrop-blur-sm">
        <nav
          aria-label="Filter services"
          className="mx-auto flex max-w-6xl gap-8 overflow-x-auto px-6 py-3"
        >
          {filters.map((filter) => {
            const isActive = filter.id === active;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActive(filter.id)}
                aria-pressed={isActive}
                className={`whitespace-nowrap text-sm tracking-wide transition-colors ${
                  isActive ? 'text-brass' : 'text-dark/50 hover:text-dark'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="mb-10 max-w-[24ch] text-3xl leading-[1.15] tracking-[-0.01em] md:text-4xl">
          {services.heading}
        </h2>
        <p className="mb-11 max-w-[56ch] text-dark/80">{services.lede}</p>

        {/* Restrained glass panels: still row-shaped per the prototype, now
            with a soft frosted surface rather than a flat divider list. */}
        <div className="space-y-4">
          {visible.map((service) => (
            <article
              key={service.id}
              className="grid gap-2 rounded-sm border border-dark/10 bg-light/40 px-6 py-8 backdrop-blur-sm transition-colors hover:border-brass/40 md:grid-cols-[15rem_1fr] md:gap-14"
            >
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-dark/45">
                  {labelFor(service.category)}
                </p>
                <h3 className="text-2xl leading-[1.25]">{service.title}</h3>
              </div>
              <p className="max-w-[58ch] text-dark/80">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
