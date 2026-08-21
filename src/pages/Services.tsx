import { useTranslation } from 'react-i18next'
import StripeBand from '../components/StripeBand'
import Reveal from '../components/Reveal'
import { LakehouseFlow, PipelinesFlow, AiDataFlow, GovernanceFlow } from '../components/flows/ServiceFlows'
import { IconLayers, IconPipeline, IconChart, IconShield } from '../components/icons'
import { LINKS } from '../links'

type ServiceItem = { title: string; desc: string; outcomes: string[] }
const icons = [IconLayers, IconPipeline, IconChart, IconShield]
const flows = [LakehouseFlow, PipelinesFlow, AiDataFlow, GovernanceFlow]

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true }) as ServiceItem[]
  return (
    <>
      <section className="container" style={{ padding: '64px 24px 48px' }}>
        <p className="eyebrow">{t('services.label')}</p>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)', marginTop: 8 }}>{t('services.title')}</h1>
        <p style={{ marginTop: 14, maxWidth: 620, color: 'var(--graphite)' }}>{t('services.sub')}</p>
      </section>
      <StripeBand variant="stripes" />
      <section className="container" style={{ padding: '48px 24px 64px' }}>
        <div className="services-grid">
          {items.map((s, i) => {
            const Icon = icons[i]
            const Flow = flows[i]
            return (
              <Reveal key={s.title} delay={(i % 2) * 100}>
                <article className="service-card">
                  <Icon />
                  <h2 style={{ fontSize: 22, margin: '12px 0 8px' }}>{s.title}</h2>
                  <p style={{ color: 'var(--graphite)', margin: 0 }}>{s.desc}</p>
                  <Flow />
                  <ul style={{ margin: '14px 0 0', paddingLeft: 20, color: 'var(--graphite)' }}>
                    {s.outcomes.map((o) => <li key={o}>{o}</li>)}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
        <p style={{ marginTop: 32 }}><a className="btn btn--primary" href={LINKS.booking} target="_blank" rel="noopener noreferrer">{t('hero.cta')}</a></p>
      </section>
    </>
  )
}
