import type { ChartConfiguration } from 'chart.js'
import ChartCanvas from './ChartCanvas'

/**
 * Charts for the surf-forecast post.
 *
 * ALL DATA BELOW IS SYNTHETIC AND ILLUSTRATIVE. It is a hand-written,
 * believable week at "Model Point", a fictional surf spot, generated in code
 * for the sake of the story. No real buoy was consulted.
 *
 * Palette (design system, fixed order, one color per entity across charts):
 * waves = blue, wind = green, the decision score = amber.
 */

const BLUE = '#2743B0'
const BLUE_FILL = 'rgba(39, 67, 176, 0.08)' // subtle 8% fill under the wave line
const GREEN = '#0E9F5B'
const AMBER = '#B77800'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const HOURS = ['00:00', '06:00', '12:00', '18:00']

// One reading every six hours for a week: 28 points per series.
const labels = DAYS.flatMap((d) => HOURS.map((h) => `${d} ${h}`))

// Illustrative wave heights in metres: a small early week, a swell that
// builds through Wednesday, peaks Thursday night into Friday, then eases.
// prettier-ignore
const waveM = [
  0.6, 0.6, 0.5, 0.5, // Mon
  0.5, 0.4, 0.4, 0.5, // Tue
  0.6, 0.7, 0.9, 1.2, // Wed
  1.5, 1.7, 1.8, 1.9, // Thu
  1.9, 1.8, 1.7, 1.6, // Fri
  1.4, 1.3, 1.1, 1.0, // Sat
  0.9, 0.8, 0.8, 0.7, // Sun
]

// Illustrative wind speeds in km/h: calm mornings, an afternoon sea breeze,
// and a windy Thursday as the front that brought the swell moves through.
// prettier-ignore
const windKmh = [
   8,  6, 18, 22, // Mon
  10,  9, 20, 24, // Tue
  12, 14, 26, 30, // Wed
  25, 28, 33, 29, // Thu
  12,  7, 16, 21, // Fri
   9, 14, 19, 23, // Sat
   7,  6, 15, 18, // Sun
]

/**
 * The gold-layer number: one paddle-out score per morning, 0 to 10, computed
 * from the 06:00 wave and wind readings. Waves and wind multiply because both
 * have to be good; a perfect swell in howling onshore wind is still a no.
 */
function paddleScore(wave: number, wind: number): number {
  const waveScore =
    wave >= 1 && wave <= 2.2
      ? 5
      : wave < 1
        ? Math.max(0, 5 - (1 - wave) * 6)
        : Math.max(0, 5 - (wave - 2.2) * 3)
  const windScore = wind <= 12 ? 5 : Math.max(0, 5 - (wind - 12) * 0.3)
  return Math.round(((waveScore * windScore) / 2.5) * 10) / 10
}

const morningScores = DAYS.map((_, i) => paddleScore(waveM[i * 4 + 1], windKmh[i * 4 + 1]))

/** Show one tick per day on the 6-hourly line charts; tooltips keep the full label. */
const dayTicks = {
  autoSkip: false,
  maxRotation: 0,
  callback: (_value: unknown, index: number) => (index % 4 === 1 ? DAYS[(index - 1) / 4] : ''),
}

const waveConfig: ChartConfiguration = {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        label: 'Wave height',
        data: waveM,
        borderColor: BLUE,
        backgroundColor: BLUE_FILL,
        fill: true,
        borderWidth: 2,
        pointRadius: 2.5,
        pointHoverRadius: 4,
        pointHitRadius: 8,
        pointBackgroundColor: BLUE,
        tension: 0.35,
      },
    ],
  },
  options: {
    plugins: {
      legend: { display: false }, // single series: the title names it
      tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y} m` } },
    },
    scales: {
      x: { grid: { display: false }, ticks: dayTicks },
      y: { beginAtZero: true, suggestedMax: 2.5, ticks: { callback: (v) => `${v} m` } },
    },
  },
}

const windConfig: ChartConfiguration = {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        label: 'Wind speed',
        data: windKmh,
        borderColor: GREEN,
        borderWidth: 2,
        pointRadius: 2.5,
        pointHoverRadius: 4,
        pointHitRadius: 8,
        pointBackgroundColor: GREEN,
        fill: false,
        tension: 0.35,
      },
    ],
  },
  options: {
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y} km/h` } },
    },
    scales: {
      x: { grid: { display: false }, ticks: dayTicks },
      y: { beginAtZero: true, suggestedMax: 35, ticks: { callback: (v) => `${v} km/h` } },
    },
  },
}

const scoreConfig: ChartConfiguration = {
  type: 'bar',
  data: {
    labels: DAYS,
    datasets: [
      {
        label: 'Paddle-out score',
        data: morningScores,
        backgroundColor: AMBER,
        borderRadius: 4, // rounded tops, anchored to the baseline
        barPercentage: 0.55, // thin bars
        maxBarThickness: 32,
      },
    ],
  },
  options: {
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y} / 10` } },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, max: 10 },
    },
  },
}

export function WaveHeightChart() {
  return <ChartCanvas title="Wave height at Model Point, metres (illustrative week)" config={waveConfig} />
}

export function WindChart() {
  return <ChartCanvas title="Wind speed at Model Point, km/h (illustrative week)" config={windConfig} />
}

export function PaddleOutChart() {
  return (
    <ChartCanvas
      title="Paddle-out score per morning at Model Point, 0 to 10"
      config={scoreConfig}
      aspect={2.2}
    />
  )
}
