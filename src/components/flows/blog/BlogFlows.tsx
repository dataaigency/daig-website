import { useRef } from 'react'
import { FK, useFlowPause, ArrowDefs, Dot, FNode, EdgeLabel, FlowPanel } from '../kit'

/* Blog diagrams. Posts are per-language content files, so labels here are
 * literal English by design (unlike site diagrams, which go through t()). */

const amberTag = (x: number, y: number, text: string, anchor: 'start' | 'middle' | 'end' = 'middle') => (
  <g>
    <rect x={x - 4} y={y - 8} width={8} height={8} transform={`rotate(45 ${x} ${y - 4})`} fill={FK.AMBER} />
    <text x={anchor === 'middle' ? x : anchor === 'start' ? x + 14 : x - 14} y={y} fontSize={10.5} letterSpacing={0.8} fill={FK.AMBER} fontFamily="var(--font-mono)" textAnchor={anchor} dy={anchor === 'middle' ? 16 : 0}>{text.toUpperCase()}</text>
  </g>
)

const drop = (x: number, y1: number, y2: number) => (
  <line x1={x} y1={y1} x2={x} y2={y2} stroke={FK.NODE_STROKE} strokeWidth={1.2} strokeDasharray="3 4" />
)

/** Where a first look at a data stack usually finds trouble. */
export function AuditStackMap() {
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  const nodes = [
    { x: 20, w: 180, label: 'Sources', flag: 'manual exports' },
    { x: 280, w: 180, label: 'Pipelines', flag: 'untested joins' },
    { x: 540, w: 180, label: 'Warehouse / lake', flag: 'one person knows it' },
    { x: 800, w: 200, label: 'Dashboards', flag: 'numbers disagree' },
  ]
  return (
    <FlowPanel caption="The four places a first look goes, and the finding that keeps turning up in each." minWidth={760}>
      <svg ref={ref} viewBox="0 0 1020 175" role="img" aria-label="A data stack from sources to dashboards, with the typical trouble spot flagged under each part." style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="am-arrow" />
        {nodes.slice(0, -1).map((n, i) => (
          <path key={i} id={`am-e${i}`} d={`M ${n.x + n.w} 56 L ${nodes[i + 1].x - 2} 56`} fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#am-arrow)" />
        ))}
        {nodes.map((n) => (
          <g key={n.label}>
            <FNode x={n.x} y={32} w={n.w} h={48} label={n.label} />
            {drop(n.x + n.w / 2, 80, 108)}
            {amberTag(n.x + n.w / 2, 112, n.flag)}
          </g>
        ))}
        <Dot path="am-e0" dur={1.7} begin={0.2} />
        <Dot path="am-e1" dur={1.7} begin={0.9} />
        <Dot path="am-e2" dur={1.7} begin={1.6} />
      </svg>
    </FlowPanel>
  )
}

/** The five medallion mistakes, located where they happen. */
export function MedallionMistakesMap() {
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  return (
    <FlowPanel caption="The five failure patterns, placed where they live: three inside the layers, two in the seams between them." minWidth={760}>
      <svg ref={ref} viewBox="0 0 1020 240" role="img" aria-label="Bronze, Silver and Gold layers with five numbered failure patterns marked at the layer or seam where each occurs." style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="mm-arrow" />
        <path id="mm-e1" d="M 320 120 L 388 120" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#mm-arrow)" />
        <path id="mm-e2" d="M 570 120 L 638 120" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#mm-arrow)" />
        <FNode x={140} y={94} w={180} h={52} label="Bronze" sub="raw, as it arrived" chip="#C9884A" />
        <FNode x={390} y={94} w={180} h={52} label="Silver" sub="cleaned and tested" chip="#AFB9C8" />
        <FNode x={640} y={94} w={180} h={52} label="Gold" sub="business-ready" chip="#E8B437" />
        {drop(230, 60, 92)}
        {amberTag(230, 28, '1 · edits in raw data')}
        {drop(480, 148, 176)}
        {amberTag(480, 180, '2 · renamed, never tested', 'start')}
        {drop(730, 60, 92)}
        {amberTag(730, 28, '3 · one table per dashboard')}
        {drop(354, 148, 176)}
        {amberTag(354, 180, '4 · folders, not contracts', 'end')}
        {drop(604, 60, 92)}
        {amberTag(604, 28, '5 · nobody owns the layout', 'end')}
        <Dot path="mm-e1" dur={1.7} begin={0.3} />
        <Dot path="mm-e2" dur={1.7} begin={1.1} />
      </svg>
    </FlowPanel>
  )
}

/** The surf platform in one picture: three sources, the shoebox, one clean table, one decision. */
export function SurfPipeline() {
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  const srcY = [28, 100, 172]
  const labels = ['Buoy readings', 'Wind forecast', 'Tide table']
  return (
    <FlowPanel caption="The whole surf platform in one picture: everything lands untouched, gets cleaned once, and one chart answers the only question that matters." minWidth={760}>
      <svg ref={ref} viewBox="0 0 1020 245" role="img" aria-label="Three messy sources land raw in the shoebox, are cleaned once into one table, and feed a single paddle-out decision." style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="sp-arrow" />
        {srcY.map((y, i) => (
          <path key={i} id={`sp-s${i}`} d={`M 200 ${y + 22} C 250 ${y + 22}, 244 122, 292 122`} fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#sp-arrow)" />
        ))}
        <path id="sp-e1" d="M 514 122 L 578 122" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#sp-arrow)" />
        <path id="sp-e2" d="M 788 122 L 850 122" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#sp-arrow)" />
        {labels.map((l, i) => (
          <FNode key={l} x={20} y={srcY[i]} w={180} h={44} label={l} />
        ))}
        <FNode x={294} y={94} w={220} h={56} label="The shoebox" sub="raw copies, never edited" chip="#C9884A" />
        <FNode x={580} y={94} w={208} h={56} label="One clean table" sub="fixed once, for everyone" chip="#AFB9C8" />
        <FNode x={852} y={94} w={148} h={56} label="Paddle out?" sub="one honest answer" stroke={FK.FLASH} />
        <EdgeLabel x={247} y={78} text="land" />
        <EdgeLabel x={546} y={110} text="clean once" />
        <EdgeLabel x={820} y={110} text="decide" />
        {srcY.map((_, i) => (
          <Dot key={i} path={`sp-s${i}`} dur={2.2} begin={i * 0.6} />
        ))}
        <Dot path="sp-e1" dur={1.6} begin={0.9} />
        <Dot path="sp-e2" dur={1.6} begin={1.7} />
      </svg>
    </FlowPanel>
  )
}

/** EU AI Act: a five-stop timeline, with the two deadlines that actually moved flagged. */
export function AiActTimeline() {
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  const y = 90
  const h = 52
  const stops = [
    { x: 15, w: 175, year: 'FEB 2025', label: 'Prohibited practices', sub: 'banned since 2025' },
    { x: 220, w: 175, year: 'AUG 2025', label: 'GPAI provider rules', sub: 'model transparency' },
    { x: 425, w: 175, year: 'AUG 2026', label: 'Transparency rules', sub: 'Art. 50 + AI literacy' },
    { x: 630, w: 175, year: 'DEC 2027', label: 'Annex III high-risk', sub: 'HR, credit, insurance', moved: 'moved, was aug 2026' },
    { x: 835, w: 175, year: 'AUG 2028', label: 'Annex I high-risk', sub: 'AI in regulated products', moved: 'moved, was aug 2027' },
  ]
  const todayX = stops[2].x + stops[2].w / 2
  return (
    <FlowPanel caption="Only two deadlines moved: high-risk obligations under Annex III (to December 2027) and Annex I (to August 2028). Prohibited practices, GPAI provider rules, transparency labelling and the AI literacy duty stayed on schedule." minWidth={900}>
      <svg ref={ref} viewBox="0 0 1030 250" role="img" aria-label="A timeline from February 2025 to August 2028 with five EU AI Act obligations. Today, August 2026, is marked at the transparency and AI literacy stop; the two later stops, Annex III and Annex I high-risk rules, are flagged as moved from their original date." style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="ai-arrow" />
        {stops.slice(0, -1).map((s, i) => (
          <path key={i} id={`ai-e${i}`} d={`M ${s.x + s.w} ${y + h / 2} L ${stops[i + 1].x - 2} ${y + h / 2}`} fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#ai-arrow)" />
        ))}
        {stops.map((s, i) => (
          <g key={s.label}>
            <text x={s.x + s.w / 2} y={54} fontSize={11} letterSpacing={1.2} fill={i === 2 ? FK.FLASH : FK.SUB} fontFamily="var(--font-mono)" textAnchor="middle">{s.year}</text>
            <FNode x={s.x} y={y} w={s.w} h={h} label={s.label} sub={s.sub} stroke={i === 2 ? FK.FLASH : FK.NODE_STROKE} />
            {s.moved && (
              <>
                {drop(s.x + s.w / 2, y + h, y + h + 28)}
                {amberTag(s.x + s.w / 2, y + h + 32, s.moved)}
              </>
            )}
          </g>
        ))}
        <text x={todayX} y={20} fontSize={10} letterSpacing={1.4} fill={FK.FLASH} fontFamily="var(--font-mono)" textAnchor="middle">TODAY</text>
        <line x1={todayX} y1={28} x2={todayX} y2={40} stroke={FK.FLASH} strokeWidth={1.2} strokeDasharray="2 3" />
        {stops.slice(0, -1).map((_, i) => (
          <Dot key={i} path={`ai-e${i}`} dur={2} begin={i * 0.5} color={i >= 2 ? FK.AMBER : FK.FLASH} />
        ))}
      </svg>
    </FlowPanel>
  )
}

/** Warehouse vs lakehouse: the difference drawn, not described. */
export function WarehouseVsLakehouse() {
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  const innerRow = (x: number, y: number, w: number, label: string) => (
    <g>
      <rect x={x} y={y} width={w} height={26} rx={5} fill="#0E2258" stroke={FK.NODE_STROKE} strokeWidth={1} />
      <text x={x + w / 2} y={y + 17} fontSize={11} fill={FK.TEXT} fontFamily="var(--font-body)" textAnchor="middle">{label}</text>
    </g>
  )
  return (
    <FlowPanel caption="The real difference: a warehouse stores tables for SQL; a lakehouse keeps files and tables in one governed store, so raw data and clean tables live under the same roof." minWidth={760}>
      <svg ref={ref} viewBox="0 0 1020 250" role="img" aria-label="Side by side: a warehouse accepting only structured tables, and a lakehouse holding open-format files and tables in one store." style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="wl-arrow" />
        <text x={20} y={26} fontSize={11} letterSpacing={2} fill={FK.SUB} fontFamily="var(--font-mono)">WAREHOUSE</text>
        <path d="M 200 122 L 248 122" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#wl-arrow)" />
        <FNode x={20} y={98} w={180} h={48} label="Structured tables" sub="only" />
        <g>
          <rect x={250} y={52} width={220} height={146} rx={10} fill={FK.NODE_FILL} stroke={FK.NODE_STROKE} strokeWidth={1.5} />
          <text x={266} y={76} fontSize={12.5} fontWeight={700} fill={FK.TEXT} fontFamily="var(--font-display)">Warehouse</text>
          {innerRow(266, 92, 188, 'tables')}
          {innerRow(266, 128, 188, 'SQL engine')}
          <text x={266} y={182} fontSize={10.5} fill={FK.SUB} fontFamily="var(--font-body)">structured data only</text>
        </g>
        <line x1={510} y1={20} x2={510} y2={230} stroke={FK.NODE_STROKE} strokeWidth={1.2} strokeDasharray="4 5" />
        <text x={550} y={26} fontSize={11} letterSpacing={2} fill={FK.SUB} fontFamily="var(--font-mono)">LAKEHOUSE</text>
        <path d="M 690 82 C 716 82, 712 100, 736 106" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#wl-arrow)" />
        <path d="M 690 166 C 716 166, 712 148, 736 140" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#wl-arrow)" />
        <FNode x={550} y={58} w={140} h={44} label="Tables" />
        <FNode x={550} y={144} w={140} h={44} label="Files · events" sub="logs, exports, json" />
        <g>
          <rect x={738} y={52} width={262} height={146} rx={10} fill={FK.NODE_FILL} stroke={FK.NODE_STROKE} strokeWidth={1.5} />
          <text x={754} y={76} fontSize={12.5} fontWeight={700} fill={FK.TEXT} fontFamily="var(--font-display)">Lakehouse</text>
          {innerRow(754, 92, 230, 'files, open formats (Delta, Iceberg)')}
          {innerRow(754, 128, 230, 'tables, same engine')}
          <text x={754} y={182} fontSize={10.5} fill={FK.SUB} fontFamily="var(--font-body)">one governed store for both</text>
        </g>
      </svg>
    </FlowPanel>
  )
}
