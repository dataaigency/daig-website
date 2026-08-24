import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FK, useFlowPause, ArrowDefs, Dot, FNode, EdgeLabel, FlowPanel } from './kit'

const X = [20, 276, 532, 790]
const W = [206, 206, 206, 210]
const Y = 46

/** The problem as one causal chain: scattered sources -> broken trust ->
 *  endless cleanup -> AI stalls. The amber end node marks where it all lands. */
export default function ProblemChain() {
  const { t } = useTranslation()
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  const nodes = t('problems.nodes', { returnObjects: true }) as { label: string; sub: string }[]
  const edges = t('problems.edges', { returnObjects: true }) as string[]
  const mid = Y + 26
  const edge = (id: string, x1: number, x2: number) => (
    <path id={id} d={`M ${x1} ${mid} L ${x2} ${mid}`} fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#pc-arrow)" />
  )
  return (
    <FlowPanel caption={t('problems.closing')} minWidth={760}>
      <svg ref={ref} viewBox="0 0 1020 150" role="img" aria-label={t('problems.closing')} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="pc-arrow" />
        {edge('pc-e1', X[0] + W[0], X[1] - 2)}
        {edge('pc-e2', X[1] + W[1], X[2] - 2)}
        {edge('pc-e3', X[2] + W[2], X[3] - 2)}
        {nodes.map((n, i) => (
          <FNode key={n.label} x={X[i]} y={Y} w={W[i]} h={52} label={n.label} sub={n.sub} stroke={i === 3 ? FK.AMBER : FK.NODE_STROKE} />
        ))}
        <EdgeLabel x={(X[0] + W[0] + X[1]) / 2} y={Y - 10} text={edges[0]} />
        <EdgeLabel x={(X[1] + W[1] + X[2]) / 2} y={Y - 10} text={edges[1]} />
        <EdgeLabel x={(X[2] + W[2] + X[3]) / 2} y={Y - 10} text={edges[2]} />
        <Dot path="pc-e1" dur={1.6} begin={0.2} />
        <Dot path="pc-e2" dur={1.6} begin={0.9} />
        <Dot path="pc-e3" dur={1.6} begin={1.6} color={FK.AMBER} />
      </svg>
    </FlowPanel>
  )
}
