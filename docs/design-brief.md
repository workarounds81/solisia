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
| `dark` | `#070C0F` | Text on light; full-bleed hosting block |
| `light` | `#F2F4EF` | Page background; text on dark |
| `brass` | `#E6AD3D` | The **single** accent. Small labels and active states only. |

Defined once in `src/index.css` under `@theme`.

`dark` and `brass` are colour-matched to the printed business card
(`Solisia_Back.pdf`) via pixel sampling of its embedded raster — dominant
color mode across 100k+ classified pixels, not eyeballed. Original brief
values (`#132220` dark forest green, `#A9833F` muted brass) were the
starting placeholders before physical print collateral existed; the card
is now the source of truth and is meaningfully different — near-black
rather than dark green, a brighter/more saturated gold rather than muted
brass. `light` is unchanged: the card is a dark-background back design and
gives no evidence either way for the off-white token.

## Non-negotiable constraints

- **Restraint is the positioning.** No background patterns, no gradients.
  The "no logo mark" half of this rule was explicitly relaxed once printed
  cards existed with a sunburst mark on them (see Decisions) — one small
  instance of it now exists, deliberately not a repeating motif.
- **Brass is the only accent**, used sparingly. Never as a fill, never for large text.
- **Track record stays fully anonymised.** Sector and outcome only. No client names, ever.
- **Hosting section** is a full-bleed `dark` block containing one paragraph and nothing else.
- **Contact details:** phone, email, `solisia.net`, location. Location
  reads `Asia` (changed from the original `Singapore · Bangkok`) — see
  Decisions.

## WebGL and motion

- **World globe** (`src/three/createParticleGlobe.js`, mounted once by
  `GlobeBackground.jsx` in `App.jsx`, *not* scoped to Hero): a vanilla
  three.js point cloud sampled onto rough continent outlines (simplified
  lat/lon polygons — decorative, not cartographically precise), brass
  particles, normal blending. `position: fixed`, behind all content
  (`-z-10`), so it's a persistent background that never scrolls away —
  earlier it was mounted inside Hero's own box and disappeared past that
  section, which is what prompted this rework. Geometry is static; only the
  group's rotation changes per frame (slow constant auto-rotate, currently
  0.033 rad/s — dialled down 40% from an initial 0.055 per feedback that it
  read too fast — plus a light scroll-position nudge), which is why it can
  run for the whole session without a per-vertex update loop.
- **Camera dolly ("swoop"):** `camera.position.z` oscillates on a slow sine
  wave (base 6.4, amplitude ±1.7, 14s full cycle) on top of the rotation —
  the globe periodically drifts closer, then eases back out.
- **Blending note:** first pass used `AdditiveBlending`, which is close to
  invisible against a light background (white + a mid-brightness tint stays
  near white) — fine for a dark hero, wrong once the globe had to read
  against `bg-light` sections too. Switched to `NormalBlending`.
- **Section backgrounds are translucent** (`bg-light/80`, `bg-dark/80` for
  Hosting) so the fixed globe layer shows through everywhere, not just Hero,
  while staying restrained rather than a loud centrepiece. No
  `backdrop-blur` on these full-page washes — blur smears the sparse point
  cloud into a low-contrast haze rather than dimming it cleanly. Blur stays
  only on small-scale glass elements: the masthead, the Services filter bar,
  and the individual service row cards.
  Tuning history, in case it needs revisiting: an early pass at /85 opacity
  read as invisible; dropping to /50 (plus bigger, more opaque particles)
  made it clearly visible but "too obvious and distracting"; current values
  are the settled middle ground — particle opacity 0.65, size 0.036–0.045,
  wash opacity /80.
- **Masthead is permanently dark**, not tone-reactive. An earlier version
  tracked which section was in view and switched the header light/dark to
  match — reported back as the header "flickering" between white and green
  rather than reading as ambient, so that whole mechanism
  (`useSectionTone.js` + the `data-tone` attributes + the CSS driving it)
  was removed rather than kept unused.
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

- **Globe not animating, reported on mobile.** Investigated but not
  reproduced: tested against real mobile-device emulation profiles (iPhone
  13 and Pixel 5 — genuine mobile UA, touch support, correct DPR) with a
  fresh build; WebGL initialises, the canvas renders, no console errors,
  and `prefers-reduced-motion` reads `false`. Couldn't test the actual live
  URL or a real device from this environment. Found and fixed two real gaps
  regardless, since they're genuine mobile-only failure modes even though
  neither was confirmed as *the* cause here:
  - No `webglcontextlost`/`webglcontextrestored` handling. Mobile browsers
    reclaim WebGL contexts far more aggressively than desktop (memory
    pressure from other apps, backgrounding). Without handling this, a
    reclaimed context leaves the canvas showing its last frame forever —
    the rAF loop keeps calling `renderer.render()` into a context that no
    longer exists, which looks exactly like "frozen" rather than erroring.
    `createParticleGlobe.js` now calls `event.preventDefault()` on loss
    (required for the browser to even attempt restoration) and resumes via
    the existing `start()`/`stop()` on restore.
  - No `pageshow` handling. Safari's back/forward cache freezes the whole
    page — including the rAF loop — on navigating away, and does not fire
    `visibilitychange` on return from it. `GlobeBackground.jsx` now also
    listens for `pageshow` and restarts the loop if the page isn't hidden.
  Two things worth checking on the actual device if it's still stuck after
  this: whether iOS/Android "Reduce Motion" is on (the code intentionally
  renders one static frame and never starts the loop when that's set —
  working as designed, but invisible to a user who doesn't know the
  setting exists), and which browser/context it's viewed in (an in-app
  browser, e.g. Instagram/TikTok's, can report page visibility oddly).
- **The two supporting images were removed** ("pictures are a joke") —
  EngagementWorkflow and TrackRecord are back to text-only, and
  `src/assets/img/` no longer exists. The "too vanilla" feedback that led to
  adding them still stands as unresolved; the images just weren't the right
  answer. Read the removed entry below for what was tried and why, in case
  the next attempt wants the context. Reverted below, superseded by this one:
- ~~**Two supporting images**~~, per the earlier "too vanilla" feedback:
  `src/assets/img/engagement-room.jpg` (a real photo, in EngagementWorkflow)
  and `track-record-network.jpg` (an abstract network graphic, in
  TrackRecord). Both are flat-bordered banners (`border-dark/15`,
  `object-cover`, no rounded corners) between the section's heading/lede
  and its content, matching the rest of the design system.
  Both were generated against an earlier colour spec (pre-card-match) and
  arrived off-palette — the abstract graphic's background sampled to
  `#0d1e17` (green, close to the *original* placeholder dark, not the
  card-matched one) and its gold to a muted `#b8974c`; the photo was full
  natural colour. Recoloured both programmatically with a luminance-based
  duotone remap to the exact tokens (`#070C0F` → `#E6AD3D`) rather than
  asking for regenerated images or eyeballing a CSS filter — this
  guarantees an exact match, not an approximate one. The photo needed a
  gamma curve (`t ** 2.0`) biasing the luminance mapping toward the dark
  end before the duotone lerp; a straight linear duotone flattened it into
  a uniform yellow-green wash and lost the photographic depth that made it
  work as a moody, atmospheric room shot in the first place — only genuine
  highlights (the lamp, the window glow) should reach full brass. The
  network graphic, being near-binary already (flat background + thin
  lines), needed no such curve.
- **Sunburst mark** (`src/components/Sunburst.jsx`) reproduces the mark from
  the printed card as SVG — a quarter-circle arc with 36 radiating lines of
  deterministic-but-irregular length, so it reads as hand-drawn rather than
  a mechanical starburst. Placed once, in the Contact footer's dark strip,
  bottom-right corner, at 50% brass opacity — restrained per explicit user
  choice among three options (add it restrained / stay typographic / show a
  mockup first). Deliberately not placed in Hosting, which keeps its own
  separate "one paragraph, no decoration" rule untouched — that constraint
  wasn't part of what was being reconsidered.
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
- **Positioning moved from Singapore-specific to Asia-wide.** Every mention
  of "Singapore · Bangkok" as the company's *own* location (Hero meta,
  Contact "Offices", `<title>`/meta description, the hosting paragraph, the
  capital-introduction description, the "10 yrs" figure caption) now reads
  "Asia". Left untouched: the one Track Record case-study line ("Food and
  beverage establishment, Singapore") — that's a specific anonymised
  client's location, a historical fact about that engagement, not the
  company's own branding, so it wasn't in scope for this change.
- **Hero kicker** ("Investor Relations & Capital Advisory") added above the
  H1 as a small brass eyebrow, to state the core service line unmistakably
  up front. Adding it shifted the `.reveal` stagger from 3 elements to 4 —
  `index.css` now has a `:nth-child(4)` rule so the fade-in sequence still
  covers all of kicker → headline → lede → meta list.
- **Footer "Solisia Pte. Ltd. · UEN 202639762M" line removed** from the
  Contact page's dark strip (was the top-right item next to the wordmark).
  The required legal disclaimer paragraph below it still names the company
  where the disclaimer text itself requires it — only the standalone
  entity/registration line was cut. `footer.entity` and
  `footer.registration` were removed from `site.js` as dead exports rather
  than left unused.
- **`meta.title`/`meta.description` in `site.js` were dead code** — the
  real `<title>` and `<meta name="description">` live directly in
  `index.html` (this is a plain static SPA, no head-management library) and
  were never actually reading from `site.js`. Removed the unused export and
  fixed the real tags in `index.html` directly instead.

- Copy is centralised in `src/content/site.js`; components hold no prose.
- Contact form has no backend. `submitContact` POSTs to `VITE_CONTACT_ENDPOINT`
  if set, otherwise falls back to a pre-filled `mailto:`.
