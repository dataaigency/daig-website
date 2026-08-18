import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import '../i18n'
import About from './About'
import Contact from './Contact'

test('about tells the one-architect story', () => {
  render(<MemoryRouter><About /></MemoryRouter>)
  expect(screen.getByText(/practice of Vadim Van Den Heuvel/)).toBeInTheDocument()
})

test('contact links booking, linkedin, github', () => {
  render(<MemoryRouter><Contact /></MemoryRouter>)
  expect(screen.getByRole('link', { name: 'Pick a slot' })).toHaveAttribute('href', expect.stringContaining('calendar.app.google'))
  expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
})
