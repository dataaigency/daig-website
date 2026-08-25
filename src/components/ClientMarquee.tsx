import { useTranslation } from 'react-i18next'
import './client-marquee.css'

type LogoSize = 'tall' | 'mid' | 'wide'
const LOGOS: { src: string; alt: string; size: LogoSize }[] = [
  { src: '/partners/bnp-paribas-fortis.png', alt: 'BNP Paribas Fortis', size: 'wide' },
  { src: '/partners/as-adventure.png', alt: 'A.S.Adventure', size: 'tall' },
  { src: '/partners/capturetech.png', alt: 'CaptureTech', size: 'wide' },
  { src: '/partners/ten-lives.png', alt: 'Ten Lives', size: 'mid' },
  { src: '/partners/bever.png', alt: 'Bever', size: 'wide' },
  { src: '/partners/ivy.png', alt: 'Ivy', size: 'mid' },
  { src: '/partners/duvel-moortgat.png', alt: 'Duvel Moortgat', size: 'wide' },
  { src: '/partners/cotswold-outdoor.png', alt: 'Cotswold Outdoor', size: 'mid' },
  { src: '/partners/storage24.png', alt: 'Storage 24', size: 'wide' },
  { src: '/partners/bodhiac.png', alt: 'Bodhiac', size: 'wide' },
]

export default function ClientMarquee() {
  const { t } = useTranslation()
  return (
    <section className="clients" aria-label={t('clients.label')}>
      <p className="eyebrow">{t('clients.label')}</p>
      <div className="clients__frame">
        <div className="clients__marquee">
          <div className="clients__track">
            {[0, 1].map((copy) => (
              <ul className="clients__set" key={copy} aria-hidden={copy === 1 || undefined}>
                {LOGOS.map((l) => (
                  <li key={l.src} className={`clients__item clients__item--${l.size}`}>
                    <img src={l.src} alt={copy === 0 ? l.alt : ''} loading="lazy" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
