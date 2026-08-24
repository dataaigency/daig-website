import { useEffect } from 'react'
import type { ReactNode, RefObject } from 'react'

/** Shared visual language for all flow diagrams (see FlowDiagram.tsx on Home). */
export const FK = {
  NODE_FILL: '#0B1C4E',
  NODE_STROKE: '#24356E',
  EDGE: '#2A3A6E',
  TEXT: '#E8ECF6',
  SUB: '#A9B6D9',
  FLASH: '#03F856',
  AMBER: '#E8B437',
  NAVY: '#061034',
}

/** Pause SMIL dot animations for users who prefer reduced motion. */
export function useFlowPause(ref: RefObject<SVGSVGElement | null>) {
  useEffect(() => {
    const svg = ref.current
    if (!svg || typeof window.matchMedia !== 'function' || typeof svg.pauseAnimations !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      if (mq.matches) svg.pauseAnimations()
      else svg.unpauseAnimations()
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [ref])
}

export function ArrowDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 8 8" refX={7} refY={4} markerWidth={7} markerHeight={7} orient="auto">
        <path d="M 0 0 L 8 4 L 0 8 Z" fill={FK.EDGE} />
      </marker>
    </defs>
  )
}

export function Dot({ path, dur, begin, color = FK.FLASH }: { path: string; dur: number; begin: number; color?: string }) {
  // opacity starts at 0 so the dot is not visible parked at the svg origin
  // before its first animation cycle begins
  return (
    <circle r={3.2} fill={color} opacity={0}>
      <set attributeName="opacity" to="1" begin={`${begin}s`} />
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite">
        <mpath href={`#${path}`} />
      </animateMotion>
    </circle>
  )
}

export function FNode({ x, y, w, h, label, sub, stroke = FK.NODE_STROKE, chip }: { x: number; y: number; w: number; h: number; label: string; sub?: string; stroke?: string; chip?: string }) {
  const cx = x + w / 2
  const labelY = sub ? y + h / 2 - 3 : y + h / 2 + 4
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={FK.NODE_FILL} stroke={stroke} strokeWidth={1.5} />
      {chip && <rect x={cx - (label.length * 6.6) / 2 - 15} y={labelY - 9} width={8} height={8} fill={chip} />}
      <text x={cx} y={labelY} fontSize={12.5} fontWeight={600} fill={FK.TEXT} fontFamily="var(--font-body)" textAnchor="middle">{label}</text>
      {sub && <text x={cx} y={y + h / 2 + 15} fontSize={10.5} fill={FK.SUB} fontFamily="var(--font-body)" textAnchor="middle">{sub}</text>}
    </g>
  )
}

export function EdgeLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} fontSize={9.5} letterSpacing={0.8} fill={FK.SUB} fontFamily="var(--font-mono)" textAnchor="middle">{text.toUpperCase()}</text>
  )
}

/** Navy inset panel the diagrams sit on (pages are paper/white). */
export function FlowPanel({ children, caption, minWidth = 440 }: { children: ReactNode; caption?: string; minWidth?: number }) {
  return (
    <figure style={{ marginTop: 18 /* top only: horizontal margins stay CSS-controlled so .prose can center the breakout */ }}>
      <div className="flow-scroll" style={{ background: FK.NAVY, borderRadius: 8, padding: '14px 16px', overflowX: 'auto' }}>
        <div style={{ minWidth }}>{children}</div>
      </div>
      {caption && <figcaption style={{ fontSize: 12, color: 'var(--graphite)', marginTop: 10, lineHeight: 1.55 }}>{caption}</figcaption>}
    </figure>
  )
}
