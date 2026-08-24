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
- Zero external requests at page load (fonts self-hosted). Allowed user-initiated external calls: the Google Calendar booking link, and the contact form POST to api.web3forms.com (key in src/config.ts; delivers to the owner's inbox without exposing the address).
- Voice: warm, plain-spoken, a little cheeky; concrete outcomes over jargon; never invent clients, metrics, or testimonials.
- **Market is Europe.** All prices in EUR, from EU-region pricing pages; market conditions, regulation (GDPR, EU AI Act) and examples default to the EU context in copy, posts and research. When a source only publishes USD, show EUR converted at the current ECB rate (e.g. api.frankfurter.dev), note the conversion and rate date once, and link the vendor's own EUR billing source if one exists. No standalone $ figures in user-visible copy. Target markets: Belgium, Netherlands, France, Germany, Spain and Portugal (languages Vadim works in: EN, NL, FR, DE, ES, PT); these are listed as areaServed in the JSON-LD (scripts/prerender.mjs). EU only, not the UK.

## Flow diagrams (the house visual language)

The site explains everything as node-and-edge mechanism diagrams. To build a new one:

1. **Use the kit**: `src/components/flows/kit.tsx` exports `FK` (colors), `FNode` (node with label/sub/optional accent stroke), `EdgeLabel` (mono uppercase, ≤3 words), `ArrowDefs` (per-diagram marker id), `Dot` (animated pulse, optional color), `FlowPanel` (navy inset panel + caption for light pages), `useFlowPause` (reduced-motion).
2. **Design rules**: horizontal left-to-right flow; nodes `#0B1C4E` fill with `#24356E` stroke; edges `#2A3A6E` 1.5px with labeled hops; green `#03F856` = motion/signal only (pulses, the one "good" end node); amber `#E8B437` = warning/fail/stall states; frost text on navy. Draw the mechanism, not labels-in-boxes: what flows where, what gates what, what fails to whom. One figure, one claim; every diagram gets a plain-language caption and `aria-label`.
3. **Every label through t()** — add keys to `src/locales/en/common.json` so diagrams translate with the site.
4. **Register it** in `src/diagrams-entry.tsx`, then run `npm run diagrams` — this exports every diagram as a standalone animated SVG to `assets/diagrams/` (fonts and navy ground baked in) for reuse in decks, LinkedIn posts and documents.
5. Existing examples: `FlowDiagram` (medallion), `ProblemChain` (causal chain with amber stall), `ServiceFlows` (4 mechanisms incl. a fail branch), `AboutFlow` (steps + container annotation), `WorkFlow` (before/after comparison).
6. In posts, figures (diagrams and charts) break out of the reading column automatically up to 1080px wide (`.prose figure` in work.css) — design for a ~1020 viewBox width and desktop renders it fully; the panel's inner minWidth only causes scrolling on small screens.
7. **Blog diagrams** live in `src/components/flows/blog/BlogFlows.tsx` and are imported directly into MDX posts. Exception to rule 3: their labels are literal English because posts are per-language content files. Register them with `blogs/...` keys so they export to `assets/diagrams/blogs/`. House patterns there: amber diamond tags for failure/trouble spots, dashed drop lines to annotations, side-by-side halves with a dashed divider for comparisons.

## Custom agents (.claude/agents/)

`backend-developer` (tooling/build/CI), `commercial-specialist` (conversion/copy), `seo-optimizer`, `keyword-scout` (Google demand research, feeds the docs/content-plan.md queue; no paid SEO tools), `blog-writer` (MDX posts), `data-expert` (technical accuracy), `ui-expert` (design-system/a11y polish). Route work to the matching agent; they know the rules above.

## Improvement loop protocol

When Vadim says "run a loop for X hours in Y minute blocks":

1. Compute blocks = (X hours) / (Y minutes). Create an in-session cron (CronCreate) firing every Y minutes for that many runs — or self-paced via the /loop skill when no fixed interval is given.
2. Each block: read `docs/loops/TODO.md`, take the topmost unchecked item, dispatch the agent named in the item (model per item complexity: opus default, fable for cross-cutting work), review its diff before accepting.
3. Append a block entry to `docs/loops/LEDGER.md` (format documented in that file), check off completed TODO items, add discovered follow-ups to TODO.
4. Commit accepted changes per block (`loop: <agent> — <item>`). Never let two blocks edit the same files concurrently — blocks are sequential.
5. Last block: stop the cron, summarize the ledger entries for Vadim.

## Process notes

- Blog routine: a claude.ai cloud routine runs `docs/loops/blog-loop.md` twice a week (Mon + Wed), alternating lanes per `docs/content-plan.md` section 4a and opening one PR per post. One hour later a second routine runs `docs/loops/blog-review-loop.md`: an independent fact, voice and build review that merges the PR (which deploys) or holds it with a comment and a notification. In-session loops must not take blog-queue items or touch open `blog:` PRs while these are active.

- Active build-out runs via superpowers subagent-driven development; its ledger lives in `.superpowers/sdd/` (git-ignored, not for loops).
- Final logo emblem is pending from an external tool (brief: `logo-design-brief.md`); interim SVGs in `assets/logo/`, favicon placeholder in `public/`.
