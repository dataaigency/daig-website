import { metaFor, BRAND } from './seo'
import { getPosts } from './lib/posts'

test('known routes get specific titles, unknown fall back', () => {
  expect(metaFor('/').title).toBe(
    'Data architecture consulting: lakehouse, AI-ready data and governance | Data Aigency',
  )
  expect(metaFor('/services').title).toContain('Lakehouse')
  expect(metaFor('/nonexistent').title).toBe(BRAND)
})

test('each service detail page gets its own query-aligned title', () => {
  expect(metaFor('/services/lakehouse-architecture').title).toBe('Lakehouse architecture consulting | Data Aigency')
  expect(metaFor('/services/automation-dataops').title).toBe('Automation and DataOps consulting | Data Aigency')
  expect(metaFor('/services/ai-ready-data-mlops').title).toBe('AI-ready data and MLOps consulting | Data Aigency')
  expect(metaFor('/services/ai-governance-llmops').title).toBe('AI governance and LLMOps consulting | Data Aigency')
})

test('every route title keeps the brand and avoids em dashes', () => {
  for (const path of [
    '/',
    '/services',
    '/services/lakehouse-architecture',
    '/services/automation-dataops',
    '/services/ai-ready-data-mlops',
    '/services/ai-governance-llmops',
    '/work',
    '/about',
    '/contact',
  ]) {
    const { title, description } = metaFor(path)
    expect(title).toContain(BRAND)
    expect(title).not.toContain('—')
    expect(description).not.toContain('—')
    expect(description.length).toBeGreaterThan(50)
  }
})

test('trailing slashes normalize to the same meta (GitHub Pages serves /services/)', () => {
  expect(metaFor('/services/')).toEqual(metaFor('/services'))
})

test('post routes use the MDX meta title and summary, not the fallback', () => {
  const post = getPosts()[0]
  const meta = metaFor(`/work/${post.slug}`)
  expect(meta.title).toBe(`${post.title} | ${BRAND}`)
  expect(meta.description).toBe(post.summary)
  expect(metaFor(`/work/${post.slug}/`)).toEqual(meta)
})

test('unknown post slugs still fall back', () => {
  expect(metaFor('/work/not-a-post').title).toBe(BRAND)
})
