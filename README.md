# Solisia

Static landing page for Solisia. No build step, no framework — plain HTML, CSS
and JavaScript, served as-is.

## Running locally

Any static file server works. From the repository root:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or, if you prefer Node:

```bash
npx serve .
```

Opening `index.html` directly via `file://` mostly works, but relative paths and
some browser behaviour differ from a real server — prefer one of the above.

## Structure

```
.
├── index.html            # Landing page
├── 404.html              # Not-found page for static hosts
├── assets/
│   ├── css/
│   │   ├── reset.css     # Baseline reset
│   │   ├── tokens.css    # Design tokens — colors, type, spacing, radii
│   │   └── styles.css    # Layout and components
│   ├── js/
│   │   └── main.js       # Dependency-free progressive enhancement
│   ├── img/              # Photography, illustrations, OG image
│   ├── icons/            # Favicons and inline icon sources
│   └── fonts/            # Self-hosted webfonts
└── docs/
    └── design-brief.md   # Design brief and decisions
```

## Conventions

- **Styling goes through tokens.** `assets/css/tokens.css` holds every color,
  size and radius. Reskinning should mean editing that file, not hunting through
  `styles.css`. Avoid hard-coded values elsewhere.
- **CSS load order matters:** `reset.css` → `tokens.css` → `styles.css`.
- **Class naming** follows BEM-ish `block__element--modifier`.
- **JavaScript is an enhancement.** The page must stay readable and navigable
  with scripts disabled.
- **Indentation** is 2 spaces, enforced by `.editorconfig`.

## Status

The current `index.html` is a placeholder scaffold. The token values in
`tokens.css` are neutral defaults, not the Solisia brand palette. Both get
replaced once the design brief and page markup land.

## Deployment

The site is served by GitHub Pages directly from the `main` branch
(*Settings → Pages → Source: Deploy from a branch → `main` / `(root)`*). Every
push to `main` republishes it, usually within a minute.

There is deliberately no build step and no deploy workflow: the repository root
*is* the site. `.nojekyll` is what makes this safe — without it Pages would run
the files through Jekyll, which ignores paths beginning with an underscore.
Don't delete it.

If a build step is ever added (a bundler, Tailwind, minification), this becomes
a GitHub Actions deployment instead, and the Pages source has to change to
"GitHub Actions" to match.

Live URL: <https://workarounds81.github.io/solisia/>

Because this is a *project* site, it is served from the `/solisia/` subpath
rather than a domain root. Two consequences worth remembering:

- **Use relative asset paths** (`assets/css/...`), never root-absolute ones
  (`/assets/css/...`) — the latter would resolve to the wrong place.
- `404.html` is self-contained (inline styles) because GitHub serves it for
  missing URLs at any depth, where relative paths are unreliable. Its
  "Back to home" link is hardcoded to `/solisia/`.

If a custom domain is added later at the apex, the subpath goes away and that
`404.html` link should become `/`.
