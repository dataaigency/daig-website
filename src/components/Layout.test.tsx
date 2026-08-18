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
  expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services')
})
