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
