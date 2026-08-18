export default function Wordmark({ size = 16, inverse = false }: { size?: number; inverse?: boolean }) {
  const ink = inverse ? 'var(--paper)' : 'var(--ink)'
  return (
    <span style={{ fontFamily: 'Montserrat, var(--font-display)', fontWeight: 800, fontSize: size, letterSpacing: '-0.02em', color: ink, lineHeight: 1, whiteSpace: 'nowrap' }}>
      data a<span style={{ position: 'relative', display: 'inline-block' }}>
        ı
        <svg viewBox="0 0 120 120" aria-hidden="true" style={{ position: 'absolute', top: '0.03em', left: '50%', transform: 'translateX(-50%)', width: '0.28em', height: '0.28em' }}>
          <path d="M60 8 C63.5 44 68 50 112 60 C68 70 63.5 76 60 112 C56.5 76 52 70 8 60 C52 50 56.5 44 60 8 Z" fill={inverse ? 'var(--flash)' : 'var(--violet)'} />
        </svg>
      </span>gency
    </span>
  )
}
