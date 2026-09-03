import { workflow } from '../content/site.js';

export default function EngagementWorkflow() {
  return (
    <section id="engagement" className="border-t border-dark/15 bg-light/80 text-dark">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="mb-10 max-w-[24ch] text-3xl leading-[1.15] tracking-[-0.01em] md:text-4xl">
          {workflow.heading}
        </h2>

        <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
          {workflow.steps.map((step) => (
            <li key={step.title} className="border-t-2 border-brass pt-4">
              <p className="mb-2 text-xs tracking-wide text-brass">{step.label}</p>
              <h3 className="text-xl leading-snug">{step.title}</h3>
              <p className="mt-2 text-[0.97rem] text-dark/80">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
