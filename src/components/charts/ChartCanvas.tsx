import { useEffect, useRef } from 'react'
import type { ChartConfiguration } from 'chart.js'

/**
 * Client-only Chart.js wrapper.
 *
 * Chart.js is lazy-imported inside useEffect, so the prerender (SSR) pass
 * never touches the canvas API and the library stays out of the initial
 * bundle: Vite splits `chart.js/auto` into its own chunk, fetched only when
 * a page with a chart hydrates.
 *
 * Design-system theme applied to every chart:
 * - text in graphite #3E4552, 'Hanken Grotesk Variable'
 * - recessive grid lines #E2E0D8
 * - tooltips on navy #061034 with white text
 * - animations disabled when the user prefers reduced motion
 */

const FONT_FAMILY = "'Hanken Grotesk Variable', sans-serif"
const INK = '#3E4552'
const GRID = '#E2E0D8'
const NAVY = '#061034'

type Props = {
  /** Visible title rendered as text above the canvas. Also the canvas aria-label. */
  title: string
  /** Full Chart.js configuration. Pass a module-level constant so the chart is built once. */
  config: ChartConfiguration
  /** Plot area width / height. */
  aspect?: number
}

export default function ChartCanvas({ title, config, aspect = 2 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let chart: { destroy: () => void } | undefined
    let cancelled = false

    void (async () => {
      const { Chart } = await import('chart.js/auto')
      if (cancelled) return

      Chart.defaults.font.family = FONT_FAMILY
      Chart.defaults.font.size = 12
      Chart.defaults.color = INK
      Chart.defaults.borderColor = GRID

      // matchMedia is guarded because jsdom does not implement it.
      const reduced =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      chart = new Chart(canvas, {
        ...config,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          ...config.options,
          ...(reduced ? { animation: false as const } : {}),
          plugins: {
            ...config.options?.plugins,
            tooltip: {
              backgroundColor: NAVY,
              titleColor: '#FFFFFF',
              bodyColor: '#FFFFFF',
              padding: 10,
              cornerRadius: 6,
              displayColors: false,
              ...config.options?.plugins?.tooltip,
            },
          },
        },
      })
    })()

    return () => {
      cancelled = true
      chart?.destroy()
    }
  }, [config])

  return (
    <figure style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
      <figcaption
        style={{
          color: INK,
          fontFamily: FONT_FAMILY,
          fontSize: '0.95rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </figcaption>
      <div style={{ position: 'relative', width: '100%', aspectRatio: String(aspect) }}>
        <canvas ref={canvasRef} role="img" aria-label={title} />
      </div>
    </figure>
  )
}
