import { workflow } from '../content/site.js';

export default function EngagementWorkflow() {
  return (
    <section id="workflow" className="bg-light text-dark">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <h2 className="text-4xl md:text-5xl">{workflow.heading}</h2>

        <ol className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2">
          {workflow.steps.map((step, index) => (
            <li key={step.title} className="border-t border-dark/15 pt-6">
              <p className="text-xs tracking-[0.2em] text-brass">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 text-2xl md:text-3xl">{step.title}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-dark/70">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
