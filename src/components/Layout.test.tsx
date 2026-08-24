import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import '../i18n'
import Layout from './Layout'

test('layout renders nav, content and footer', () => {
  render(
    <MemoryRouter>
      <Layout><p>page-content</p></Layout>
    </MemoryRouter>,
  )
  expect(screen.getAllByText(/gency/).length).toBeGreaterThanOrEqual(2)
  expect(screen.getByText('page-content')).toBeInTheDocument()
  for (const link of screen.getAllByRole('link', { name: 'Services' })) {
    expect(link).toHaveAttribute('href', '/services')
  }
  expect(screen.getAllByRole('link', { name: 'Services' })).toHaveLength(2)
})
