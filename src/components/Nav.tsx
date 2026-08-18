import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import Wordmark from './Wordmark'
import { LINKS } from '../links'

export default function Nav() {
  const { t } = useTranslation()
  return (
    <header className="container">
      <nav className="nav">
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 9 }} aria-label="data aigency home">
          <img src="/logo-mark.png" alt="" style={{ width: 27, height: 27 }} />
          <Wordmark size={17} />
        </Link>
        <div className="nav__links">
          <Link to="/services">{t('nav.services')}</Link>
          <Link to="/work">{t('nav.work')}</Link>
          <Link to="/about">{t('nav.about')}</Link>
          <Link to="/contact">{t('nav.contact')}</Link>
          <a className="btn btn--primary" style={{ padding: '11px 18px', fontSize: 13 }} href={LINKS.booking}>{t('nav.cta')}</a>
        </div>
      </nav>
    </header>
  )
}
