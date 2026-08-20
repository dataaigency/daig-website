import i18n from '../i18n'
import { getPosts, readingMinutes, formatPostDate } from './posts'

test('posts load with meta and slug from filename', () => {
  const posts = getPosts()
  expect(posts.length).toBeGreaterThanOrEqual(1)
  expect(posts[0].slug).toBe('2026-08-hello')
  expect(posts[0].title).toBeTruthy()
  expect(typeof posts[0].Component).toBe('function')
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
