# Improvement loop TODO

Backlog for iteration loops. Each item: `- [ ] (agent) description — acceptance`.
Loops pick the topmost unchecked item whose agent fits the block. Add freely; keep ordered by priority.

- [ ] (ui-expert) Fix parked AA-contrast residual: `.dict__pos` in src/pages/home.css is #84796A on white = 4.27:1; change to #6E6A60 (matches .eyebrow, ~5.4:1) — from final review
- [ ] (commercial-specialist) Decide + wire an email contact channel: PRD lists email but none is on the site (owner must supply the address; don't invent one) — from final review
- [ ] (ui-expert) Polish homepage responsive behavior at 360/768px — no horizontal scroll, hero readable, cards stack cleanly
- [ ] (commercial-specialist) Sharpen the four service card descriptions — each names a concrete outcome in the first sentence
- [ ] (seo-optimizer) Add JSON-LD (Organization + ProfessionalService) via prerender head injection; verify in dist output
- [ ] (data-expert) Review services copy for technical credibility — WRONG/WEAK/OPPORTUNITY pass on locales/en/common.json
- [ ] (blog-writer) Draft post: "Medallion architecture in Fabric vs GCP — what actually differs" (research-backed)
- [ ] (backend-developer) Add CI check that dist HTML contains no external URLs except calendar.app.google
