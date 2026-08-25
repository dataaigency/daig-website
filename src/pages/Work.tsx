import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import Reveal from '../components/Reveal'
import ClientMarquee from '../components/ClientMarquee'
import WorkFlow from '../components/flows/WorkFlow'
import { getPosts, formatPostDate } from '../lib/posts'
import './work.css'

export default function Work() {
  const { t } = useTranslation()
  const posts = getPosts()
  return (
    <section className="work">
      <div className="container">
        <p className="eyebrow">{t('work.label')}</p>
        <h1 className="work__title">{t('work.title')}</h1>
      </div>
      <Reveal>
        <ClientMarquee />
      </Reveal>
      <div className="container">
        <Reveal>
          <WorkFlow />
        </Reveal>
        {posts.length === 0 && <p className="work__empty">{t('work.empty')}</p>}
        <div className="work__list">
          {posts.map((p) => (
            <article className="wcard" key={p.slug}>
              <p className="wmeta">
                <time dateTime={p.date}>{formatPostDate(p.date)}</time>
                <span className="wmeta__sep" aria-hidden="true" />
                <span>{t('work.minRead', { count: p.minutes })}</span>
              </p>
              <h2 className="wcard__title">
                <Link className="wcard__link" to={`/work/${p.slug}`}>{p.title}</Link>
              </h2>
              <p className="wcard__sum">{p.summary}</p>
              {p.tags.length > 0 && (
                <ul className="wtags" aria-label={t('work.tags')}>
                  {p.tags.map((tag) => <li className="wtag" key={tag}>{tag}</li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
