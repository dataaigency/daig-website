import { useParams, Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import type { AnchorHTMLAttributes } from 'react'
import { getPosts, formatPostDate } from '../lib/posts'
import { LINKS } from '../links'
import './work.css'

/** Links inside MDX posts: external ones leave in a new tab, relative ones stay. */
function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = /^https?:\/\//.test(props.href ?? '')
  return <a {...props} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} />
}

export default function WorkPost() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const posts = getPosts()
  const idx = posts.findIndex((p) => p.slug === slug)
  const post = idx >= 0 ? posts[idx] : undefined
  const newer = idx > 0 ? posts[idx - 1] : undefined
  const older = idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : undefined

  if (!post) {
    return (
      <section className="post">
        <div className="post__inner">
          <p>{t('work.notFoundPost')} <Link to="/work">{t('work.backToWork')}</Link></p>
        </div>
      </section>
    )
  }

  const { Component } = post
  return (
    <article className="post">
      <div className="post__inner">
        <Link className="post__back" to="/work">{t('work.backToWork')}</Link>
        {post.tags.length > 0 && (
          <ul className="wtags post__tags" aria-label={t('work.tags')}>
            {post.tags.map((tag) => <li className="wtag" key={tag}>{tag}</li>)}
          </ul>
        )}
        <p className="wmeta post__meta">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span className="wmeta__sep" aria-hidden="true" />
          <span>{t('work.minRead', { count: post.minutes })}</span>
        </p>
        <h1 className="post__title">{post.title}</h1>
        <p className="post__lede">{post.summary}</p>
        <div className="post__seam" aria-hidden="true" />
        <div className="prose">
          <Component components={{ a: MdxLink }} />
        </div>
        <aside className="post-cta">
          <p className="post-cta__line">{t('work.ctaLine')}</p>
          <a className="btn btn--flash" href={LINKS.booking} target="_blank" rel="noopener noreferrer">{t('hero.cta')}</a>
        </aside>
        <nav className="post-nav" aria-label={t('work.label')}>
          {older ? (
            <Link className="post-nav__item" to={`/work/${older.slug}`}>
              <span className="post-nav__dir">← {t('work.olderPost')}</span>
              <span className="post-nav__title">{older.title}</span>
            </Link>
          ) : <span />}
          <button className="post-nav__top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {t('work.backToTop')} ↑
          </button>
          {newer ? (
            <Link className="post-nav__item post-nav__item--right" to={`/work/${newer.slug}`}>
              <span className="post-nav__dir">{t('work.newerPost')} →</span>
              <span className="post-nav__title">{newer.title}</span>
            </Link>
          ) : <span />}
        </nav>
      </div>
    </article>
  )
}
