import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import '../i18n'
import Home from './Home'

test('home renders hero, three dictionary entries, four services, process CTA', () => {
  render(<MemoryRouter><Home /></MemoryRouter>)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('From chaos to insights.')
  expect(screen.getAllByText('data aigency', { exact: false }).length).toBeGreaterThanOrEqual(3)
  expect(screen.getByText('Sound familiar?')).toBeInTheDocument()
  expect(screen.getByText('One governed flow, from sources to answers.')).toBeInTheDocument()
  expect(screen.getByText('Bronze')).toBeInTheDocument()
  expect(screen.getByText('Lakehouse architecture')).toBeInTheDocument()
  expect(screen.getByText('AI adoption & governance')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Book a free intake call' })).toBeInTheDocument()
})
