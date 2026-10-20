/**
 * All site copy lives here, extracted from the design prototype. Components
 * read from this file and contain no prose of their own.
 */

export const wordmark = 'SOLISIA';

export const nav = [
  { href: '#building', label: 'Now building' },
  { href: '#work', label: 'What we do' },
  { href: '#engagement', label: 'Engagement' },
  { href: '#record', label: 'Track record' },
  { href: '#contact', label: 'Contact' },
];

/**
 * Thesis only, drawn from the HoldCo investment deck. Raise size, valuation
 * cap, instrument, token, yields and financials are deliberately absent:
 * the round is a private placement, and advertising its terms publicly
 * risks the exemption it relies on. Those stay in the deck, sent on request.
 */
export const nowBuilding = {
  kicker: 'Now building',
  headline: 'Essential businesses,',
  headlineEmphasis: 'and the places they run from.',
  lede:
    'Alongside our advisory work, Solisia is building a holding company. It acquires profitable, owner-run businesses across Southeast Asia, starting in Singapore and Bangkok, and selectively the commercial and light-industrial property they trade from. One shared AI back office, Solisia Central, takes on the scheduling, sourcing, leasing and books for all of them.',
  photo: {
    name: 'street',
    alt: 'A row of shophouses opening in the early morning: a kitchen, a clinic and a renovation workshop.',
  },
  verticals: [
    {
      photo: 'fnb',
      photoAlt: 'A chef plating a dish under a brass lamp in a busy restaurant kitchen.',
      label: 'F&B',
      title: 'Restaurants and kitchens',
      description: 'High volume, heavy labour and inventory friction.',
    },
    {
      photo: 'trades',
      photoAlt: 'A cabinetry workshop: a craftsman fitting a door to tall oak and black cabinets, panels stacked on a cart.',
      label: 'Trades',
      title: 'Renovation and fit-out',
      description: 'Held back by manual quoting, scheduling and sub-trade dispatch.',
    },
    {
      photo: 'health',
      photoAlt: 'A calm clinic reception with a stone counter and a booking tablet.',
      label: 'Health',
      title: 'Clinics and wellness',
      description: 'A heavy front-desk and admin load. Clinical decisions stay with licensed staff.',
    },
    {
      photo: 'data',
      photoAlt: 'A desk at dusk with a laptop showing a network of gold points, a city lit up behind.',
      label: 'Data',
      title: 'Tech and networks',
      description: 'Events, deal flow and media that feed leads to the group.',
    },
  ],
  closing: 'The kitchen keeps cooking. The clinic keeps its doctors. The workshop keeps its craftsmen.',
  cta: 'Request the deck',
  note: 'Shared privately with accredited and institutional investors.',
};

export const services = {
  heading: 'We are not a placement agent and we are not a marketing shop.',
  lede: 'We sit between the two, and we stay after the raise closes.',
  photo: {
    name: 'flatlay',
    alt: 'Printed investor materials, a fountain pen and a coffee laid out on a dark wooden desk.',
  },
};

/**
 * The brief mandates a single paragraph with no decoration here. The
 * prototype's three paragraphs are joined verbatim; its heading ("Some rooms
 * are worth the table.") and brass rule are omitted to honour the constraint.
 */
export const hosting = {
  // Background only, under a dark scrim: the section is still one paragraph.
  photo: {
    name: 'dinner',
    alt: '',
  },
  paragraph:
    'We host private dinners and small gatherings for investors across Asia, drawn from our own network of venues and rooms. They are not events. There is no deck, no lectern, no name badges. Six to fourteen people who ought to know each other, in a room where the conversation can be unguarded. More of our clients’ relationships have started at those tables than in any meeting room, which is why we treat hosting as a discipline rather than a courtesy.',
};

export const workflow = {
  heading: 'How an engagement runs',
  steps: [
    {
      label: 'First',
      title: 'Position',
      description:
        'We take the business apart and rebuild how it is described. Materials, structure, the answer to the question every investor will ask third.',
    },
    {
      label: 'Then',
      title: 'Introduce',
      description:
        'Target list built by mandate, not by volume. Outreach, meetings arranged and attended, objections logged and fed back into the story.',
    },
    {
      label: 'After',
      title: 'Sustain',
      description:
        'Reporting, updates, the register managed. The work that decides whether the next round is a conversation or a cold start.',
    },
  ],
};

export const trackRecord = {
  heading: 'Track record',
  lede: 'The experience behind Solisia belongs to its principals, built over a decade of raises across Southeast Asia and beyond — spanning public listings and private placements. Select transactions below; some engagements remain confidential.',
  figures: [
    {
      value: 'US$500M+',
      label: 'Raised by Solisia’s principals combined, across public placements and private rounds',
    },
    { value: '5 exchanges', label: 'Listed across', isText: true },
    { value: '10 yrs', label: 'Operating across Asia' },
  ],
  // Distinct from `items` below: an open, active raise rather than a closed
  // deal, so it's rendered as its own callout rather than folded into the
  // historical list — mixing the two would read as claiming a live raise is
  // already done.
  // Solisia's own entry carries no amount, cap or instrument: naming the
  // raise publicly is already the riskiest line on the site (see brief).
  currentlyRaising: {
    label: 'Currently raising',
    items: [
      { company: 'Solisia', round: 'HoldCo seed', cta: 'Request the deck', href: '#deck' },
    ],
  },
  items: [
    {
      sector: 'Cross-border payments infrastructure group',
      outcome: 'Investor relations and capital raising support through an institutional round.',
    },
    {
      sector: 'Blockchain financial infrastructure company',
      outcome: 'Token sale positioning, investor outreach and ongoing holder communications.',
    },
    {
      sector: 'Asset-backed issuance platform',
      outcome: 'Structuring input, investor materials and introductions to regional private capital.',
    },
    {
      sector: 'Early-stage venture firm, Southeast Asia',
      outcome: 'Deal sourcing and investor relations across the portfolio.',
    },
    {
      sector: 'Commodities trading venture',
      outcome: 'Raised US$2M. Investor introductions, materials and diligence support through the raise.',
    },
    {
      sector: 'Food and beverage establishment, Singapore and Thailand',
      outcome: 'Raised US$1M from private investors.',
    },
    {
      sector: 'Lightnet',
      outcome: 'Raised US$3.1M in a Series A round.',
    },
    {
      sector: 'Velo',
      outcome: 'Raised US$4M via a sale of future tokens agreement (SAFT).',
    },
    {
      sector: 'Evry',
      outcome: 'Raised US$1M via a sale of future tokens agreement (SAFT).',
    },
    {
      sector: 'China Ocean Resources',
      outcome:
        'Raised US$3M via equity placement. One of the largest PRC-based fishery companies, listed on the Korean stock exchange.',
    },
    {
      sector: 'Contango Oil and Gas',
      outcome: 'Raised US$20M via equity placement. Listed on the New York Stock Exchange.',
    },
    {
      sector: 'Sekawan Intipratama Tbk PT',
      outcome: 'Raised US$2M via shares financing. Listed on the Indonesian stock exchange.',
    },
    {
      sector: 'TEM Holdings Ltd',
      outcome: 'Raised US$1M via equity placement. Listed on the Hong Kong stock exchange.',
    },
    {
      sector: 'Falcon Energy Ltd',
      outcome: 'Raised S$3M via shares financing. Listed on the Singapore stock exchange.',
    },
    {
      sector: 'Merry Gardens',
      outcome:
        'Raised US$3.5M via equity placement. One of the largest furniture manufacturers, listed on the Hong Kong stock exchange.',
    },
    {
      sector: 'United Photovoltaics Group',
      outcome: 'Raised US$6M via equity placement. Listed on the Hong Kong stock exchange.',
    },
    {
      sector: 'China Zenith Chemical Group',
      outcome: 'Raised US$1M via equity placement. Listed on the Hong Kong stock exchange.',
    },
    {
      sector: 'Verita Healthcare Group',
      outcome: 'Raised S$10M in pre-IPO funding. Private company.',
    },
    {
      sector: 'Hatten Land Ltd',
      outcome: 'Raised S$2M via shares financing. Listed on the Singapore stock exchange.',
    },
    {
      sector: 'Superp',
      outcome:
        'Raised US$1M. Perpetual decentralised exchange offering high-leverage trading products across established, newly minted and Binance Alpha tokens.',
    },
  ],
};

export const contact = {
  heading: 'If you are raising, start early.',
  // Investors invest directly with the company, never through Solisia —
  // "register your mandate" rather than anything implying Solisia arranges
  // or executes the investment itself.
  investorHeading: 'Access curated dealflow, direct.',
  investorPitch:
    'We work with a network of family offices, funds and private investors across Asia. Register your mandate and we will flag relevant raises — you invest directly with the company, never through us.',
  holdcoHeading: 'The HoldCo deck, on request.',
  holdcoPitch:
    'Tell us who you are and we will send the deck. It is shared privately, with accredited and institutional investors only.',
  toggle: {
    raising: "I'm raising",
    investor: "I'm an investor",
    holdco: 'Request the deck',
  },
  email: 'info@solisia.net',
  phone: '+65 9857 5090',
  phoneHref: '+6598575090',
  website: 'solisia.net',
  locations: 'Asia',
};

export const footer = {
  legal:
    'Solisia Pte. Ltd. provides investor relations, communications and commercial advisory services. Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any security or investment product, nor does it constitute investment, legal or tax advice. Solisia does not manage client assets, hold client monies, or provide any service requiring a capital markets services licence. Any investments referred to are made on the company’s own account. Information about the holding company Solisia is building is general in nature; any offer of securities will be made only to eligible investors under private offering documents, and not through this website. © 2026 Solisia Pte. Ltd.',
};
