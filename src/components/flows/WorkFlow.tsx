import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FK, useFlowPause, ArrowDefs, Dot, FNode, EdgeLabel, FlowPanel } from './kit'

const chaosNodes = [
  { x: 24, y: 44, w: 84 },
  { x: 150, y: 30, w: 84 },
  { x: 40, y: 130, w: 84 },
  { x: 170, y: 128, w: 84 },
]

/** Before/after: point-to-point spaghetti vs one governed flow. */
export default function WorkFlow() {
  const { t } = useTranslation()
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  const centers = chaosNodes.map((n) => ({ x: n.x + n.w / 2, y: n.y + 17 }))
  const tangles: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3],
  ]
  return (
    <FlowPanel caption={t('flows.work.caption')} minWidth={720}>
      <svg ref={ref} viewBox="0 0 1000 210" role="img" aria-label={t('flows.work.caption')} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="wk-arrow" />
        <text x={24} y={20} fontSize={10.5} letterSpacing={1.5} fill={FK.SUB} fontFamily="var(--font-mono)">{t('flows.work.before').toUpperCase()} · {t('flows.work.beforeSub').toUpperCase()}</text>
        {tangles.map(([a, b], i) => {
          const p1 = centers[a]
          const p2 = centers[b]
          const bend = i % 2 === 0 ? 26 : -22
          return (
            <path
              key={i}
              d={`M ${p1.x} ${p1.y} Q ${(p1.x + p2.x) / 2 + bend} ${(p1.y + p2.y) / 2 + bend}, ${p2.x} ${p2.y}`}
              fill="none"
              stroke={FK.EDGE}
              strokeWidth={1.2}
            />
          )
        })}
        {chaosNodes.map((n, i) => (
          <FNode key={i} x={n.x} y={n.y} w={n.w} h={34} label={(t('flows.work.chaos', { returnObjects: true }) as string[])[i]} />
        ))}

        <path id="wk-bridge" d="M 300 105 L 400 105" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#wk-arrow)" />
        <EdgeLabel x={350} y={93} text={t('flows.work.work')} />

        <text x={432} y={20} fontSize={10.5} letterSpacing={1.5} fill={FK.SUB} fontFamily="var(--font-mono)">{t('flows.work.after').toUpperCase()} · {t('flows.work.afterSub').toUpperCase()}</text>
        <path id="wk-a1" d="M 546 105 L 594 105" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#wk-arrow)" />
        <path id="wk-a2" d="M 740 105 L 788 105" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#wk-arrow)" />
        <FNode x={432} y={82} w={114} h={46} label={t('flows.work.sources')} />
        <FNode x={596} y={82} w={144} h={46} label={t('flows.work.lakehouse')} />
        <FNode x={790} y={82} w={130} h={46} label={t('flows.work.answers')} stroke={FK.FLASH} />
        <EdgeLabel x={570} y={94} text={t('flows.work.land')} />
        <EdgeLabel x={764} y={94} text={t('flows.work.serve')} />
        <Dot path="wk-bridge" dur={1.8} begin={0.2} />
        <Dot path="wk-a1" dur={1.5} begin={0.8} />
        <Dot path="wk-a2" dur={1.5} begin={1.5} />
      </svg>
    </FlowPanel>
  )
}
