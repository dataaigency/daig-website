import { renderToStaticMarkup } from 'react-dom/server'
import './i18n'
import FlowDiagram from './components/FlowDiagram'
import { LakehouseFlow, PipelinesFlow, AiDataFlow, GovernanceFlow } from './components/flows/ServiceFlows'
import AboutFlow from './components/flows/AboutFlow'
import WorkFlow from './components/flows/WorkFlow'
import ProblemChain from './components/flows/ProblemChain'
import { AuditStackMap, MedallionMistakesMap, SurfPipeline, WarehouseVsLakehouse, AiActTimeline, PowerBiLicensingCliff, RagPipeline } from './components/flows/blog/BlogFlows'

/** Server-render every flow diagram to markup so scripts/export-diagrams.mjs
 *  can extract standalone SVG files into assets/diagrams/. */
export function renderAll(): Record<string, string> {
  const items: Record<string, React.ReactElement> = {
    'medallion-flow': <FlowDiagram />,
    'problem-chain': <ProblemChain />,
    'service-lakehouse': <LakehouseFlow />,
    'service-dataops': <PipelinesFlow />,
    'service-mlops': <AiDataFlow />,
    'service-llmops': <GovernanceFlow />,
    'about-engagement': <AboutFlow />,
    'work-before-after': <WorkFlow />,
    'blogs/audit-stack-map': <AuditStackMap />,
    'blogs/medallion-five-mistakes': <MedallionMistakesMap />,
    'blogs/surf-pipeline': <SurfPipeline />,
    'blogs/warehouse-vs-lakehouse': <WarehouseVsLakehouse />,
    'blogs/ai-act-timeline': <AiActTimeline />,
    'blogs/power-bi-licensing-cliff': <PowerBiLicensingCliff />,
    'blogs/rag-pipeline': <RagPipeline />,
  }
  return Object.fromEntries(Object.entries(items).map(([name, el]) => [name, renderToStaticMarkup(el)]))
}
