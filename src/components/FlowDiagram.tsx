import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const NODE_FILL = '#0B1C4E'
const NODE_STROKE = '#24356E'
const EDGE = '#2A3A6E'
const TEXT = '#E8ECF6'
const SUB = '#A9B6D9'
const FLASH = '#03F856'
const CHIPS = { bronze: '#C9884A', silver: '#AFB9C8', gold: '#E8B437' }

const SRC_Y = [40, 138, 236, 334]
const TRUNK_Y = 209

/** Animated medallion-architecture flow: sources -> Bronze -> Silver -> Gold -> consumers.
 *  Pure inline SVG, SMIL dots for motion; paused when the user prefers reduced motion. */
export default function FlowDiagram() {
  const { t } = useTranslation()
  const svgRef = useRef<SVGSVGElement>(null)
  const sources = t('flow.sources', { returnObjects: true }) as string[]
  const consumers = t('flow.consumers', { returnObjects: true }) as string[]

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || typeof window.matchMedia !== 'function' || typeof svg.pauseAnimations !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      if (mq.matches) svg.pauseAnimations()
      else svg.unpauseAnimations()
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const srcPaths = SRC_Y.map((y, i) => ({
    id: `e-src${i}`,
    d: `M 160 ${y + 23} C 208 ${y + 23}, 202 ${TRUNK_Y}, 248 ${TRUNK_Y}`,
  }))
  const servePaths = [
    { id: 'e-serve0', d: `M 900 ${TRUNK_Y} C 928 ${TRUNK_Y}, 922 139, 948 139` },
    { id: 'e-serve1', d: `M 900 ${TRUNK_Y} C 928 ${TRUNK_Y}, 922 291, 948 291` },
  ]

  const layer = (x: number, name: string, sub: string, chip: string) => (
    <g>
      <rect x={x} y={TRUNK_Y - 44} width={150} height={88} rx={10} fill={NODE_FILL} stroke={NODE_STROKE} strokeWidth={1.5} />
      <rect x={x + 18} y={TRUNK_Y - 14} width={9} height={9} fill={chip} />
      <text x={x + 36} y={TRUNK_Y - 5} fontSize={16} fontWeight={700} fill={TEXT} fontFamily="var(--font-display)">{name}</text>
      <text x={x + 18} y={TRUNK_Y + 22} fontSize={11} fill={SUB} fontFamily="var(--font-body)">{sub}</text>
    </g>
  )

  const edgeLabel = (x: number, label: string) => (
    <text x={x} y={TRUNK_Y - 14} fontSize={10} letterSpacing={0.8} fill={SUB} fontFamily="var(--font-mono)" textAnchor="middle">{label.toUpperCase()}</text>
  )

  const dot = (pathId: string, dur: number, begin: number) => (
    <circle r={3.5} fill={FLASH}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite">
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  )

  return (
    <figure className="flow">
      <div className="flow__scroll">
        <svg ref={svgRef} viewBox="0 0 1080 430" role="img" aria-label={t('flow.caption')} style={{ width: '100%', minWidth: 760, height: 'auto', display: 'block' }}>
          <defs>
            <marker id="flow-arrow" viewBox="0 0 8 8" refX={7} refY={4} markerWidth={7} markerHeight={7} orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 Z" fill={EDGE} />
            </marker>
          </defs>

          {srcPaths.map((p) => (
            <path key={p.id} id={p.id} d={p.d} fill="none" stroke={EDGE} strokeWidth={1.5} markerEnd="url(#flow-arrow)" />
          ))}
          <path id="e-bs" d={`M 390 ${TRUNK_Y} L 498 ${TRUNK_Y}`} fill="none" stroke={EDGE} strokeWidth={1.5} markerEnd="url(#flow-arrow)" />
          <path id="e-sg" d={`M 630 ${TRUNK_Y} L 738 ${TRUNK_Y}`} fill="none" stroke={EDGE} strokeWidth={1.5} markerEnd="url(#flow-arrow)" />
          {servePaths.map((p) => (
            <path key={p.id} id={p.id} d={p.d} fill="none" stroke={EDGE} strokeWidth={1.5} markerEnd="url(#flow-arrow)" />
          ))}

          {sources.map((label, i) => (
            <g key={label}>
              <rect x={20} y={SRC_Y[i]} width={140} height={46} rx={8} fill={NODE_FILL} stroke={NODE_STROKE} strokeWidth={1.5} />
              <circle cx={44} cy={SRC_Y[i] + 23} r={4} fill="none" stroke={SUB} strokeWidth={1.5} />
              <text x={58} y={SRC_Y[i] + 28} fontSize={13} fontWeight={600} fill={TEXT} fontFamily="var(--font-body)">{label}</text>
            </g>
          ))}

          {layer(240, t('flow.bronze'), t('flow.bronzeSub'), CHIPS.bronze)}
          {layer(480, t('flow.silver'), t('flow.silverSub'), CHIPS.silver)}
          {layer(720, t('flow.gold'), t('flow.goldSub'), CHIPS.gold)}

          {consumers.map((label, i) => (
            <g key={label}>
              <rect x={950} y={i === 0 ? 116 : 268} width={116} height={46} rx={8} fill={NODE_FILL} stroke={FLASH} strokeWidth={1.5} />
              <text x={1008} y={i === 0 ? 144 : 296} fontSize={13} fontWeight={600} fill={TEXT} fontFamily="var(--font-body)" textAnchor="middle">{label}</text>
            </g>
          ))}

          {edgeLabel(204, t('flow.edgeLand'))}
          {edgeLabel(435, t('flow.edgeClean'))}
          {edgeLabel(684, t('flow.edgeModel'))}
          {edgeLabel(924, t('flow.edgeServe'))}

          {srcPaths.map((p, i) => dot(p.id, 2.6, i * 0.65))}
          {dot('e-bs', 1.7, 0.2)}
          {dot('e-bs', 1.7, 1.05)}
          {dot('e-sg', 1.7, 0.6)}
          {dot('e-sg', 1.7, 1.45)}
          {dot('e-serve0', 1.6, 0.3)}
          {dot('e-serve1', 1.6, 1.1)}
        </svg>
      </div>
      <figcaption className="flow__caption">{t('flow.caption')}</figcaption>
    </figure>
  )
}
