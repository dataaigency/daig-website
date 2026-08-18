import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  return (
    <div className="container" style={{ padding: '56px 24px' }}>
      <h1>{t('hero.title')}</h1>
    </div>
  )
}
