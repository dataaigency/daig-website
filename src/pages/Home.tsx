import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import StripeBand from '../components/StripeBand'
import { IconLayers, IconPipeline, IconChart, IconShield } from '../components/icons'
import { LINKS } from '../links'
import './home.css'

type DictEntry = { word: string; pos: string; def: string }
type ServiceItem = { title: string; desc: string }
type ProblemItem = { stat: string; text: string }
const icons = [IconLayers, IconPipeline, IconChart, IconShield]

export default function Home() {
  const { t } = useTranslation()
  const entries = t('dictionary.entries', { returnObjects: true }) as DictEntry[]
  const services = t('services.items', { returnObjects: true }) as ServiceItem[]
  const problems = t('problems.items', { returnObjects: true }) as ProblemItem[]
  return (
    <>
      <section className="hero dark">
        <div className="hero__field" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <h1>{t('hero.title')}</h1>
            <p className="hero__sub">{t('hero.sub')}</p>
            <div className="hero__actions">
              <a className="btn btn--flash" href={LINKS.booking}>{t('hero.cta')}</a>
              <Link className="hero__secondary" to="/about">{t('hero.secondary')}</Link>
            </div>
          </div>
        </div>
      </section>
      <StripeBand variant="cut-exit" />
      <section className="prob container">
        <p className="eyebrow">{t('problems.label')}</p>
        <h2 style={{ fontSize: 30, marginTop: 12 }}>{t('problems.title')}</h2>
        <div className="prob__grid">
          {problems.map((p) => (
            <div className="prob__card" key={p.stat}>
              <div className="prob__stat">{p.stat}</div>
              <p className="prob__text">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
      <StripeBand variant="stripes" />
      <section className="dict">
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 24 }}>{t('dictionary.label')}</p>
          {entries.map((e, i) => (
            <div className="dict__entry" key={i}>
              <span className="dict__num">0{i + 1}</span>
              <div>
                <span className="dict__word">{e.word}</span>
                <span className="dict__pos">{e.pos}</span>
                <p className="dict__def">{e.def}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <StripeBand variant="cut-flash" />
      <section className="svc container">
        <div className="svc__head">
          <img className="svc__logo" src="/logo-full.png" alt="data aigency logo" />
          <div>
            <p className="eyebrow">{t('services.label')}</p>
            <h2 style={{ fontSize: 30, marginTop: 8 }}>{t('services.title')}</h2>
          </div>
        </div>
        <div className="svc__grid">
          {services.map((s, i) => {
            const Icon = icons[i]
            return (
              <div className="svc__card" key={s.title}>
                <div className="svc__index">0{i + 1}</div>
                <Icon />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            )
          })}
        </div>
        <p style={{ marginTop: 20 }}><Link to="/services">{t('services.cta')} →</Link></p>
      </section>
      <section className="process container">
        <p className="eyebrow">{t('process.label')}</p>
        <h2>{t('process.title')}</h2>
        <div className="process__row">
          <a className="btn btn--primary" href={LINKS.booking}>{t('process.cta')}</a>
          <span className="process__note">{t('process.note')}</span>
        </div>
      </section>
    </>
  )
}
