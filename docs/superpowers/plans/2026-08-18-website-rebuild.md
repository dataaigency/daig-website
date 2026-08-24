# Data Aigency Website Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the new multi-page dataaigency.com — React SPA with build-time pre-rendering, i18n-ready, MDX work section, GitHub Pages deploy.

**Architecture:** Vite builds a client bundle plus an SSR bundle; a post-build script renders every route to static HTML (SSG) so GitHub Pages serves real content per URL and the client hydrates. All copy lives in i18n JSON (EN now, NL/FR/PT later). Design tokens implement the settled brand (see spec §3).

**Tech Stack:** React 19, Vite 7, TypeScript, react-router v7, react-i18next, @mdx-js/rollup, Vitest + Testing Library, GitHub Actions → GitHub Pages.

**Spec:** `PRD.md` (repo root)

## Global Constraints

- Palette (exact): Paper `#FAF7F2`, Ink `#1A1030`, Violet `#6C4CF1`, Coral `#FF6B6B`, Sun `#FFC93C`, Flash `#3BF06E`.
- Diagonal stripes at **−45°** only as dividers/page bottoms — never behind text, never as card backgrounds.
- Brand name is written lowercase **"data aigency"** in copy; the i of "ai" carries a star tittle in the Wordmark component only (plain text elsewhere).
- Fonts self-hosted via `@fontsource` — no external requests anywhere (the Google Calendar booking link is a plain `<a href>`, allowed).
- All user-visible strings come from `src/locales/en/common.json` via `t()` — no hardcoded copy in components.
- TypeScript strict; every task's tests green before commit; conventional commit messages.
- Node ≥ 20, npm. Windows dev machine (PowerShell) — plan commands are cross-platform npm scripts.
- Deploy base path is `/` (custom domain dataaigency.com).

---

### Task 1: Repo init + Vite scaffold

**Files:**
- Create: `.gitignore`, `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`
- Existing kept as-is: `PRD.md`, `logo-design-brief.md`, `assets/`, `docs/`

**Interfaces:**
- Produces: `App` component (default export, contains routes later); npm scripts `dev`, `build`, `test`.

- [ ] **Step 1: Init git and .gitignore**

```bash
git init -b main
```

`.gitignore`:
```
node_modules/
dist/
dist-ssr/
*.local
.DS_Store
```

- [ ] **Step 2: Write package.json and configs**

`package.json`:
```json
{
  "name": "daig-website",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs",
    "build:client": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  }
}
```

(Note: `build` references `entry-server.tsx`/`prerender.mjs` created in Task 12; until then use `npm run build:client`.)

`vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
})
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "isolatedModules": true,
    "types": ["vite/client"]
  },
  "include": ["src"]
}
```

`index.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--app-head-->
    <title>data aigency — take agency over your data</title>
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`src/vite-env.d.ts`:
```ts
/// <reference types="vite/client" />
```

`src/App.tsx`:
```tsx
export default function App() {
  return <h1>data aigency</h1>
}
```

`src/main.tsx`:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 3: Install dependencies**

```bash
npm install react react-dom react-router i18next react-i18next
npm install -D typescript vite @vitejs/plugin-react @types/react @types/react-dom
```

- [ ] **Step 4: Verify dev + build**

Run: `npm run build:client` — Expected: `dist/` produced, no TS errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React + TS with existing brand assets and PRD"
```

---

### Task 2: Test tooling (Vitest + Testing Library)

**Files:**
- Modify: `vite.config.ts`, `package.json` (devDeps via npm)
- Create: `src/test/setup.ts`, `src/App.test.tsx`

**Interfaces:**
- Produces: `npm test` runs Vitest with jsdom + jest-dom matchers; `src/test/setup.ts` is the shared setup file.

- [ ] **Step 1: Install and configure**

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

`vite.config.ts` (replace file):
```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
})
```

`src/test/setup.ts`:
```ts
import '@testing-library/jest-dom/vitest'
```

Add `"types": ["vite/client", "vitest/globals"]` to `tsconfig.json` compilerOptions (replacing the existing `types` array).

- [ ] **Step 2: Write smoke test**

`src/App.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders brand name', () => {
  render(<App />)
  expect(screen.getByText(/data aigency/i)).toBeInTheDocument()
})
```

- [ ] **Step 3: Run tests**

Run: `npm test` — Expected: 1 passed.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "test: add Vitest + Testing Library tooling with smoke test"
```

---

### Task 3: Design tokens, fonts, global styles

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/global.css`, `public/favicon.svg` (copy of `assets/logo/favicon.svg`)
- Modify: `src/main.tsx`

**Interfaces:**
- Produces: CSS custom properties `--paper --ink --violet --coral --sun --flash --font-display --font-body`; classes `.stripe`, `.stripe--loud`, `.stripe--quiet`, `.btn`, `.btn--primary`, `.btn--secondary`, `.container`, `.eyebrow`. All later components use these names exactly.

- [ ] **Step 1: Install fonts, copy favicon**

```bash
npm install @fontsource-variable/bricolage-grotesque @fontsource-variable/hanken-grotesk @fontsource/montserrat
```

Copy `assets/logo/favicon.svg` → `public/favicon.svg` (interim until final emblem).

- [ ] **Step 2: Write tokens and global CSS**

`src/styles/tokens.css`:
```css
:root {
  --paper: #FAF7F2;
  --ink: #1A1030;
  --violet: #6C4CF1;
  --coral: #FF6B6B;
  --sun: #FFC93C;
  --flash: #3BF06E;
  --ink-soft: #55524B;
  --line: #E6E0D4;
  --font-display: 'Bricolage Grotesque Variable', 'Segoe UI', system-ui, sans-serif;
  --font-body: 'Hanken Grotesk Variable', 'Segoe UI', system-ui, sans-serif;
  --radius: 8px;
  --container: 1080px;
}
```

`src/styles/global.css`:
```css
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.6;
}
h1, h2, h3 { font-family: var(--font-display); line-height: 1.08; letter-spacing: -0.02em; margin: 0; }
a { color: var(--violet); }
a:hover { color: #4F32C7; }
.container { max-width: var(--container); margin: 0 auto; padding: 0 24px; }
.eyebrow {
  font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
  color: #8A857B; font-weight: 600;
}
.stripe { height: 12px; }
.stripe--loud {
  background: repeating-linear-gradient(-45deg,
    var(--violet) 0 14px, var(--coral) 14px 28px,
    var(--sun) 28px 42px, var(--flash) 42px 56px);
}
.stripe--quiet {
  background: repeating-linear-gradient(-45deg, var(--violet) 0 14px, #F1EDFF 14px 28px);
}
.btn {
  display: inline-block; font-weight: 700; font-size: 15px;
  padding: 13px 26px; border-radius: var(--radius);
  text-decoration: none; border: none; cursor: pointer;
}
.btn--primary { background: var(--violet); color: #fff; }
.btn--primary:hover { background: #5A3BD8; color: #fff; }
.btn--secondary { background: transparent; color: var(--ink); border: 1.5px solid var(--ink); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

`src/main.tsx` — add at the top:
```tsx
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/hanken-grotesk'
import '@fontsource/montserrat/800.css'
import './styles/tokens.css'
import './styles/global.css'
```

- [ ] **Step 3: Verify build**

Run: `npm run build:client` — Expected: success; `dist/assets` contains woff2 files (fonts bundled, not fetched).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: brand design tokens, self-hosted fonts, stripe/button primitives"
```

---

### Task 4: i18n with full EN copy

**Files:**
- Create: `src/i18n.ts`, `src/locales/en/common.json`
- Modify: `src/main.tsx`
- Test: `src/i18n.test.ts`

**Interfaces:**
- Produces: importing `./i18n` initializes i18next synchronously; `useTranslation()` works in any component. Key structure below is the contract for all page tasks. `returnObjects: true` is enabled so `t('dictionary.entries', { returnObjects: true })` yields arrays.

- [ ] **Step 1: Write failing test**

`src/i18n.test.ts`:
```ts
import i18n from './i18n'

test('EN copy resolves', () => {
  expect(i18n.t('hero.title')).toBe('Take agency over your data.')
  const entries = i18n.t('dictionary.entries', { returnObjects: true }) as unknown[]
  expect(entries).toHaveLength(3)
})
```

Run: `npm test` — Expected: FAIL (cannot resolve `./i18n`).

- [ ] **Step 2: Write locale file and init module**

`src/locales/en/common.json`:
```json
{
  "nav": { "services": "Services", "work": "Work", "about": "About", "contact": "Contact", "cta": "Free audit" },
  "hero": {
    "eyebrow": "Data & AI architecture studio",
    "title": "Take agency over your data.",
    "sub": "Lakehouses, pipelines and AI-ready foundations — built properly, secured from day one, and handed over so they're yours, not ours.",
    "cta": "Book a free architecture audit",
    "secondary": "How we work"
  },
  "dictionary": {
    "label": "The name is the pitch",
    "entries": [
      { "word": "data aigency", "pos": "/ˈeɪ·dʒən·si/ · noun", "def": "The capacity to act. You regain agency over your data — one source of truth, owned by you, documented for you." },
      { "word": "data aigency", "pos": "noun", "def": "A consulting practice. We design the architecture, build the pipelines, and hand everything over — scope, timeline and costs agreed before we start." },
      { "word": "data aigency", "pos": "noun, ours", "def": "Agency, with AI built in — adopted in phases, with security and governance from the start. Not a vibe-coded data strategy." }
    ]
  },
  "services": {
    "label": "What we build",
    "title": "Four things, done properly.",
    "cta": "See all services",
    "items": [
      { "title": "Lakehouse architecture", "desc": "Production-grade lakehouses in Fabric or GCP — semantic layers, governance, medallion done right from day one.", "outcomes": ["One source of truth your teams trust", "Governance and semantic layer from day one", "Documented, transferable architecture"] },
      { "title": "Pipelines & automation", "desc": "Dependable ELT/ETL with dbt, orchestrated in BigQuery, Python, Airflow or Fabric. Data quality you stop thinking about.", "outcomes": ["Analysts stop cleaning, start analyzing", "Tested, monitored pipelines", "Costs you can predict"] },
      { "title": "AI-ready data layers", "desc": "Feature stores, training sets and analytics layers your ML and BI teams can actually use.", "outcomes": ["ML-ready features without the scramble", "Training data with lineage", "Analytics layers that answer questions"] },
      { "title": "AI adoption & governance", "desc": "Phased AI rollout with security, access control and evaluation built in — from first use-case to production.", "outcomes": ["A phased roadmap, not a vibe-coded strategy", "Security and access control designed in", "Evaluation before scale-up"] }
    ]
  },
  "process": {
    "label": "No black boxes",
    "title": "Audit → architecture → build → handover. You keep the keys and the docs.",
    "cta": "Start with the free audit",
    "note": "30 minutes, no deck, no obligations."
  },
  "about": {
    "title": "One architect, end to end.",
    "body1": "data aigency is the practice of Vadim Lucas. The person who scopes your audit is the person who designs the architecture, builds it, and hands it over.",
    "body2": "The way of working is simple: agree scope, timeline and costs up front; build with the boring reliability your data deserves; document everything; hand over the keys. No lock-in, no black boxes.",
    "linkLabel": "Find me on LinkedIn"
  },
  "contact": {
    "title": "Let's audit your data architecture — free.",
    "sub": "A 30-minute architecture review. No deck, no obligations — you leave with at least one concrete improvement.",
    "book": "Pick a slot",
    "linkedin": "LinkedIn",
    "github": "GitHub"
  },
  "work": {
    "title": "Work & writing",
    "empty": "First case study coming soon."
  },
  "footer": {
    "tagline": "From chaos to insights.",
    "languages": "EN · NL · FR · PT coming later"
  }
}
```

`src/i18n.ts`:
```ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/common.json'

i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnObjects: true,
})

export default i18n
```

`src/main.tsx` — add `import './i18n'` before the App import.

- [ ] **Step 3: Run tests**

Run: `npm test` — Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: i18n setup with full English copy"
```

---

### Task 5: UI primitives — Wordmark, StripeBand, Nav, Footer, Layout

**Files:**
- Create: `src/components/Wordmark.tsx`, `src/components/StripeBand.tsx`, `src/components/Nav.tsx`, `src/components/Footer.tsx`, `src/components/Layout.tsx`, `src/components/components.css`
- Test: `src/components/Layout.test.tsx`

**Interfaces:**
- Consumes: i18n keys `nav.*`, `footer.*`; CSS tokens/classes from Task 3.
- Produces: `<Layout>{children}</Layout>` (Nav + main + stripe + Footer); `<Wordmark size={16} inverse={false} />`; `<StripeBand variant="loud" | "quiet" />`. External profile URLs live in `src/links.ts`: `LINKS = { booking, linkedin, github }`.

- [ ] **Step 1: Write failing test**

`src/components/Layout.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import '../i18n'
import Layout from './Layout'

test('layout renders nav, content and footer', () => {
  render(
    <MemoryRouter>
      <Layout><p>page-content</p></Layout>
    </MemoryRouter>,
  )
  expect(screen.getAllByText(/gency/).length).toBeGreaterThanOrEqual(2)
  expect(screen.getByText('page-content')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services')
})
```

Run: `npm test` — Expected: FAIL (modules missing).

- [ ] **Step 2: Implement**

`src/links.ts`:
```ts
export const LINKS = {
  booking: 'https://calendar.app.google/F5mvmg12xMpF73fw6',
  linkedin: 'https://www.linkedin.com/in/vadimvandenheuvel/',
  github: 'https://github.com/vadimwit/',
}
```

`src/components/Wordmark.tsx` (star = symmetric 4-point sparkle as the tittle of the ı, per brand):
```tsx
export default function Wordmark({ size = 16, inverse = false }: { size?: number; inverse?: boolean }) {
  const ink = inverse ? 'var(--paper)' : 'var(--ink)'
  return (
    <span style={{ fontFamily: 'Montserrat, var(--font-display)', fontWeight: 800, fontSize: size, letterSpacing: '-0.02em', color: ink, lineHeight: 1, whiteSpace: 'nowrap' }}>
      data a<span style={{ position: 'relative', display: 'inline-block' }}>
        ı
        <svg viewBox="0 0 120 120" aria-hidden="true" style={{ position: 'absolute', top: '0.03em', left: '50%', transform: 'translateX(-50%)', width: '0.28em', height: '0.28em' }}>
          <path d="M60 8 C63.5 44 68 50 112 60 C68 70 63.5 76 60 112 C56.5 76 52 70 8 60 C52 50 56.5 44 60 8 Z" fill={inverse ? 'var(--flash)' : 'var(--violet)'} />
        </svg>
      </span>gency
    </span>
  )
}
```

`src/components/StripeBand.tsx`:
```tsx
export default function StripeBand({ variant = 'loud' }: { variant?: 'loud' | 'quiet' }) {
  return <div className={`stripe stripe--${variant}`} aria-hidden="true" />
}
```

`src/components/components.css`:
```css
.nav { display: flex; align-items: center; justify-content: space-between; padding: 18px 0; }
.nav__links { display: flex; gap: 22px; align-items: center; font-size: 14px; font-weight: 600; }
.nav__links a { color: var(--ink); text-decoration: none; }
.nav__links a:hover { color: var(--violet); }
.footer { background: var(--ink); color: var(--paper); }
.footer__inner { display: flex; align-items: center; justify-content: space-between; padding: 28px 24px; gap: 16px; flex-wrap: wrap; }
.footer__meta { display: flex; gap: 18px; font-size: 13px; color: #9B8FBF; align-items: center; flex-wrap: wrap; }
.footer__meta a { color: #9B8FBF; text-decoration: none; }
.footer__meta a:hover { color: var(--flash); }
@media (max-width: 640px) { .nav__links { gap: 14px; } }
```

`src/components/Nav.tsx`:
```tsx
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import Wordmark from './Wordmark'
import { LINKS } from '../links'

export default function Nav() {
  const { t } = useTranslation()
  return (
    <header className="container">
      <nav className="nav">
        <Link to="/" style={{ textDecoration: 'none' }} aria-label="data aigency home"><Wordmark size={17} /></Link>
        <div className="nav__links">
          <Link to="/services">{t('nav.services')}</Link>
          <Link to="/work">{t('nav.work')}</Link>
          <Link to="/about">{t('nav.about')}</Link>
          <a className="btn btn--primary" style={{ padding: '8px 18px', fontSize: 13 }} href={LINKS.booking}>{t('nav.cta')}</a>
        </div>
      </nav>
    </header>
  )
}
```

`src/components/Footer.tsx`:
```tsx
import { useTranslation } from 'react-i18next'
import Wordmark from './Wordmark'
import StripeBand from './StripeBand'
import { LINKS } from '../links'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer>
      <StripeBand variant="loud" />
      <div className="footer">
        <div className="footer__inner container">
          <Wordmark size={14} inverse />
          <div className="footer__meta">
            <span>{t('footer.tagline')}</span>
            <a href={LINKS.linkedin}>LinkedIn</a>
            <a href={LINKS.github}>GitHub</a>
            <span>{t('footer.languages')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

`src/components/Layout.tsx`:
```tsx
import type { ReactNode } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import './components.css'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Run tests**

Run: `npm test` — Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: layout primitives — star-dot wordmark, nav, footer, stripe band"
```

---

### Task 6: Router + page shells

**Files:**
- Create: `src/routes.ts`, `src/pages/Home.tsx`, `src/pages/Services.tsx`, `src/pages/Work.tsx`, `src/pages/About.tsx`, `src/pages/Contact.tsx`
- Modify: `src/App.tsx`, `src/main.tsx`, delete `src/App.test.tsx` (superseded by route test)
- Test: `src/App.routes.test.tsx`

**Interfaces:**
- Consumes: `Layout` from Task 5.
- Produces: `App` renders `<Routes>` only (router provider lives OUTSIDE App, so server can wrap in StaticRouter later); `STATIC_ROUTES: string[]` in `src/routes.ts`; each page is a default-export component.

- [ ] **Step 1: Write failing test**

`src/App.routes.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import './i18n'
import App from './App'

test.each([
  ['/', 'Take agency over your data.'],
  ['/services', 'Four things, done properly.'],
  ['/about', 'One architect, end to end.'],
  ['/contact', "Let's audit your data architecture — free."],
  ['/work', 'Work & writing'],
])('route %s renders', (path, text) => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
  expect(screen.getByText(text)).toBeInTheDocument()
})
```

Run: `npm test` — Expected: FAIL.

- [ ] **Step 2: Implement shells**

`src/routes.ts`:
```ts
export const STATIC_ROUTES = ['/', '/services', '/work', '/about', '/contact']
```

Each page shell follows this pattern (Home shown; Services/Work/About/Contact identical with their own translation keys — `services.title`, `work.title`, `about.title`, `contact.title`):

`src/pages/Home.tsx`:
```tsx
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  return (
    <div className="container" style={{ padding: '56px 24px' }}>
      <h1>{t('hero.title')}</h1>
    </div>
  )
}
```

`src/pages/Services.tsx`:
```tsx
import { useTranslation } from 'react-i18next'

export default function Services() {
  const { t } = useTranslation()
  return (
    <div className="container" style={{ padding: '56px 24px' }}>
      <h1>{t('services.title')}</h1>
    </div>
  )
}
```

`src/pages/Work.tsx`:
```tsx
import { useTranslation } from 'react-i18next'

export default function Work() {
  const { t } = useTranslation()
  return (
    <div className="container" style={{ padding: '56px 24px' }}>
      <h1>{t('work.title')}</h1>
    </div>
  )
}
```

`src/pages/About.tsx`:
```tsx
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()
  return (
    <div className="container" style={{ padding: '56px 24px' }}>
      <h1>{t('about.title')}</h1>
    </div>
  )
}
```

`src/pages/Contact.tsx`:
```tsx
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <div className="container" style={{ padding: '56px 24px' }}>
      <h1>{t('contact.title')}</h1>
    </div>
  )
}
```

`src/App.tsx` (replace):
```tsx
import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  )
}
```

`src/main.tsx` — wrap App:
```tsx
import { BrowserRouter } from 'react-router'
// ...existing imports...
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

Delete `src/App.test.tsx`.

- [ ] **Step 3: Run tests**

Run: `npm test` — Expected: PASS (5 route cases + earlier suites).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: router with five page shells"
```

---

### Task 7: Home page complete

**Files:**
- Modify: `src/pages/Home.tsx`
- Create: `src/pages/home.css`, `src/components/icons.tsx`
- Test: `src/pages/Home.test.tsx`

**Interfaces:**
- Consumes: i18n `hero.* dictionary.* services.* process.*`; `StripeBand`; `LINKS.booking`; icon components from `icons.tsx`: `IconLayers`, `IconPipeline`, `IconChart`, `IconShield` (each `({ color }: { color?: string })` returning a 24×24 stroke SVG).
- Produces: complete Home; `icons.tsx` reused by Services (Task 8).

- [ ] **Step 1: Write failing test**

`src/pages/Home.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import '../i18n'
import Home from './Home'

test('home renders hero, three dictionary entries, four services, process CTA', () => {
  render(<MemoryRouter><Home /></MemoryRouter>)
  // hero title is split across spans (underlined "agency"), so match on the heading's textContent
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Take agency over your data.')
  expect(screen.getAllByText('data aigency', { exact: false }).length).toBeGreaterThanOrEqual(3)
  expect(screen.getByText('Lakehouse architecture')).toBeInTheDocument()
  expect(screen.getByText('AI adoption & governance')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Book a free architecture audit' })).toBeInTheDocument()
})
```

Run: `npm test` — Expected: FAIL.

- [ ] **Step 2: Implement icons**

`src/components/icons.tsx`:
```tsx
const base = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export const IconLayers = ({ color = 'var(--violet)' }: { color?: string }) => (
  <svg {...base} stroke={color} aria-hidden="true">
    <path d="M12 3 L21 7.5 L12 12 L3 7.5 Z" /><path d="M3 12 L12 16.5 L21 12" /><path d="M3 16.5 L12 21 L21 16.5" />
  </svg>
)
export const IconPipeline = ({ color = 'var(--coral)' }: { color?: string }) => (
  <svg {...base} stroke={color} aria-hidden="true">
    <circle cx="5" cy="6" r="2.2" /><circle cx="19" cy="6" r="2.2" /><circle cx="12" cy="18" r="2.2" />
    <path d="M7 7.2 L10.5 16" /><path d="M17 7.2 L13.5 16" /><path d="M7.2 6 L16.8 6" />
  </svg>
)
export const IconChart = ({ color = 'var(--flash)' }: { color?: string }) => (
  <svg {...base} stroke={color} aria-hidden="true"><path d="M3 20 L8 14 L12 16.5 L20 7" /></svg>
)
export const IconShield = ({ color = 'var(--sun)' }: { color?: string }) => (
  <svg {...base} stroke={color} aria-hidden="true">
    <path d="M12 3 L20 6 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V6 Z" /><path d="M9 11.5 L11 13.5 L15 9" />
  </svg>
)
```

- [ ] **Step 3: Implement Home**

`src/pages/home.css`:
```css
.hero { padding: 72px 0 80px; }
.hero h1 { font-size: clamp(38px, 7vw, 60px); max-width: 640px; }
.hero__sub { font-size: 17px; color: var(--ink-soft); max-width: 500px; margin: 20px 0 26px; }
.hero__actions { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
.hero__underline { border-bottom: 5px solid var(--coral); }
.dict { background: #fff; padding: 64px 0; }
.dict__entry { border-top: 1px solid var(--line); padding: 24px 0; display: flex; gap: 24px; }
.dict__entry:last-child { border-bottom: 1px solid var(--line); }
.dict__num { font-weight: 800; width: 24px; flex-shrink: 0; }
.dict__word { font-family: var(--font-display); font-size: 22px; font-weight: 800; }
.dict__pos { font-weight: 400; font-size: 14px; color: #A39C8E; font-style: italic; margin-left: 8px; }
.dict__def { color: var(--ink-soft); max-width: 560px; margin-top: 6px; }
.svc { padding: 64px 0; }
.svc__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; margin-top: 28px; }
.svc__card { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 22px; }
.svc__card h3 { font-size: 17px; margin: 12px 0 8px; }
.svc__card p { font-size: 14px; color: var(--ink-soft); margin: 0; }
.process { background: #F1EDFF; clip-path: polygon(0 40px, 100% 0, 100% 100%, 0 100%); padding: 88px 0 64px; }
.process h2 { font-size: clamp(22px, 3.5vw, 28px); max-width: 560px; margin: 12px 0 22px; }
.process__row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
.process__note { font-size: 14px; color: var(--ink-soft); }
```

`src/pages/Home.tsx` (replace):
```tsx
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import StripeBand from '../components/StripeBand'
import { IconLayers, IconPipeline, IconChart, IconShield } from '../components/icons'
import { LINKS } from '../links'
import './home.css'

type DictEntry = { word: string; pos: string; def: string }
type ServiceItem = { title: string; desc: string }
const dictColors = ['var(--violet)', 'var(--coral)', 'var(--flash)']
const icons = [IconLayers, IconPipeline, IconChart, IconShield]

export default function Home() {
  const { t } = useTranslation()
  const entries = t('dictionary.entries', { returnObjects: true }) as DictEntry[]
  const services = t('services.items', { returnObjects: true }) as ServiceItem[]
  const [heroA, heroB] = t('hero.title').split('agency')
  return (
    <>
      <section className="hero container">
        <p className="eyebrow">{t('hero.eyebrow')}</p>
        <h1>{heroA}<span className="hero__underline">agency</span>{heroB}</h1>
        <p className="hero__sub">{t('hero.sub')}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href={LINKS.booking}>{t('hero.cta')}</a>
          <Link className="btn btn--secondary" to="/about">{t('hero.secondary')}</Link>
        </div>
      </section>
      <StripeBand variant="loud" />
      <section className="dict">
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 24 }}>{t('dictionary.label')}</p>
          {entries.map((e, i) => (
            <div className="dict__entry" key={i}>
              <span className="dict__num" style={{ color: dictColors[i] }}>{i + 1}</span>
              <div>
                <span className="dict__word">{e.word}</span>
                <span className="dict__pos">{e.pos}</span>
                <p className="dict__def">{e.def}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="svc container">
        <p className="eyebrow">{t('services.label')}</p>
        <h2 style={{ fontSize: 30, marginTop: 8 }}>{t('services.title')}</h2>
        <div className="svc__grid">
          {services.map((s, i) => {
            const Icon = icons[i]
            return (
              <div className="svc__card" key={s.title}>
                <Icon />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            )
          })}
        </div>
        <p style={{ marginTop: 20 }}><Link to="/services">{t('services.cta')} →</Link></p>
      </section>
      <section className="process">
        <div className="container">
          <p className="eyebrow" style={{ color: '#7A6BB8' }}>{t('process.label')}</p>
          <h2>{t('process.title')}</h2>
          <div className="process__row">
            <a className="btn btn--primary" style={{ background: 'var(--ink)' }} href={LINKS.booking}>{t('process.cta')}</a>
            <span className="process__note">{t('process.note')}</span>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: Update the '/' route expectation**

In `src/App.routes.test.tsx`, the `['/', 'Take agency over your data.']` case now fails because the hero title is split across spans. Change that row to `['/', 'Lakehouses, pipelines and AI-ready foundations — built properly, secured from day one, and handed over so they're yours, not ours.']` (the hero sub, rendered as one text node). Keep the other rows unchanged.

- [ ] **Step 5: Run tests, view in dev**

Run: `npm test` — Expected: PASS. Run `npm run dev` and eyeball `/` against the canvas Website page (hero, stripe seam, dictionary, cards, diagonal-cut process block).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: complete homepage — hero, dictionary, services, process"
```

---

### Task 8: Services page

**Files:**
- Modify: `src/pages/Services.tsx`
- Test: `src/pages/Services.test.tsx`

**Interfaces:**
- Consumes: i18n `services.items[].outcomes`, icons from Task 7, `StripeBand`, `LINKS.booking`.

- [ ] **Step 1: Write failing test**

`src/pages/Services.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import '../i18n'
import Services from './Services'

test('services page renders four pillars with outcomes', () => {
  render(<MemoryRouter><Services /></MemoryRouter>)
  expect(screen.getByText('AI adoption & governance')).toBeInTheDocument()
  expect(screen.getByText('A phased roadmap, not a vibe-coded strategy')).toBeInTheDocument()
})
```

Run: `npm test` — Expected: FAIL.

- [ ] **Step 2: Implement**

`src/pages/Services.tsx` (replace):
```tsx
import { useTranslation } from 'react-i18next'
import StripeBand from '../components/StripeBand'
import { IconLayers, IconPipeline, IconChart, IconShield } from '../components/icons'
import { LINKS } from '../links'

type ServiceItem = { title: string; desc: string; outcomes: string[] }
const icons = [IconLayers, IconPipeline, IconChart, IconShield]

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true }) as ServiceItem[]
  return (
    <>
      <section className="container" style={{ padding: '64px 24px 48px' }}>
        <p className="eyebrow">{t('services.label')}</p>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)', marginTop: 8 }}>{t('services.title')}</h1>
      </section>
      <StripeBand variant="quiet" />
      <section className="container" style={{ padding: '48px 24px 64px', display: 'grid', gap: 24 }}>
        {items.map((s, i) => {
          const Icon = icons[i]
          return (
            <article key={s.title} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 10, padding: 28 }}>
              <Icon />
              <h2 style={{ fontSize: 22, margin: '12px 0 8px' }}>{s.title}</h2>
              <p style={{ color: 'var(--ink-soft)', maxWidth: 640 }}>{s.desc}</p>
              <ul style={{ margin: '14px 0 0', paddingLeft: 20, color: 'var(--ink-soft)' }}>
                {s.outcomes.map((o) => <li key={o}>{o}</li>)}
              </ul>
            </article>
          )
        })}
        <p><a className="btn btn--primary" href={LINKS.booking}>{t('hero.cta')}</a></p>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Run tests**

Run: `npm test` — Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: services page with four pillars and outcomes"
```

---

### Task 9: About + Contact pages

**Files:**
- Modify: `src/pages/About.tsx`, `src/pages/Contact.tsx`
- Test: `src/pages/AboutContact.test.tsx`

**Interfaces:**
- Consumes: i18n `about.*`, `contact.*`; `LINKS`.

- [ ] **Step 1: Write failing test**

`src/pages/AboutContact.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import '../i18n'
import About from './About'
import Contact from './Contact'

test('about tells the one-architect story', () => {
  render(<MemoryRouter><About /></MemoryRouter>)
  expect(screen.getByText(/practice of Vadim Lucas/)).toBeInTheDocument()
})

test('contact links booking, linkedin, github', () => {
  render(<MemoryRouter><Contact /></MemoryRouter>)
  expect(screen.getByRole('link', { name: 'Pick a slot' })).toHaveAttribute('href', expect.stringContaining('calendar.app.google'))
  expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
})
```

Run: `npm test` — Expected: FAIL.

- [ ] **Step 2: Implement**

`src/pages/About.tsx` (replace):
```tsx
import { useTranslation } from 'react-i18next'
import { LINKS } from '../links'

export default function About() {
  const { t } = useTranslation()
  return (
    <section className="container" style={{ padding: '64px 24px', maxWidth: 720 }}>
      <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)' }}>{t('about.title')}</h1>
      <p style={{ marginTop: 20, color: 'var(--ink-soft)' }}>{t('about.body1')}</p>
      <p style={{ color: 'var(--ink-soft)' }}>{t('about.body2')}</p>
      <p style={{ marginTop: 18 }}><a href={LINKS.linkedin}>{t('about.linkLabel')} →</a></p>
    </section>
  )
}
```

`src/pages/Contact.tsx` (replace):
```tsx
import { useTranslation } from 'react-i18next'
import { LINKS } from '../links'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <section className="container" style={{ padding: '64px 24px', maxWidth: 720 }}>
      <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)' }}>{t('contact.title')}</h1>
      <p style={{ marginTop: 20, color: 'var(--ink-soft)' }}>{t('contact.sub')}</p>
      <p style={{ marginTop: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <a className="btn btn--primary" href={LINKS.booking}>{t('contact.book')}</a>
        <a className="btn btn--secondary" href={LINKS.linkedin}>{t('contact.linkedin')}</a>
        <a className="btn btn--secondary" href={LINKS.github}>{t('contact.github')}</a>
      </p>
    </section>
  )
}
```

- [ ] **Step 3: Run tests**

Run: `npm test` — Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: about and contact pages"
```

---

### Task 10: Work section (MDX)

**Files:**
- Modify: `vite.config.ts`, `src/pages/Work.tsx`, `src/App.tsx`
- Create: `src/content/work/2026-08-hello.mdx`, `src/lib/posts.ts`, `src/pages/WorkPost.tsx`, `src/mdx.d.ts`
- Test: `src/lib/posts.test.ts`

**Interfaces:**
- Consumes: i18n `work.*`.
- Produces: `getPosts(): Post[]` where `Post = { slug: string; title: string; date: string; tags: string[]; lang: string; summary: string; Component: ComponentType }`, sorted newest-first; route `/work/:slug`. Prerender (Task 12) calls `getPosts()` for route discovery.

- [ ] **Step 1: Install and configure MDX**

```bash
npm install -D @mdx-js/rollup @types/mdx
```

`vite.config.ts` — replace the `plugins` line:
```ts
import mdx from '@mdx-js/rollup'
// ...
  plugins: [
    { enforce: 'pre', ...mdx({ jsxImportSource: 'react' }) },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
```

`src/mdx.d.ts`:
```ts
declare module '*.mdx' {
  import type { ComponentType } from 'react'
  export const meta: { title: string; date: string; tags: string[]; lang: string; summary: string }
  const MDXComponent: ComponentType
  export default MDXComponent
}
```

- [ ] **Step 2: Write failing test**

`src/lib/posts.test.ts`:
```ts
import { getPosts } from './posts'

test('posts load with meta and slug from filename', () => {
  const posts = getPosts()
  expect(posts.length).toBeGreaterThanOrEqual(1)
  expect(posts[0].slug).toBe('2026-08-hello')
  expect(posts[0].title).toBeTruthy()
  expect(typeof posts[0].Component).toBe('function')
})
```

Run: `npm test` — Expected: FAIL.

- [ ] **Step 3: Implement posts lib and first entry**

`src/content/work/2026-08-hello.mdx`:
```mdx
export const meta = {
  title: 'Rebuilding dataaigency.com in the open',
  date: '2026-08-18',
  tags: ['meta'],
  lang: 'en',
  summary: 'Why this site is a public repo, and how the rebuild works.',
}

This site is its own first case study: a React + Vite rebuild with the brand
designed in the open, translation-ready from day one, deployed free on GitHub
Pages. Real client case studies land here next.
```

`src/lib/posts.ts`:
```ts
import type { ComponentType } from 'react'

type MdxModule = {
  default: ComponentType
  meta: { title: string; date: string; tags: string[]; lang: string; summary: string }
}

export type Post = MdxModule['meta'] & { slug: string; Component: ComponentType }

const modules = import.meta.glob<MdxModule>('../content/work/*.mdx', { eager: true })

export function getPosts(): Post[] {
  return Object.entries(modules)
    .map(([path, mod]) => ({
      ...mod.meta,
      slug: path.split('/').pop()!.replace(/\.mdx$/, ''),
      Component: mod.default,
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
}
```

- [ ] **Step 4: Wire pages and route**

`src/pages/Work.tsx` (replace):
```tsx
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { getPosts } from '../lib/posts'

export default function Work() {
  const { t } = useTranslation()
  const posts = getPosts()
  return (
    <section className="container" style={{ padding: '64px 24px' }}>
      <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)' }}>{t('work.title')}</h1>
      {posts.length === 0 && <p style={{ marginTop: 20 }}>{t('work.empty')}</p>}
      <div style={{ marginTop: 28, display: 'grid', gap: 16 }}>
        {posts.map((p) => (
          <article key={p.slug} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 10, padding: 24 }}>
            <p className="eyebrow">{p.date}</p>
            <h2 style={{ fontSize: 20, margin: '8px 0' }}><Link to={`/work/${p.slug}`}>{p.title}</Link></h2>
            <p style={{ color: 'var(--ink-soft)', margin: 0 }}>{p.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
```

`src/pages/WorkPost.tsx`:
```tsx
import { useParams, Link } from 'react-router'
import { getPosts } from '../lib/posts'

export default function WorkPost() {
  const { slug } = useParams()
  const post = getPosts().find((p) => p.slug === slug)
  if (!post) return <section className="container" style={{ padding: '64px 24px' }}><p>Not found. <Link to="/work">Back to work</Link></p></section>
  const { Component } = post
  return (
    <article className="container" style={{ padding: '64px 24px', maxWidth: 720 }}>
      <p className="eyebrow">{post.date}</p>
      <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 40px)', margin: 0 }}>{post.title}</h1>
      <div style={{ marginTop: 24, color: 'var(--ink-soft)' }}><Component /></div>
    </article>
  )
}
```

`src/App.tsx` — add route (with the other imports/routes):
```tsx
import WorkPost from './pages/WorkPost'
// inside <Routes>:
<Route path="/work/:slug" element={<WorkPost />} />
```

- [ ] **Step 5: Run tests**

Run: `npm test` — Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: MDX work section with first entry"
```

---

### Task 11: SEO metadata

**Files:**
- Create: `src/seo.ts`, `public/robots.txt`
- Modify: `src/components/Layout.tsx`
- Test: `src/seo.test.ts`

**Interfaces:**
- Produces: `SITE_URL = 'https://dataaigency.com'`; `metaFor(path: string): { title: string; description: string }`; Layout sets `document.title` on navigation. Prerender (Task 12) imports `metaFor` and `SITE_URL` from the SSR bundle.

- [ ] **Step 1: Write failing test**

`src/seo.test.ts`:
```ts
import { metaFor } from './seo'

test('known routes get specific titles, unknown fall back', () => {
  expect(metaFor('/').title).toBe('data aigency — take agency over your data')
  expect(metaFor('/services').title).toContain('Services')
  expect(metaFor('/nonexistent').title).toBe('data aigency')
})
```

Run: `npm test` — Expected: FAIL.

- [ ] **Step 2: Implement**

`src/seo.ts`:
```ts
export const SITE_URL = 'https://dataaigency.com'

const META: Record<string, { title: string; description: string }> = {
  '/': { title: 'data aigency — take agency over your data', description: 'Lakehouses, pipelines and AI-ready foundations — built properly, secured from day one, handed over completely. Data & AI architecture studio.' },
  '/services': { title: 'Services — data aigency', description: 'Lakehouse architecture, pipelines & automation, AI-ready data layers, and phased AI adoption with governance.' },
  '/work': { title: 'Work — data aigency', description: 'Case studies and writing on data architecture and AI adoption.' },
  '/about': { title: 'About — data aigency', description: 'One architect, end to end: the practice of Vadim Lucas.' },
  '/contact': { title: 'Contact — data aigency', description: 'Book a free 30-minute data architecture audit.' },
}

export function metaFor(path: string): { title: string; description: string } {
  return META[path] ?? { title: 'data aigency', description: 'Data & AI architecture studio.' }
}
```

`public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://dataaigency.com/sitemap.xml
```

`src/components/Layout.tsx` — add inside the component before `return`:
```tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { metaFor } from '../seo'
// inside Layout():
const { pathname } = useLocation()
useEffect(() => {
  document.title = metaFor(pathname).title
}, [pathname])
```

- [ ] **Step 3: Run tests**

Run: `npm test` — Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: per-route SEO metadata and robots.txt"
```

---

### Task 12: SSG prerender + 404 + sitemap

**Files:**
- Create: `src/entry-server.tsx`, `scripts/prerender.mjs`
- Modify: `src/main.tsx` (hydrate when pre-rendered)

**Interfaces:**
- Consumes: `STATIC_ROUTES`, `getPosts`, `metaFor`, `SITE_URL`, `App`.
- Produces: `npm run build` emits `dist/<route>/index.html` for every route (real HTML + meta), `dist/404.html`, `dist/sitemap.xml`. SSR bundle exports `render(url): string` and `allRoutes(): string[]`.

- [ ] **Step 1: Write server entry**

`src/entry-server.tsx`:
```tsx
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import './i18n'
import App from './App'
import { STATIC_ROUTES } from './routes'
import { getPosts } from './lib/posts'

export { metaFor, SITE_URL } from './seo'

export function allRoutes(): string[] {
  return [...STATIC_ROUTES, ...getPosts().map((p) => `/work/${p.slug}`)]
}

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}
```

- [ ] **Step 2: Write prerender script**

`scripts/prerender.mjs`:
```js
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs'
import { resolve, join } from 'node:path'

const dist = resolve('dist')
const { render, allRoutes, metaFor, SITE_URL } = await import(resolve('dist-ssr/entry-server.js'))

const template = readFileSync(join(dist, 'index.html'), 'utf-8')
const routes = allRoutes()

for (const route of routes) {
  const meta = metaFor(route)
  const head = [
    `<meta name="description" content="${meta.description}" />`,
    `<meta property="og:title" content="${meta.title}" />`,
    `<meta property="og:description" content="${meta.description}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${SITE_URL}${route === '/' ? '' : route}" />`,
    `<link rel="canonical" href="${SITE_URL}${route === '/' ? '' : route}" />`,
  ].join('\n    ')
  const html = template
    .replace('<!--app-head-->', head)
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace('<!--app-html-->', render(route))
  const outDir = route === '/' ? dist : join(dist, route.slice(1))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  console.log('prerendered', route)
}

copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE_URL}${r === '/' ? '' : r}</loc></url>`).join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
console.log(`done: ${routes.length} routes + 404.html + sitemap.xml`)
```

- [ ] **Step 3: Make client hydrate**

`src/main.tsx` — replace the render call:
```tsx
import { createRoot, hydrateRoot } from 'react-dom/client'
// ...
const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
// dev index.html only carries the <!--app-html--> comment (not an element),
// so element-presence is the correct "was this pre-rendered?" signal
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
```

- [ ] **Step 4: Verify full build**

Run: `npm run build`
Expected: prerender logs all routes. Then verify content is really in the HTML:

```bash
node -e "const f=require('node:fs');const h=f.readFileSync('dist/services/index.html','utf8');if(!h.includes('Four things, done properly.'))process.exit(1);console.log('SSG OK')"
```

Expected: `SSG OK`. Also run `npm run preview` and click through all routes + a work post; check browser console for hydration warnings.

- [ ] **Step 5: Run tests**

Run: `npm test` — Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: build-time pre-rendering with sitemap and SPA 404 fallback"
```

---

### Task 13: GitHub Pages deploy

**Files:**
- Create: `.github/workflows/deploy.yml`, `public/CNAME`, `README.md`

**Interfaces:**
- Consumes: `npm run build` (Task 12).
- Produces: push to `main` on GitHub deploys `dist/` to Pages.

- [ ] **Step 1: Write workflow and CNAME**

`public/CNAME`:
```
dataaigency.com
```

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

`README.md`:
```markdown
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
```

- [ ] **Step 2: Verify build still green, commit**

Run: `npm test` then `npm run build` — Expected: pass; `dist/CNAME` exists.

```bash
git add -A
git commit -m "ci: GitHub Pages deploy workflow, CNAME, README"
```

- [ ] **Step 3: Hand off to Vadim (manual, outside the repo)**

Cannot be done by the executor — surface these in the final report:
1. Create the public GitHub repo and `git remote add origin … && git push -u origin main`.
2. Repo Settings → Pages → Source: **GitHub Actions**; watch the first deploy.
3. When ready to launch: add `dataaigency.com` as custom domain in Pages settings and point DNS at the registrar (apex A records to GitHub Pages, `www` CNAME). Until then the site lives at `https://<user>.github.io/<repo>/` — note the workflow deploys fine but the CNAME only takes effect once DNS is set.

---

## Deferred (do NOT build now)

- Final emblem integration (waiting on external tool output → `assets/`), favicon swap.
- NL/FR/PT locale files and language switcher UI beyond the footer label.
- Analytics (none at launch — zero external requests).
- Additional case studies.
