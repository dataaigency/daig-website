import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <section className="container" style={{ padding: '64px 24px' }}>
      <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 40px)', margin: 0 }}>{t('notFound.title')}</h1>
      <p style={{ color: 'var(--ink-soft)', margin: '16px 0 24px' }}>{t('notFound.body')}</p>
      <Link to="/">{t('notFound.back')}</Link>
    </section>
  )
}
