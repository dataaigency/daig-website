const classes = {
  stripes: 'sep-stripes',
  cut: 'sep-cut',
  'cut-exit': 'sep-cut sep-cut--exit',
  'cut-flash': 'sep-cut--flash',
} as const

export type SeparatorVariant = keyof typeof classes

export default function StripeBand({ variant = 'stripes' }: { variant?: SeparatorVariant }) {
  return <div className={classes[variant]} aria-hidden="true" />
}
