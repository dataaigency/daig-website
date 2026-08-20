import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import './i18n'
import App from './App'

test.each([
  ['/', 'One source of truth your whole team trusts, and analysts who get their week back. Built properly, documented fully, handed over completely. AI where it earns its place, governed from day one.'],
  ['/services', 'Four things, done properly.'],
  ['/about', 'One architect, end to end.'],
  ['/contact', "Let's audit your data architecture. Free."],
  ['/work', 'Work & writing'],
  ['/some/unknown/path', 'Page not found.'],
])('route %s renders', (path, text) => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
  expect(screen.getByText(text)).toBeInTheDocument()
})
