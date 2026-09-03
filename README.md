# Solisia

Landing page for Solisia. Vite + React + Tailwind CSS v4, deployed to GitHub
Pages for free, served at the custom domain solisia.net.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173/
npm run build     # outputs dist/
npm run preview   # serves dist/ locally
```

Node 22 or later.

## Structure

```
.
├── index.html                  # Entry; loads Google Fonts
├── vite.config.js              # base: '/' — served at the solisia.net root
├── public/
│   ├── .nojekyll               # Stops Pages running Jekyll on the output
│   ├── CNAME                   # solisia.net — GitHub Pages custom domain
│   └── 404.html                # Self-contained not-found page
├── src/
│   ├── index.css               # Tailwind + @theme design tokens
│   ├── main.jsx
│   ├── App.jsx                 # Mounts GlobeBackground once, then sections
│   ├── content/site.js         # ALL copy lives here
│   ├── assets/img/              # Duotoned to the exact brand tokens — see
│   │                             # design-brief.md "Decisions" before adding more
│   ├── components/
│   │   ├── GlobeBackground.jsx # Fixed, page-level — see "WebGL" below
│   │   ├── Masthead.jsx        # Sticky, permanently dark
│   │   ├── Sunburst.jsx        # The printed card's mark, reproduced as SVG
│   │   ├── Hero.jsx
│   │   ├── Services.jsx        # 4 blocks, sticky category filter
│   │   ├── HostingCallout.jsx  # Full-bleed dark, one paragraph
│   │   ├── EngagementWorkflow.jsx  # Includes a banner photo
│   │   ├── TrackRecord.jsx     # Anonymised; includes a banner graphic
│   │   └── Contact.jsx         # Footer + form + Sunburst
│   ├── three/createParticleGlobe.js  # Vanilla three.js, no r3f/GSAP
│   ├── hooks/useContactForm.js
│   └── lib/submitContact.js    # Form transport (endpoint or mailto)
└── docs/design-brief.md        # Design constraints — read before changing styles
```

## Conventions

- **Copy lives in `src/content/site.js`.** Components render it and contain no prose.
- **Brand values live in `src/index.css` under `@theme`.** Never hard-code a hex
  or font name in a component.
- **Read `docs/design-brief.md`** before touching visual design. Several
  constraints there are non-negotiable.
- 2-space indentation via `.editorconfig`.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to the `gh-pages` branch
on every push — GitHub Pages serves that branch (*Settings → Pages → Source:
Deploy from a branch → `gh-pages` / root*). Two independent targets live side
by side on it, chosen by which branch triggered the run:

| Push to | Vite `base` | Published to | Served at |
| --- | --- | --- | --- |
| `main` | `/` | `gh-pages:/` (root) | <https://solisia.net/> |
| `claude/solisia-landing-setup-sztnel` | `/preview/` | `gh-pages:/preview/` | <https://solisia.net/preview/> |

The publish step checks out the existing `gh-pages` branch and replaces only
its own target directory, so a preview push never touches the production
files and vice versa — there's always a live preview to review before
promoting anything to `main`. `public/CNAME` (`solisia.net`) is what tells
GitHub Pages to serve the site at the custom domain instead of
`workarounds81.github.io/solisia/`; DNS for the domain has to point at
GitHub Pages for it to resolve (A records at the apex, or a CNAME on `www`
— see GitHub's "Managing a custom domain" docs).

The workflow deliberately avoids the `github-pages` environment and the
`deploy-pages` action; it only needs `contents: write` to push a branch.

## Contact form

Static host, no backend. Set `VITE_CONTACT_ENDPOINT` (see `.env.example`) to
POST submissions to Formspree or a serverless function. Unset, the form opens
the visitor's mail client with the message pre-filled.
