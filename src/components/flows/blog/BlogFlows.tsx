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

/** Numbered amber diamond marker; the same mark appears on the map and in the key. */
const numDiamond = (cx: number, cy: number, n: number) => (
  <g>
    <rect x={cx - 6.5} y={cy - 6.5} width={13} height={13} transform={`rotate(45 ${cx} ${cy})`} fill={FK.AMBER} />
    <text x={cx} y={cy + 3.5} fontSize={9.5} fontWeight={700} fill="#061034" fontFamily="var(--font-mono)" textAnchor="middle">{n}</text>
  </g>
)

/** The five medallion mistakes: markers on the trunk, one aligned key below. */
export function MedallionMistakesMap() {
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  const keyItem = (x: number, y: number, n: number, label: string) => (
    <g>
      {numDiamond(x + 7, y - 4, n)}
      <text x={x + 26} y={y} fontSize={10.5} letterSpacing={0.8} fill={FK.AMBER} fontFamily="var(--font-mono)">{label.toUpperCase()}</text>
    </g>
  )
  const keyHead = (x: number, y: number, text: string) => (
    <text x={x} y={y} fontSize={10} letterSpacing={2} fill={FK.SUB} fontFamily="var(--font-mono)">{text}</text>
  )
  return (
    <FlowPanel caption="The five failure patterns, placed where they live: three inside the layers, two in the seams between them." minWidth={760}>
      <svg ref={ref} viewBox="0 0 1020 320" role="img" aria-label="Bronze, Silver and Gold layers with numbered markers: failures 1 to 3 sit inside the layers, 4 and 5 sit on the seams between them; a key below names each one." style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="mm-arrow" />
        <path id="mm-e1" d="M 320 76 L 388 76" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#mm-arrow)" />
        <path id="mm-e2" d="M 570 76 L 638 76" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#mm-arrow)" />
        <FNode x={140} y={50} w={180} h={52} label="Bronze" sub="raw, as it arrived" chip="#C9884A" />
        <FNode x={390} y={50} w={180} h={52} label="Silver" sub="cleaned and tested" chip="#AFB9C8" />
        <FNode x={640} y={50} w={180} h={52} label="Gold" sub="business-ready" chip="#E8B437" />
        <Dot path="mm-e1" dur={1.7} begin={0.3} />
        <Dot path="mm-e2" dur={1.7} begin={1.1} />
        {/* markers drawn after the dots so the pulse passes beneath the gate */}
        {numDiamond(230, 50, 1)}
        {numDiamond(480, 50, 2)}
        {numDiamond(730, 50, 3)}
        {numDiamond(354, 76, 4)}
        {numDiamond(604, 76, 5)}
        <line x1={140} y1={148} x2={880} y2={148} stroke={FK.NODE_STROKE} strokeWidth={1} strokeDasharray="3 5" />
        {keyHead(140, 186, 'INSIDE THE LAYERS')}
        {keyItem(140, 216, 1, 'edits in raw data')}
        {keyItem(140, 246, 2, 'renamed, never tested')}
        {keyItem(140, 276, 3, 'one table per dashboard')}
        {keyHead(600, 186, 'IN THE SEAMS')}
        {keyItem(600, 216, 4, 'folders, not contracts')}
        {keyItem(600, 246, 5, 'nobody owns the layout')}
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

/** The Power BI licensing cliff: what a Fabric capacity does and does not buy you. */
export function PowerBiLicensingCliff() {
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  const viewerY = [52, 105, 158]
  return (
    <FlowPanel
      caption="Below F64, a Fabric capacity buys engines, not seats: every person who opens a Power BI report still needs their own Pro licence on top. At F64 and above that gate falls away for viewers, though the people who build the reports still need a seat."
      minWidth={860}
    >
      <svg ref={ref} viewBox="0 0 1020 300" role="img" aria-label="Two halves side by side. On the left, an F2 to F32 capacity feeds its reports through a Power BI Pro seat gate that every viewer has to pass, so cost scales per head. On the right, an F64 or larger capacity feeds the same viewers with that gate removed, although report creators still need a Pro licence." style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="pc-arrow" />

        {/* left half: the gate */}
        <text x={20} y={26} fontSize={11} letterSpacing={2} fill={FK.SUB} fontFamily="var(--font-mono)">F2 TO F32</text>
        <path id="pc-l0" d="M 160 125 L 206 125" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#pc-arrow)" />
        <FNode x={20} y={98} w={140} h={54} label="Capacity" sub="the engines" />
        <g>
          <rect x={210} y={68} width={110} height={114} rx={8} fill={FK.NODE_FILL} stroke={FK.AMBER} strokeWidth={1.5} />
          <text x={265} y={112} fontSize={12.5} fontWeight={600} fill={FK.TEXT} fontFamily="var(--font-body)" textAnchor="middle">Pro seat</text>
          <text x={265} y={130} fontSize={10.5} fill={FK.SUB} fontFamily="var(--font-body)" textAnchor="middle">per viewer</text>
          <text x={265} y={154} fontSize={10.5} letterSpacing={0.8} fill={FK.AMBER} fontFamily="var(--font-mono)" textAnchor="middle">~ €13 / MO</text>
        </g>
        <path id="pc-l1" d="M 320 125 L 362 125" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#pc-arrow)" />
        <path d="M 320 125 C 344 125, 340 72, 362 72" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#pc-arrow)" />
        <path d="M 320 125 C 344 125, 340 178, 362 178" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#pc-arrow)" />
        {viewerY.map((y) => (
          <FNode key={`l${y}`} x={364} y={y} w={136} h={40} label="Viewer" />
        ))}
        {drop(432, 198, 222)}
        {amberTag(432, 226, 'cost scales per head')}

        <line x1={510} y1={16} x2={510} y2={284} stroke={FK.NODE_STROKE} strokeWidth={1.2} strokeDasharray="4 5" />

        {/* right half: the gate is gone */}
        <text x={540} y={26} fontSize={11} letterSpacing={2} fill={FK.SUB} fontFamily="var(--font-mono)">F64 AND ABOVE</text>
        <path id="pc-r0" d="M 680 125 L 726 125" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#pc-arrow)" />
        <FNode x={540} y={98} w={140} h={54} label="Capacity" sub="the same engines" />
        <g>
          <rect x={730} y={68} width={110} height={114} rx={8} fill="none" stroke={FK.NODE_STROKE} strokeWidth={1.5} strokeDasharray="4 5" />
          <text x={785} y={112} fontSize={12.5} fontWeight={600} fill={FK.FLASH} fontFamily="var(--font-body)" textAnchor="middle">No seat</text>
          <text x={785} y={130} fontSize={10.5} fill={FK.SUB} fontFamily="var(--font-body)" textAnchor="middle">free licence</text>
          <text x={785} y={154} fontSize={10.5} letterSpacing={0.8} fill={FK.SUB} fontFamily="var(--font-mono)" textAnchor="middle">GATE GONE</text>
        </g>
        <path id="pc-r1" d="M 840 125 L 878 125" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#pc-arrow)" />
        <path d="M 840 125 C 864 125, 860 72, 878 72" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#pc-arrow)" />
        <path d="M 840 125 C 864 125, 860 178, 878 178" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#pc-arrow)" />
        {viewerY.map((y) => (
          <FNode key={`r${y}`} x={880} y={y} w={134} h={40} label="Viewer" stroke={FK.FLASH} />
        ))}
        {drop(785, 182, 222)}
        {amberTag(785, 226, 'creators still need pro')}
        <text x={540} y={272} fontSize={10.5} letterSpacing={0.8} fill={FK.SUB} fontFamily="var(--font-mono)">BREAK-EVEN ABOUT 390 VIEWERS</text>

        <Dot path="pc-l0" dur={1.3} begin={0.2} color={FK.AMBER} />
        <Dot path="pc-l1" dur={1.3} begin={1.1} color={FK.AMBER} />
        <Dot path="pc-r0" dur={1.3} begin={0.2} />
        <Dot path="pc-r1" dur={1.3} begin={1.1} />
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
