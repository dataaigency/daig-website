import { useTranslation } from 'react-i18next'
import Wordmark from './Wordmark'
import StripeBand from './StripeBand'
import { LINKS } from '../links'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer>
      <StripeBand variant="loud" />
      <div className="footer">
        <div className="footer__inner container">
          <Wordmark size={14} inverse />
          <div className="footer__meta">
            <span>{t('footer.tagline')}</span>
            <a href={LINKS.linkedin}>LinkedIn</a>
            <a href={LINKS.github}>GitHub</a>
            <span>{t('footer.languages')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
