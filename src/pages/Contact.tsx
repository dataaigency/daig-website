import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <div className="container" style={{ padding: '56px 24px' }}>
      <h1>{t('contact.title')}</h1>
    </div>
  )
}
