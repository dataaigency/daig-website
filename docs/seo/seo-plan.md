# SEO plan: page by page, grounded in live SERPs

**Prepared by:** seo-optimizer agent · **Date:** 2026-08-21 · **Status:** plan, nothing implemented

Scope: audit of the built `dist/` output (fresh as of 2026-08-21), `src/seo.ts`, sitemap, the four posts in `src/content/work/`, plus live SERP checks for every target query family. Constraints respected throughout: plain language, no location targeting, no fabricated proof, owner-locked strings (hero, problems items, service names, intake-call framing) are only supplemented, never changed, and zero external requests at page load stays law.

---

## 1. What the SERPs actually show

Checked August 2026, per query family.

**Lakehouse consulting / architecture.** Winners are dedicated service pages from mid-size shops (ITRex `/services/data-lake-lakehouse-consulting/`, Intellias `/data-lake-consulting/`, Emerline). Every ranker is one URL per service with 800+ words. Head terms are out of reach for a new domain; the winnable edge is architecture-specific long tail ("medallion architecture mistakes", layer-contract questions), where docs, Medium posts and tool blogs rank, not consultancies.

**Microsoft Fabric consultant.** Head term is partner-tier shops (Avanade, Fresche, Dynatech) plus listicles. Not winnable directly. But the Fabric long tail is soft: "Fabric F2 capacity small business", "Fabric pricing explained" is won by small consultancy blogs (Agilytic, Synapx, Dattasable), and "dbt on Fabric warehouse" is won by Microsoft docs plus one personal blog (serverlesssql.com), which proves an individual practitioner site can place here.

**dbt / DataOps consulting.** Every ranker is a dbt Labs partner page (Xebia, Analytics8, Brooklyn Data). Partner tier is the ranking asset and we do not have it. Winnable route: dbt-adjacent how-tos and opinions (structure, testing, dbt on Fabric), not the "dbt consulting" head term.

**MLOps consulting.** Dominated by offshore dev shops and "top 10" listicles (Addepto, LeewayHertz, MLOpsCrew). Low-quality but high-volume content. The SMB angle ("MLOps for small companies") is already being targeted. Lowest priority family for us; rank via the AI-readiness angle instead.

**LLMOps / AI governance consulting.** Same shape: enterprise dev shops (N-iX, Tredence, Kanerika). The open space is plain-language governance content for the buying committee (the MIT 95% failure angle), which matches gap 3 in the positioning memo. Nobody ranking writes for non-CTOs.

**Buyer-language queries (identified).**
- "does a small business need a data warehouse": won by tiny consultancies (Nexera, Agile DWH, 425 Consulting) and tool blogs. Decision-guide format. Very winnable and exactly our buyer.
- "single source of truth" + data: won by vendors (Mulesoft, ThoughtSpot, Workday) defining the term. Head term not winnable; the phrase belongs in our copy because buyers search fragments of it with qualifiers.
- "fractional data engineer vs consultant / vs hiring": won by marketplaces (Go Fractional, Fractionus) and thin blog posts. An honest comparison from an actual practitioner can place.
- "Microsoft Fabric vs BigQuery": won by content farms (Orchestra guides, Medium reposts). No ranker has built on both. A genuinely expert comparison can win, and it is our exact stack sentence.

**Pattern to act on:** service pages win service queries one URL at a time; small sites win with specific comparisons, pricing explainers and how-tos, not with head terms.

---

## 2. Audit of current pages (from `dist/`)

Good already: every route pre-rendered with unique title, description, OG, canonical; Organization + ProfessionalService JSON-LD on home; BlogPosting JSON-LD on posts; clean sitemap and heading hierarchy (one h1 per page).

Gaps:
- `/services` head targets four query families in one title, so it ranks for none. Four h2 blocks of roughly 50 words each; every SERP winner has 10x the depth per service on its own URL.
- No JSON-LD at all on `/services`, `/about`, `/contact`. No BreadcrumbList on posts. No Person schema for Vadim.
- Internal linking is thin: posts link only to the booking URL (external). No post links to `/services`, no post links to another post, services blocks link to no posts. Link equity pools on the booking domain instead of circulating.
- Sitemap `lastmod` for static pages is the build date (all 2026-08-21), which tells Google nothing and cries wolf on every deploy.
- `2026-08-hello` is a 60-word page in the sitemap. Thin content in the index drags on a 9-URL site.
- Post titles carry no year or freshness signal, fine for evergreen, but the surf post summary never names the concepts it explains (medallion, data platform), wasting its one shot at a matching snippet.

---

## 3. Quick wins [S]

Each is a small edit in `src/seo.ts`, `scripts/prerender.mjs` or one MDX file. Impact: modest individually, together they sharpen every existing URL. Effort: under a day total. Dependency: none, ship any time.

### 3.1 Title and description edits (`src/seo.ts`, exact strings)

**Home.** Add the word "consulting", which the SERPs treat as the intent marker and the current title lacks.
- title: `Data architecture consulting: lakehouses, dbt and governed AI | data aigency`
- description: keep as is.

**/services.** Until the split (section 4), lead with the strongest pairing and the word "services".
- title: `Data consulting services: lakehouse, dbt, MLOps and LLMOps | data aigency`
- description: `Four services, one architect: lakehouse architecture on Microsoft Fabric or BigQuery, DataOps with dbt, AI-ready data and MLOps, and governed LLMOps. Each with a diagram you can read.`

**/about.** Put the name in the title; people who meet Vadim search the name.
- title: `Vadim Lucas, data and AI architecture consultant | data aigency`
- description: keep as is.

**/work.** Drop the case-study claim until one exists; honest titles also convert better.
- title: `Writing on data architecture, dbt and governed AI | data aigency`
- description: `Plain-spoken writing on lakehouse architecture, medallion design, dbt, data governance and practical AI adoption. Case studies as they become real.`

**/contact.** Keep both strings, they are intake-call framing and they are good.

**Surf post summary** (in `2026-08-surf-forecast-lakehouse.mdx`, feeds meta description): `A surf forecast is a tiny data platform. The whole idea of a lakehouse and medallion architecture, explained through one question: when do I paddle out?`

### 3.2 Internal links to add

- Medallion post: link "lakehouse" in the intro to `/services`, and add one closing line before the CTA: `This is the kind of thing the free audit looks for, and the friendly version of the whole pattern is in the surf forecast post.` linking to `/work/2026-08-what-an-audit-finds/` and `/work/2026-08-surf-forecast-lakehouse/`.
- Surf post: link "medallion architecture" in the closing section to `/work/2026-08-medallion-mistakes/`.
- Audit post: link "architecture" in the intro to `/services`.
- Services page: under each service block, one "Related writing" link where a matching post exists (lakehouse block links the medallion post, DataOps block links the surf post for now). Supplements the blocks, changes no owner-locked strings.
- Keep every internal link a real `<Link>`/`<a href>` in the pre-rendered HTML, not JS-only.

### 3.3 Schema gaps (`scripts/prerender.mjs`)

- `/services`: emit the existing ProfessionalService block here too, extended with `hasOfferCatalog` listing the four services by their exact owner-locked names.
- `/about`: Person JSON-LD (name, url, sameAs LinkedIn and GitHub, jobTitle "Data and AI architect", worksFor the Organization @id).
- Posts: BreadcrumbList (Home > Work > post title).
- Sitemap: derive static-page `lastmod` from git last-commit date of the page source instead of build date.
- `2026-08-hello`: either expand into a real build-log post or drop it from the sitemap and mark noindex until it has substance. Recommended: expand later (see 5.8), noindex now.

---

## 4. Structural [M]: split /services into four URLs

**Verdict: split, and start now rather than later.** Evidence:
- Every SERP winner for every one of the four families is a dedicated one-service URL. No combined "four services" page ranks anywhere we looked.
- The combined title cannot lead with any family, so today the page competes for none of them. A four-way title is a four-way tie with itself.
- The raw material already exists: each service has an owner-locked name, a description, three outcomes, a diagram and a caption. Each child page needs roughly 500 words of new supplementary copy, not a redesign.
- Doing it now is cheap; doing it after the content engine starts means retrofitting internal links twice.

**Shape.**
- Keep `/services` as a hub: intro, four summary blocks, each linking to its child. Nothing owner-locked changes.
- Children: `/services/lakehouse`, `/services/dataops`, `/services/mlops`, `/services/llmops`. Each page: h1 = owner-locked service name, the existing description and outcomes, the diagram with caption, plus new sections: "What gets built" (concrete deliverables), "How it is handed over", "When this is the wrong service" (honest disqualifier, nobody ranking does this), and one related post.
- Proposed heads (`src/seo.ts`):
  - `/services/lakehouse`: title `Lakehouse architecture consulting on Microsoft Fabric or BigQuery | data aigency`, description `A production-grade lakehouse with medallion design, a semantic layer and governance in Purview or Dataplex from day one. Designed, built and handed over by one architect.`
  - `/services/dataops`: title `dbt and DataOps consulting: tested, monitored pipelines | data aigency`, description `Pipelines built with dbt on BigQuery or Fabric, orchestrated and monitored so quality issues reach the engineer before they reach your stakeholders.`
  - `/services/mlops`: title `AI-ready data and MLOps consulting | data aigency`, description `Feature stores, training sets and analytics layers with lineage on everything, so ML and BI work starts on day one instead of after months of wrangling.`
  - `/services/llmops`: title `AI governance and LLMOps consulting | data aigency`, description `AI that reaches production one use case at a time: phased rollout, access control, evaluation before scale-up. On Azure AI Foundry or the stack you already have.`
- Drafted copy example for the honest-disqualifier section (lakehouse page): `When this is the wrong service: if your data fits in one database and one person's head, you do not need a lakehouse yet. Book the intake call anyway and I will tell you that for free.` (Supplements the intake framing, does not change it.)
- Each child gets its own Service JSON-LD referencing the Organization @id.
- Mechanics: add routes, add the four meta entries, prerender picks them up, sitemap auto-includes. No redirects needed since no per-service anchors were ever published.

**Impact:** this is the single biggest ranking lever on the site, it turns zero competitive URLs into four. **Effort:** M, roughly 2 to 4 days including copy. **Dependency:** copy review by owner (new strings around locked ones); ship quick wins first so the split lands on corrected heads.

Secondary structural items:
- Homepage: add one crawlable paragraph of body text near the services block (the animated diagrams carry captions but little indexable prose). One or two sentences per diagram already exist as captions; ensure they are in the pre-rendered HTML, and add a short prose intro under "One governed flow" naming lakehouse, medallion, dbt in plain language. [S once split exists]
- `/work`: rename visible h1 stays "Work & writing" (owner tone), but add a one-line indexable intro under it naming the topics. [S]

---

## 5. Content engine [L]: next six posts, ranked by demand x winnability

Format note: every post is the practitioner format the SERPs reward for small sites: specific, first-person, with a diagram or worked numbers, 1200 to 2000 words, one CTA. No location targeting, no invented clients, no invented numbers; pricing posts use public list prices only.

**5.1 Does a small business need a data warehouse (or a lakehouse)?**
Target: "does a small business need a data warehouse" plus variants. Angle: an honest decision guide with a five-question self-test, including the answer "not yet, here is what to do instead", which none of the rankers dare to give. Format: guide. Impact: high, it is exactly buyer language and the current winners are beatable. Effort: M. Dependency: none. **Write this one first.**

**5.2 Microsoft Fabric pricing for a small team: what F2 actually covers.**
Target: "microsoft fabric f2 capacity small business", "fabric pricing explained". Angle: worked example from public list prices, when F2 is enough, when reservation pays off, what breaks first as you grow. Format: pricing explainer, refreshed yearly. Impact: high buyer intent, SERP is small-consultancy blogs. Effort: M. Dependency: verify current list prices at write time.

**5.3 Microsoft Fabric vs BigQuery for a small data team.**
Target: "fabric vs bigquery". Angle: from someone who builds on both, decision criteria by team shape (Microsoft shop vs Google shop, predictable vs spiky workloads), ending with "both are fine, here is how to pick in an afternoon". Format: comparison. Impact: high, current rankers are content farms with no hands-on depth. Effort: M. Dependency: none, links to both service pages once split.

**5.4 Running dbt on Microsoft Fabric: what works and what does not yet.**
Target: "dbt microsoft fabric", "dbt fabric warehouse". Angle: field notes with gotchas beyond the docs (auth, adapters, the built-in dbt job vs dbt Core). Format: specific how-to. Impact: medium volume, very high fit, and the SERP already proves a personal blog ranks here. Effort: M. Dependency: needs real hands-on verification at write time; pairs with the public starter repo from the positioning memo.

**5.5 Fractional data engineer, consultant, or full-time hire?**
Target: "fractional data engineer vs consultant", "hire data engineer or consultant". Angle: honest cost and fit comparison from someone who is one of the options, including when full-time is right. Format: comparison. Impact: medium, bottom-funnel, differentiates on honesty. Effort: S to M. Dependency: none.

**5.6 Your AI pilot worked. Production did not. The checklist for the layer underneath.**
Target: "why ai pilots fail production", "ai ready data checklist". Angle: the MIT 95% finding, translated for the whole buying committee, ending in a governance checklist that mirrors the governance diagram. Format: checklist guide. Impact: medium, supports the LLMOps page and gap 3 of the positioning memo. Effort: M. Dependency: /services/llmops page live to receive the internal link.

**Existing post to update: the medallion mistakes post.** It is the site's best asset and the SERP for its query is docs plus Medium posts, all beatable on specificity. Update: add the internal links from 3.2, add a short "how to check your own layers in 15 minutes" section (self-audit questions), add BreadcrumbList schema (3.3), and set a real dateModified. Effort: S. Impact: medium, it is the most likely first ranking.

**5.8 Also:** expand `2026-08-hello` into a genuine build-log ("what a pre-rendered React site on GitHub Pages costs and ships like") or keep it noindexed. Effort: S, priority last.

Cadence: one post every 2 to 3 weeks beats six posts in one month. Order above is the publish order.

---

## 6. Sequence and dependencies

1. Quick wins (3.1 to 3.3), one PR, no dependencies.
2. Services split (4), depends on owner copy review.
3. Post 5.1, then alternate posts with the remaining structural items.
4. Refresh this plan when the first Search Console data lands (verify the property if not yet done, it costs no page-load requests).

Standing constraints for all future work: no external scripts of any kind for SEO (no tag managers, no tracking pixels), schema and meta only via the prerender pipeline, and when NL/FR/PT locales land, add hreflang pairs in the prerender before publishing any translated route.
