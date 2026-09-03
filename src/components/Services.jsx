import { useState } from 'react';
import { services, serviceCategories } from '../content/site.js';

const ALL = { id: 'all', label: 'All' };

export default function Services() {
  const [active, setActive] = useState(ALL.id);
  const filters = [ALL, ...serviceCategories];
  const labelFor = (id) => serviceCategories.find((c) => c.id === id)?.label ?? '';
  const visible = active === ALL.id ? services : services.filter((s) => s.category === active);

  return (
    <section id="services" className="bg-light text-dark">
      {/* Sticky category filter sub-header */}
      <div className="sticky top-0 z-10 border-b border-dark/10 bg-light">
        <nav
          aria-label="Filter services"
          className="mx-auto flex max-w-6xl gap-8 overflow-x-auto px-6 py-4"
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

      <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-20 px-6 py-24 md:grid-cols-2 md:py-32">
        {visible.map((service) => (
          <article key={service.id}>
            <p className="text-xs uppercase tracking-[0.2em] text-brass">
              {labelFor(service.category)}
            </p>
            <h3 className="mt-4 text-3xl md:text-4xl">{service.title}</h3>
            <p className="mt-5 max-w-md leading-relaxed text-dark/70">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
