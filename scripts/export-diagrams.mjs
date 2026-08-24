import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { pathToFileURL } from 'node:url'

// Renders every flow diagram to a standalone SVG in assets/diagrams/ so the
// visuals can be reused in decks, posts and documents. Run: npm run diagrams
const { renderAll } = await import(pathToFileURL(resolve('dist-ssr-diagrams/diagrams-entry.js')).href)

const OUT = resolve('assets/diagrams')
mkdirSync(OUT, { recursive: true })

// standalone files cannot read the site's CSS variables, so substitute them
const FONT_VARS = {
  'var(--font-display)': "'Space Grotesk', 'Segoe UI', sans-serif",
  'var(--font-body)': "'Hanken Grotesk', 'Segoe UI', sans-serif",
  'var(--font-mono)': "'IBM Plex Mono', Consolas, monospace",
  'var(--font-wordmark)': "'Montserrat', sans-serif",
}
const NAVY = '#061034'

for (const [name, markup] of Object.entries(renderAll())) {
  const match = markup.match(/<svg[\s\S]*?<\/svg>/)
  if (!match) {
    console.error(`skip ${name}: no <svg> found`)
    continue
  }
  let svg = match[0]
  for (const [v, real] of Object.entries(FONT_VARS)) svg = svg.replaceAll(v, real)
  if (!svg.includes('xmlns=')) svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
  // paint the navy ground the diagrams are designed for
  const vb = svg.match(/viewBox="0 0 (\d+) (\d+)"/)
  if (vb) svg = svg.replace(/(<svg[^>]*>)/, `$1<rect width="${vb[1]}" height="${vb[2]}" fill="${NAVY}"/>`)
  const leftoverVar = svg.match(/var\(--[a-z-]+\)/)
  if (leftoverVar) console.warn(`warning ${name}: unsubstituted ${leftoverVar[0]}`)
  writeFileSync(join(OUT, `${name}.svg`), svg)
  console.log(`wrote assets/diagrams/${name}.svg (${svg.length} bytes)`)
}
