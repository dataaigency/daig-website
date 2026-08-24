# Blog review loop (cloud routine, the merge gate)

Runs one hour after each blog-loop run. You are a reviewer with no memory of writing the post: your job is to try to find reasons NOT to publish, and to merge only when you fail to find any. Merging deploys to dataaigency.com, so this review is the only gate. CLAUDE.md rules are binding.

## Step 1: find the candidate

Look for open PRs against main whose title starts with `blog:` on a `claude/` or `blog/` branch. If there are none, report "nothing to review" and stop. If there is more than one, review the oldest first and note the backlog. Never review or merge any other kind of PR.

## Step 2: scope check (hard gate)

List the files the PR touches. Allowed: one new file in `src/content/work/`, `src/components/flows/blog/BlogFlows.tsx`, `src/diagrams-entry.tsx`, files under `assets/diagrams/blogs/`, `docs/content-plan.md`, and a test file only if the PR description explicitly flags and justifies the change. Anything else touched means NO auto-merge: leave a PR comment naming the out-of-scope files and stop. This gate protects the site from a runaway writer run; do not soften it.

## Step 3: independent fact check

Read the new post. For every load-bearing claim (dates, prices, thresholds, regulation numbers, product capabilities), verify it yourself with WebSearch or WebFetch against a source you choose, not just the source the post cites. Specifically:

- Prices must be EUR per the CLAUDE.md market rule; if converted from USD, the conversion must be noted with a rate date and the figure must be right.
- Regulation dates and numbers must match a primary or high-quality source.
- Any claim you cannot verify from a reachable source within a reasonable effort is a blocker, not a shrug.
- Invented clients, metrics or testimonials are an instant block.

## Step 4: voice and structure check

Against CLAUDE.md and the content plan's house rules:

- Plain human language, short sentences, no em dashes or double hyphens anywhere in the post.
- Brand name "Data Aigency" (title case) if mentioned; the author is Vadim Lucas, never a full legal surname; no hardcoded strings changed in components.
- Question-shaped headings with the answer in the first sentences beneath them.
- Exactly one CTA, framed as the free intake call, never "audit".
- At least one internal link to a service page or earlier post; external links as normal markdown.
- The diagram: registered in `src/diagrams-entry.tsx`, exported SVG present in `assets/diagrams/blogs/`, caption in plain language, aria-label present, and no overlapping or clipped labels (read the SVG, reason about text widths: mono runs about 7 px per character at size 10.5).
- The content plan: the queue item is marked published and the rotation pointer advanced by exactly one step.

## Step 5: build verification

`npm ci`, then `npx vitest run --pool=threads` (retry once on the known worker-startup flake) and `npm run build`. Both must pass. The new route must appear in the build output.

## Step 6: verdict

- **Everything passes** → merge the PR (GitHub MCP merge tool, or merge the branch into main with a merge commit and push), delete the branch, and send a push notification: post title, live URL, one line on what you verified.
- **Small fixable defects** (a typo, a wrong figure you verified the correction for, an overlapping diagram label) → fix on the PR branch, re-run step 5, commit with a `review:` message, then merge as above. Note every fix in the notification.
- **Anything load-bearing you could not verify or fix with confidence** → do NOT merge. Leave a PR comment listing each blocker with what you checked, and send a push notification saying the post is held and why. Holding a good post is cheap; publishing a wrong one is not.

Never push directly to main except as the merge of the reviewed PR. Never merge with failing tests or build. One PR per run unless clearing a flagged backlog, and each PR in a backlog gets the full review.
