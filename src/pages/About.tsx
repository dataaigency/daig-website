import { useTranslation } from 'react-i18next'
import { LINKS } from '../links'

export default function About() {
  const { t } = useTranslation()
  return (
    <section className="container" style={{ padding: '64px 24px', maxWidth: 720 }}>
      <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)' }}>{t('about.title')}</h1>
      <p style={{ marginTop: 20, color: 'var(--ink-soft)' }}>{t('about.body1')}</p>
      <p style={{ color: 'var(--ink-soft)' }}>{t('about.body2')}</p>
      <p style={{ marginTop: 18 }}><a href={LINKS.linkedin}>{t('about.linkLabel')} →</a></p>
    </section>
  )
}
