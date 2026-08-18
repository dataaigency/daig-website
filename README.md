# dataaigency.com

Marketing site for data aigency — React 19 + Vite, pre-rendered static pages,
i18n-ready (EN live; NL/FR/PT planned). See `PRD.md` for requirements.

## Develop
npm install
npm run dev

## Test / build
npm test
npm run build   # emits fully pre-rendered dist/

## Deploy
Push to `main` — GitHub Actions builds and publishes to GitHub Pages
(custom domain via `public/CNAME`). One-time setup: repo Settings → Pages →
Source: "GitHub Actions"; DNS at the registrar: A records for apex →
GitHub Pages IPs, CNAME `www` → `<user>.github.io`.
