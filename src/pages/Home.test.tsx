import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import '../i18n'
import Home from './Home'

test('home renders hero, four services, process CTA', () => {
  render(<MemoryRouter><Home /></MemoryRouter>)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('From chaos to clarity.')
  expect(screen.getByText("How many versions of last month's revenue do you have?")).toBeInTheDocument()
  expect(screen.getByText('Scattered sources')).toBeInTheDocument()
  expect(screen.getByText('One governed flow, from sources to answers.')).toBeInTheDocument()
  expect(screen.getByText('What you keep.')).toBeInTheDocument()
  expect(screen.getByText('Bronze')).toBeInTheDocument()
  expect(screen.getByText('Lakehouse architecture')).toBeInTheDocument()
  expect(screen.getByText('AI governance & LLMOps')).toBeInTheDocument()
  expect(screen.getAllByRole('link', { name: 'Book a free intake call' }).length).toBeGreaterThanOrEqual(2)
})
