import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = resolve('dist')
const { render, allRoutes, metaFor, postsByRoute, SITE_URL, BRAND, LINKS } = await import(
  pathToFileURL(resolve('dist-ssr/entry-server.js')).href
)

const template = readFileSync(join(dist, 'index.html'), 'utf-8')
const routes = allRoutes()
const posts = postsByRoute()
const buildDate = new Date().toISOString().slice(0, 10)

// GitHub Pages 301s /services -> /services/, so canonical/og:url/sitemap URLs
// carry the trailing slash for non-root routes; root stays bare SITE_URL.
const canonicalUrl = (route) => (route === '/' ? SITE_URL : `${SITE_URL}${route}/`)
const escapeAttr = (s) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
const escapeText = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
// HTML entities are NOT decoded inside <script>, so JSON-LD is escaped at the
// JSON level instead: only `<` (and the JS line terminators) can break out.
const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data)
    .replaceAll('<', '\\u003c')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029')}</script>`

const SAME_AS = [LINKS.linkedin, LINKS.github]

const homeStructuredData = () => [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-full.png`,
    image: `${SITE_URL}/og-image.png`,
    description: metaFor('/').description,
    founder: { '@type': 'Person', name: 'Vadim Van Den Heuvel', url: LINKS.linkedin },
    sameAs: SAME_AS,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: BRAND,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-full.png`,
    image: `${SITE_URL}/og-image.png`,
    description: metaFor('/services').description,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    founder: { '@type': 'Person', name: 'Vadim Van Den Heuvel', url: LINKS.linkedin },
    sameAs: SAME_AS,
    knowsAbout: [
      'Data architecture',
      'Lakehouse architecture',
      'Microsoft Fabric',
      'Google BigQuery',
      'dbt',
      'Data governance',
      'AI adoption',
      'AI governance',
    ],
  },
]

const postStructuredData = (route, post) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.summary,
  datePublished: post.date,
  dateModified: post.date,
  inLanguage: post.lang,
  keywords: post.tags,
  url: canonicalUrl(route),
  mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl(route) },
  image: `${SITE_URL}/og-image.png`,
  author: { '@type': 'Person', name: 'Vadim Van Den Heuvel', url: LINKS.linkedin },
  publisher: { '@id': `${SITE_URL}/#organization` },
})

for (const route of routes) {
  const meta = metaFor(route)
  const post = posts[route]
  const head = [
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:type" content="${post ? 'article' : 'website'}" />`,
    ...(post
      ? [`<meta property="article:published_time" content="${escapeAttr(post.date)}" />`]
      : []),
    `<meta property="og:url" content="${canonicalUrl(route)}" />`,
    `<meta property="og:image" content="${SITE_URL}/og-image.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<link rel="canonical" href="${canonicalUrl(route)}" />`,
    ...(route === '/' ? homeStructuredData().map(jsonLd) : []),
    ...(post ? [jsonLd(postStructuredData(route, post))] : []),
  ].join('\n    ')
  const html = template
    .replace('<!--app-head-->', () => head)
    .replace(/<title>.*?<\/title>/, () => `<title>${escapeText(meta.title)}</title>`)
    .replace('<!--app-html-->', () => render(route))
  const outDir = route === '/' ? dist : join(dist, route.slice(1))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  console.log('prerendered', route)
}

// 404.html is the unprerendered SPA template (empty #root -> client renders
// fresh), so unknown paths on GitHub Pages boot as a plain SPA without a
// flash of home-page content or a hydration mismatch. Written from `template`
// (read before the loop) because the loop overwrites dist/index.html. It gets
// noindex + its own title so the soft-404 never competes with the home page.
const notFoundTitle = `Page not found | ${BRAND}`
const notFound = template
  .replace('<!--app-head-->', () => '<meta name="robots" content="noindex, follow" />')
  .replace(/<title>.*?<\/title>/, () => `<title>${escapeText(notFoundTitle)}</title>`)
writeFileSync(join(dist, '404.html'), notFound)

const lastmodFor = (route) => posts[route]?.date ?? buildDate
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url><loc>${canonicalUrl(r)}</loc><lastmod>${escapeText(lastmodFor(r))}</lastmod></url>`,
  )
  .join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
console.log(`done: ${routes.length} routes + 404.html + sitemap.xml`)
