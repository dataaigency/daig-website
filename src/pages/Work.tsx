import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import Reveal from '../components/Reveal'
import ClientMarquee from '../components/ClientMarquee'
import WorkFlow from '../components/flows/WorkFlow'
import NotFound from './NotFound'
import { getPosts, formatPostDate, workPageCount, POSTS_PER_PAGE } from '../lib/posts'
import './work.css'

export default function Work() {
  const { t } = useTranslation()
  const { page: pageParam } = useParams()
  const posts = getPosts()
  const totalPages = workPageCount(posts.length)
  const page = pageParam === undefined ? 1 : Number(pageParam)
  // page 1 lives at /work itself, so /work/page/1 (and anything out of range) is a 404
  if (pageParam !== undefined && (!/^\d+$/.test(pageParam) || page < 2 || page > totalPages)) {
    return <NotFound />
  }
  const shown = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
  return (
    <section className="work">
      <div className="container">
        <p className="eyebrow">{t('work.label')}</p>
        <h1 className="work__title">{t('work.title')}</h1>
      </div>
      {page === 1 && (
        <Reveal>
          <ClientMarquee />
        </Reveal>
      )}
      <div className="container">
        {page === 1 && (
          <Reveal>
            <WorkFlow />
          </Reveal>
        )}
        {posts.length === 0 && <p className="work__empty">{t('work.empty')}</p>}
        <div className="work__list">
          {shown.map((p) => (
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
        {totalPages > 1 && (
          <nav className="wpage" aria-label={t('work.pageNav')}>
            {page > 1 ? (
              <Link className="wpage__link" to={page === 2 ? '/work' : `/work/page/${page - 1}`}>
                ← {t('work.newerPosts')}
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            <span className="wpage__info">{t('work.pageOf', { page, total: totalPages })}</span>
            {page < totalPages ? (
              <Link className="wpage__link" to={`/work/page/${page + 1}`}>
                {t('work.olderPosts')} →
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </nav>
        )}
      </div>
    </section>
  )
}
