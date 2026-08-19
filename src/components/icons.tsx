const base = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', strokeWidth: 2, strokeLinecap: 'square', strokeLinejoin: 'miter' } as const

export const IconLayers = ({ color = 'var(--navy-deep)' }: { color?: string }) => (
  <svg {...base} stroke={color} aria-hidden="true">
    <path d="M12 3 L21 7.5 L12 12 L3 7.5 Z" /><path d="M3 12 L12 16.5 L21 12" /><path d="M3 16.5 L12 21 L21 16.5" />
  </svg>
)
export const IconPipeline = ({ color = 'var(--navy-deep)' }: { color?: string }) => (
  <svg {...base} stroke={color} aria-hidden="true">
    <rect x="3" y="4" width="4" height="4" /><rect x="17" y="4" width="4" height="4" /><rect x="10" y="16" width="4" height="4" />
    <path d="M7 6 H17" /><path d="M6.5 8 L11 16" /><path d="M17.5 8 L13 16" />
  </svg>
)
export const IconChart = ({ color = 'var(--navy-deep)' }: { color?: string }) => (
  <svg {...base} stroke={color} aria-hidden="true"><path d="M3 20 L8 14 L12 16.5 L20 7" /><path d="M15 7 L20 7 L20 12" /></svg>
)
export const IconShield = ({ color = 'var(--navy-deep)' }: { color?: string }) => (
  <svg {...base} stroke={color} aria-hidden="true">
    <path d="M12 3 L20 6 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V6 Z" /><path d="M8.5 11.5 L11 14 L15.5 9" />
  </svg>
)
