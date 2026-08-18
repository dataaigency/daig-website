# CLAUDE.md — daig-website

Marketing site for **data aigency** (dataaigency.com). Requirements: `PRD.md`. Brand canvas: https://claude.ai/code/artifact/2499de40-de94-4e62-b31c-9b4df2f6bc96

## Commands

- `npm run dev` — dev server
- `npm test` — Vitest (jsdom + Testing Library)
- `npm run build:client` — typecheck + client build only
- `npm run build` — full build: client + SSR bundle + `scripts/prerender.mjs` → fully pre-rendered `dist/` (per-route HTML, sitemap.xml, 404.html)
- Deploy: push to `main` → GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`, domain via `public/CNAME`)

## Repo structure

```
assets/               brand sources (original logos, generated SVG logo package in assets/logo/)
docs/superpowers/     specs and implementation plans
docs/loops/           TODO.md + LEDGER.md for improvement loops (see below)
public/               static passthrough (favicon.svg, robots.txt, CNAME)
scripts/prerender.mjs SSG: renders every route to dist/<route>/index.html + sitemap
src/
  components/         Layout, Nav, Footer, Wordmark (star-dot), StripeBand, icons
  pages/              Home, Services, Work, WorkPost, About, Contact
  content/work/       MDX posts (export const meta = {title,date,tags,lang,summary})
  lib/posts.ts        getPosts() — MDX discovery, newest-first
  locales/en/         common.json — ALL user-visible copy lives here (i18n day one)
  styles/             tokens.css (brand tokens) + global.css (primitives)
  i18n.ts · seo.ts · routes.ts · links.ts · entry-server.tsx
```

## Binding brand rules

- Palette: Paper `#FAF7F2`, Ink `#1A1030`, Violet `#6C4CF1`, Coral `#FF6B6B`, Sun `#FFC93C`, Flash `#3BF06E`. ~90% paper/ink; accents in seams/underlines/icons only.
- Diagonal stripes −45° (`.stripe--loud`/`.stripe--quiet`): section dividers and page bottoms ONLY — never behind text, never card backgrounds.
- Brand name lowercase "data aigency" in copy; star-dot only in the `Wordmark` component.
- No hardcoded user-visible strings in components — everything through `t()` / `src/locales/`.
- Zero external requests at runtime (fonts self-hosted). The Google Calendar booking link is the one allowed external `<a href>`.
- Voice: warm, plain-spoken, a little cheeky; concrete outcomes over jargon; never invent clients, metrics, or testimonials.

## Custom agents (.claude/agents/)

`backend-developer` (tooling/build/CI), `commercial-specialist` (conversion/copy), `seo-optimizer`, `blog-writer` (MDX posts), `data-expert` (technical accuracy), `ui-expert` (design-system/a11y polish). Route work to the matching agent; they know the rules above.

## Improvement loop protocol

When Vadim says "run a loop for X hours in Y minute blocks":

1. Compute blocks = (X hours) / (Y minutes). Create an in-session cron (CronCreate) firing every Y minutes for that many runs — or self-paced via the /loop skill when no fixed interval is given.
2. Each block: read `docs/loops/TODO.md`, take the topmost unchecked item, dispatch the agent named in the item (model per item complexity: opus default, fable for cross-cutting work), review its diff before accepting.
3. Append a block entry to `docs/loops/LEDGER.md` (format documented in that file), check off completed TODO items, add discovered follow-ups to TODO.
4. Commit accepted changes per block (`loop: <agent> — <item>`). Never let two blocks edit the same files concurrently — blocks are sequential.
5. Last block: stop the cron, summarize the ledger entries for Vadim.

## Process notes

- Active build-out runs via superpowers subagent-driven development; its ledger lives in `.superpowers/sdd/` (git-ignored, not for loops).
- Final logo emblem is pending from an external tool (brief: `logo-design-brief.md`); interim SVGs in `assets/logo/`, favicon placeholder in `public/`.
