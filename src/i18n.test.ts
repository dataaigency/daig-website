import i18n from './i18n'

test('EN copy resolves', () => {
  expect(i18n.t('hero.title')).toBe('Take agency over your data.')
  const entries = i18n.t('dictionary.entries', { returnObjects: true }) as unknown[]
  expect(entries).toHaveLength(3)
})
