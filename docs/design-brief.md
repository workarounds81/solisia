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
- **Jet streams:** three wavy gold (`#E6AD3D`) rings, positions from
  `jetStreamRingPositions()` in the same file, floating just outside the dot
  sphere (`RADIUS * 1.06`) so they read as a separate wind layer rather than
  fighting the dots for the same surface. Their own group rotates opposite
  the dots' rotation (`JET_ROTATE_SPEED`, subtracted where the dots' speed
  is added) and at a different magnitude, so it doesn't read as a mirrored
  copy.
  Rendered with `Line2`/`LineMaterial`/`LineGeometry` (three's fat-lines
  addon under `three/examples/jsm/lines/`), not `THREE.LineLoop` +
  `LineBasicMaterial`: an ordinary WebGL line is always exactly 1 device
  pixel wide — `LineBasicMaterial.linewidth` is ignored on the ANGLE/D3D
  backend Chrome uses, so there's no way to make one genuinely thicker.
  First pass tried compensating with opacity alone (still 1px, just less
  transparent) and landed at 0.55 after measuring actual on-screen pixel
  colour against the computed background+brass blend rather than
  eyeballing it — but "thicker" was the explicit follow-up ask, which
  opacity alone can't deliver on a 1px line. `LineMaterial` draws real
  screen-space geometry instead (`linewidth: 2.5`, in pixels, `worldUnits:
  false` so it stays a constant on-screen width through the camera dolly
  rather than changing with distance) — opacity could then come back down
  to 0.6. `LineMaterial.resolution` has to be kept equal to the renderer's
  actual size or the pixel-width math comes out wrong; `resize()` updates
  it alongside `renderer.setSize()`. Verified after a viewport resize in a
  real browser that the width stays correct, not just at initial load.
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

- **Globe rotation no longer respects `prefers-reduced-motion`.** Direct
  feedback: gating the animation on that setting effectively disabled it
  for most mobile visitors, since reduce-motion is commonly on there
  (battery-saving toggles, defaults) — not a niche accessibility edge
  case for this audience. Re-examined against what the setting is
  actually for: WCAG's target is disruptive motion (parallax, flashing,
  vestibular-triggering effects), not small-scale ambient background
  motion, so a slow autonomous spin doesn't need to be suppressed by it.
  Landed on a split: the autonomous rotation + camera dolly always run;
  only the scroll-position-coupled nudge still checks the setting, since
  motion synced to the user's own scroll input is exactly the pattern
  WCAG 2.3.3 (Animation from Interactions) calls out. Verified with
  Playwright's `reducedMotion: 'reduce'` context emulation: two
  screenshots 4 seconds apart show the dot cluster has visibly rotated
  even with the setting forced on.
- **Mobile dot size and density, reported as "a bunch of dots instead of
  a globe."** Found a real, backwards assumption in the numbers: mobile
  particles were set *larger* than desktop (0.045 vs 0.036) on the theory
  that small screens need bigger UI elements. Wrong for a point cloud —
  what resolves as "a sphere" rather than "a handful of blobs" is
  density (many small points), not per-dot size. Mobile is now smaller
  than desktop (0.024 vs 0.036) with count raised from 750 to 1300 to
  compensate, and opacity nudged up slightly (0.85 vs 0.75) so the finer
  points don't read as fainter overall.
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

- **Globe particle colour changed from brass to near-black** (`#E6AD3D` ->
  `#070C0F`, matching the masthead/`--color-dark` token), per feedback that
  brass dots were "vaguely visible." Trying the header's own colour instead:
  contrast against the light sections (most of the page) is now very high —
  near-black points on off-white. Trade-off, and the reason this is called
  out here rather than just changed silently: on the dark sections
  (Masthead, Hosting, the Contact footer strip) the dots are now much
  closer to their background colour. They stay faintly visible there only
  because those sections use `bg-dark/80` or `/92`, not a fully opaque
  fill, so a sliver of the lighter body/globe layer beneath still shows
  through — verified in a real browser rather than assumed. If that reads
  as too faint on the dark sections in practice, the fix is a second colour
  for the material (dark dots on light sections, light/brass dots on dark
  ones) rather than one colour sitewide.

- **Custom domain (solisia.net) wired up.** `public/CNAME` added, `vite.config.js`
  and `deploy.yml`'s per-branch base both switched from the GitHub Pages
  project-site subpath (`/solisia/`, `/solisia/preview/`) to the domain
  root (`/`, `/preview/`). `public/404.html` had a hardcoded `/solisia/`
  "back to home" link and the *original* placeholder palette
  (`#132220`/`#a9833f`) baked into inline `<style>` rather than reading the
  real tokens (it's deliberately self-contained, so it can't `@import`
  index.css) — both fixed while touching the file: link now `/`, colours
  now `#070C0F`/`#E6AD3D`. DNS itself is outside this repo's control —
  documented for whoever manages the registrar, not done here.

- **Favicon added, reusing the sunburst mark.** `index.html` previously
  suppressed the favicon entirely (`href="data:,"`) as part of the original
  "no logo mark" rule — already superseded once for the Contact footer's
  sunburst (see that entry above), and now again here. Rather than a new
  design, `public/favicon.svg` redraws the same mark
  (`src/components/Sunburst.jsx`) at favicon scale: 11 rays instead of 36
  and no length jitter, since the jitter that reads as "hand-drawn" at full
  size just reads as noise at 16-32px; thicker strokes for the same reason.
  Checked in a real render (Playwright, 16px at 4x device scale — the
  smallest size a browser tab actually shows) rather than assumed legible.
  `favicon-32.png` and `apple-touch-icon.png` are rasterised from the same
  SVG (no `rsvg-convert`/`cairosvg` available in this environment, so via
  headless Chromium) as fallbacks for browsers that don't support SVG
  favicons and for iOS home-screen bookmarks.

- **Track Record reversed from anonymised to named, and expanded from 5
  case studies to ~19.** `TrackRecord.jsx` previously carried "Anonymised
  as a matter of course: sector and outcome only, never a client name" —
  a deliberate original rule. Superseded on direct instruction: the
  business's own principal supplied a real deal list by name, and every
  named entry is for a *publicly listed* company's own capital raise
  (Korean, NYSE, Indonesian, Hong Kong and Singapore exchanges) — public
  record via that company's own filings, not confidential client
  information, unlike the four pre-existing anonymised engagements
  (which stay anonymised; nothing in the new list named a replacement for
  them). `trackRecord.lede`'s "client names are withheld as a matter of
  course" line was dropped for the same reason — it would now be false —
  and replaced with "select transactions below; some engagements remain
  confidential," which is still true of the four untouched entries.
  Figure 2 ("Payments, Web3, ventures") was already stale against the new
  list's actual spread (fishery, oil & gas, chemicals, healthcare,
  photovoltaics, furniture, land, alongside the existing payments/Web3
  ones) — replaced with "5 exchanges" / "Listed across," a real count
  derived directly from the named entries rather than a vague sector
  gloss.
  Layout: a single full-width row per item read as an excessive scroll at
  ~19 entries (flagged directly). `TrackRecord.jsx`'s items list moved
  from one wide `dt`/`dd` row per deal to a two-column grid of compact
  cards (smaller text, tighter line-height) — verified in a real browser
  that this roughly halves the section's height on desktop without
  crowding the two-exchange-heavy entries (Hong Kong ×4, Singapore ×2)
  into illegibility; mobile stays single-column since two columns at
  390px would crush company names like "Cross-border payments
  infrastructure group."

- **Contact became a two-mode toggle: fund managers raising vs. investors
  registering interest.** Deliberately *not* a live investor
  portal/marketplace (no login, no deal listings, no self-serve matching) —
  discussed directly first because a fee tied to introducing investors
  edges toward regulated (in Singapore, CMS-licensable) activity, and a
  self-serve platform reads as operating one in a way a lead-capture form
  doesn't. Landed on: investors register a mandate (ticket size, sectors)
  and Solisia follows up manually — same posture as the existing
  fund-manager side, just a second form. Investors invest directly with the
  company, never through Solisia; `contact.investorPitch` says so
  explicitly rather than leaving it implied.
  An accredited/institutional self-declaration checkbox was in the first
  pass (a cheap, meaningful risk-reduction step given the regulatory
  discussion above) but cut on direct instruction — ticket size and
  sectors are both optional now, so the investor side only actually
  requires name and email.
  `useContactForm.js` grew a `mode` ('raising' | 'investor'), separate
  initial values and validation per mode (message required for raising;
  nothing extra required for investor beyond name/email), and
  `switchMode()` resets values/status so stale data or an error from one
  mode can't leak into the other. `submitContact.js` picks the email
  subject/body shape from `values.mode` so both variants land as
  distinguishable emails in the same inbox — no second Formspree endpoint
  or mailbox needed. Verified in a real browser: each mode's own validation
  fires correctly, a valid submission on each mode reaches the success
  state (including investor mode with only name+email filled in, once the
  checkbox was cut), and switching modes clears the previous mode's fields
  rather than carrying them over.
  The fund-manager side's copy was deliberately left unchanged (still "If
  you are raising, start early.", no explicit retainer/mandate language
  added) — a direct call, not an oversight.

- **"Now building" section for the HoldCo, thesis only.** Source: the
  HoldCo investment deck (v3.0). The site stays an IR/advisory site; the
  HoldCo gets one section directly under Hero (`NowBuilding.jsx`, nav
  link first) rather than a rewrite or a separate page. What is public:
  the thesis (acquire owner-run essential businesses, selectively their
  property, one AI back office "Solisia Central"), the four verticals,
  Singapore and Bangkok as acquisition geography, and the deck's closing
  line. What is deliberately absent: raise size, valuation cap,
  instrument, the RWA token, yields, entry multiples, the margin gate,
  the RTO exit path and every financial. The round is a private placement
  and publicly advertising its terms risks the exemption it relies on, so
  those stay in the deck, sent on request. Get the final wording
  reviewed by counsel.
  Light section, not dark: Hosting stays the page's only full-bleed dark
  block. Distinguished instead by a brass kicker with a dot, a large
  serif headline in Hero's plain + italic pattern, and the same
  brass-left-border callout used for "Currently raising".
  The CTA links to `#deck` (an id on Contact's grid), and Contact listens
  for that hash on load and on `hashchange` to open the form on a third
  mode, `holdco` (name, email, optional firm and note; subject "HoldCo
  deck request from …"). A deck link can be sent directly as
  `solisia.net/#deck`. The CTA re-dispatches `hashchange` when the hash
  is already `#deck`, otherwise a second click after switching modes
  would not switch back.
  "Shared privately with accredited and institutional investors" appears
  as a statement in the section and the form pitch. It is not a form
  field: the earlier instruction to drop the accreditation checkbox
  still stands.
  The track-record headline figure (US$500M+) now says it is the
  principals' combined figure across public placements and private
  rounds. The deck's "$10M+" is Rey personally; both are true, and the
  label now makes the scope explicit so the two don't read as a
  contradiction.
  Footer legal gains one sentence: HoldCo information is general, and any
  offer of securities is made only to eligible investors under private
  offering documents, not through the website.
  Follow-up: the deck's "Corporate architecture" slide is rebuilt in
  HTML inside the section, after the verticals and before the CTA, with
  Solisia Central in a dark centre box, four OpCo boxes at the corners,
  and brass connectors. The connectors are just the container's two
  diagonals drawn behind solid boxes; gaps are 40% of width and 12rem of
  height so the diagonals leave each box near its inner corner. Shown
  from `lg` up only; below that it is too cramped for the lines to read,
  so it stacks as Central plus the OpCos on a brass spine.
  Later removed. Once the sector photos landed, the same four sectors
  appeared three times in one section (list, photos, OpCo boxes); its one
  new idea, a shared back office, was already in the lede, and "OpCo",
  "EBITDA · NOI" and "AP/AR" are diligence vocabulary that belongs in the
  deck. It also made Now building the longest section, pushing the
  advisory business down the page. Its "each business keeps its people"
  idea is carried by the closing line instead.
  "Currently raising" now lists two entries, Solisia (HoldCo seed, CTA to
  `#deck`) first, then Lightnet. On direct instruction. Naming Solisia's
  own raise publicly is the line most likely to count as calling
  attention to a private offer, so it carries no amount, cap or
  instrument; counsel review should cover this line specifically.

- **Photography.** The site was all words; seven AI-generated photographs
  were commissioned to one shared style line (editorial documentary,
  natural light, near-black / off-white / one brass accent, no text, no
  faces to camera). Deliberately none in Hero (the globe is the hero
  visual), Engagement, Track record or Contact.
  Pipeline: originals are never committed. Each is resized once with
  sharp into AVIF (q50) + WebP (q72) at a few widths into
  `src/assets/images/`, with `manifest.json` recording widths, intrinsic
  size and the image's average colour. `Photo.jsx` imports the variants
  through `import.meta.glob` (hashed, base-path aware for `/preview/`),
  serves `<picture>` with AVIF first, lazy-loads, reserves the box with
  `width`/`height` + an aspect class, paints the box in the average
  colour, and fades the image in on load, so nothing pops or shifts.
  Width steps are chosen so a 3× phone gets roughly 2× pixels, not 3×:
  street 640/1120/1536, portraits 400/700. Measured fetches: desktop 1×
  about 100 KB for the whole section, iPhone 13 about 135 KB, 2× desktop
  about 180 KB.
  Placement: the street scene sits full-width under the Now building
  lede (3:2 on phones, 21:9 from md up, focal point 30% from the top).
  The four sector photos sit above each vertical (3:2 on phones, 4:5
  from sm up) but render only when all four exist in the manifest: a row
  with one gap reads as broken.
  The flat-lay sits beside the Services heading and lede (two columns
  from md up, bottoms aligned; below the lede on phones). The dinner is a
  full-bleed background to Hosting under a `dark/75` scrim with an empty
  alt: texture, not content. This relaxes the "one paragraph and nothing
  else" rule in letter only; the reader still meets one paragraph, and
  the section's background went from translucent `dark/80` to solid
  `dark` behind the photo.
  Whole-page photo weight measured: about 170 KB on desktop, 230 KB on an
  iPhone 13, all lazy, none above the fold.

- **Wider column on large desktops.** On a 2560px monitor at 100% zoom
  the fixed 72rem column filled 43% of the screen and read as squeezed.
  Every section now uses `max-w-site` (defined once in `index.css`):
  72rem as before up to 1535px, 88rem from 1536px. From 1920px the root
  font size also steps to 112.5%, scaling type and spacing with it, so
  the column reaches about 1584px (about 62% of a 2560px screen).
  Measures stay in `ch`, so paragraphs remain readable; the extra room
  goes to grids, photos and the two-column layouts. Phones, tablets and
  laptops are unchanged. Photo `sizes` hints gained the two new
  breakpoints so wide screens pick the sharper files.

- **Frosted panels behind small text.** Small text sitting directly over
  the rotating globe broke up as dots passed behind it (flagged on the
  deal list, the Currently raising callout and the contact form). One
  `panel` utility in `index.css` (rounded-sm, `dark/10` border,
  `light/60` fill, 8px backdrop blur) is now shared by the Services rows
  (previously `light/40`), the Currently raising callout (keeping its
  brass left edge), every Track record deal as its own card, the contact
  details list and the contact form. Large headings stay on the open
  background, where the globe doesn't hurt legibility.

- Copy is centralised in `src/content/site.js`; components hold no prose.
- Contact form has no backend. `submitContact` POSTs to `VITE_CONTACT_ENDPOINT`
  if set, otherwise falls back to a pre-filled `mailto:`.
