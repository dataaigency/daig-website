# dataaigency.com

Marketing site for **Data Aigency**, the remote data and AI practice of Vadim Lucas, working with teams across the EU. Live at [dataaigency.com](https://dataaigency.com).

The site is its own first case study: fully pre-rendered React, translation-ready from day one, zero external requests at page load, deployed free on GitHub Pages, and built in the open in this repo.

## Stack

- React 19 + Vite + TypeScript, react-router
- Full static pre-render at build time (`scripts/prerender.mjs`): per-route HTML, sitemap, JSON-LD structured data
- react-i18next with all copy in `src/locales/` (EN live; NL/FR/DE/ES/PT planned)
- Blog posts as MDX in `src/content/work/`, with hand-drawn animated SVG diagrams (`src/components/flows/`) and Chart.js where a chart earns its place
- Self-hosted fonts, no trackers, no cookies, no external calls on page load

## Develop

```
npm install
npm run dev        # dev server
npm test           # Vitest (jsdom + Testing Library)
npm run build      # typecheck + client build + SSR + prerender -> dist/
npm run diagrams   # export every diagram as a standalone animated SVG to assets/diagrams/
```

## Deploy

Push to `main` → GitHub Actions builds and publishes to GitHub Pages (custom domain via `public/CNAME`).

## Content pipeline

`docs/content-plan.md` is the standing editorial plan. Twice a week a scheduled Claude cloud routine (`docs/loops/blog-loop.md`) researches, writes and verifies one post with one new diagram and opens a pull request; an hour later an independent review routine (`docs/loops/blog-review-loop.md`) fact-checks it against sources it picks itself, checks voice and build, and merges only if everything passes. Merging deploys.

Rules that bind everything (brand, voice, EU market, EUR pricing) live in `CLAUDE.md`.
