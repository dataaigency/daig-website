import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import '../i18n'
import Home from './Home'

test('home renders hero, three dictionary entries, four services, process CTA', () => {
  render(<MemoryRouter><Home /></MemoryRouter>)
  // hero title is split across spans (underlined "agency"), so match on the heading's textContent
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Take agency over your data.')
  expect(screen.getAllByText('data aigency', { exact: false }).length).toBeGreaterThanOrEqual(3)
  expect(screen.getByText('The chaos before the insights.')).toBeInTheDocument()
  expect(screen.getByText('Lakehouse architecture')).toBeInTheDocument()
  expect(screen.getByText('AI adoption & governance')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Book a free architecture audit' })).toBeInTheDocument()
})
