import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import StripeBand from '../components/StripeBand'
import ClientMarquee from '../components/ClientMarquee'
import Reveal from '../components/Reveal'
import FlowDiagram from '../components/FlowDiagram'
import Handover from '../components/Handover'
import ProblemChain from '../components/flows/ProblemChain'
import { SERVICE_PAGES } from './ServiceDetail'
import { IconLayers, IconPipeline, IconChart, IconShield } from '../components/icons'
import { LINKS } from '../links'
import './home.css'

type ServiceItem = { title: string; desc: string }
const icons = [IconLayers, IconPipeline, IconChart, IconShield]

export default function Home() {
  const { t } = useTranslation()
  const services = t('services.items', { returnObjects: true }) as ServiceItem[]
  return (
    <>
      <section className="hero dark">
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <h1>{t('hero.title')}</h1>
            <p className="hero__sub">{t('hero.sub')}</p>
            <div className="hero__actions">
              <a className="btn btn--flash" href={LINKS.booking} target="_blank" rel="noopener noreferrer">{t('hero.cta')}</a>
              <Link className="hero__secondary" to="/about">{t('hero.secondary')}</Link>
            </div>
            <p className="hero__note">{t('hero.note')}</p>
          </div>
          <img className="hero__logo" src="/logo-white.png" alt="" width={300} height={300} />
        </div>
      </section>
      <StripeBand variant="cut-exit" />

      <section className="prob container">
        <Reveal>
          <p className="eyebrow">{t('problems.label')}</p>
          <h2 style={{ fontSize: 30, marginTop: 12, maxWidth: 640 }}>{t('problems.title')}</h2>
          <p className="prob__intro">{t('problems.intro')}</p>
        </Reveal>
        <Reveal delay={120}>
          <ProblemChain />
        </Reveal>
      </section>

      <StripeBand variant="cut" />
      <section className="flowsec dark">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{t('flow.label')}</p>
            <h2 style={{ fontSize: 30, marginTop: 12 }}>{t('flow.title')}</h2>
            <p className="flowsec__sub">{t('flow.sub')}</p>
          </Reveal>
          <Reveal delay={150}>
            <FlowDiagram />
          </Reveal>
        </div>
      </section>
      <StripeBand variant="cut-exit" />

      <section className="svc container">
        <Reveal>
          <div className="svc__head">
            <img className="svc__logo" src="/logo-full.png" alt="Data Aigency logo" />
            <div>
              <p className="eyebrow">{t('services.label')}</p>
              <h2 style={{ fontSize: 30, marginTop: 8 }}>{t('services.title')}</h2>
              <p style={{ marginTop: 10, maxWidth: 560, color: 'var(--graphite)', fontSize: 14.5 }}>{t('services.sub')}</p>
            </div>
          </div>
        </Reveal>
        <div className="svc__grid">
          {services.map((s, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={s.title} delay={i * 90}>
                <Link className="svc__card svc__card--link" to={`/services/${SERVICE_PAGES[i].slug}`}>
                  <div className="svc__index">0{i + 1}</div>
                  <Icon />
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="svc__more">{t('services.more')} →</span>
                </Link>
              </Reveal>
            )
          })}
        </div>
        <p style={{ marginTop: 20 }}><Link to="/services">{t('services.cta')} →</Link></p>
      </section>

      <StripeBand variant="cut" />
      <Handover />
      <StripeBand variant="cut-exit" />

      <Reveal>
        <ClientMarquee />
      </Reveal>
      <StripeBand variant="stripes" />

      <section className="process container">
        <Reveal>
          <p className="eyebrow">{t('process.label')}</p>
          <h2>{t('process.title')}</h2>
          <div className="process__row">
            <a className="btn btn--primary" href={LINKS.booking} target="_blank" rel="noopener noreferrer">{t('process.cta')}</a>
            <span className="process__note">{t('process.note')}</span>
          </div>
        </Reveal>
      </section>
    </>
  )
}
