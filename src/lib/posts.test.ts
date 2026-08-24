import i18n from '../i18n'
import { getPosts, readingMinutes, formatPostDate } from './posts'

test('posts load with meta and slug from filename', () => {
  const posts = getPosts()
  expect(posts.length).toBeGreaterThanOrEqual(1)
  expect(posts.map((p) => p.slug)).toContain('2026-08-hello')
  for (const post of posts) {
    expect(post.slug).toMatch(/^\d{4}-\d{2}-/)
    expect(post.title).toBeTruthy()
    expect(typeof post.Component).toBe('function')
  }
})

test('posts come back newest first', () => {
  const dates = getPosts().map((p) => p.date)
  expect([...dates].sort((a, b) => b.localeCompare(a))).toEqual(dates)
})

test('every post carries a whole-minute reading time of at least one', () => {
  for (const post of getPosts()) {
    expect(Number.isInteger(post.minutes)).toBe(true)
    expect(post.minutes).toBeGreaterThanOrEqual(1)
  }
})

test('reading time rounds to whole minutes and never reaches zero', () => {
  expect(readingMinutes(Array.from({ length: 400 }, (_, i) => `word${i}`).join(' '))).toBe(2)
  expect(readingMinutes('')).toBe(1)
})

test('dates render human and stable, reading time reads as a label', () => {
  expect(formatPostDate('2026-08-18')).toBe('18 Aug 2026')
  expect(i18n.t('work.minRead', { count: 6 })).toBe('6 min read')
  expect(i18n.t('work.minRead', { count: 1 })).toBe('1 min read')
})
