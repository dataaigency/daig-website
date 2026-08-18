import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { getPosts } from '../lib/posts'

export default function Work() {
  const { t } = useTranslation()
  const posts = getPosts()
  return (
    <section className="container" style={{ padding: '64px 24px' }}>
      <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)' }}>{t('work.title')}</h1>
      {posts.length === 0 && <p style={{ marginTop: 20 }}>{t('work.empty')}</p>}
      <div style={{ marginTop: 28, display: 'grid', gap: 16 }}>
        {posts.map((p) => (
          <article key={p.slug} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 10, padding: 24 }}>
            <p className="eyebrow">{p.date}</p>
            <h2 style={{ fontSize: 20, margin: '8px 0' }}><Link to={`/work/${p.slug}`}>{p.title}</Link></h2>
            <p style={{ color: 'var(--ink-soft)', margin: 0 }}>{p.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
