const base = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export const IconLayers = ({ color = 'var(--violet)' }: { color?: string }) => (
  <svg {...base} stroke={color} aria-hidden="true">
    <path d="M12 3 L21 7.5 L12 12 L3 7.5 Z" /><path d="M3 12 L12 16.5 L21 12" /><path d="M3 16.5 L12 21 L21 16.5" />
  </svg>
)
export const IconPipeline = ({ color = 'var(--coral)' }: { color?: string }) => (
  <svg {...base} stroke={color} aria-hidden="true">
    <circle cx="5" cy="6" r="2.2" /><circle cx="19" cy="6" r="2.2" /><circle cx="12" cy="18" r="2.2" />
    <path d="M7 7.2 L10.5 16" /><path d="M17 7.2 L13.5 16" /><path d="M7.2 6 L16.8 6" />
  </svg>
)
export const IconChart = ({ color = 'var(--flash)' }: { color?: string }) => (
  <svg {...base} stroke={color} aria-hidden="true"><path d="M3 20 L8 14 L12 16.5 L20 7" /></svg>
)
export const IconShield = ({ color = 'var(--sun)' }: { color?: string }) => (
  <svg {...base} stroke={color} aria-hidden="true">
    <path d="M12 3 L20 6 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V6 Z" /><path d="M9 11.5 L11 13.5 L15 9" />
  </svg>
)
