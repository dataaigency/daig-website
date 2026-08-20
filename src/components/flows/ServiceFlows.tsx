import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FK, useFlowPause, ArrowDefs, Dot, FNode, EdgeLabel, FlowPanel } from './kit'

const edge = (id: string, d: string, marker: string, dashed = false, stroke = FK.EDGE) => (
  <path id={id} d={d} fill="none" stroke={stroke} strokeWidth={1.5} markerEnd={dashed ? undefined : `url(#${marker})`} strokeDasharray={dashed ? '4 4' : undefined} />
)

export function LakehouseFlow() {
  const { t } = useTranslation()
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  return (
    <FlowPanel caption={t('flows.lakehouse.caption')}>
      <svg ref={ref} viewBox="0 0 460 190" role="img" aria-label={t('flows.lakehouse.caption')} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="lk-arrow" />
        {edge('lk-e1', 'M 108 95 L 138 95', 'lk-arrow')}
        {edge('lk-e2', 'M 310 133 L 338 133', 'lk-arrow')}
        {edge('lk-e3', 'M 372 70 C 372 88, 340 84, 312 92', 'lk-arrow', true)}
        <FNode x={16} y={72} w={92} h={46} label={t('flows.lakehouse.sources')} />
        <g>
          <rect x={140} y={30} width={170} height={130} rx={10} fill={FK.NODE_FILL} stroke={FK.NODE_STROKE} strokeWidth={1.5} />
          <text x={152} y={50} fontSize={12.5} fontWeight={700} fill={FK.TEXT} fontFamily="var(--font-display)">{t('flows.lakehouse.lakehouse')}</text>
          {[
            { y: 62, label: t('flows.lakehouse.bronze'), chip: '#C9884A' },
            { y: 92, label: t('flows.lakehouse.silver'), chip: '#AFB9C8' },
            { y: 122, label: t('flows.lakehouse.gold'), chip: '#E8B437' },
          ].map((r) => (
            <g key={r.label}>
              <rect x={152} y={r.y} width={146} height={24} rx={5} fill="#0E2258" stroke={FK.NODE_STROKE} strokeWidth={1} />
              <rect x={162} y={r.y + 8} width={7} height={7} fill={r.chip} />
              <text x={176} y={r.y + 16} fontSize={11} fill={FK.TEXT} fontFamily="var(--font-body)">{r.label}</text>
            </g>
          ))}
        </g>
        <FNode x={340} y={26} w={106} h={44} label={t('flows.lakehouse.governance')} />
        <FNode x={340} y={110} w={106} h={46} label={t('flows.lakehouse.bi')} />
        <EdgeLabel x={123} y={84} text={t('flows.lakehouse.land')} />
        <EdgeLabel x={324} y={122} text={t('flows.lakehouse.serve')} />
        <EdgeLabel x={352} y={86} text={t('flows.lakehouse.govern')} />
        <Dot path="lk-e1" dur={1.8} begin={0.2} />
        <Dot path="lk-e2" dur={1.8} begin={1.0} />
      </svg>
    </FlowPanel>
  )
}

export function PipelinesFlow() {
  const { t } = useTranslation()
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  return (
    <FlowPanel caption={t('flows.pipelines.caption')}>
      <svg ref={ref} viewBox="0 0 460 190" role="img" aria-label={t('flows.pipelines.caption')} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="pp-arrow" />
        {edge('pp-e1', 'M 126 46 L 156 46', 'pp-arrow')}
        {edge('pp-e2', 'M 246 46 L 276 46', 'pp-arrow')}
        {edge('pp-e3', 'M 340 68 C 356 92, 370 100, 384 112', 'pp-arrow')}
        {edge('pp-e4', 'M 296 68 C 274 96, 240 104, 216 114', 'pp-arrow', false, FK.AMBER)}
        <FNode x={16} y={24} w={110} h={44} label={t('flows.pipelines.orch')} />
        <FNode x={156} y={24} w={90} h={44} label={t('flows.pipelines.dbt')} />
        <FNode x={276} y={24} w={90} h={44} label={t('flows.pipelines.tests')} />
        <FNode x={330} y={112} w={114} h={44} label={t('flows.pipelines.gold')} />
        <FNode x={100} y={112} w={116} h={44} label={t('flows.pipelines.alert')} stroke={FK.AMBER} />
        <EdgeLabel x={141} y={36} text={t('flows.pipelines.schedule')} />
        <EdgeLabel x={261} y={36} text={t('flows.pipelines.build')} />
        <EdgeLabel x={374} y={86} text={t('flows.pipelines.pass')} />
        <EdgeLabel x={240} y={96} text={t('flows.pipelines.fail')} />
        <Dot path="pp-e1" dur={1.6} begin={0} />
        <Dot path="pp-e2" dur={1.6} begin={0.8} />
        <Dot path="pp-e3" dur={1.5} begin={1.6} />
      </svg>
    </FlowPanel>
  )
}

export function AiDataFlow() {
  const { t } = useTranslation()
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  return (
    <FlowPanel caption={t('flows.aidata.caption')}>
      <svg ref={ref} viewBox="0 0 460 190" role="img" aria-label={t('flows.aidata.caption')} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="ai-arrow" />
        {edge('ai-e1', 'M 106 84 C 130 70, 130 52, 148 46', 'ai-arrow')}
        {edge('ai-e2', 'M 106 106 C 130 120, 130 138, 148 144', 'ai-arrow')}
        {edge('ai-e3', 'M 250 44 L 286 44', 'ai-arrow')}
        {edge('ai-e4', 'M 250 146 L 286 146', 'ai-arrow')}
        <FNode x={16} y={72} w={90} h={46} label={t('flows.aidata.gold')} chip="#E8B437" />
        <FNode x={150} y={24} w={100} h={40} label={t('flows.aidata.features')} />
        <FNode x={150} y={126} w={100} h={40} label={t('flows.aidata.embeddings')} />
        <FNode x={288} y={24} w={140} h={40} label={t('flows.aidata.ml')} />
        <FNode x={288} y={126} w={140} h={40} label={t('flows.aidata.rag')} stroke={FK.FLASH} />
        <EdgeLabel x={128} y={44} text={t('flows.aidata.extract')} />
        <EdgeLabel x={128} y={158} text={t('flows.aidata.embed')} />
        <EdgeLabel x={268} y={34} text={t('flows.aidata.train')} />
        <EdgeLabel x={268} y={136} text={t('flows.aidata.retrieve')} />
        <text x={228} y={100} fontSize={10} fill={FK.SUB} fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing={1}>{t('flows.aidata.lineage').toUpperCase()}</text>
        <Dot path="ai-e1" dur={1.8} begin={0} />
        <Dot path="ai-e2" dur={1.8} begin={0.6} />
        <Dot path="ai-e3" dur={1.5} begin={1.2} />
        <Dot path="ai-e4" dur={1.5} begin={1.8} />
      </svg>
    </FlowPanel>
  )
}

export function GovernanceFlow() {
  const { t } = useTranslation()
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  return (
    <FlowPanel caption={t('flows.governance.caption')}>
      <svg ref={ref} viewBox="0 0 460 190" role="img" aria-label={t('flows.governance.caption')} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="gv-arrow" />
        {edge('gv-e1', 'M 112 52 L 146 52', 'gv-arrow')}
        {edge('gv-e2', 'M 246 52 L 284 52', 'gv-arrow')}
        {['80', '196', '340'].map((x) => (
          <line key={x} x1={x} y1={74} x2={x} y2={118} stroke={FK.NODE_STROKE} strokeWidth={1.2} strokeDasharray="3 4" />
        ))}
        <FNode x={16} y={30} w={96} h={44} label={t('flows.governance.uc1')} />
        <FNode x={148} y={30} w={98} h={44} label={t('flows.governance.evaluate')} />
        <FNode x={286} y={30} w={110} h={44} label={t('flows.governance.prod')} stroke={FK.FLASH} />
        <text x={412} y={56} fontSize={10.5} fill={FK.SUB} fontFamily="var(--font-mono)" letterSpacing={0.8}>{t('flows.governance.next')}</text>
        <g>
          <rect x={16} y={118} width={380} height={44} rx={8} fill="none" stroke={FK.NODE_STROKE} strokeWidth={1.5} strokeDasharray="5 4" />
          <text x={206} y={144} fontSize={10.5} letterSpacing={1} fill={FK.SUB} fontFamily="var(--font-mono)" textAnchor="middle">{t('flows.governance.rail').toUpperCase()}</text>
        </g>
        <EdgeLabel x={129} y={42} text={t('flows.governance.measure')} />
        <EdgeLabel x={265} y={42} text={t('flows.governance.pass')} />
        <Dot path="gv-e1" dur={1.7} begin={0.2} />
        <Dot path="gv-e2" dur={1.7} begin={1.0} />
      </svg>
    </FlowPanel>
  )
}
