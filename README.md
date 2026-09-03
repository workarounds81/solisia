# Solisia

Landing page for Solisia. Vite + React + Tailwind CSS v4, deployed to GitHub
Pages for free.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173/solisia/
npm run build     # outputs dist/
npm run preview   # serves dist/ locally
```

Node 22 or later.

## Structure

```
.
├── index.html                  # Entry; loads Google Fonts
├── vite.config.js              # base: '/solisia/' for the Pages subpath
├── public/
│   ├── .nojekyll               # Stops Pages running Jekyll on the output
│   └── 404.html                # Self-contained not-found page
├── src/
│   ├── index.css               # Tailwind + @theme design tokens
│   ├── main.jsx
│   ├── App.jsx                 # Section order
│   ├── content/site.js         # ALL copy lives here
│   ├── components/
│   │   ├── Hero.jsx            # Headline + #canvas-container mount
│   │   ├── Services.jsx        # 4 blocks, sticky category filter
│   │   ├── HostingCallout.jsx  # Full-bleed dark, one paragraph
│   │   ├── EngagementWorkflow.jsx
│   │   ├── TrackRecord.jsx     # Anonymised
│   │   └── Contact.jsx         # Footer + form
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

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site
and force-pushes `dist/` to the `gh-pages` branch. GitHub Pages serves that
branch (*Settings → Pages → Source: Deploy from a branch → `gh-pages` / root*).

Live URL: <https://workarounds81.github.io/solisia/>

This is a *project* site served from the `/solisia/` subpath, which is why
`vite.config.js` sets `base: '/solisia/'`. If a custom apex domain is added,
change that to `'/'` and the `href` in `public/404.html`.

The workflow deliberately avoids the `github-pages` environment and the
`deploy-pages` action; it only needs `contents: write` to push a branch.

## Contact form

Static host, no backend. Set `VITE_CONTACT_ENDPOINT` (see `.env.example`) to
POST submissions to Formspree or a serverless function. Unset, the form opens
the visitor's mail client with the message pre-filled.
