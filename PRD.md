# Data Aigency — Website Rebuild PRD

**Owner:** Vadim Van Den Heuvel · **Repo:** daig-website · **Status:** draft for review · **Last updated:** 2026-08-18

## 1. Goal

Replace the current one-page site at [dataaigency.com](https://dataaigency.com) with a fresh, funky, credible multi-page site that positions Data Aigency as the consultancy for data architecture **and** phased, secure AI adoption — with translation built in from day one.

## 2. Positioning & voice

The name carries the pitch, three readings presented as dictionary entries on the homepage:

1. **data aigency** — the capacity to act: you regain agency over your data (one source of truth, owned by you, documented for you).
2. **data aigency** — a consulting practice: we design, build, and hand over; scope, timeline and costs agreed up front.
3. **data aigency** — agency with AI inside: adopted in phases, with security and governance from the start. *Not a vibe-coded data strategy.*

Voice: warm, plain-spoken, a little cheeky. Concrete outcomes over jargon ("your analysts get their week back").

## 3. Brand (settled — see design canvas)

Full exploration: [design canvas](https://claude.ai/code/artifact/2499de40-de94-4e62-b31c-9b4df2f6bc96) · pages *Logo* and *Website*.

- **Palette:** Paper `#FAF7F2` (background), Ink `#1A1030`, Violet `#6C4CF1` (primary action), Coral `#FF6B6B`, Sun `#FFC93C`, Flash green `#3BF06E`. Roughly 90% paper/ink; accents in seams, underlines, icons — never big filled shapes.
- **Signature:** diagonal stripes at **−45°** as section dividers, page bottoms and moments of energy — never behind text, never as card backgrounds. 4-color band for loud moments, violet two-tone for quiet ones.
- **Type:** Bricolage Grotesque (headlines), Hanken Grotesk (body), Montserrat ExtraBold (logo wordmark). Self-hosted via `@fontsource` (no external font CDN).
- **Iconography:** 2px-stroke geometric line icons, one accent color each, no filled blobs.
- **Logo:** compass rose + valley bars emblem. Final emblem being generated externally from `logo-design-brief.md`; interim SVG package lives in `assets/logo/`. Nav/footer use the lowercase star-dot wordmark ("data aıgency" with a 4-point star as the tittle of the i) until the emblem lands. **Open item.**

## 4. Information architecture

| Route | Purpose |
|---|---|
| `/` | Hero, dictionary section ("the name is the pitch"), services overview, process, CTA |
| `/services` | The four pillars in depth, each with outcomes + tech named |
| `/work` | Cases / blog posts (markdown-driven; starts with 1–3 entries) |
| `/about` | Founder story, way of working, "no black boxes" handover promise |
| `/contact` | Free 30-min architecture audit — Google Calendar booking, email, LinkedIn, GitHub |

**Services — four pillars** (three existing + new one matching the aigency story):

1. **Lakehouse architecture** — production-grade lakehouses in Fabric or GCP; semantic layers, governance, medallion done right from day one.
2. **Pipelines & automation** — dependable ELT/ETL with dbt; BigQuery, Python, Airflow, Fabric.
3. **AI-ready data layers** — feature stores, training sets, analytics layers.
4. **AI adoption & governance** *(new)* — phased AI rollout with security, access control and evaluation built in; from first use-case to production.

Primary CTA everywhere: **Book a free architecture audit** (30 min, no obligations).

## 5. Functional requirements

- **i18n from day one:** `react-i18next`; all copy in translation files, EN shipped; NL/FR/PT added later by dropping in locale files. Language switcher in footer (EN only until more locales exist). URLs stay unprefixed for now; revisit `/nl/...` prefixes when Dutch lands.
- **Blog/cases:** markdown (MDX) files in-repo; build-time rendering, no CMS. Frontmatter: title, date, tags, lang.
- **Contact:** no backend — Google Calendar booking link, `mailto:`, LinkedIn, GitHub.
- **SEO:** per-page title/description/OG tags, sitemap, `robots.txt`; pre-rendered HTML per route at build time so crawlers see content without JS.
- **Accessibility:** WCAG AA contrast (body text ≥ 4.5:1 on paper), keyboard navigable, `prefers-reduced-motion` respected.
- **Performance:** static site, self-hosted fonts, zero external requests except the booking link; Lighthouse ≥ 95 across the board.
- **Motion:** light and purposeful — stripe reveals, hero entrance; no scroll-jacking.

## 6. Tech stack

- **React 19 + Vite 7 + TypeScript**
- **Routing/pre-rendering:** `react-router` + build-time pre-render of all routes (SSG) so GitHub Pages serves real HTML per page (also fixes SPA deep-linking)
- **Styling:** vanilla CSS with custom properties (design tokens from the brand guide) — small site, no framework needed
- **Content:** MDX for `/work`
- **i18n:** `react-i18next` + JSON locale files

## 7. Hosting & repo

- **GitHub Pages** (free) from this **public repo** — fine: the site contains only public marketing content and already-public contact details. No secrets, no analytics keys in-repo.
- Deploy: GitHub Actions workflow builds on push to `main`, publishes to Pages.
- Custom domain `dataaigency.com` via CNAME file + DNS A/AAAA records at the registrar.

## 8. Milestones

1. **M1 — Brand guide final**: emblem lands (external tool → vectorize), tokens file, favicon set. *(logo is the only blocker; everything else can proceed)*
2. **M2 — Scaffold**: Vite + TS + router + i18n + tokens + fonts; deploy pipeline to Pages with placeholder page (walking skeleton).
3. **M3 — Design system**: stripes, buttons, cards, icons, layout primitives as components.
4. **M4 — Pages**: Home → Services → About → Contact, EN copy.
5. **M5 — Work section**: MDX pipeline + first case study.
6. **M6 — Launch**: SEO pass, accessibility pass, Lighthouse ≥ 95, DNS cutover.
7. **Post-launch**: NL translation, then FR/PT; more cases.

## 9. Open items

- [ ] Final emblem from external image tool (brief: `logo-design-brief.md`) → vectorize → replace `assets/logo/`
- [ ] Confirm headline font choice once seen in-browser (Bricolage Grotesque vs alternative)
- [ ] Case-study content for `/work` (need 1–3 stories from Vadim)
- [ ] Registrar access for DNS cutover at launch
