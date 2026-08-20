import { useTranslation } from 'react-i18next'
import { LINKS } from '../links'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <section className="container" style={{ padding: '64px 24px' }}>
      <div style={{ maxWidth: 680 }}>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)' }}>{t('contact.title')}</h1>
        <p style={{ marginTop: 20, color: 'var(--graphite)' }}>{t('contact.sub')}</p>
        <p style={{ marginTop: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a className="btn btn--primary" href={LINKS.booking}>{t('contact.book')}</a>
          <a className="btn btn--secondary" href={LINKS.linkedin}>{t('contact.linkedin')}</a>
          <a className="btn btn--secondary" href={LINKS.email}>{t('contact.email')}</a>
          <a className="btn btn--secondary" href={LINKS.github}>{t('contact.github')}</a>
        </p>
        <p style={{ marginTop: 18, fontSize: 14, color: 'var(--graphite)' }}>
          {t('contact.emailNote')} <a href={LINKS.email}>vadim@dataaigency.com</a>
        </p>
      </div>
    </section>
  )
}
