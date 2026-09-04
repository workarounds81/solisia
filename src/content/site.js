/**
 * All site copy lives here, extracted from the design prototype. Components
 * read from this file and contain no prose of their own.
 */

export const wordmark = 'SOLISIA';

export const nav = [
  { href: '#work', label: 'What we do' },
  { href: '#engagement', label: 'Engagement' },
  { href: '#record', label: 'Track record' },
  { href: '#contact', label: 'Contact' },
];

export const hero = {
  kicker: 'Investor Relations & Capital Advisory',
  headline: 'Capital moves after the meeting,',
  headlineEmphasis: 'not before it.',
  lede:
    'Solisia is an investor relations and capital advisory firm in Asia. We work with founders and fund managers across Southeast Asia on how they are positioned, who they meet, and what happens in the eighteen months after the cheque clears.',
  meta: ['Asia'],
};

/**
 * Filter categories reuse the engagement sequence's own vocabulary
 * (Position → Introduce → Sustain) rather than inventing new terms.
 */
export const serviceCategories = [
  { id: 'position', label: 'Position' },
  { id: 'introduce', label: 'Introduce' },
  { id: 'sustain', label: 'Sustain' },
];

export const services = {
  heading: 'Four things, done properly',
  lede: 'We are not a placement agent and we are not a marketing shop. We sit between the two, and we stay after the raise closes.',
  items: [
    {
      id: 'investor-relations',
      category: 'sustain',
      title: 'Investor relations',
      description:
        'Reporting cadence, quarterly updates, the awkward conversations, and the register kept warm between rounds. Most founders build this function late and badly. It is the part we care about most.',
    },
    {
      id: 'capital-introduction',
      category: 'introduce',
      title: 'Capital introduction',
      description:
        'Targeted introductions to family offices, funds and private investors across Asia — screened for mandate and ticket size before anyone’s time is spent.',
    },
    {
      id: 'positioning',
      category: 'position',
      title: 'Positioning and materials',
      description:
        'Narrative, deck, one-pager, FAQ, diligence questionnaire, data room. Written to survive scrutiny rather than to win a first meeting.',
    },
    {
      id: 'advisory',
      category: 'position',
      title: 'Advisory',
      description:
        'Commercial structuring of the offer itself: terms, economics, how the product is put in front of the market. We occasionally take small positions on our own account in deals we advise.',
    },
  ],
};

/**
 * The brief mandates a single paragraph with no decoration here. The
 * prototype's three paragraphs are joined verbatim; its heading ("Some rooms
 * are worth the table.") and brass rule are omitted to honour the constraint.
 */
export const hosting = {
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
    { value: 'US$500M+', label: 'Raised across token, equity and asset-backed structures' },
    { value: '5 exchanges', label: 'Listed across', isText: true },
    { value: '10 yrs', label: 'Operating across Asia' },
  ],
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
      sector: 'Food and beverage establishment, Singapore',
      outcome: 'Raised US$1M from private investors.',
    },
    {
      sector: 'Lightnet',
      outcome: 'Raised US$3.1M in a Series A round.',
    },
    {
      sector: 'Token issuance (SAFT)',
      outcome: 'Raised US$5M via a sale of future tokens agreement.',
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
  email: 'info@solisia.net',
  phone: '+65 9857 5090',
  phoneHref: '+6598575090',
  website: 'solisia.net',
  locations: 'Asia',
};

export const footer = {
  legal:
    'Solisia Pte. Ltd. provides investor relations, communications and commercial advisory services. Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any security or investment product, nor does it constitute investment, legal or tax advice. Solisia does not manage client assets, hold client monies, or provide any service requiring a capital markets services licence. Any investments referred to are made on the company’s own account. © 2026 Solisia Pte. Ltd.',
};
