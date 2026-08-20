import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import Wordmark from './Wordmark'
import { LINKS } from '../links'

export default function Nav() {
  const { t } = useTranslation()
  return (
    <header className="container">
      <nav className="nav">
        <Link className="nav__brand" to="/" aria-label="data aigency home">
          <img src="/logo-mark.png" alt="" width={28} height={28} />
          <Wordmark size={14} />
        </Link>
        <div className="nav__links">
          <Link to="/services">{t('nav.services')}</Link>
          <Link to="/work">{t('nav.work')}</Link>
          <Link to="/about">{t('nav.about')}</Link>
          <Link to="/contact">{t('nav.contact')}</Link>
        </div>
        <a className="btn btn--primary nav__cta" href={LINKS.booking}>{t('nav.cta')}</a>
      </nav>
    </header>
  )
}
