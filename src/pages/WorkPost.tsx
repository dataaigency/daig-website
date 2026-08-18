import { useParams, Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { getPosts } from '../lib/posts'

export default function WorkPost() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const post = getPosts().find((p) => p.slug === slug)
  if (!post) return <section className="container" style={{ padding: '64px 24px' }}><p>{t('work.notFoundPost')} <Link to="/work">{t('work.backToWork')}</Link></p></section>
  const { Component } = post
  return (
    <article className="container" style={{ padding: '64px 24px', maxWidth: 720 }}>
      <p className="eyebrow">{post.date}</p>
      <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 40px)', margin: 0 }}>{post.title}</h1>
      <div style={{ marginTop: 24, color: 'var(--ink-soft)' }}><Component /></div>
    </article>
  )
}
