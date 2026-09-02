# Content plan: the standing editorial game plan

**Prepared by:** blog-writer + seo-optimizer agents · **Date:** 2026-08-24 · **Status:** standing plan, refreshed as posts ship

Scope: builds on `docs/seo/demand-research.md` (what buyers search) and `docs/seo/seo-plan.md` (page-by-page SEO plan). Those two stand; this document does not repeat them. It adds fresh research on three questions (EU buyer questions in 2026, what AI answer engines cite, whether the metaphor series has legs) and turns everything into a post queue the improvement loop can consume. Per CLAUDE.md: the market is Europe, prices in EUR from EU-region pricing pages, regulation examples default to GDPR and the EU AI Act. Owner's location stays off the site.

Note on the earlier queue: post 5.1 from the SEO plan ("Does a small business need a data warehouse") shipped on 2026-08-16. Posts 5.2 to 5.6 from that plan are folded into the pillars below, so this document supersedes that queue.

---

## 1. Research findings

### 1.1 What Europeans are visibly asking in 2026, and which questions carry money

The single most important fact of the season: **the EU AI Act deadlines moved, and almost nobody outside legal blogs has explained it in plain words.** The Digital Omnibus on AI entered into force on 27 July 2026. It pushed Annex III high-risk obligations from 2 August 2026 to **2 December 2027**, and Annex I (AI embedded in regulated products) to August 2028. What did NOT move: the Article 50 transparency and AI-content-labeling duties (live from 2 August 2026), the AI literacy obligation, the prohibited-practices regime (in force since February 2025), and GPAI provider rules (since August 2025). SME and mid-cap relief got wider (the new small mid-cap band: fewer than 750 employees and turnover up to €150M or balance sheet up to €129M; the earlier €250M figure noted here was wrong, see post 1 for the sourced definition). Sources: [Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/), [Council press release](https://www.consilium.europa.eu/en/press/press-releases/2026/06/29/artificial-intelligence-council-gives-final-green-light-to-simplify-and-streamline-rules/), [CSA research note](https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-high-risk-deadline-omnibus-20260/), [Delbion SME guide](https://www.delbion.com/en/insights/eu-ai-act-sme-compliance-guide/).

The delay created confusion, and confusion is search demand with buyer intent behind it: "does this still apply to us", "what do we actually have to do, by when". A consultant marketplace with 61 listed EU AI Act advisors already exists ([AI Act Advisors](https://aiactadvisors.com/consultants)) and compliance tool spend is projected up 50% in 2026 ([SQ Magazine](https://sqmagazine.co.uk/eu-ai-act-compliance-cost-statistics/)), so commercial demand is forming, not hypothetical.

**GDPR plus AI is the other high-intent family.** "Can we use ChatGPT with customer data" is a concrete task question with a concrete answer (lawful basis, Article 28 DPA, which product tier, DPIA for higher-risk uses), and the content answering it today is compliance-vendor material, not practitioner material ([iubenda](https://www.iubenda.com/en/blog/openai-gdpr-compliance/), [sonomos](https://sonomos.ai/blog/gdpr-ai-compliance-eu-chatgpt-claude-gemini-2026/), [Janus Compliance](https://www.januscompliance.co.uk/blog/can-i-use-chatgpt-api-and-stay-gdpr-compliant)).

**Sovereignty is loud but mostly news-reader traffic, with two buyer-intent pockets.** The headlines (all 27 member states signing a sovereignty declaration, France's migration plans, Schwarz Gruppe's €11B STACKIT bet, the Commission's Cloud Sovereignty Framework, AWS launching its European Sovereign Cloud in January 2026 as a German GmbH) are context, not queries a buyer converts from. Gaia-X itself reads as history now, mostly cited as the cautionary tale ([digital-chiefs](https://www.digital-chiefs.de/en/digital-sovereignty-2026-gaia-x-delos-cloud-and-europes-response-to-the-cloud-ac/), [MassiveGRID](https://massivegrid.com/blog/european-companies-leaving-us-cloud/), [sjwiggers](https://sjwiggers.com/2026/02/06/aws-european-sovereign-cloud-real-problem/)). The two pockets with real intent:

1. **"Is our data actually sovereign in an EU region?"** Decision-stage buyers picking Fabric, BigQuery or Azure need the residency-versus-sovereignty distinction explained: EU Data Boundary and Fabric multi-geo solve residency; the CLOUD Act means a US parent can still be compelled, and the hyperscaler "sovereign" variants carry a 10 to 30 percent premium without resolving that ([Microsoft EU Data Boundary](https://blogs.microsoft.com/on-the-issues/2025/02/26/microsoft-completes-landmark-eu-data-boundary-offering-enhanced-data-residency-and-transparency/), [TimeXtender on Fabric](https://www.timextender.com/blog/product-technology/microsoft-fabric-for-gdpr-and-regulatory-compliance), [Akave](https://akave.com/blog/europes-digital-sovereignty-dilemma-can-the-continent-break-free-from-us-cloud-dominance)). Nobody explains this to a 50-person company in plain words. We can.
2. **"What do the EU providers actually cost?"** The cost math is dramatic and verifiable: independent 2026 benchmarks put Hetzner around a tenth of the AWS price for equivalent compute, and egress that costs ~$1,800 per 20TB at AWS list price is free at Hetzner or OVHcloud ([fermigier.com](https://fermigier.com/blog/2026/05/cheaper-actually-price-comparison-european-cloud-us-hyperscalers/), [Exoscale roundup](https://www.exoscale.com/blog/european-cloud-providers/)). Cost-driven SMEs search this with intent; ~70 percent of the EU market is still on US hyperscalers, so the audience is large and mostly un-migrated.

Verdict, ranked by buyer intent times fit: (1) AI Act "what applies to us, by when" (2) GDPR plus AI tool usage (3) residency vs sovereignty as a platform-choice input (4) EU cloud cost comparisons (5) sovereignty headlines: context only, never a target query. Gaia-X: skip as a target.

### 1.2 What AI answer engines cite, without tooling

The 2026 citation studies agree on the negative finding: there is no single winning format; each industry has its own citation fingerprint. But B2B technology services skew heavily toward list-shaped and comparison-shaped pages, how-to queries cite step-by-step guides, and "best/vs" queries cite comparison tables ([ZenoX study](https://zenoxmedia.com/research/ai-citation-study), [Conductor](https://www.conductor.com/academy/how-ai-citations-differ/)). Engines split by mechanism: Perplexity and Gemini reward fresh, crawlable, source-shaped pages; ChatGPT and Claude reward being a known entity ([Leapd](https://www.leapd.ai/blog/ai-visibility/how-chatgpt-google-ai-overviews-and-perplexity-source-information-in-2026)). On-page practices that recur across every guide: question-phrased headings, the answer in the first sentences under the heading, one idea per paragraph, sections that stand alone when extracted, dense sourced facts, honest dateModified, FAQ blocks matching real prompts ([Search Engine Land](https://searchengineland.com/mastering-generative-engine-optimization-in-2026-full-guide-469142), [WordStream](https://www.wordstream.com/blog/generative-engine-optimization)). Our shipped warehouse-or-lakehouse post already does most of this by instinct; section 5 turns it into house habits.

### 1.3 The metaphor series: precedent, and the failure mode to avoid

Precedent is strong. Analogy-based teaching is a studied technique in computer science education: mapping a new concept onto one the learner already holds measurably reduces cognitive load ([MDPI study](https://www.mdpi.com/2227-7390/11/15/3340)), and the most-shared programming explainers of the last decade are analogy posts. Music-to-code has its own tradition ([Capital One Tech](https://medium.com/capital-one-tech/music-the-original-programming-language-ca8af9c14f55), [AlgoCademy](https://algocademy.com/blog/music-theory-and-coding-how-learning-one-can-improve-the-other/)).

The failure mode also has a name: the **monad tutorial fallacy**. "Monads are like burritos" fails because the metaphor shares a vibe with the concept but not its structure, so learners internalize claims that are false (a burrito contains a thing you can unwrap; many monads do not) and have to unlearn them ([Brent Yorgey](https://byorgey.wordpress.com/2009/01/12/abstraction-intuition-and-the-monad-tutorial-fallacy/), [Mark Dominus](https://blog.plover.com/prog/burritos.html)).

What makes the surf post work, generalized into the series test. Every "data for humans" idea must pass all four:

1. **Structural, not decorative.** The metaphor domain genuinely contains the same mechanism. A surf forecast IS a small data platform (messy sources, cleaning, a decision layer); it is not merely "like" one.
2. **First-hand.** The author actually does the thing. Borrowed hobbies read as content marketing; lived ones supply the detail that makes it true (the 6am wetsuit moment).
3. **Names the real term.** Bronze, silver, gold got named in the surf post. The reader leaves with the industry vocabulary, not just the story.
4. **Shows its own seams.** Say where the analogy stops working. That is what separates teaching from a pitch, and it is exactly what the burrito posts never did.

Verdict: green light as a series, roughly every third or fourth post, one concept per post, never two metaphors in one post.

---

## 2. The four content pillars

- **Pillar 1: EU buyer questions.** Compliance, sovereignty, cost, "do we need X". Decision-stage, plain-language, honest disqualifiers. Feeds the services pages.
- **Pillar 2: Practitioner how-tos.** Fabric, dbt, BigQuery, lakehouse. Searchable terms with proven small-site winnability (per the SEO plan's SERP checks). Credibility and long-tail rankings.
- **Pillar 3: "Data for humans".** Water sports, winter sports, music theory as teaching devices for data and AI concepts. Every idea passes the four-part test in 1.3. Sharable, distinctive, the brand's voice at full volume.
- **Pillar 4: AI development done properly.** Agents, RAG, evaluation, governance in practice. Rides the agentic wave named in the demand research, anchored to "governed data underneath".

---

## 3. Post ideas (18)

Format: working title · target query or audience · angle · effort (S/M/L).

### Pillar 1: EU buyer questions

1. ~~**The EU AI Act deadlines moved. Here is what your company still has to do in 2026**~~ · **PUBLISHED 2026-08-24** → `src/content/work/2026-08-ai-act-deadlines-moved.mdx` · plain-language calendar after the Digital Omnibus: what shifted to Dec 2027, what is live today (transparency, AI literacy, prohibitions), a 5-item to-do list · M
2. **Can your team use ChatGPT with customer data? The GDPR answer in plain words** · "chatgpt gdpr customer data" · which product tiers have a DPA, lawful basis, when you need a DPIA, a one-page checklist · M
3. **An EU region is not sovereignty: what data residency really buys you** · "azure eu data boundary cloud act" / Fabric-vs-sovereignty worriers · residency vs jurisdiction explained for a platform decision, when the distinction matters for you and when it honestly does not · M
4. **What EU cloud actually costs: Hetzner, Scaleway and OVHcloud vs the hyperscalers, in euros** · "european cloud provider cost comparison" · worked EUR examples from EU pricing pages including egress, and the honest catch list (services you give up) · L
5. **Do you need an EU AI Act consultant, or a checklist?** · "eu ai act compliance consultant" · the barber-problem disqualifier guide: what an SME can self-serve, where outside help earns its fee · S
6. **The AI literacy obligation nobody noticed: Article 4 for a 30-person company** · "ai act ai literacy requirement" · what "sufficient AI literacy" means in practice, a training outline you can run yourself · S

### Pillar 2: Practitioner how-tos

7. ~~**Microsoft Fabric pricing for a small team: what F2 actually covers**~~ · **PUBLISHED 2026-08-26** → `src/content/work/2026-08-fabric-f2-pricing.mdx` · worked EUR example from West Europe list prices, F2 vs F4, throttle/smooth/burst behavior, the Power BI licensing cliff at F64 (~390 viewer break-even), and pausing outside working hours as the real cost lever over a reservation · M
8. **Microsoft Fabric vs BigQuery for a small European data team** · "fabric vs bigquery" · decision criteria by team shape, plus the EU-region and residency column no comparison includes · M
9. **Running dbt on Microsoft Fabric: field notes** · "dbt microsoft fabric" · hands-on gotchas beyond the docs; needs real verification at write time · M
10. **Fractional data engineer, consultant, or full-time hire?** · "fractional data engineer vs consultant" · honest cost and fit comparison from someone who is one of the options · S
11. **Your AI pilot worked. Production did not. The checklist for the layer underneath** · "why ai pilots fail production" · the failure statistics translated for the buying committee, ending in a governance checklist · M
12. **Check your own medallion layers in 15 minutes** · "medallion architecture" long tail · self-audit extension of the existing medallion post (the SEO plan already flags this update) · S

### Pillar 3: Data for humans

13. ~~**RAG, explained: why the band needs sheet music**~~ · **PUBLISHED 2026-09-02** → `src/content/work/2026-09-rag-sheet-music.mdx` · the model knows how to play (patterns from years of practice) but not your song (your data); retrieval, chunking and the context window drawn as one mechanism; the honest failure mode (a wrong chart still gets played with total confidence) and the GDPR upside of retrieval over fine-tuning · M
14. **What an avalanche report teaches you about deciding with imperfect data** · non-technical buyers evaluating dashboards · risk levels, confidence, the human factor: acting on data that is honest about its own uncertainty · M
15. **Why a band can improvise and your company cannot** · "data governance" for skeptics · a key signature and a form are what make improvisation safe; governance as the shared structure that enables speed rather than blocking it · M
16. **The tide table is the oldest data product** · non-technical buyers · computed years ahead from a stable model, published in a form everyone trusts: what reference data and data contracts are, and why your KPI definitions should work the same way · M
17. **Reading the wind window: thresholds, ranges and when not to go out** · ops leads drowning in alerts · kitesurfing wind windows as operating ranges: why "is the number good" beats "what is the number", alert thresholds done honestly · M

### Pillar 4: AI development done properly

18. **Evals before agents: how you know your AI feature actually works** · "how to evaluate llm application" · the practitioner case for small honest eval sets before scaling anything, with a worked example · M
19. **Agents need governed data: the boring reason the demo fails on Monday** · "ai agents production" buyers · connects agentic hype to lineage, access control and clean layers; links the services pages · M
20. **Choosing an EU-hosted LLM in 2026: what is actually on the menu** · "eu hosted llm gdpr" · Mistral, EU-region hyperscaler offerings, what "EU-hosted" does and does not guarantee; crossover with pillar 1 · M

(18 net-new plus two updates; ideas 7 to 11 carry over from the SEO plan's queue and keep their SERP rationale.)

### Keyword-scout additions, pass 1 (2026-08-24)

Source: Google autocomplete harvest (61 seeds, en/nl/fr/de) plus 10 SERP checks. Scores are buyer intent / EU angle / first-hand edge / winnable, each 1 to 5.

21. **Why is Microsoft Fabric so expensive? What a small team can actually do about it** · "why is microsoft fabric so expensive" · en · **18** (5/4/5/4) · SERP: vendor blogs (TimeXtender, dataroots) plus Fabric community threads; no plain-language practitioner piece for small teams. Autocomplete also surfaces "microsoft fabric cost optimization" and "fabric f2 vs f4" — this widens queued post 7's brief (see queue note) and is the strongest standalone candidate for the next queue refresh. · M
22. **Is Power BI GDPR compliant? The honest configuration answer** · "is power bi gdpr compliant" · en · **17** (4/5/4/4) · SERP: GDPR-vendor blogs, a dated Microsoft whitepaper, forum threads; nothing recent and practitioner-shaped. Clusters with 23 and queued posts 2 and 3. · S
23. **Microsoft Fabric and GDPR: what the certifications cover, and what stays your job** · "microsoft fabric gdpr compliance" · en · **17** (4/5/4/4) · SERP: vendor/agency content only (TimeXtender, NTT Data, consultancies); the shared-responsibility part is unexplained. Natural sibling of queued post 3. · M
24. **Is Vertex AI GDPR compliant? DPA, EU data residency, zero retention, in plain words** · "is vertex ai gdpr compliant" · en · **16** (4/5/3/4) · SERP: a Google whitepaper PDF, Medium posts, niche AI-compliance blogs; the "you must sign the GDPR schedule yourself" gotcha is buried. Crossover with idea 20 (EU-hosted LLM). · M
25. **Dataform vs dbt on BigQuery: free-and-native vs the industry standard** · "dataform vs dbt" · en · **15** (4/2/5/4) · SERP: comparison farms and Medium; "dataform vs dbt reddit" in autocomplete shows searchers distrust the listicles, which is exactly the opening for field notes. Pairs with idea 9. · M
26. **Azure AI Foundry vs Copilot Studio: who should build your agents** · "azure ai foundry vs copilot studio" · en · **12** (4/2/3/3) · SERP: Microsoft's own Tech Community posts answer it well; only worth writing with a first-hand governance/LLMOps angle. Parked. · M
27. **Fabric lakehouse vs warehouse (and where OneLake fits)** · "lakehouse vs warehouse fabric" / "onelake vs lakehouse" · en · **11** (3/1/4/3) · SERP: Microsoft's decision guide ranks and genuinely answers it. Skip as a target post; fold as an FAQ block into existing lakehouse/medallion content. · S

Language spot-checks (2026-08-24): local-language demand exists but is thin — "lakehouse architectuur" (nl), "microsoft fabric kosten" (de), "microsoft fabric prix/tarif" (fr) and "bigquery kosten/tarif" (nl/fr/de) all return suggestions but no long tail. Right call for now: keep writing in English, revisit these exact heads when translated pages become a project.

Dud seeds, not worth rescanning: any "\<tool\> small business" (empty for bigquery, vertex ai, mlops); "data platform kosten" nl (drifts to Veeam's product); "data pipeline automatiseren" nl, "consultant data microsoft fabric" fr, "datenplattform kosten" de (all empty); "how to use dataform" (drifts to Excel data forms); "consultant"/"specialist" seeds in every language (drift to jobs and salaries, not buyers); "llmops vs" and "bigquery cost optimization" (SERPs walled by content farms and FinOps vendors).

### Follow-ups surfaced while writing post 1 (2026-08-24)

28. **The 2 December 2026 machine-readable marking deadline: what it means if you shipped a generative feature before August** · "ai act machine readable marking deadline" · the narrow grace period inside Article 50 that summaries collapse into the headline date; perishable, worth writing before December · S
29. **Are you a "small mid-cap" under EU digital law? The 750/€150M/€129M test** · "small mid-cap definition eu" · the new SMC band cuts across the AI Act and the wider Omnibus package; nobody has written the plain-language qualifier test for a scaling company · S
30. **Article 4 AI literacy: a one-hour session outline you can actually run** · overlaps queued idea 6, now with a concrete deliverable angle (the outline itself) rather than an explainer; consider merging into 6 when 6 comes up · S

### Keyword-scout additions, pass 2 (2026-08-26) — Azure + GCP ecosystem focus

**Method note (important for future runs): Google's autocomplete endpoint was unreachable this run.** Both `suggestqueries.google.com` and `www.google.com/complete/search` are denied by the session's egress proxy (403 on CONNECT, confirmed twice via `$HTTPS_PROXY/__agentproxy/status`). No autocomplete requests were made; per the proxy README, policy denials are reported, not routed around. This pass is therefore **SERP-shape evidence only** — 12 WebSearch queries against the priority Azure (Fabric, OneLake, Power BI) and GCP (BigQuery, Vertex AI) angles. Head-term volume ranking could not be checked, so the "buyer intent" scores below lean on SERP composition and question shape rather than suggestion depth. Re-run the autocomplete pass from an environment with that host allowed before treating this list as complete.

Scores are buyer intent / EU angle / first-hand edge / winnable, each 1 to 5.

31. **Power BI Pro or a Fabric capacity? The F64 licensing cliff, in euros** · "power bi pro vs fabric capacity licensing" / "fabric f64 vs power bi pro break even" · en · **17** (5/4/4/4) · SERP: resellers and licensing agencies (Solv Systems, EPC Group, SpendWeave, datatako) plus several UK consultancies, every one of them quoting USD and one explicitly scoping its break-even to "standard US Azure regions". The buying trap is real and unwritten for the EU: **below F64 every viewer still needs a Pro licence**, so F2-F32 buys performance, not licence relief. The break-even moves with West Europe CU prices, and nobody has published that number in EUR. Strongest new candidate; directly widens post 7 (see queue note) and should follow close behind it. · M
32. **Do you actually need Microsoft Fabric, or just Power BI and a database?** · "microsoft fabric vs power bi small business" · en · **16** (5/3/5/3) · SERP: crowded but uniformly vendor and agency listicles (HSO, ONLC, DataCamp, Promethium) and two UK MSPs — all of them comparing features, none of them willing to say "usually not yet". Same honest-disqualifier shape as the shipped warehouse-or-lakehouse post, which is exactly the shape that worked. · M
33. **Is your BigQuery data really in the EU? Regions, EU multi-region, and what the CLOUD Act does not care about** · "bigquery eu data residency gdpr" · en · **16** (4/5/3/4) · SERP: Medium posts and thin compliance-vendor pages; no page connects EU region choice to the residency-vs-jurisdiction distinction. The GCP mirror of queued post 3 — write it after 3 so it can lean on that post's framing instead of repeating it. · M
34. **BigQuery on-demand or a slot reservation? Where the line actually falls, in euros** · "bigquery on-demand vs editions cost" · en · **15** (4/4/4/3) · SERP: FinOps vendors (nOps, Revefi, Yuki) and Google's own pricing docs; the quoted break-evens (~100 slots, ~10-15 TiB/month) are all USD list. An EUR europe-west worked example for a 5-person team is missing. Note the prior pass parked "bigquery cost optimization" as vendor-walled — this narrower decision question is the winnable slice of it. · M
35. **What actually breaks first on an F2: throttling, smoothing and bursting in plain words** · "fabric capacity throttling smoothing" · en · **14** (4/2/5/3) · SERP: MS Learn owns the mechanism and explains it correctly, plus Medium and several consultancies. The gap is not the mechanism but what it feels like on a small capacity. **Recommend folding into post 7 as a section rather than writing standalone.** · S
36. **How to stop a surprise BigQuery bill: custom quotas, maximum_bytes_billed and budget alerts** · "bigquery custom cost controls quota" · en · **14** (4/2/5/3) · SERP: Google docs plus a Google codelab that genuinely answer it, and oneuptime how-tos. Very practitioner-friendly but hard to beat the docs; only worth writing with a real "here is the config I set for a client and why" angle. · S
37. **OneLake shortcuts vs copying data: when zero-copy costs you more** · "onelake shortcuts egress cost" · en · **13** (3/3/4/3) · SERP: Microsoft's own Fabric blog covers S3 shortcut caching well, surrounded by guide-farm pages. The cross-cloud egress math in EUR is thin, but intent is architect-stage rather than buyer-stage. Parked. · M
38. **Direct Lake vs Import mode for a small Fabric team** · "direct lake vs import mode" · en · **11** (3/1/5/2) · SERP: SQLBI and MS Learn own this and answer it definitively. Skip as a target post; fold as an FAQ block into Fabric content, same call as idea 27. · S
39. **Vertex AI vs Azure AI Foundry** · "vertex ai vs azure ai foundry" · en · **11** (4/2/3/2) · SERP: three-way comparison farms (index.dev, PeerSpot, tech-insider, Bits Lovers) stacked several deep. Same verdict as idea 26 — parked unless a first-hand governance angle appears. · M

Dud angles from this pass, not worth rescanning: any three-way hyperscaler AI platform comparison (39, and 26 from pass 1 — comparison farms are entrenched); "fabric pause capacity" as a standalone target (MS Learn plus Syntera and russ.cloud already cover it — it is a paragraph inside post 7, not a post); generic "microsoft fabric vs power bi" without the small-business qualifier (pure listicle territory).

Research note: the EU's own `digital-strategy.ec.europa.eu` and several law-firm domains were unreachable from the build environment's egress proxy during this run. Facts were verified against reachable secondary sources (Gibson Dunn, White & Case, Skadden, DLA Piper, European Parliament, artificialintelligenceact.eu) instead. If a future run needs a primary Official Journal citation, fetch it from a reachable mirror.

### Follow-ups surfaced while writing post 13 (2026-09-02)

40. **How do you know your RAG system is actually retrieving the right passages?** · practitioner audience, sharpens queued idea 18 (evals before agents) · a worked example of checking retrieval quality (a small labelled question set, "did the right passage even make it into the context window") before ever judging the model's phrasing; the natural sequel to the sheet-music post once a reader has the mechanism · M
41. **Note for future runs:** `www.ibm.com`, `www.pinecone.io`, `atlan.com`, `lushbinary.com` and `www.edps.europa.eu` were all unreachable via WebFetch from the build environment's egress proxy this run (WebSearch's own result summaries were used as the sourced material instead, since WebSearch itself was not blocked). If a future post needs to quote one of these pages directly rather than paraphrase a search snippet, try fetching from a different environment or check `$HTTPS_PROXY/__agentproxy/status` first.

---

## 4a. Lanes and rotation (owner ruling, 2026-08-24)

So the blog reads like a person and not a keyword farm, the twice-weekly loop alternates three lanes in a fixed cycle. The loop reads the rotation state below, writes the next post in that lane, then advances the pointer.

- **Lane A, best keyword.** The highest-value buyer query from pillars 1 and 2 plus the scout additions. The keyword-scout refresh feeds this lane.
- **Lane B, data for humans.** The pillar 3 metaphor series (water sports, winter sports, music theory, AI). Every idea passes the four-part test in 1.3.
- **Lane C, AI pulse.** State of the art and governance, EU-first: what moved in the last two weeks (AI Act guidance, model releases, EU cloud and sovereignty moves) anchored to one standing concept so the post stays useful after the news fades. Researched fresh at write time; ideas 6, 11, 18, 19 and 20 are the standing anchors for quiet weeks.

**Rotation state (the loop updates these two lines):**
- Next lane: **C** (lane B's run on 2026-09-02 takes post 13, published; lane C is next)
- Cycle: C → A → B → repeat

**Lane queues** (top first; scout reshuffles A, never B or C):
- A: ~~7~~ (published 2026-08-26), **31** (now top), 3, 8, 2, **32**, **33**, 21, 22, 23, **34**, 25, **36**, 24, 5, 10, 12
  - *Scout reshuffle 2026-08-26 (pass 2):* post 7 holds the top slot — nothing found beats it, and it now has a second widening note (below). Three new candidates inserted: **31** (17) at slot 3, ahead of 21/22/23 because it is a direct purchase decision that pairs with and links post 7; **32** (16) and **33** (16) at slots 6-7, with 32 placed between 2 and 33 so two pillar-1 posts do not run back to back; **34** (15) and **36** (14) slotted by score. Items 8, 2, 21, 22, 23, 25, 24, 5, 10 and 12 are **displaced downward by insertion only** — none removed, none rescored. Parked, not queued: **35** (fold into 7), **37**, **38** (FAQ block, same call as 27), **39** (parked with 26).
  - *Loop run 2026-08-26:* post 7 shipped as the Fabric F2 pricing post (path above), pulling in idea 35 (throttle/smooth/burst) and the Power BI licensing-cliff finding as sections rather than standalone posts, per the scout's own recommendation. **31** (Power BI Pro vs Fabric capacity licensing) now leads the queue — it was written to pair with and link the shipped post, so it should run next while that link is freshest.
- B: ~~13~~ (published 2026-09-02), 14, 15, 16, 17
- C: ~~1~~ (published 2026-08-24), then fresh-news anchored to the standing anchors above

## 4b. The near-term queue: first six, in order

1. ~~**Post 1: AI Act deadlines moved (pillar 1).**~~ **Shipped 2026-08-24.** First because it is perishable. The Omnibus entered into force on 27 July 2026; the confusion window is open right now and closes as legal blogs get translated into plain language by someone else. Also our strongest single EU finding.
2. **Post 7: Fabric F2 pricing (pillar 2).** Was already next in the SEO plan's queue with the best demand-to-competition ratio found; EUR framing per CLAUDE.md makes it stronger, not harder. *Scout note (2026-08-24): widen the brief to also answer "why is microsoft fabric so expensive" and "f2 vs f4" — both live in autocomplete, and idea 21 covers the full cost-pain angle if this post cannot hold it all.*
   *Scout note 2 (2026-08-26): two more things belong in this post, both verified at SERP level this run and both mis-served by every page currently ranking. (a) **F2 does not buy Power BI licence relief.** Below F64, every viewer still needs their own Pro licence, so a small team buying F2 to "save on Power BI" has bought performance and nothing else. State this plainly and early; idea 31 carries the full EUR break-even math if this post cannot hold it. (b) **Pausing the capacity is the real small-team cost lever** — pause overnight and at weekends and the bill drops steeply, which is the honest answer to "why is Fabric so expensive". Also fold in idea 35: what actually breaks first on an F2 (bursting, smoothing, then the three throttling stages) as the "what you grow out of" section. Verify every figure against the EU-region (West Europe) Azure pricing page at write time in EUR — every source found this run quotes USD list, and one scopes its break-even explicitly to US regions.*
3. **Post 3: An EU region is not sovereignty (pillar 1).** The best buyer-intent pocket in the sovereignty noise, and it sets up the residency column in the Fabric vs BigQuery comparison two slots later.
4. ~~**Post 13: RAG and sheet music (pillar 3).**~~ **Shipped 2026-09-02.** The series' second entry while the surf post is still fresh; passes all four tests in 1.3 and doubles as the plain-language RAG explainer pillar 4 can link to.
5. **Post 8: Fabric vs BigQuery (pillar 2).** The exact-stack comparison the SEO plan rated highly winnable; now it can link post 3 for the sovereignty angle and post 7 for pricing, which no content-farm ranker can match.
6. **Post 2: ChatGPT and customer data under GDPR (pillar 1).** High-intent, evergreen-ish, and by this slot the site has an AI Act post and a sovereignty post for it to link to, forming a small EU-compliance cluster.

Rhythm inside the queue: two pillar-1 posts never run back to back except at the start (where timeliness forces it); the metaphor series lands every third or fourth slot; every post links at least one earlier post and one service page (per the SEO plan's internal-linking rules).

---

## 5. Cadence, and how the loop consumes this plan

**Cadence (owner ruling, 2026-08-24): two posts a week, Monday and Wednesday, via the cloud routine.** The routine (`docs/loops/blog-loop.md`) runs in a Claude cloud session, follows the lane rotation in 4a, and opens one PR per post; Vadim's merge is the review pass and the publish button. Freshness refreshes (pricing every 6 months, regulation when dates move) may take a lane A slot. Reassess the pace after the first month against Search Console: if quality strains or the idea bank thins faster than the scout refills it, drop to weekly rather than thinning posts.

**Loop protocol:** each run picks per the rotation state in 4a (not simple top-of-queue), researches and drafts with all prices and regulation dates verified at write time (never from this document), marks anything requiring owner facts as [NEEDS INPUT], runs tests and build, and ships as a PR. When a post ships, mark it here with date and path, advance the rotation pointer, and note any new question the research surfaced as a candidate idea. This document gets a refresh pass when the first six have shipped or when Search Console says the ranking picture changed.

---

## 6. AI answer engine habits (no tooling required)

House rules for every post, distilled from 1.2:

1. **Answer first.** Under every question-phrased heading, the first one or two sentences ARE the answer. Nuance follows. (The warehouse post's "Usually not yet. Sometimes genuinely yes." is the house standard.)
2. **Question-phrased H2s** that match how a real person asks, one question per section.
3. **Sections stand alone.** One idea per paragraph, no "as mentioned above"; an engine lifting one section should lift something complete.
4. **Dense, sourced, dated facts.** Named sources linked inline, figures with dates and currency (EUR), never "studies show". Engines quote pages that carry their own evidence.
5. **First-person experience markers.** "I build on both", "what broke for me was". First-hand accounts and honest disqualifiers are the least reproducible content on the SERP and the most quotable.
6. **One comparison table per vs-post.** Tables get lifted into answers wholesale.
7. **Captioned diagrams.** The house diagram-plus-plain-caption pattern stays; the caption is the citable sentence, so write it as one.
8. **Honest freshness.** Real dateModified only when content actually changed; pricing rechecked every 6 months, regulation posts when dates move; the update noted in the post.

---

## Rules footer

- **EUR and EU lens, always** (CLAUDE.md): prices from EU-region pricing pages, never casually converted from USD; when a source only publishes USD, say so and give the EU-region figure it corresponds to. Regulation and market examples default to the EU.
- **No invented clients, metrics or testimonials.** Case-study facts come from Vadim or get a [NEEDS INPUT] marker.
- **Sourced claims only.** Every statistic and every regulation date links its source and gets verified at write time; this plan's citations are starting points, not gospel.
- **Personal themes are teaching devices, not identity claims.** Water sports, winter sports and music theory appear because they genuinely explain a concept (the four-part test in 1.3), never as biography. Location stays off the site.
- **Voice per the brand rules:** warm, plain-spoken, a little cheeky, brand name "Data Aigency" (title case), no em dashes, no filler intros, one CTA per post pointing to the free intake call (never framed as an audit).
