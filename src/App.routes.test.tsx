import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import './i18n'
import App from './App'

test.each([
  ['/', 'Take agency over your data.'],
  ['/services', 'Four things, done properly.'],
  ['/about', 'One architect, end to end.'],
  ['/contact', "Let's audit your data architecture — free."],
  ['/work', 'Work & writing'],
])('route %s renders', (path, text) => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
  expect(screen.getByText(text)).toBeInTheDocument()
})
