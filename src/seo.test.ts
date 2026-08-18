import { metaFor } from './seo'

test('known routes get specific titles, unknown fall back', () => {
  expect(metaFor('/').title).toBe('data aigency — take agency over your data')
  expect(metaFor('/services').title).toContain('Services')
  expect(metaFor('/nonexistent').title).toBe('data aigency')
})
