# Feedback spec sheet — v1 review by all six agents (2026-08-18)

Six agents reviewed the live v1 (post-logo-integration) read-only, each from its own lens.
Tick items or reply with IDs ("do U1, C3, D1-D2"). Effort: [S]mall [M]edium [L]arge.

## ⭐ Flagged by multiple agents (highest signal)

- [ ] **X1** [M] Mobile nav overflows at 360px — whole site scrolls sideways; needs a real small-screen menu (ui)
- [ ] **X2** [S] New logo PNGs are heavy: 262KB hero (also downloaded then hidden on mobile), 94KB nav mark painted at 27px, 138KB og-image — resize/recompress or SVG (ui + backend)
- [ ] **X3** [S] The "80% of analyst time" stat is unsourced folk-lore AND fails contrast — replace with a defensible claim, restyle (data + commercial + ui)
- [ ] **X4** [S] Work posts ship with generic title/description — wire MDX meta into seo.ts; posts are invisible in search until then (seo + blog)
- [ ] **X5** [L] Zero proof site-wide: no case study, no testimonials, no client outcomes — you must supply 2-3 anonymizable stories (commercial + blog + data)
- [ ] **X6** [S] No email channel (PRD lists it) — supply the address you want public, or explicitly drop email (commercial + earlier review)

## UI expert (U)

- [ ] U1 [M] = X1 mobile nav overflow at 360px
- [ ] U2 [S] Hero emblem hidden below 860px — mobile never sees the new logo; add a small variant instead
- [ ] U3 [S] Hero img lacks width/height (layout shift) + 262KB LCP hit
- [ ] U4 [S] Coral "80%" stat 2.78:1 and .dict__pos 4.26:1 — AA failures on the second screen
- [ ] U5 [S] No :focus-visible styling — keyboard focus nearly invisible on violet buttons
- [ ] U6 [S] Nav/footer links ~22px tall — under 44px touch minimum
- [ ] U7 [M] Footer floats mid-viewport on short pages — sticky-footer layout needed
- [ ] U8 [M] About/Contact 720px container breaks left-edge alignment vs nav
- [ ] U9 [M] Services cards full-width but half-empty — two-column grid
- [ ] U10 [S] Flash/Sun icons ~1.5:1 on white — darken those two accents for icon use
- [ ] U11 [M] Inline styles carry raw sizes/hex across pages — introduce type-scale + surface tokens
- [ ] U12 [S] Hero emblem duplicates the wordmark already in the nav — use a mark-only variant (rose + bars, no text)

## Commercial specialist (C)

- [ ] C1 [L] = X5 social proof (needs your input: 2-3 outcomes, anonymization level)
- [ ] C2 [M] /work looks like "no clients" — ship one anonymized case or drop Work from nav until then
- [ ] C3 [M] No pricing/engagement-size signals on /services — scope, duration, from-price bands
- [ ] C4 [M] No FAQ handling solo-consultant objections (capacity, bus factor, GDPR, lock-in)
- [ ] C5 [S] Contact page: say what happens in the 30 min (agenda + "you leave with a written one-pager" + timezone/languages)
- [ ] C6 [S] = X6 email fallback for buyers who won't calendar-commit
- [ ] C7 [M] /about is the thinnest trust page — photo, credentials, years, past employers (needs your input)
- [ ] C8 [S] Unsourced "5+"/"80%" stats — cite or reframe as questions
- [ ] C9 [M] Process headline names 4 steps but nothing shows per-step deliverables/timeline
- [ ] C10 [S] "Who this is for / not for" qualification block on /services
- [ ] C11 [S] /about and /work end without any CTA — add booking button
- [ ] C12 [S] State EU/Belgium base in hero eyebrow — buyers filter on jurisdiction/timezone early
- [ ] C13 [S] Remove "PT coming later" from footer — reads unfinished

## SEO optimizer (S)

- [ ] S1 [S] = X4 per-post meta from MDX frontmatter
- [ ] S2 [S] JSON-LD: Organization + ProfessionalService (logo, founder, areaServed BE/EU, sameAs)
- [ ] S3 [S] Article/BlogPosting schema on work posts
- [ ] S4 [S] 404.html: noindex meta + non-home title
- [ ] S5 [M] Zero Belgium/EU/GDPR/AI-Act words in built HTML — regional query set unreachable
- [ ] S6 [S] Keyword-free titles — rewrite toward "Lakehouse & dbt consulting in Fabric and BigQuery | data aigency"
- [ ] S7 [S] sitemap lastmod dates
- [ ] S8 [M] og:locale + hreflang/x-default scaffold before locales launch
- [ ] S9 [L] Thin pages (services 182 words, about 105) — expand to 400-800 words each
- [ ] S10 [L] Split /services into four service pages to hold head terms
- [ ] S11 [M] Contextual in-body internal links (home→services, posts→services)
- [ ] S12 [S] FAQPage schema on contact + Person entity for Vadim on about

## Data expert (D)

- [ ] D1 [WRONG][S] "orchestrated in BigQuery" is a category error — say "dbt on BigQuery or Fabric, orchestrated with Airflow (Cloud Composer) or Fabric Data Factory"
- [ ] D2 [WRONG][S] = X3 the 80% folk stat
- [ ] D3 [WEAK][M] "medallion done right" — name what right means (bronze append-only, silver conformed+tested, gold semantic)
- [ ] D4 [WEAK][S] Name the GCP stack: BigQuery + BigLake Iceberg on GCS
- [ ] D5 [WEAK][S] "tested, monitored pipelines" → dbt tests + contracts, freshness SLAs, CI on PRs
- [ ] D6 [WEAK][S] Governance never names a tool — Purview (Fabric), Dataplex (GCP)
- [ ] D7 [WEAK][M] "feature stores" reads 2021 — broaden to retrieval layers (chunking, embeddings, vector search, lineage)
- [ ] D8 [WEAK][S] "costs you can predict" → name the mechanism (F-SKU sizing/pausing vs BigQuery slot reservations)
- [ ] D9 [OPP][M] EU AI Act hook, stated correctly (Art. 50 now; Annex III high-risk deferred to Dec 2027) — the Benelux sales hook AND a credibility signal
- [ ] D10 [OPP][M] Ground "no lock-in" in facts: open table formats + named handover artifacts (IaC, dbt repo, CI/CD, runbook)
- [ ] D11 [OPP][L] First case study must be a data teardown, not this website — a frontend post argues against data credibility
- [ ] D12 [OPP][M] Pre-empt the bus-factor objection in about ("everything in your repos, IaC-defined, runbooks")

## Blog writer (W)

- [ ] W1 [L] Post: "Microsoft Fabric or BigQuery for your first lakehouse?" (commercial-investigation intent, highest value)
- [ ] W2 [M] Post: "Medallion architecture: the five mistakes I keep unpicking" (top-funnel)
- [ ] W3 [M] Post: "The dbt tests that actually catch broken data" (mid-funnel)
- [ ] W4 [M] Post: "What a 30-minute architecture audit actually finds" (bottom-funnel, zero client permission needed)
- [ ] W5 [L] Post: first real case study (needs your input: sector, size, stack before/after, outcomes, anonymization level)
- [ ] W6 [S] Render tags on cards + posts; add reading time; human date format
- [ ] W7 [M] Article shell for posts: prose typography, back-link, closing free-audit CTA
- [ ] W8 [M] Split index into "Case studies" / "Writing"; retire the "coming soon" empty-state copy
- [ ] W9 [S] og:type=article + article:published_time (pairs with S3); skip TOC for now

## Backend developer (B)

- [ ] B1 [S] = X2 asset weight (hero/nav/og PNGs)
- [ ] B2 [M] Fonts: import latin-only subsets — cuts ~200KB deployed weight
- [ ] B3 [S] Preload the three latin woff2s — kills the font flash on first paint
- [ ] B4 [S] CI on pull requests (test+build without deploy) — catch breakage before deploy time
- [ ] B5 [S] deploy.yml: cancel-in-progress:false for the Pages group (GitHub's own recommendation)
- [ ] B6 [S] prerender.mjs: assert placeholders matched — today a missing comment deploys an empty shell with green CI
- [ ] B7 [S] copyPublicDir:false for the SSR build — stops copying 520KB of PNGs into dist-ssr
- [ ] B8 [M] Add ESLint/Prettier + lint in CI
- [ ] B9 [S] Pin GitHub Action SHAs + dependabot (very-new majors on caret ranges)
- [ ] B10 [L] 92KB-gz hydration bundle for a brochure site — build-time dictionary / lazy routes would halve it

## Needs input from Vadim (can't be done without you)

- Client stories for proof (C1/W5/D11): sector, size, stack, outcomes, anonymization level
- Public email address — or an explicit "no email" decision (X6)
- Bio facts for /about: photo, years, credentials, past employers (C7)
- Pricing/engagement bands you're comfortable publishing (C3)
- White/light logo variant from your logo tool for dark grounds (footer/ink sections currently can't carry the navy logo)
