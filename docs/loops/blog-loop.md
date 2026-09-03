# Blog loop (cloud routine)

Runs twice a week in a Claude cloud session. One run produces exactly one new blog post with one new diagram, opened as a pull request. Merging the PR publishes it. CLAUDE.md rules are binding throughout, especially the brand voice, the Market is Europe rule, and the flow diagram recipe.

## Steps, in order

0. **Setup.** Run `npm ci`. Read `CLAUDE.md`, `docs/content-plan.md`, `.claude/agents/keyword-scout.md` and `.claude/agents/blog-writer.md`.

1. **Keyword refresh (lane A runs only).** When the rotation points at lane A, run the scout method from keyword-scout.md first, capped at 30 autocomplete requests, focused on the four services with Azure (Fabric, OneLake, Power BI) and GCP (BigQuery, Vertex AI) as the priority angles. Append genuinely new scored candidates to the plan's idea bank with today's date and reshuffle lane A's queue if a find beats the top item. If the endpoint is unreachable, skip; it must never block the post. On lane B and C runs, skip this step.

2. **Pick by rotation.** First check for duplicates in flight: list the repo's open pull requests titled `blog:` (for example `gh pr list --state open --search "blog: in:title"`). The plan on main only records a post once its PR merges, so an open blog PR means its queue item is already taken even though the plan does not show it yet. Treat every item covered by an open blog PR as in flight: never draft a post for it. An open blog PR also advances the rotation pointer when it merges, so act as if that advance already happened and start from the lane after the one the open PR drafted. Then read the rotation state in the plan's section 4a (Next lane + cycle C → A → B). Take the top unpublished item from that lane's queue: lane A is the keyword queue, lane B is the data-for-humans series (its post must pass the four-part metaphor test in the plan's section 1.3), lane C is AI pulse — research the last two weeks of EU AI and data news and anchor the post to one of the standing anchor ideas. Mark the item in flight and advance the Next lane pointer. If the chosen lane has nothing viable, fall through to the next lane in the cycle and say so in the PR.

3. **Research.** Verify every fact, price and date against current sources with WebSearch or WebFetch. Prices in EUR per the CLAUDE.md rule (convert at the current ECB rate when the vendor lists USD, note the conversion once). EU regulation and examples by default. Never invent clients, metrics or testimonials. A claim that cannot be sourced does not go in the post.

4. **Write.** Create `src/content/work/YYYY-MM-<slug>.mdx` with the standard `meta` export (title, date, tags, lang, summary). Voice: warm, plain-spoken, short sentences, no em dashes or double hyphens, concrete outcomes over jargon. 800 to 1400 words. Question-shaped headings where natural (they match how people search and how AI engines quote). Link to the most relevant service page and one or two related posts. One CTA: the free intake call framing, never "audit". External links open in new tabs automatically via the MDX link component; just write normal markdown links.

5. **Diagram.** Add exactly one new diagram component to `src/components/flows/blog/BlogFlows.tsx` following the CLAUDE.md flow diagram recipe (blog diagrams use literal English labels). Draw the post's core mechanism, not labels in boxes. Register it under a `blogs/<name>` key in `src/diagrams-entry.tsx` and run `npm run diagrams`. Watch label widths: mono labels run about 7 px per character at the standard size, so check that neighboring labels cannot overlap and nothing exceeds the viewBox; use start or end text anchors to grow labels away from each other.

6. **Verify.** `npx vitest run --pool=threads` (retry once if the worker startup times out, that is a known flake) and `npm run build` must both pass. If they cannot be made to pass inside this run, open the PR as a draft and say why in its description.

7. **Record.** Update `docs/content-plan.md`: mark the item published with date and post path, and add any follow-up ideas discovered while writing.

8. **Ship.** Branch `blog/YYYY-MM-DD-<slug>`, commit everything, push, and open a PR titled `blog: <post title>`. The PR description must contain: the post summary, a fact-check list (each load-bearing claim with its source URL), the diagram's plain-language caption, and what changed in the content plan. Never push to main. One post per run.

## Scope guardrails

Touch only: the new post file, `BlogFlows.tsx`, `src/diagrams-entry.tsx`, `assets/diagrams/blogs/`, `docs/content-plan.md`. Do not edit existing posts, site copy, styles or config. If something outside that scope looks broken, describe it in the PR instead of fixing it.
