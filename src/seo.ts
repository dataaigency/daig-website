import { getPosts } from './lib/posts'

export const SITE_URL = 'https://dataaigency.com'

export const BRAND = 'data aigency'

export type Meta = { title: string; description: string }

const FALLBACK: Meta = {
  title: BRAND,
  description:
    'Data and AI architecture consulting: lakehouses, dbt pipelines and governed AI adoption for small and mid-sized teams.',
}

const META: Record<string, Meta> = {
  '/': {
    title: 'data aigency | Data architecture, lakehouses and governed AI',
    description:
      'Independent data architecture consulting: lakehouses, dbt pipelines and AI-ready foundations. Built properly, secured from day one, handed over completely.',
  },
  '/services': {
    title: 'Lakehouse, DataOps, MLOps and LLMOps consulting | data aigency',
    description:
      'Lakehouse architecture on Microsoft Fabric or BigQuery, automation and DataOps with dbt, AI-ready data and MLOps, and governed LLMOps from first use case to production.',
  },
  '/work': {
    title: 'Data architecture case studies and writing | data aigency',
    description:
      'Case studies and plain-spoken writing on lakehouse architecture, dbt, data governance and practical AI adoption.',
  },
  '/about': {
    title: 'Data and AI architecture consultant | data aigency',
    description:
      'One architect end to end. Vadim Van Den Heuvel on lakehouse design, dbt, data governance and AI adoption that survives handover.',
  },
  '/contact': {
    title: 'Book a free intake call | data aigency',
    description:
      'Book a free 30-minute intake call. We discuss your data stack, the problems you are hitting and the solutions worth considering. No deck, no obligations.',
  },
}

/** Title/description for a single MDX post, kept in one place so the
 *  pre-rendered head and the client-side document.title agree. */
export function metaForPost(post: { title: string; summary: string }): Meta {
  return { title: `${post.title} | ${BRAND}`, description: post.summary }
}

export function metaFor(path: string): Meta {
  // GitHub Pages serves directory routes with a trailing slash (/services/),
  // so normalize before lookup to keep titles correct on hydration.
  const normalized = path.replace(/\/+$/, '') || '/'
  const staticMeta = META[normalized]
  if (staticMeta) return staticMeta

  const slug = normalized.startsWith('/work/') ? normalized.slice('/work/'.length) : null
  if (slug) {
    const post = getPosts().find((p) => p.slug === slug)
    if (post) return metaForPost(post)
  }

  return FALLBACK
}
