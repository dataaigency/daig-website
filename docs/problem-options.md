# Problem section: four rewrite options

Prepared for the homepage "Sound familiar?" section (`problems` keys in `src/locales/en/common.json`, rendered in `src/pages/Home.tsx` lines 39-54). The brief: retire the unsourced "80% of analyst time" folk statistic, and pitch the problem as one system: scattered data leads to mistrust, mistrust leads to endless re-cleaning, re-cleaning leads to stalled AI and automation ROI.

Voice rules applied throughout: calm, plain, human, short sentences, no dashes, readable by non-technical buyers. Every number below is sourced in Part 2; nothing unsourced appears in any option.

---

## Part 1: verified research

### Link 1: fragmentation (how many tools a company actually runs)

| Figure | Source | Year | What it measured |
|---|---|---|---|
| SMBs average 253 SaaS apps (mid-market 335, overall 371) | [Productiv, State of SaaS series](https://productiv.com/state-of-saas/2023-saas-trends-consolidation/) | 2023 | Apps in customer portfolios on the Productiv platform, by company size segment |
| Average portfolio 275 apps (2025 index), rising to 305 (2026 index); ~46% of licenses unused | [Zylo SaaS Management Index](https://zylo.com/news/2025-saas-management-index) | 2025/2026 | Apps and spend across Zylo's managed customer base (skews mid-market and enterprise) |
| Average company ~106-112 apps, down from a 2022 peak of 130 | [BetterCloud State of SaaS](https://www.bettercloud.com/resources/state-of-saas/) | 2025 | Actively managed apps per organization (narrower definition, hence the lower count) |
| Average enterprise runs 897 apps; only ~29% are integrated | [MuleSoft/Vanson Bourne Connectivity Benchmark, 10th ed.](https://www.salesforce.com/news/stories/connectivity-report-announcement-2025/) | 2025 | Survey of 1,050 IT leaders; enterprise only |

**Flag:** the vendor indices disagree by 2-3x because they count differently (all discovered apps vs actively managed apps). Safe defensible claim for a smaller company: "hundreds of tools" or "250+ apps" citing Productiv's SMB segment; do not present any single number as universal. The 897 figure is enterprise only; use "only about a third of apps are connected" rather than the app count.

### Link 2: trust (leaders who do not trust their data)

| Figure | Source | Year | What it measured |
|---|---|---|---|
| 67% of leaders do not completely trust the data they rely on for decision-making; 77% rate their data quality average or worse | [Precisely + Drexel LeBow, 2025 Data Integrity Trends & Insights](https://www.precisely.com/press-release/new-global-research-points-to-lack-of-data-quality-and-governance-as-major-obstacles-to-ai-readiness) ([report PDF](https://www.lebow.drexel.edu/sites/default/files/2024-09/drexel-lebow-precisel-data-integrity-trends-insights-2025-outlook.pdf)) | Fielded H1 2024, published Sept 2024 | 565+ data and analytics professionals worldwide |
| Data and analytics leaders estimate 26% of their own data is untrustworthy; 87% of analytics/IT leaders say AI advances make data management a higher priority | [Salesforce, State of Data and Analytics](https://www.salesforce.com/news/stories/data-analytics-trends/) | 2023 | 10,000+ business and analytics/IT leaders, 18 countries |
| Since 2023, leader confidence in data accuracy fell 27%, reliability fell 14% | [Salesforce follow-up research, via Digit](https://www.digit.fyi/salesforce-business-leaders-are-losing-trust-in-their-data/) | 2025 | Trend restatement vs the 2023 baseline; methodology details thin in public coverage, use as directional support only |

**Flag:** salesforce.com blocks direct fetches; the 2023 figures are corroborated across multiple independent outlets. The strongest, cleanest trust stat is the Precisely/Drexel 67%.

### Link 3: time on data prep and cleaning (the honest replacement for "80%")

| Figure | Source | Year | What it measured |
|---|---|---|---|
| 57% of analytics professionals spend most of their time maintaining and organizing datasets; 56% name poor data quality their most frequent challenge | [dbt Labs, State of Analytics Engineering](https://www.getdbt.com/resources/state-of-analytics-engineering-2025) ([summary](https://www.getdbt.com/blog/state-of-analytics-engineering-2025-summary)) | 2025 | Survey of data practitioners in the dbt community |
| 37.75%-45% of working time on data prep and cleansing across the 2020-2022 editions | [Anaconda, State of Data Science](https://www.predictiveanalyticsworld.com/machinelearningtimes/state-of-data-science-2022/12789/) | 2020-2022 | Self-reported time allocation by data scientists; pre-2023, use only as range context |

**Flag (important):** the "80% of time cleaning data" line traces to a 2016 CrowdFlower survey of about 80 data scientists (60% cleaning + 19% collecting), popularized by [Forbes](https://www.forbes.com/sites/gilpress/2016/03/23/data-preparation-most-time-consuming-least-enjoyable-data-science-task-survey-says/). No credible survey since has reproduced 80%. The real range across modern surveys is roughly 40-60% of time, or "most of their time" per dbt 2025. The owner is right to drop it.

### Link 4: AI and automation ROI failure

| Figure | Source | Year | What it measured |
|---|---|---|---|
| 42% of companies abandoned most of their AI initiatives in 2025, up from 17% in 2024; on average 46% of AI proofs-of-concept were scrapped before production | [S&P Global Market Intelligence, via CIO Dive](https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/) | March 2025 | Survey of 1,000+ enterprises, North America and Europe |
| 95% of enterprise GenAI pilots show no measurable P&L return | [MIT NANDA, "The GenAI Divide: State of AI in Business 2025"](https://finance.yahoo.com/news/mit-report-95-generative-ai-105412686.html) | 2025 | 52 executive interviews, ~150 surveys, 300+ public deployments; return measured as P&L impact within ~6 months |
| At least 30% of GenAI projects predicted abandoned after proof of concept by end of 2025; poor data quality is the first-listed cause | [Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025) | July 2024 | Analyst prediction, not a survey measurement |

**Flag:** the MIT 95% figure is real but contested: small sample, self-reported, and a narrow success definition (P&L impact within about six months). Critics attack its precision, not its direction. If used on the site, say "no measurable return" and pair it with the sturdier S&P 42%. The Gartner 30% is a prediction; label it as such or prefer the S&P measurement.

### The causal link: poor data foundations cause AI failure

| Figure | Source | Year | What it measured |
|---|---|---|---|
| 95% of IT leaders say integration challenges impede AI adoption; only ~29% of apps are integrated | [MuleSoft Connectivity Benchmark, via Salesforce](https://www.salesforce.com/news/stories/connectivity-report-announcement-2025/) | 2025 | 1,050 IT leaders (enterprise) |
| 43% of data leaders name data quality, completeness and readiness among the biggest obstacles keeping GenAI initiatives from the finish line; 67% struggle to move GenAI pilots into production | [Informatica, CDO Insights 2025](https://www.informatica.com/about-us/news/news-releases/2025/01/20250128-global-data-leaders-seek-to-harness-the-power-of-genai-for-ai-driven-success.html) | Jan 2025 | 600 chief data officers and data leaders |
| Only 12% of organizations say their data is of sufficient quality and accessibility for effective AI | [Precisely + Drexel LeBow](https://www.precisely.com/press-release/new-global-research-points-to-lack-of-data-quality-and-governance-as-major-obstacles-to-ai-readiness) | 2024 | Same 565-person survey as the trust stat above |
| Gartner names poor data quality first among the causes of GenAI abandonment | [Gartner](https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025) | 2024 | Analyst assessment |

**Note on the MIT report:** its own headline explanation for pilot failure is a "learning gap" in how tools are deployed, not data quality alone. Do not cite MIT as proof of the data-causes-AI-failure link; use Gartner, Informatica, MuleSoft and Precisely for that.

---

## Part 2: four section options

All options replace the `problems` object in `src/locales/en/common.json`. Components must keep reading strings through `t()` keys. "data aigency" stays lowercase if it ever appears in copy. No dashes anywhere in the copy.

---

### Option A: The chain

**Rationale:** shows the problem the same way the site shows the solution, as a node-and-edge mechanism, so the reader sees one system instead of three complaints, and the medallion diagram below reads as the same chain rebuilt.

**Copy (verbatim):**

- `label`: `The problem`
- `title`: `It is not four problems. It is one chain.`
- `intro`: `Most companies do not have one data problem. They have a chain reaction, and each link makes the next one worse.`
- Diagram node 1: label `Scattered sources`, sub `every tool keeps its own numbers`
- Diagram node 2: label `Broken trust`, sub `reports disagree, people re-check`
- Diagram node 3: label `Endless cleanup`, sub `every team fixes its own copy`
- Diagram node 4 (amber): label `AI stalls`, sub `pilots never reach production`
- Edge label 1: `numbers drift`
- Edge label 2: `confidence drops`
- Edge label 3: `no clean base`
- `closing`: `The chain does not break at the last link. It breaks at the first one, and the section below shows how.`

**Layout / implementation:** replace the three cards with a small horizontal flow diagram in the existing style: build a `ProblemChain` component from `src/components/flows/kit.tsx` primitives (`FNode`, `EdgeLabel`, `ArrowDefs`, `FlowPanel`, optional `Dot`). Four nodes left to right, three labeled edges, last node stroked `FK.AMBER` instead of the default; keep the moving dot green until the final edge or omit it. Intro paragraph above the panel, closing line as the panel caption. New keys: `problems.intro`, `problems.chain.nodes[]`, `problems.chain.edges[]`, `problems.closing`.

**Trade-off:** highest build cost of the four (a new SVG component), and it puts a second navy panel on the page before the medallion flow, which weakens the paper-navy rhythm unless the panel is kept small.

---

### Option B: The cost

**Rationale:** leads with what the buyer already feels (slow decisions, lost weeks, dead pilots) and lets three verified numbers land the punch, with sourcing visible so the section itself demonstrates the "defensible numbers" standard the company sells.

**Copy (verbatim):**

- `label`: `The problem`
- `title`: `What the mess actually costs.`
- `intro`: `Scattered data does not just look untidy. It bills you three ways.`
- Block 1: heading `Decisions wait.` body `Two in three leaders say they do not completely trust the data behind their decisions. So every number gets debated before it gets used.`
- Block 2: heading `Weeks vanish.` body `Most data people now spend the majority of their time maintaining and organizing data instead of answering questions with it.`
- Block 3: heading `AI stalls.` body `In 2025, 42 percent of companies abandoned most of their AI initiatives. The pilots were not short on ambition. They were built on data nobody had fixed.`
- `closing`: `Each cost feeds the next. That is why patching one tool never works.`
- `sources`: `Sources: Precisely and Drexel University 2025 · dbt Labs 2025 · S&P Global Market Intelligence 2025`

**Layout / implementation:** keep the three-column grid but swap stat-first cards for heading-first blocks (bold short heading, two-line body). Closing line full width under the grid, then the sources line in small muted mono text. New keys: `problems.intro`, `problems.items[].heading/body`, `problems.closing`, `problems.sources`; small CSS addition for the source line.

**Trade-off:** loses the big-number visual hook of the current cards, and a visible source line is honest but slightly academic for a homepage scroll.

---

### Option C: The mirror

**Rationale:** no statistics to defend and nothing to age; the reader supplies the evidence from their own company, which is the strongest proof available and perfectly matches the "Sound familiar?" title already in place.

**Copy (verbatim):**

- `label`: `The problem`
- `title`: `Sound familiar?`
- Question 1: `How many versions of last month's revenue do you have?`
- Question 2: `When two dashboards disagree, who decides which one is right?`
- Question 3: `How much of your team's week goes to fixing data before anyone can use it?`
- Question 4: `And the AI pilot from last year. Where is it now?`
- `closing`: `Those are not four problems. They are one problem: your data has no single home. Everything downstream inherits the doubt.`

**Layout / implementation:** simplest of the four. Replace the card grid with a stacked list of large question lines (display size between h3 and body, generous spacing, each in its own `Reveal` with a stagger), closing line in body text with the first sentence bolded. New keys: `problems.questions[]`, `problems.closing`; the `stat` field goes away.

**Trade-off:** gives up all authority-by-numbers, so the page carries no external proof until later sections, and rhetorical questions can feel like a sales trope if the questions are not dead-on accurate for the visitor.

---

### Option D: The honest cards

**Rationale:** cheapest change that fixes both complaints, keeping the proven stat-card layout while making every number survivable in a boardroom and adding one line that turns three cards into one system.

**Copy (verbatim):**

- `label`: `The problem`
- `title`: `Sound familiar?`
- Card 1: stat `250+` text `A typical smaller company runs more than 250 SaaS tools, and each one keeps its own version of your numbers.`
- Card 2: stat `67%` text `Two in three leaders say they do not completely trust the data behind their decisions, so every number gets re-checked before it gets used.`
- Card 3: stat `42%` text `In 2025, 42 percent of companies walked away from most of their AI initiatives. The data underneath was never made ready.`
- `closing`: `These are not three separate problems. Scattered tools erode trust, eroded trust sends every team off to clean its own copy, and AI built on those copies never earns its keep.`
- `sources`: `Productiv 2023 · Precisely and Drexel University 2025 · S&P Global Market Intelligence 2025`

**Layout / implementation:** the existing `prob__grid` and `ProblemItem` markup in `src/pages/Home.tsx` stay as they are; only the JSON strings change, plus two new keys (`problems.closing`, `problems.sources`) rendered as a full-width line under the grid and a small muted source line beneath it. Roughly ten lines of component change.

**Trade-off:** still three separate cards at first glance, so the system story lives in one closing line the fast scroller may skip, and the connecting link about re-cleaning has no card of its own.

---

## Recommendation

D is the safe immediate fix. A is the strongest match for the brief ("how the pieces work together as one system") and for a site whose signature is drawing mechanisms; if build time allows, ship A and keep D's closing and source lines as its fallback. B suits a later services page more than the homepage. C works best as an A/B test against A.
