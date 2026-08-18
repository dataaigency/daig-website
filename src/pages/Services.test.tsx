import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import '../i18n'
import Services from './Services'

test('services page renders four pillars with outcomes', () => {
  render(<MemoryRouter><Services /></MemoryRouter>)
  expect(screen.getByText('AI adoption & governance')).toBeInTheDocument()
  expect(screen.getByText('A phased roadmap, not a vibe-coded strategy')).toBeInTheDocument()
})
