/**
 * All site copy lives here. Components read from this file and contain no
 * prose of their own, so swapping in final content is a one-file edit.
 *
 * PLACEHOLDER COPY: the design prototype was not reachable when this was
 * scaffolded. Everything below is structural stand-in text shaped to the
 * brief; replace it with the prototype's real wording.
 */

export const hero = {
  wordmark: 'Solisia',
  headline: 'Considered infrastructure for organisations that would rather not think about it.',
  lede:
    'We design, build and quietly run the systems behind businesses across Southeast Asia. Fewer moving parts. Nothing you have to babysit.',
};

export const serviceCategories = [
  { id: 'advisory', label: 'Advisory' },
  { id: 'build', label: 'Build' },
  { id: 'operate', label: 'Operate' },
];

export const services = [
  {
    id: 'architecture',
    category: 'advisory',
    title: 'Architecture & review',
    description:
      'An honest look at what you have, what it costs, and what should change. Written down plainly, with a sequence you can act on.',
  },
  {
    id: 'platform',
    category: 'build',
    title: 'Platform engineering',
    description:
      'Foundations built to be boring: predictable deployments, sensible defaults, and documentation your next hire can actually use.',
  },
  {
    id: 'integration',
    category: 'build',
    title: 'Systems integration',
    description:
      'Connecting the tools you already pay for so data moves without someone re-typing it. Fewer spreadsheets, fewer surprises.',
  },
  {
    id: 'managed',
    category: 'operate',
    title: 'Managed operations',
    description:
      'We keep it running. Monitoring, patching, backups and the 3am call — handled, and reported in a monthly note you can read in two minutes.',
  },
];

export const hosting = {
  paragraph:
    'We host what we build. Not because it is cheaper for you — though it usually is — but because there is nobody else to phone when something breaks, and we would rather that be us.',
};

export const workflow = {
  heading: 'How an engagement runs',
  steps: [
    {
      title: 'A conversation',
      description:
        'Forty minutes, no deck. We ask what is slow, what is fragile, and what you have stopped noticing because it has always been that way.',
    },
    {
      title: 'A short written proposal',
      description:
        'Scope, sequence, price. Usually two pages. If it needs more than that, we have not understood the problem yet.',
    },
    {
      title: 'The work',
      description:
        'Delivered in small, reviewable pieces, with a short note each week on what changed and what is next.',
    },
    {
      title: 'Handover, or not',
      description:
        'Everything documented so you can take it in-house. Most clients ask us to keep running it instead. Either is fine.',
    },
  ],
};

export const trackRecord = {
  heading: 'Track record',
  note: 'Client names are withheld by agreement. Each engagement is described by sector and outcome only.',
  items: [
    {
      sector: 'Regional logistics group',
      outcome: 'Consolidated four booking systems into one, cutting manual reconciliation from three days a month to none.',
    },
    {
      sector: 'Private healthcare provider',
      outcome: 'Replaced a failing on-premise setup with managed infrastructure; zero unplanned downtime in the following eighteen months.',
    },
    {
      sector: 'Specialist manufacturer',
      outcome: 'Integrated production, inventory and finance so a single order flows end to end without re-entry.',
    },
    {
      sector: 'Professional services firm',
      outcome: 'Migrated and now operate a document platform for roughly two hundred staff across two countries.',
    },
  ],
};

export const contact = {
  heading: 'Get in touch',
  phone: '+65 0000 0000', // PLACEHOLDER
  email: 'hello@solisia.net', // PLACEHOLDER
  website: 'solisia.net',
  locations: 'Singapore · Bangkok',
  legal: 'Solisia',
};
