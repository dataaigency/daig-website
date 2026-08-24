import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import AboutFlow from '../components/flows/AboutFlow'
import { LINKS } from '../links'
import './about.css'

type DictEntry = { word: string; pos: string; def: string }

export default function About() {
  const { t } = useTranslation()
  const entries = t('dictionary.entries', { returnObjects: true }) as DictEntry[]
  return (
    <section className="container" style={{ padding: '64px 24px' }}>
      <div style={{ maxWidth: 680 }}>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)' }}>{t('about.title')}</h1>
        <p style={{ marginTop: 20, color: 'var(--graphite)' }}>{t('about.body1')}</p>
        <p style={{ color: 'var(--graphite)' }}>{t('about.body2')}</p>
      </div>
      <Reveal>
        <AboutFlow />
      </Reveal>
      <Reveal>
        <div className="dict">
          <p className="eyebrow">{t('dictionary.label')}</p>
          <div className="dict__grid">
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
        </div>
      </Reveal>
      <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
        <a className="btn btn--flash" href={LINKS.booking} target="_blank" rel="noopener noreferrer">{t('hero.cta')}</a>
        <span style={{ fontSize: 14, color: 'var(--graphite)' }}>{t('about.ctaLine')}</span>
      </div>
      <p style={{ marginTop: 22 }}><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">{t('about.linkLabel')} →</a></p>
    </section>
  )
}
