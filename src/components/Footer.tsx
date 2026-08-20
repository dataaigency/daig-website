import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import Wordmark from './Wordmark'
import StripeBand from './StripeBand'
import { LINKS } from '../links'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer>
      <StripeBand variant="cut" />
      <div className="footer">
        <div className="footer__inner container">
          <Wordmark size={13} inverse />
          <div className="footer__meta">
            <span>{t('footer.tagline')}</span>
            <Link to="/contact">{t('nav.contact')}</Link>
            <a href={LINKS.linkedin}>LinkedIn</a>
            <a href={LINKS.github}>GitHub</a>
            <a href={LINKS.email}>vadim@dataaigency.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
