# Design brief — Solisia

Source of truth for design decisions. Components must not drift from this.

## Typography

| Role | Face | Weight |
| --- | --- | --- |
| Display / headings | Newsreader | Light (300) |
| Body | Instrument Sans | Regular (400), Medium (500) |

Loaded from Google Fonts in `index.html`. Tokens: `font-display`, `font-body`.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| `dark` | `#132220` | Text on light; full-bleed hosting block |
| `light` | `#F2F4EF` | Page background; text on dark |
| `brass` | `#A9833F` | The **single** accent. Small labels and active states only. |

Defined once in `src/index.css` under `@theme`.

## Non-negotiable constraints

- **Restraint is the positioning.** No logo mark, no background patterns, no gradients.
- **Brass is the only accent**, used sparingly. Never as a fill, never for large text.
- **Track record stays fully anonymised.** Sector and outcome only. No client names, ever.
- **Hosting section** is a full-bleed `dark` block containing one paragraph and nothing else.
- **Contact details:** phone, email, `solisia.net`, `Singapore · Bangkok`.

## WebGL and motion

- **World globe** (`src/three/createParticleGlobe.js`, mounted once by
  `GlobeBackground.jsx` in `App.jsx`, *not* scoped to Hero): a vanilla
  three.js point cloud sampled onto rough continent outlines (simplified
  lat/lon polygons — decorative, not cartographically precise), brass
  particles, normal blending. `position: fixed`, behind all content
  (`-z-10`), so it's a persistent background that never scrolls away —
  earlier it was mounted inside Hero's own box and disappeared past that
  section, which is what prompted this rework. Geometry is static; only the
  group's rotation changes per frame (slow constant auto-rotate, ~0.055
  rad/s, plus a light scroll-position nudge), which is why it can run for
  the whole session without a per-vertex update loop.
- **Blending note:** first pass used `AdditiveBlending`, which is close to
  invisible against a light background (white + a mid-brightness tint stays
  near white) — fine for a dark hero, wrong once the globe had to read
  against `bg-light` sections too. Switched to `NormalBlending`.
- **Section backgrounds are translucent + blurred** (`bg-light/85
  backdrop-blur-sm`, `bg-dark/85` for Hosting) precisely so the fixed globe
  layer shows through everywhere, not just Hero. This extends the glass
  language already used on Services sitewide rather than introducing a
  separate treatment.
- **Perf guards:** three.js is dynamically imported (its own ~130KB gzip
  chunk, not in the main bundle), particle count roughly halves under
  640px, the render loop pauses on `visibilitychange`, and
  `prefers-reduced-motion` renders one static frame with no rAF loop at
  all. No `IntersectionObserver` start/stop any more — a fixed-position
  layer is always "on screen" by definition, so that logic became dead
  weight and was removed rather than kept for a scroll-scoped mount that no
  longer exists.
- **Ambient tone** (`useSectionTone.js` + unlayered CSS in `index.css`): an
  `IntersectionObserver` ranks sections by *absolute visible pixel height*
  (not `intersectionRatio` — that would let a short, fully-visible section
  outrank a taller one only half in view) and stamps the winner's tone onto
  `<html data-tone>`. Only the sticky masthead reads it, transitioning
  solid-color background/text — no gradients, sections keep their own flat
  backgrounds untouched.
- **Frosted glass** is on the Services filter bar and each service row
  (`backdrop-blur-md` + a translucent fill + a hairline border), per the
  follow-up brief. This is a deliberate, scoped exception to "no decoration" —
  everywhere else stays flat.

## Decisions

- **Hosting section vs. prototype.** The prototype had a heading ("Some rooms
  are worth the table."), a brass rule and three paragraphs. The brief mandates
  one paragraph, no decoration. The three paragraphs are joined verbatim into
  one; heading and rule are omitted. Reinstate the heading in `site.js` if the
  constraint was meant more loosely.
- **Service filter categories** reuse the engagement sequence's own words
  (Position / Introduce / Sustain) rather than inventing new terms. Mapping is
  in `site.js`; the prototype had no categories.
- **Masthead** is a seventh component. The prototype has a sticky nav; the
  Services filter bar sticks flush beneath it (`top-16`).
- **Contact form** is not in the prototype but is required by the brief, so
  Contact.jsx carries both the prototype's details list and the form. The
  prototype's legal disclaimer is preserved verbatim as the footer strip.
- Extra prototype tones (`slate`, `stone`, `muted`, `brass-soft`, `ink-deep`)
  are not added as tokens; they are expressed as opacities of the three brief
  colours to keep the palette exact.

- Copy is centralised in `src/content/site.js`; components hold no prose.
- Contact form has no backend. `submitContact` POSTs to `VITE_CONTACT_ENDPOINT`
  if set, otherwise falls back to a pre-filled `mailto:`.
