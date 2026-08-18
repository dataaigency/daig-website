export default function StripeBand({ variant = 'loud' }: { variant?: 'loud' | 'quiet' }) {
  return <div className={`stripe stripe--${variant}`} aria-hidden="true" />
}
