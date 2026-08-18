import { getPosts } from './posts'

test('posts load with meta and slug from filename', () => {
  const posts = getPosts()
  expect(posts.length).toBeGreaterThanOrEqual(1)
  expect(posts[0].slug).toBe('2026-08-hello')
  expect(posts[0].title).toBeTruthy()
  expect(typeof posts[0].Component).toBe('function')
})
