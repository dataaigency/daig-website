import type { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import StripeBand from '../components/StripeBand'
import Reveal from '../components/Reveal'
import { LakehouseFlow, PipelinesFlow, AiDataFlow, GovernanceFlow } from '../components/flows/ServiceFlows'
import { getPosts } from '../lib/posts'
import { LINKS } from '../links'

export type ServicePage = {
  /** URL segment under /services/, locked: other work depends on these. */
  slug: string
  /** Key under `servicePages` in common.json. */
  ns: string
  Flow: ComponentType
  /** Post slugs shown under "Related reading", in display order. */
  related: string[]
}

/** One entry per service, same order as `services.items` on the overview page. */
export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'lakehouse-architecture',
    ns: 'lakehouse',
    Flow: LakehouseFlow,
    related: ['2026-08-medallion-mistakes', '2026-08-surf-forecast-lakehouse', '2026-08-what-an-audit-finds'],
  },
  {
    slug: 'automation-dataops',
    ns: 'dataops',
    Flow: PipelinesFlow,
    related: ['2026-08-medallion-mistakes', '2026-08-what-an-audit-finds'],
  },
  {
    slug: 'ai-ready-data-mlops',
    ns: 'mlops',
    Flow: AiDataFlow,
    related: ['2026-08-surf-forecast-lakehouse', '2026-08-what-an-audit-finds'],
  },
  {
    slug: 'ai-governance-llmops',
    ns: 'llmops',
    Flow: GovernanceFlow,
    related: ['2026-08-what-an-audit-finds'],
  },
]

const h2Style = { fontSize: 24, margin: '40px 0 12px' } as const
const pStyle = { color: 'var(--graphite)', margin: '0 0 16px' } as const

export default function ServiceDetail({ page }: { page: ServicePage }) {
  const { t } = useTranslation()
  const { ns, Flow } = page
  const built = t(`servicePages.${ns}.built`, { returnObjects: true }) as string[]
  const posts = getPosts()
  const related = page.related
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter((p) => p !== undefined)

  return (
    <>
      <section className="container" style={{ padding: '64px 24px 48px' }}>
        <p className="eyebrow">{t('servicePages.eyebrow')}</p>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)', marginTop: 8 }}>{t(`servicePages.${ns}.title`)}</h1>
        <p style={{ marginTop: 14, maxWidth: 680, color: 'var(--graphite)' }}>{t(`servicePages.${ns}.lede`)}</p>
      </section>
      <StripeBand variant="stripes" />
      <section className="container" style={{ padding: '48px 24px 64px' }}>
        <div style={{ maxWidth: 720 }}>
          <Reveal>
            <Flow />
          </Reveal>
          <Reveal delay={100}>
            <h2 style={h2Style}>{t('servicePages.builtTitle')}</h2>
            {built.map((paragraph) => (
              <p key={paragraph} style={pStyle}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal>
            <h2 style={h2Style}>{t('servicePages.teamTitle')}</h2>
            <p style={pStyle}>{t(`servicePages.${ns}.team`)}</p>
          </Reveal>
          <Reveal>
            <h2 style={h2Style}>{t('servicePages.relatedTitle')}</h2>
            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--graphite)' }}>
              {related.map((post) => (
                <li key={post.slug} style={{ margin: '8px 0' }}>
                  <Link to={`/work/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <p style={{ marginTop: 36 }}>
            <a className="btn btn--primary" href={LINKS.booking} target="_blank" rel="noopener noreferrer">{t('hero.cta')}</a>
          </p>
        </div>
      </section>
    </>
  )
}
