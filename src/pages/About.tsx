import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import AboutFlow from '../components/flows/AboutFlow'
import { LINKS } from '../links'

export default function About() {
  const { t } = useTranslation()
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
      <p style={{ marginTop: 22 }}><a href={LINKS.linkedin}>{t('about.linkLabel')} →</a></p>
    </section>
  )
}
