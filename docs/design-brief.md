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

## Reserved for later

- `#canvas-container` in `Hero.jsx` (`relative w-full h-[500px]`) is the mount for a
  scroll-bound Three.js particle globe. Keep it empty until that work starts.

## Decisions

- Copy is centralised in `src/content/site.js`; components hold no prose.
- Contact form has no backend. `submitContact` POSTs to `VITE_CONTACT_ENDPOINT`
  if set, otherwise falls back to a pre-filled `mailto:`.
