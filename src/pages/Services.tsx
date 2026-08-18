import { useTranslation } from 'react-i18next'

export default function Services() {
  const { t } = useTranslation()
  return (
    <div className="container" style={{ padding: '56px 24px' }}>
      <h1>{t('services.title')}</h1>
    </div>
  )
}
