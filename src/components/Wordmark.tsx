export default function Wordmark({ size = 15, inverse = false }: { size?: number; inverse?: boolean }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-wordmark)',
        fontWeight: 800,
        fontSize: size,
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
        color: inverse ? 'var(--paper)' : 'var(--navy-deep)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      data aigency
    </span>
  )
}
