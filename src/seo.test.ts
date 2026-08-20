import { metaFor, BRAND } from './seo'
import { getPosts } from './lib/posts'

test('known routes get specific titles, unknown fall back', () => {
  expect(metaFor('/').title).toBe('data aigency | Data architecture, lakehouses and governed AI')
  expect(metaFor('/services').title).toContain('Lakehouse')
  expect(metaFor('/nonexistent').title).toBe(BRAND)
})

test('every route title keeps the brand and avoids em dashes', () => {
  for (const path of ['/', '/services', '/work', '/about', '/contact']) {
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
