import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'

const skel = (w: string, light = false) => (
  <div aria-hidden="true" style={{ height: 6, width: w, borderRadius: 3, background: light ? '#24356E' : '#E2E0D8', margin: '7px 0' }} />
)

const mark = (ok: boolean) => (
  <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true" style={{ flexShrink: 0 }}>
    {ok ? (
      <path d="M2 6.5 L4.8 9.2 L10 3" fill="none" stroke="#03F856" strokeWidth="2" strokeLinecap="square" />
    ) : (
      <g stroke="#E8B437" strokeWidth="2" strokeLinecap="square">
        <path d="M2.5 2.5 L9.5 9.5" />
        <path d="M9.5 2.5 L2.5 9.5" />
      </g>
    )}
  </svg>
)

/** "What you keep." — three sample deliverables, drawn, all labeled as samples. */
export default function Handover() {
  const { t } = useTranslation()
  const tests = t('handover.tests', { returnObjects: true }) as string[]
  const tree = t('handover.tree', { returnObjects: true }) as string[]
  return (
    <section className="hand dark">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{t('handover.label')}</p>
          <h2 style={{ fontSize: 30, marginTop: 12 }}>{t('handover.title')}</h2>
          <p className="hand__sub">{t('handover.sub')}</p>
        </Reveal>
        <div className="hand__grid">
          <Reveal delay={0}>
            <div>
              <p className="hand__tag">{t('handover.tag1')}</p>
              <div className="hand__card">
                <p className="hand__doctitle">{t('handover.doc1Title')}</p>
                {skel('86%')}
                {skel('70%')}
                <svg width="150" height="34" viewBox="0 0 150 34" aria-hidden="true" style={{ margin: '10px 0' }}>
                  <rect x="0" y="8" width="38" height="18" rx="3" fill="none" stroke="#C9884A" strokeWidth="1.5" />
                  <path d="M42 17 L52 17" stroke="#3E4552" strokeWidth="1.5" />
                  <rect x="54" y="8" width="38" height="18" rx="3" fill="none" stroke="#AFB9C8" strokeWidth="1.5" />
                  <path d="M96 17 L106 17" stroke="#3E4552" strokeWidth="1.5" />
                  <rect x="108" y="8" width="38" height="18" rx="3" fill="none" stroke="#E8B437" strokeWidth="1.5" />
                </svg>
                {skel('92%')}
                {skel('64%')}
                {skel('78%')}
              </div>
              <p className="hand__cap">{t('handover.cap1')}</p>
            </div>
          </Reveal>
          <Reveal delay={110}>
            <div>
              <p className="hand__tag">{t('handover.tag2')}</p>
              <div className="hand__card hand__card--term">
                {tests.map((name) => (
                  <div className="hand__test" key={name}>
                    {mark(true)}
                    <span className="hand__testname">{name}</span>
                    <span className="hand__pass">{t('handover.pass').toUpperCase()}</span>
                  </div>
                ))}
                <div className="hand__test">
                  {mark(false)}
                  <span className="hand__testname">{t('handover.failTest')}</span>
                  <span className="hand__failtag">{t('handover.fail').toUpperCase()}</span>
                </div>
                <div className="hand__alert">→ {t('handover.alert')}</div>
              </div>
              <p className="hand__cap">{t('handover.cap2')}</p>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div>
              <p className="hand__tag">{t('handover.tag3')}</p>
              <div className="hand__card">
                <p className="hand__doctitle">{t('handover.doc3Title')}</p>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span aria-hidden="true" style={{ width: 8, height: 8, border: '1.5px solid #061034', flexShrink: 0 }} />
                    {skel(['82%', '68%', '74%'][i])}
                  </div>
                ))}
                <div className="hand__tree">
                  {tree.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
              <p className="hand__cap">{t('handover.cap3')}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
