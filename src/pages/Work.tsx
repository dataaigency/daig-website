import { useTranslation } from 'react-i18next'

export default function Work() {
  const { t } = useTranslation()
  return (
    <div className="container" style={{ padding: '56px 24px' }}>
      <h1>{t('work.title')}</h1>
    </div>
  )
}
