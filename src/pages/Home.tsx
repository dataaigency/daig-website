import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import StripeBand from '../components/StripeBand'
import { IconLayers, IconPipeline, IconChart, IconShield } from '../components/icons'
import { LINKS } from '../links'
import './home.css'

type DictEntry = { word: string; pos: string; def: string }
type ServiceItem = { title: string; desc: string }
const dictColors = ['var(--violet)', 'var(--coral)', 'var(--flash)']
const icons = [IconLayers, IconPipeline, IconChart, IconShield]

export default function Home() {
  const { t } = useTranslation()
  const entries = t('dictionary.entries', { returnObjects: true }) as DictEntry[]
  const services = t('services.items', { returnObjects: true }) as ServiceItem[]
  const [heroA, heroB] = t('hero.title').split('agency')
  return (
    <>
      <section className="hero container">
        <p className="eyebrow">{t('hero.eyebrow')}</p>
        <h1>{heroA}<span className="hero__underline">agency</span>{heroB}</h1>
        <p className="hero__sub">{t('hero.sub')}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href={LINKS.booking}>{t('hero.cta')}</a>
          <Link className="btn btn--secondary" to="/about">{t('hero.secondary')}</Link>
        </div>
      </section>
      <StripeBand variant="loud" />
      <section className="dict">
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 24 }}>{t('dictionary.label')}</p>
          {entries.map((e, i) => (
            <div className="dict__entry" key={i}>
              <span className="dict__num" style={{ color: dictColors[i] }}>{i + 1}</span>
              <div>
                <span className="dict__word">{e.word}</span>
                <span className="dict__pos">{e.pos}</span>
                <p className="dict__def">{e.def}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="svc container">
        <p className="eyebrow">{t('services.label')}</p>
        <h2 style={{ fontSize: 30, marginTop: 8 }}>{t('services.title')}</h2>
        <div className="svc__grid">
          {services.map((s, i) => {
            const Icon = icons[i]
            return (
              <div className="svc__card" key={s.title}>
                <Icon />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            )
          })}
        </div>
        <p style={{ marginTop: 20 }}><Link to="/services">{t('services.cta')} →</Link></p>
      </section>
      <section className="process">
        <div className="container">
          <p className="eyebrow" style={{ color: '#7A6BB8' }}>{t('process.label')}</p>
          <h2>{t('process.title')}</h2>
          <div className="process__row">
            <a className="btn btn--primary" style={{ background: 'var(--ink)' }} href={LINKS.booking}>{t('process.cta')}</a>
            <span className="process__note">{t('process.note')}</span>
          </div>
        </div>
      </section>
    </>
  )
}
