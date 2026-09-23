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

/** RAG in one chain: a question triggers a search of your own archive, the
 *  matches land on the context window, the model plays using both trained
 *  patterns and those pages, and a good system says so when nothing matches. */
export function RagSheetMusic() {
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  const nodes = [
    { x: 15, w: 155, label: 'Your question' },
    { x: 200, w: 195, label: 'Search the archive', sub: 'matches by meaning' },
    { x: 425, w: 175, label: 'On the stand', sub: 'the pages it found' },
    { x: 630, w: 180, label: 'The band plays', sub: 'patterns + your pages' },
    { x: 840, w: 165, label: 'Answer, sourced', stroke: FK.FLASH },
  ]
  const mid = 32 + 24
  return (
    <FlowPanel caption="How retrieval-augmented generation actually works: a question triggers a search of your own material, the matching pages sit in the context window like sheet music on a stand, and the model answers from both its training and those pages, saying so honestly when nothing relevant turns up." minWidth={860}>
      <svg ref={ref} viewBox="0 0 1020 160" role="img" aria-label="Five steps left to right: your question, a search of the archive, the matching pages on the context window, the model playing from both trained patterns and those pages, and a sourced answer. A note under the search step flags the honest fallback: no match found means it says so instead of guessing." style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="rs-arrow" />
        {nodes.slice(0, -1).map((n, i) => (
          <path key={i} id={`rs-e${i}`} d={`M ${n.x + n.w} ${mid} L ${nodes[i + 1].x - 2} ${mid}`} fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#rs-arrow)" />
        ))}
        {nodes.map((n) => (
          <FNode key={n.label} x={n.x} y={32} w={n.w} h={48} label={n.label} sub={n.sub} stroke={n.stroke ?? FK.NODE_STROKE} />
        ))}
        {drop(nodes[1].x + nodes[1].w / 2, 80, 108)}
        {amberTag(nodes[1].x + nodes[1].w / 2, 112, 'no match: says so')}
        {nodes.slice(0, -1).map((_, i) => (
          <Dot key={i} path={`rs-e${i}`} dur={1.7} begin={i * 0.6} />
        ))}
      </svg>
    </FlowPanel>
  )
}

/** Article 50: four duties, one clock. Three duties and the disclosure half
 *  of the fourth are live regardless of ship date; only content marking gets
 *  a runway, and only for features already on the market before Aug 2026. */
export function MarkingRunway() {
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  const rowY = [40, 104, 168, 232]
  const duties = [
    { label: 'Bot disclosure', sub: 'you know it is AI' },
    { label: 'Biometric disclosure', sub: 'emotion & categorization' },
    { label: 'Deepfake & PI text', sub: 'deployer labels it' },
    { label: 'Content marking', sub: 'machine-readable' },
  ]
  const srcY = 130
  const half = (prefix: string, srcX: number, dutyX: number, markingLive: boolean) => (
    <g>
      <FNode x={srcX} y={srcY} w={170} h={56} label="Your AI feature" />
      {duties.map((d, i) => (
        <path
          key={`${prefix}p${i}`}
          id={`${prefix}e${i}`}
          d={`M ${srcX + 170} ${srcY + 28} C ${srcX + 200} ${srcY + 28}, ${srcX + 194} ${rowY[i] + 22}, ${dutyX} ${rowY[i] + 22}`}
          fill="none"
          stroke={FK.EDGE}
          strokeWidth={1.5}
          markerEnd="url(#mr-arrow)"
        />
      ))}
      {duties.map((d, i) => {
        const amber = i === 3 && !markingLive
        return (
          <g key={`${prefix}n${i}`}>
            <FNode x={dutyX} y={rowY[i]} w={250} h={44} label={d.label} sub={d.sub} stroke={amber ? FK.AMBER : FK.FLASH} />
            {amber && (
              <>
                {drop(dutyX + 125, rowY[i] + 44, rowY[i] + 68)}
                {amberTag(dutyX + 125, rowY[i] + 72, 'runway to 2 dec 2026')}
              </>
            )}
          </g>
        )
      })}
      {duties.map((d, i) => (
        <Dot key={`${prefix}d${i}`} path={`${prefix}e${i}`} dur={1.9} begin={i * 0.4} color={i === 3 && !markingLive ? FK.AMBER : FK.FLASH} />
      ))}
    </g>
  )
  return (
    <FlowPanel
      caption="Article 50 sets four duties, all enforceable since 2 August 2026 regardless of when a feature shipped. Only one of them, machine-readable content marking, gets a runway, and only for systems already live before that date: those get until 2 December 2026 to add the mark. Everything else, including telling people they are talking to AI, was never on that clock."
      minWidth={900}
    >
      <svg ref={ref} viewBox="0 0 1020 340" role="img" aria-label="Two halves. Left: an AI feature shipped before 2 August 2026, where bot disclosure, biometric disclosure and deepfake or public-interest labelling are live now in green, while content marking is flagged amber with a runway to 2 December 2026. Right: an AI feature shipped after 2 August 2026, where all four duties, including content marking, are live now with no runway." style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="mr-arrow" />
        <text x={20} y={16} fontSize={11} letterSpacing={1.6} fill={FK.SUB} fontFamily="var(--font-mono)" textAnchor="start">SHIPPED BEFORE 2 AUG 2026</text>
        {half('l', 20, 250, false)}
        <line x1={510} y1={10} x2={510} y2={330} stroke={FK.NODE_STROKE} strokeWidth={1.2} strokeDasharray="4 5" />
        <text x={540} y={16} fontSize={11} letterSpacing={1.6} fill={FK.SUB} fontFamily="var(--font-mono)" textAnchor="start">SHIPPED AFTER 2 AUG 2026</text>
        {half('r', 540, 770, true)}
      </svg>
    </FlowPanel>
  )
}

/** Residency vs sovereignty: one flow that forks on who legally controls
 *  the provider, not on which data center the bytes sit in. */
export function DataResidencyFork() {
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  return (
    <FlowPanel
      caption="An EU region answers where your data sits, not who can be legally compelled to hand it over. A US-owned provider can still be reached by a CLOUD Act warrant no matter which EU data center holds the bytes; only a provider with no US parent closes that gate, usually for a premium."
      minWidth={880}
    >
      <svg ref={ref} viewBox="0 0 1040 340" role="img" aria-label="Your data flows into an EU data center, which satisfies residency. The chain then asks who legally controls the provider. One branch, a US-owned provider, still lets a CLOUD Act warrant reach the data regardless of location, rare in practice but legally real. The other branch, an EU-incorporated entity with no US parent, keeps the data under EU law only, usually at a premium of ten to fifteen percent." style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="rj-arrow" />

        <path id="rj-e1" d="M 145 139 L 173 139" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#rj-arrow)" />
        <path id="rj-e2" d="M 365 139 L 393 139" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#rj-arrow)" />
        <FNode x={15} y={112} w={130} h={54} label="Your data" />
        <FNode x={175} y={112} w={190} h={54} label="EU data center" sub="at rest: EU region" />
        <FNode x={395} y={112} w={210} h={54} label="Who legally controls it" sub="the provider's HQ" />
        <EdgeLabel x={159} y={118} text="stored in" />
        <EdgeLabel x={379} y={118} text="controlled by" />

        {/* upper branch: US-owned provider, CLOUD Act still reaches in */}
        <path id="rj-fa" d="M 605 139 C 630 100, 620 70, 650 54" fill="none" stroke={FK.AMBER} strokeWidth={1.5} markerEnd="url(#rj-arrow)" />
        <path id="rj-ea" d="M 830 54 L 858 54" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#rj-arrow)" />
        <FNode x={650} y={30} w={180} h={48} label="US-owned provider" sub="EU region, US parent" stroke={FK.AMBER} />
        <FNode x={860} y={30} w={170} h={48} label="CLOUD Act reaches in" sub="regardless of location" stroke={FK.AMBER} />
        <text x={618} y={88} fontSize={9.5} letterSpacing={0.8} fill={FK.AMBER} fontFamily="var(--font-mono)" textAnchor="start">US PARENT</text>
        {drop(945, 78, 102)}
        {amberTag(945, 106, 'rare, still legal')}

        {/* lower branch: EU-incorporated entity, no US parent to compel */}
        <path id="rj-fb" d="M 605 139 C 630 180, 620 210, 650 252" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#rj-arrow)" />
        <path id="rj-eb" d="M 830 252 L 858 252" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#rj-arrow)" />
        <FNode x={650} y={228} w={180} h={48} label="EU-incorporated entity" sub="no US parent authority" stroke={FK.FLASH} />
        <FNode x={860} y={228} w={170} h={48} label="Stays under EU law" sub="true sovereign tier" stroke={FK.FLASH} />
        <text x={618} y={198} fontSize={9.5} letterSpacing={0.8} fill={FK.SUB} fontFamily="var(--font-mono)" textAnchor="start">EU ONLY</text>
        {drop(945, 276, 300)}
        {amberTag(945, 304, 'premium +10 to 15%')}

        <Dot path="rj-e1" dur={1.6} begin={0} />
        <Dot path="rj-e2" dur={1.6} begin={0.7} />
        <Dot path="rj-fa" dur={1.8} begin={1.4} color={FK.AMBER} />
        <Dot path="rj-ea" dur={1.2} begin={2.6} color={FK.AMBER} />
        <Dot path="rj-fb" dur={1.8} begin={1.4} />
        <Dot path="rj-eb" dur={1.2} begin={2.6} />
      </svg>
    </FlowPanel>
  )
}

/** Choosing an LLM in the EU: the same "pick a model" step forks three ways
 *  depending on who legally owns the provider and whether an EU-region host
 *  exists for that specific model, not on marketing language. */
export function LlmMenuFork() {
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  const mainY = 165
  const mainH = 54
  const mainMid = mainY + mainH / 2
  const rowA = { y: 16, mid: 40 }
  const rowB = { y: 168, mid: 192 }
  const rowC = { y: 320, mid: 344 }
  return (
    <FlowPanel
      caption="Picking a model forks three ways, and the fork runs on who legally owns the provider and whether an EU-region host exists for that exact model, not on the word 'EU' in a brochure. Only an EU-incorporated provider closes the CLOUD Act gate; an EU-region host on a US-owned model buys residency, not sovereignty; and some model versions still have no EU host at all."
      minWidth={900}
    >
      <svg ref={ref} viewBox="0 0 1020 432" role="img" aria-label="Your AI workload picks a model, which forks three ways. Top: an EU-incorporated provider like Mistral or Aleph Alpha closes CLOUD Act exposure entirely. Middle: a US-owned model such as Claude, GPT or Gemini hosted in an AWS Bedrock, Vertex AI or eu.api region buys data residency but the CLOUD Act can still reach it. Bottom: the same US-owned models called directly or on a version without an EU host default to US storage with no residency at all." style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="lm-arrow" />

        <path id="lm-e1" d={`M 165 ${mainMid} L 183 ${mainMid}`} fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#lm-arrow)" />
        <FNode x={15} y={mainY} w={150} h={mainH} label="Your AI workload" />
        <FNode x={185} y={mainY} w={190} h={mainH} label="Pick a model" sub="which provider, which host" />

        {/* fork into three rows */}
        <path id="lm-fa" d={`M 375 ${mainMid} C 388 100, 388 60, 400 ${rowA.mid}`} fill="none" stroke={FK.FLASH} strokeWidth={1.5} markerEnd="url(#lm-arrow)" />
        <path id="lm-fb" d={`M 375 ${mainMid} L 400 ${rowB.mid}`} fill="none" stroke={FK.AMBER} strokeWidth={1.5} markerEnd="url(#lm-arrow)" />
        <path id="lm-fc" d={`M 375 ${mainMid} C 388 260, 388 300, 400 ${rowC.mid}`} fill="none" stroke={FK.AMBER} strokeWidth={1.5} markerEnd="url(#lm-arrow)" />

        <FNode x={400} y={rowA.y} w={240} h={48} label="EU-incorporated model" sub="Mistral, Aleph Alpha" stroke={FK.FLASH} />
        <path id="lm-ea" d={`M 640 ${rowA.mid} L 668 ${rowA.mid}`} fill="none" stroke={FK.FLASH} strokeWidth={1.5} markerEnd="url(#lm-arrow)" />
        <FNode x={670} y={rowA.y} w={230} h={48} label="No CLOUD Act exposure" sub="true sovereign tier" stroke={FK.FLASH} />

        <FNode x={400} y={rowB.y} w={240} h={48} label="US-owned model, EU host" sub="Bedrock, Vertex, eu.api" stroke={FK.AMBER} />
        <path id="lm-eb" d={`M 640 ${rowB.mid} L 668 ${rowB.mid}`} fill="none" stroke={FK.AMBER} strokeWidth={1.5} markerEnd="url(#lm-arrow)" />
        <FNode x={670} y={rowB.y} w={230} h={48} label="Residency, not sovereignty" sub="CLOUD Act still reaches" stroke={FK.AMBER} />

        <FNode x={400} y={rowC.y} w={240} h={48} label="US-owned model, no EU host" sub="direct API, older version" stroke={FK.AMBER} />
        <path id="lm-ec" d={`M 640 ${rowC.mid} L 668 ${rowC.mid}`} fill="none" stroke={FK.AMBER} strokeWidth={1.5} markerEnd="url(#lm-arrow)" />
        <FNode x={670} y={rowC.y} w={230} h={48} label="Defaults to US storage" sub="no residency at all" stroke={FK.AMBER} />

        {drop(785, rowC.y + 48, rowC.y + 72)}
        {amberTag(785, rowC.y + 76, 'check per model version')}

        <Dot path="lm-e1" dur={1.2} begin={0} />
        <Dot path="lm-fa" dur={1.9} begin={0.6} color={FK.FLASH} />
        <Dot path="lm-ea" dur={1.1} begin={2.4} color={FK.FLASH} />
        <Dot path="lm-fb" dur={1.7} begin={0.6} color={FK.AMBER} />
        <Dot path="lm-eb" dur={1.1} begin={2.2} color={FK.AMBER} />
        <Dot path="lm-fc" dur={1.9} begin={0.6} color={FK.AMBER} />
        <Dot path="lm-ec" dur={1.1} begin={2.4} color={FK.AMBER} />
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

/** Fabric rents an engine at a fixed wall-clock rate; BigQuery meters what a
 *  query actually scans. Same shape as the warehouse/lakehouse comparison,
 *  drawn as what happens to the bill, not as a feature list. */
export function PlatformMeteringFork() {
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  return (
    <FlowPanel
      caption="Fabric bills the capacity by the hour whether it is idle or busy, so the floor is fixed. BigQuery bills by the byte a query actually scans, with the first tebibyte each month free, so a quiet month costs next to nothing and a busy one costs more because it did more."
      minWidth={860}
    >
      <svg ref={ref} viewBox="0 0 1020 240" role="img" aria-label="Two halves side by side. On the left, a Fabric capacity runs on wall-clock time and bills the same whether it sits idle or busy, landing on a fixed floor around one hundred sixty five to two hundred seventy eight euros a month. On the right, a BigQuery query is metered by bytes scanned, the first tebibyte each month is free, and the bill tracks actual usage." style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="pm-arrow" />

        {/* left half: Fabric, fixed floor regardless of use */}
        <text x={20} y={26} fontSize={11} letterSpacing={2} fill={FK.SUB} fontFamily="var(--font-mono)">FABRIC: RENT THE ENGINE</text>
        <path id="pm-l0" d="M 180 108 L 226 108" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#pm-arrow)" />
        <FNode x={20} y={82} w={160} h={52} label="Capacity (F2+)" sub="pay as you go" />
        <FNode x={228} y={82} w={252} h={52} label="Runs on wall clock" sub="idle or busy, same meter" stroke={FK.AMBER} />
        {drop(354, 134, 158)}
        {amberTag(354, 162, 'floor ~€165 to €278 / mo')}

        <line x1={510} y1={16} x2={510} y2={224} stroke={FK.NODE_STROKE} strokeWidth={1.2} strokeDasharray="4 5" />

        {/* right half: BigQuery, metered by what a query actually scans */}
        <text x={540} y={26} fontSize={11} letterSpacing={2} fill={FK.SUB} fontFamily="var(--font-mono)">BIGQUERY: PAY PER QUERY</text>
        <path id="pm-r0" d="M 700 108 L 746 108" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#pm-arrow)" />
        <FNode x={540} y={82} w={160} h={52} label="Query submitted" />
        <FNode x={748} y={82} w={252} h={52} label="Bytes scanned, metered" sub="bill tracks usage" stroke={FK.FLASH} />
        {drop(874, 134, 158)}
        <g>
          <rect x={874 - 4} y={162 - 8} width={8} height={8} transform={`rotate(45 874 ${162 - 4})`} fill={FK.FLASH} />
          <text x={874} y={178} fontSize={10.5} letterSpacing={0.8} fill={FK.FLASH} fontFamily="var(--font-mono)" textAnchor="middle">FIRST 1 TIB / MO FREE</text>
        </g>

        <Dot path="pm-l0" dur={1.5} begin={0.2} color={FK.AMBER} />
        <Dot path="pm-r0" dur={1.5} begin={0.2} />
      </svg>
    </FlowPanel>
  )
}

/** Two players who have never met can improvise together the moment someone
 *  states the key and the chord changes first; skip that one sentence and
 *  the same skilled playing converges on a clash instead of music. The
 *  company mechanism is the same fork, run on a data contract instead of a
 *  called key: the diagram stays literally about the band, on purpose. */
export function SharedFormFork() {
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  return (
    <FlowPanel
      caption="Two players who have never played together can improvise together only if someone calls the key and the chord changes first. Skip that one sentence and the same two players, playing just as well, converge on a clash instead of music."
      minWidth={860}
    >
      <svg ref={ref} viewBox="0 0 1040 280" role="img" aria-label="Two halves. Left: no one calls the tune, so player one picks a key and player two picks different chord changes, and their two independently chosen paths converge into a clash of wrong notes. Right: someone calls the tune's key and chord changes first, so both players improvise on that shared form, and their two paths converge into music landing together." style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="sf-arrow" />

        {/* left half: no tune called, independent guesses converge on a clash */}
        <text x={15} y={26} fontSize={11} letterSpacing={2} fill={FK.SUB} fontFamily="var(--font-mono)">NO TUNE CALLED</text>
        <FNode x={15} y={104} w={145} h={56} label="No tune called" sub="nobody states the key" stroke={FK.AMBER} />
        <path id="sf-la" d="M 160 132 C 180 132, 180 42, 200 42" fill="none" stroke={FK.AMBER} strokeWidth={1.5} markerEnd="url(#sf-arrow)" />
        <path id="sf-lb" d="M 160 132 C 180 132, 180 210, 200 210" fill="none" stroke={FK.AMBER} strokeWidth={1.5} markerEnd="url(#sf-arrow)" />
        <FNode x={200} y={20} w={155} h={44} label="Player one" sub="picks a key" stroke={FK.AMBER} />
        <FNode x={200} y={188} w={155} h={44} label="Player two" sub="picks different changes" stroke={FK.AMBER} />
        <path id="sf-lc" d="M 355 42 C 372 42, 372 132, 385 132" fill="none" stroke={FK.AMBER} strokeWidth={1.5} markerEnd="url(#sf-arrow)" />
        <path id="sf-ld" d="M 355 210 C 372 210, 372 132, 385 132" fill="none" stroke={FK.AMBER} strokeWidth={1.5} markerEnd="url(#sf-arrow)" />
        <FNode x={385} y={104} w={145} h={56} label="Clash" sub="wrong notes, stalled tune" stroke={FK.AMBER} />

        <line x1={530} y1={10} x2={530} y2={270} stroke={FK.NODE_STROKE} strokeWidth={1.2} strokeDasharray="4 5" />

        {/* right half: tune called first, independent play converges on music */}
        <text x={560} y={26} fontSize={11} letterSpacing={2} fill={FK.SUB} fontFamily="var(--font-mono)">TUNE CALLED FIRST</text>
        <FNode x={560} y={104} w={145} h={56} label="Tune called first" sub="key + changes, once" stroke={FK.FLASH} />
        <path id="sf-ra" d="M 705 132 C 725 132, 725 42, 745 42" fill="none" stroke={FK.FLASH} strokeWidth={1.5} markerEnd="url(#sf-arrow)" />
        <path id="sf-rb" d="M 705 132 C 725 132, 725 210, 745 210" fill="none" stroke={FK.FLASH} strokeWidth={1.5} markerEnd="url(#sf-arrow)" />
        <FNode x={745} y={20} w={155} h={44} label="Player one" sub="plays the form" stroke={FK.FLASH} />
        <FNode x={745} y={188} w={155} h={44} label="Player two" sub="plays the form" stroke={FK.FLASH} />
        <path id="sf-rc" d="M 900 42 C 917 42, 917 132, 930 132" fill="none" stroke={FK.FLASH} strokeWidth={1.5} markerEnd="url(#sf-arrow)" />
        <path id="sf-rd" d="M 900 210 C 917 210, 917 132, 930 132" fill="none" stroke={FK.FLASH} strokeWidth={1.5} markerEnd="url(#sf-arrow)" />
        <FNode x={930} y={104} w={95} h={56} label="Music" sub="lands together" stroke={FK.FLASH} />

        <Dot path="sf-la" dur={1.5} begin={0.2} color={FK.AMBER} />
        <Dot path="sf-lb" dur={1.5} begin={0.5} color={FK.AMBER} />
        <Dot path="sf-lc" dur={1.3} begin={1.4} color={FK.AMBER} />
        <Dot path="sf-ld" dur={1.3} begin={1.7} color={FK.AMBER} />
        <Dot path="sf-ra" dur={1.5} begin={0.2} />
        <Dot path="sf-rb" dur={1.5} begin={0.5} />
        <Dot path="sf-rc" dur={1.3} begin={1.4} />
        <Dot path="sf-rd" dur={1.3} begin={1.7} />
      </svg>
    </FlowPanel>
  )
}

/** Two "considerable" days can carry the same headline number and very
 *  different certainty underneath, depending on which avalanche problem
 *  produced it. The fork is the whole lesson: read past the digit. */
export function AvalancheConfidenceFork() {
  const ref = useRef<SVGSVGElement>(null)
  useFlowPause(ref)
  return (
    <FlowPanel
      caption="Two mornings can both show danger level 3, considerable, and mean very different things. A wind slab is visible and testable, so the forecaster's confidence is high. A deep persistent slab hides for weeks and resists direct testing, so the same headline number carries far less certainty. The digit alone never tells you which one you're reading."
      minWidth={780}
    >
      <svg ref={ref} viewBox="0 0 940 340" role="img" aria-label="Today's bulletin shows danger level 3, considerable. That single number forks depending on which avalanche problem produced it: a wind slab problem, which is observable and testable, carries high confidence; a deep persistent slab, which hides for weeks and resists direct testing, carries low confidence despite showing the same headline number." style={{ width: '100%', height: 'auto', display: 'block' }}>
        <ArrowDefs id="ac-arrow" />

        <path id="ac-e1" d="M 155 139 L 183 139" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#ac-arrow)" />
        <FNode x={15} y={112} w={140} h={54} label="Today's bulletin" />
        <FNode x={185} y={112} w={230} h={54} label="Danger: 3, considerable" sub="the headline number" />
        <EdgeLabel x={169} y={118} text="reads" />

        {/* upper branch: wind slab, observable, high confidence */}
        <path id="ac-fa" d="M 415 139 C 430 100, 420 70, 445 54" fill="none" stroke={FK.FLASH} strokeWidth={1.5} markerEnd="url(#ac-arrow)" />
        <path id="ac-e2" d="M 635 54 L 663 54" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#ac-arrow)" />
        <FNode x={445} y={30} w={190} h={48} label="Wind slab problem" sub="visible, testable" stroke={FK.FLASH} />
        <FNode x={665} y={30} w={180} h={48} label="High confidence" sub="forecaster can point to it" stroke={FK.FLASH} />
        <text x={428} y={88} fontSize={9.5} letterSpacing={0.8} fill={FK.FLASH} fontFamily="var(--font-mono)" textAnchor="start">OBSERVABLE</text>

        {/* lower branch: deep persistent slab, hidden, low confidence */}
        <path id="ac-fb" d="M 415 139 C 430 180, 420 210, 445 252" fill="none" stroke={FK.AMBER} strokeWidth={1.5} markerEnd="url(#ac-arrow)" />
        <path id="ac-e3" d="M 635 252 L 663 252" fill="none" stroke={FK.EDGE} strokeWidth={1.5} markerEnd="url(#ac-arrow)" />
        <FNode x={445} y={228} w={190} h={48} label="Deep persistent slab" sub="hidden weak layer" stroke={FK.AMBER} />
        <FNode x={665} y={228} w={180} h={48} label="Low confidence" sub="hides for weeks" stroke={FK.AMBER} />
        <text x={428} y={198} fontSize={9.5} letterSpacing={0.8} fill={FK.AMBER} fontFamily="var(--font-mono)" textAnchor="start">HARD TO TEST</text>
        {drop(755, 276, 300)}
        {amberTag(755, 304, 'same number, less sure')}

        <Dot path="ac-e1" dur={1.4} begin={0} />
        <Dot path="ac-fa" dur={1.8} begin={0.8} />
        <Dot path="ac-e2" dur={1.2} begin={2} />
        <Dot path="ac-fb" dur={1.8} begin={0.8} color={FK.AMBER} />
        <Dot path="ac-e3" dur={1.2} begin={2} color={FK.AMBER} />
      </svg>
    </FlowPanel>
  )
}
