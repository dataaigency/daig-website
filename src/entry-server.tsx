import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import './i18n'
import App from './App'
import { STATIC_ROUTES } from './routes'
import { getPosts, workPageRoutes } from './lib/posts'

export { metaFor, SITE_URL, BRAND } from './seo'
export { LINKS } from './links'

export function allRoutes(): string[] {
  const posts = getPosts()
  return [...STATIC_ROUTES, ...workPageRoutes(posts.length), ...posts.map((p) => `/work/${p.slug}`)]
}

/** Serializable post meta for the prerender script (no React components), keyed
 *  by route so `scripts/prerender.mjs` can build per-post head tags + JSON-LD. */
export function postsByRoute(): Record<
  string,
  { slug: string; title: string; summary: string; date: string; tags: string[]; lang: string }
> {
  return Object.fromEntries(
    getPosts().map(({ slug, title, summary, date, tags, lang }) => [
      `/work/${slug}`,
      { slug, title, summary, date, tags, lang },
    ]),
  )
}

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}
