import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = resolve('dist')
const { render, allRoutes, metaFor, SITE_URL } = await import(
  pathToFileURL(resolve('dist-ssr/entry-server.js')).href
)

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

// 404.html is the unprerendered SPA template (empty #root -> client renders
// fresh), so unknown paths on GitHub Pages boot as a plain SPA without a
// flash of home-page content or a hydration mismatch. Written from `template`
// (read before the loop) because the loop overwrites dist/index.html.
writeFileSync(join(dist, '404.html'), template)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE_URL}${r === '/' ? '' : r}</loc></url>`).join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
console.log(`done: ${routes.length} routes + 404.html + sitemap.xml`)
