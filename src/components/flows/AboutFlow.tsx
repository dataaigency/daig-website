import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FK, useFlowPause, ArrowDefs, Dot, FNode, EdgeLabel, FlowPanel } from './kit'

export default function AboutFlow() {
  const { t } = useTranslation()
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  const e = (id: string, x1: number, x2: number) => (
    <path id={id} d={`M ${x1} 100 L ${x2} 100`} fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#ab-arrow)" />
  )
  return (
    <FlowPanel caption={t('flows.about.caption')} minWidth={720}>
      <svg ref={ref} viewBox="0 0 1020 200" role="img" aria-label={t('flows.about.caption')} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="ab-arrow" />
        <g>
          <rect x={206} y={36} width={600} height={128} rx={10} fill="none" stroke={FK.NODE_STROKE} strokeWidth={1.5} strokeDasharray="5 4" />
          <text x={222} y={58} fontSize={10.5} letterSpacing={1.2} fill={FK.SUB} fontFamily="var(--font-mono)">{t('flows.about.repos').toUpperCase()}</text>
        </g>
        {e('ab-e1', 172, 218)}
        {e('ab-e2', 382, 428)}
        {e('ab-e3', 592, 638)}
        {e('ab-e4', 802, 846)}
        <FNode x={20} y={74} w={152} h={52} label={t('flows.about.s1')} sub={t('flows.about.s1s')} />
        <FNode x={220} y={74} w={162} h={52} label={t('flows.about.s2')} sub={t('flows.about.s2s')} />
        <FNode x={430} y={74} w={162} h={52} label={t('flows.about.s3')} sub={t('flows.about.s3s')} />
        <FNode x={640} y={74} w={162} h={52} label={t('flows.about.s4')} sub={t('flows.about.s4s')} />
        <FNode x={848} y={74} w={152} h={52} label={t('flows.about.s5')} stroke={FK.FLASH} />
        <EdgeLabel x={195} y={90} text={t('flows.about.e1')} />
        <EdgeLabel x={405} y={90} text={t('flows.about.e2')} />
        <EdgeLabel x={615} y={90} text={t('flows.about.e3')} />
        <EdgeLabel x={824} y={90} text={t('flows.about.e4')} />
        <Dot path="ab-e1" dur={1.5} begin={0} />
        <Dot path="ab-e2" dur={1.5} begin={0.7} />
        <Dot path="ab-e3" dur={1.5} begin={1.4} />
        <Dot path="ab-e4" dur={1.5} begin={2.1} />
      </svg>
    </FlowPanel>
  )
}
