import { useTranslation } from 'react-i18next'
import StripeBand from '../components/StripeBand'
import { IconLayers, IconPipeline, IconChart, IconShield } from '../components/icons'
import { LINKS } from '../links'

type ServiceItem = { title: string; desc: string; outcomes: string[] }
const icons = [IconLayers, IconPipeline, IconChart, IconShield]

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true }) as ServiceItem[]
  return (
    <>
      <section className="container" style={{ padding: '64px 24px 48px' }}>
        <p className="eyebrow">{t('services.label')}</p>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)', marginTop: 8 }}>{t('services.title')}</h1>
      </section>
      <StripeBand variant="stripes" />
      <section className="container" style={{ padding: '48px 24px 64px', display: 'grid', gap: 24 }}>
        {items.map((s, i) => {
          const Icon = icons[i]
          return (
            <article key={s.title} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 10, padding: 28 }}>
              <Icon />
              <h2 style={{ fontSize: 22, margin: '12px 0 8px' }}>{s.title}</h2>
              <p style={{ color: 'var(--ink-soft)', maxWidth: 640 }}>{s.desc}</p>
              <ul style={{ margin: '14px 0 0', paddingLeft: 20, color: 'var(--ink-soft)' }}>
                {s.outcomes.map((o) => <li key={o}>{o}</li>)}
              </ul>
            </article>
          )
        })}
        <p><a className="btn btn--primary" href={LINKS.booking}>{t('hero.cta')}</a></p>
      </section>
    </>
  )
}
